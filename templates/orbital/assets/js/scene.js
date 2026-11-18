/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS Orbital scene — the "planet core" behind every room (three.js r149, UMD build, works from file://).
   Layers: starfield → dawn glow → planet (shader sphere + dotted land shell + traffic arcs) → atmosphere → orbit rings + satellites.
   API:  JV.scene.state('idle'|'think'|'speak')   JV.scene.flyTo(href)  → Promise (camera flight before navigation)
         JV.scene.preview(roomId|null)            JV.scene.onFrame(fn)  JV.scene.satScreen(i) → {x,y,front}
   Fallbacks: no WebGL (or ?nogl) → html.no-gl + CSS planet · reduced motion → one static frame · hidden tab → paused. */
(function(){
  const html = document.documentElement;
  const room = html.dataset.page || 'index';
  const api = JV.scene = { ok:false, state(){}, flyTo(){ return Promise.resolve(); }, preview(){}, onFrame(){}, satScreen(){ return null; } };

  /* Room poses. fx/fy = planet centre as a fraction of the half-viewport (−1…1), s = scale, tx = ring tilt. */
  const POSES = {
    index:        { fx: .00, fy: .02, s:1.18, tx:1.30 },
    overview:     { fx: .44, fy: .10, s:1.20, tx:1.22 },
    tasks:        { fx: .86, fy: .78, s:.56,  tx:1.36 },
    operations:   { fx: .00, fy:-1.30,s:1.90, tx:1.48 },
    'local-chat': { fx: .62, fy: .08, s:.95,  tx:1.18 },
    'fine-tuning':{ fx: .30, fy: 1.18,s:1.05, tx:1.40 },
    scheduled:    { fx:-.10, fy: 1.30,s:1.50, tx:1.44 },
    memory:       { fx:-.52, fy:-.18, s:1.05, tx:1.12 },
    integrations: { fx: .54, fy: .16, s:.96,  tx:1.26 },
    audit:        { fx: .78, fy:-.72, s:1.00, tx:1.38 },
    'ui-kit':     { fx: .76, fy: .62, s:.60,  tx:1.30 },
    _blank:       { fx: .55, fy: .20, s:.90,  tx:1.25 }
  };
  /* laptop widths (1024–1279): pull the core away from the text column */
  const LAPTOP = { overview:{ fx:.64, s:.9 }, integrations:{ fx:.64, fy:.3, s:.8 }, memory:{ fx:-.72, fy:-.55, s:.9 }, scheduled:{ fy:1.5 }, 'fine-tuning':{ fx:.55, fy:1.3, s:.9 }, tasks:{ fy:.9 } };
  const MOBILE_FX = { tasks:.5, 'local-chat':-.45, 'fine-tuning':.45, memory:-.5, integrations:.4, audit:.55, 'ui-kit':.5 };
  const roomOf = href => { const m = /([\w-]+)\.html/.exec(href||''); return m ? m[1] : 'index'; };
  function poseFor(id){
    const p = Object.assign({}, POSES[id] || POSES._blank), w = innerWidth;
    if(w < 768){ p.fx = MOBILE_FX[id] || 0; p.fy = id==='operations' ? -1.05 : .66; p.s = Math.min(p.s, .62) * (innerHeight > 700 ? 1 : .85); }
    else if(w < 1024){ p.fx = id==='operations'||id==='scheduled' ? 0 : (p.fx >= 0 ? .55 : -.55); p.fy = id==='operations' ? -1.2 : id==='scheduled' ? 1.15 : .55; p.s = Math.min(p.s, .8); }
    else if(w < 1280 && LAPTOP[id]) Object.assign(p, LAPTOP[id]);
    return { fx:p.fx, fy:p.fy, s:p.s, tx:p.tx, z:6 };
  }

  function glFails(){
    if(/[?&]nogl\b/.test(location.search) || !window.THREE) return true;
    try{ const c = document.createElement('canvas'); return !(c.getContext('webgl2') || c.getContext('webgl')); }catch(e){ return true; }
  }

  JV.use(() => {
    const canvas = document.getElementById('scene');
    if(!canvas) return;
    if(glFails()){ html.classList.add('no-gl'); return; }
    let renderer;
    try{ renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, powerPreference:'high-performance' }); }
    catch(e){ html.classList.add('no-gl'); return; }
    api.ok = true;
    const T = THREE, mobile = innerWidth < 768;
    renderer.setClearColor(0x000000, 0);
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(35, innerWidth/innerHeight, .1, 200);
    camera.position.set(0, 0, 6);
    const ICE = new T.Color('#8BE9FF'), SUN = new T.Color('#FFB36B'), CORAL = new T.Color('#FF8A5C');
    const LIGHT = new T.Vector3(.55, -.45, .7).normalize();   // dawn: bottom-right, in view space

    /* ── textures ── */
    function glowTex(stops){
      const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
      const r = g.createRadialGradient(64,64,0,64,64,64); stops.forEach(s => r.addColorStop(s[0], s[1]));
      g.fillStyle = r; g.fillRect(0,0,128,128); const t = new T.CanvasTexture(c); return t;
    }
    const dotTex = glowTex([[0,'rgba(255,255,255,1)'],[.25,'rgba(255,255,255,.7)'],[1,'rgba(255,255,255,0)']]);
    const haloTex = glowTex([[0,'rgba(139,233,255,.55)'],[.35,'rgba(76,140,255,.18)'],[.7,'rgba(255,138,92,.06)'],[1,'rgba(0,0,0,0)']]);

    /* ── starfield ── */
    {
      const n = mobile ? 900 : 2000, pos = new Float32Array(n*3), col = new Float32Array(n*3);
      for(let i=0;i<n;i++){
        const r = 22 + Math.random()*40, th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
        pos.set([r*Math.sin(ph)*Math.cos(th), r*Math.sin(ph)*Math.sin(th), -Math.abs(r*Math.cos(ph))*.8 - 6], i*3);
        const c = Math.random() < .12 ? SUN : Math.random() < .3 ? ICE : new T.Color('#DCE6FF'); col.set([c.r,c.g,c.b], i*3);
      }
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(pos,3)); g.setAttribute('color', new T.BufferAttribute(col,3));
      scene.add(new T.Points(g, new T.PointsMaterial({ size:.11, map:dotTex, vertexColors:true, transparent:true, opacity:.7, depthWrite:false, blending:T.AdditiveBlending })));
    }

    /* ── pose rig: pose (position/scale) → tilt (ring plane) → planet (spin) ── */
    const pose = new T.Group(), tilt = new T.Group(), planet = new T.Group();
    scene.add(pose); pose.add(tilt); tilt.add(planet);
    tilt.rotation.z = -.22;
    const halo = new T.Sprite(new T.SpriteMaterial({ map:haloTex, transparent:true, depthWrite:false, blending:T.AdditiveBlending, opacity:.9 }));
    halo.scale.set(5.4, 5.4, 1); halo.position.z = -1.2; pose.add(halo);

    const U = { uTime:{value:0}, uEnergy:{value:1}, uPulse:{value:0}, uLight:{value:LIGHT}, uIce:{value:ICE}, uSun:{value:SUN}, uPR:{value:1} };

    /* planet body */
    const bodyMat = new T.ShaderMaterial({
      uniforms:U, extensions:{ derivatives:true },
      vertexShader:`varying vec3 vN; varying vec3 vV; varying vec3 vO;
        void main(){ vO = position; vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.); vV = -mv.xyz; gl_Position = projectionMatrix*mv; }`,
      fragmentShader:`uniform float uTime; uniform float uEnergy; uniform float uPulse; uniform vec3 uLight; uniform vec3 uIce; uniform vec3 uSun;
        varying vec3 vN; varying vec3 vV; varying vec3 vO;
        float gridLine(float x, float w){ float f = abs(fract(x)-.5); return 1. - smoothstep(0., w*fwidth(x)*2., .5 - f); }
        void main(){
          vec3 n = normalize(vN), v = normalize(vV);
          float fres = pow(1. - max(dot(n,v),0.), 2.6);
          float l = dot(n, uLight);
          vec3 base = mix(vec3(.012,.02,.06), vec3(.045,.08,.19), smoothstep(-.3,1.,l));
          float term = smoothstep(.32,.0,abs(l-.08));
          float lat = asin(clamp(vO.y,-1.,1.))*5.73;           /* ≈ 18 bands */
          float lon = atan(vO.z, vO.x)*5.73;
          float g = max(gridLine(lat,1.), gridLine(lon,1.)) * .55;
          float scan = smoothstep(.06,0.,abs(fract(vO.y*.5+.5 - uTime*.06)-.5)) * .8;
          vec3 col = base;
          col += uIce * g * (.05 + .1*smoothstep(-.2,.8,l)) * uEnergy;
          col += uIce * scan * .07 * uEnergy;
          col += uSun * term * .22;
          col += uIce * fres * (.42 + .4*uPulse);
          col += uSun * fres * max(l,0.) * .7;
          gl_FragColor = vec4(col, 1.);
        }`
    });
    planet.add(new T.Mesh(new T.SphereGeometry(1, mobile ? 64 : 96, mobile ? 48 : 72), bodyMat));

    /* dotted land shell (Fibonacci sphere masked by fbm noise) */
    const hash = (x,y,z) => { const s = Math.sin(x*127.1 + y*311.7 + z*74.7)*43758.5453; return s - Math.floor(s); };
    function vnoise(x,y,z){
      const xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z), xf=x-xi, yf=y-yi, zf=z-zi;
      const s = t => t*t*(3-2*t), u=s(xf), v=s(yf), w=s(zf); let r = 0;
      for(let a=0;a<2;a++) for(let b=0;b<2;b++) for(let c=0;c<2;c++) r += hash(xi+a,yi+b,zi+c) * (a?u:1-u) * (b?v:1-v) * (c?w:1-w);
      return r;
    }
    const fbm = (x,y,z) => vnoise(x,y,z)*.55 + vnoise(x*2.1,y*2.1,z*2.1)*.3 + vnoise(x*4.3,y*4.3,z*4.3)*.15;
    const N = mobile ? 3600 : 8200, P = new Float32Array(N*3), LAND = new Float32Array(N), SEED = new Float32Array(N), landPts = [];
    for(let i=0;i<N;i++){
      const y = 1 - (i/(N-1))*2, r = Math.sqrt(1-y*y), th = i * 2.399963229728653;
      const x = Math.cos(th)*r, z = Math.sin(th)*r;
      const k = 1.012; P[i*3]=x*k; P[i*3+1]=y*k; P[i*3+2]=z*k;
      const land = fbm(x*1.9+3, y*1.9+1, z*1.9+7) > .5 ? 1 : 0; LAND[i] = land; SEED[i] = Math.random();
      if(land && i % 7 === 0) landPts.push(new T.Vector3(x,y,z));
    }
    const shellGeo = new T.BufferGeometry();
    shellGeo.setAttribute('position', new T.BufferAttribute(P,3)); shellGeo.setAttribute('aLand', new T.BufferAttribute(LAND,1)); shellGeo.setAttribute('aSeed', new T.BufferAttribute(SEED,1));
    const shellMat = new T.ShaderMaterial({ uniforms:U, transparent:true, depthWrite:false, blending:T.AdditiveBlending,
      vertexShader:`attribute float aLand; attribute float aSeed; uniform float uTime; uniform float uEnergy; uniform float uPR; uniform vec3 uLight; uniform vec3 uIce; uniform vec3 uSun;
        varying float vA; varying vec3 vC;
        void main(){
          vec4 mv = modelViewMatrix*vec4(position,1.);
          vec3 nv = normalize(normalMatrix*position);
          float facing = dot(nv, normalize(-mv.xyz));
          float tw = .65 + .35*sin(uTime*(1.2+aSeed*2.5) + aSeed*40.);
          vA = smoothstep(-.05,.45,facing) * mix(.09, 1., aLand) * mix(1., tw, aLand) * uEnergy;
          vC = mix(uIce, uSun, smoothstep(.25,.95,dot(nv,uLight)));
          gl_PointSize = (aLand > .5 ? 2.6 : 1.5) * uPR * (6. / -mv.z);
          gl_Position = projectionMatrix*mv;
        }`,
      fragmentShader:`varying float vA; varying vec3 vC;
        void main(){ float d = length(gl_PointCoord-.5); float a = smoothstep(.5,.1,d); gl_FragColor = vec4(vC, a*vA); }`
    });
    planet.add(new T.Points(shellGeo, shellMat));

    /* atmosphere */
    const atmo = new T.Mesh(new T.SphereGeometry(1.22, 64, 48), new T.ShaderMaterial({ uniforms:U, side:T.BackSide, transparent:true, depthWrite:false, blending:T.AdditiveBlending,
      vertexShader:`varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader:`uniform vec3 uIce; uniform vec3 uSun; uniform vec3 uLight; uniform float uPulse;
        varying vec3 vN;
        void main(){ float i = pow(max(0., .66 - dot(vN, vec3(0.,0.,1.))), 3.2);
          float warm = smoothstep(-.3,.9, dot(normalize(vN.xy+1e-4), normalize(uLight.xy)));
          vec3 c = mix(uIce, mix(uSun, vec3(1.,.54,.36), .4), warm*.85);
          gl_FragColor = vec4(c, 1.) * i * (.62 + .5*uPulse); }`
    }));
    pose.add(atmo);

    /* traffic arcs between land points */
    const ARC_SEG = 56, arcs = [];
    function newArc(a){
      const p = landPts[Math.floor(Math.random()*landPts.length)], q = landPts[Math.floor(Math.random()*landPts.length)];
      if(!p || !q || p.distanceTo(q) < .35) return newArc(a);
      const mid = p.clone().add(q).normalize().multiplyScalar(1.02 + p.distanceTo(q)*.42);
      const curve = new T.QuadraticBezierCurve3(p.clone().multiplyScalar(1.012), mid, q.clone().multiplyScalar(1.012));
      a.geo.setFromPoints(curve.getPoints(ARC_SEG));
      a.mat.color.copy(Math.random() < .3 ? SUN : ICE);
      a.t = 0; a.dur = 1.6 + Math.random()*1.6; a.wait = Math.random()*1.5;
    }
    for(let i=0;i<(mobile?6:11);i++){
      const geo = new T.BufferGeometry(), mat = new T.LineBasicMaterial({ transparent:true, opacity:.9, blending:T.AdditiveBlending, depthWrite:false });
      const a = { geo, mat, line:new T.Line(geo, mat) }; newArc(a); a.wait = Math.random()*3; planet.add(a.line); arcs.push(a);
    }

    /* orbit rings + satellites */
    const rings = [];
    function ring(r, color, op, rot, dots){
      const g = new T.Group(); g.rotation.set(rot[0], rot[1], rot[2]); tilt.add(g);
      const pts = []; for(let i=0;i<=256;i++){ const a = i/256*Math.PI*2; pts.push(new T.Vector3(Math.cos(a)*r, 0, Math.sin(a)*r)); }
      g.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color, transparent:true, opacity:op, blending:T.AdditiveBlending, depthWrite:false })));
      if(dots){
        const dp = []; for(let i=0;i<dots;i++){ const a = i/dots*Math.PI*2; dp.push(new T.Vector3(Math.cos(a)*r, 0, Math.sin(a)*r)); }
        g.add(new T.Points(new T.BufferGeometry().setFromPoints(dp), new T.PointsMaterial({ color, size:.035, map:dotTex, transparent:true, opacity:op*1.6, depthWrite:false, blending:T.AdditiveBlending })));
      }
      const R = { g, r, sats:[], speed:0 }; rings.push(R); return R;
    }
    function sat(R, color, a0, size){
      const m = new T.Sprite(new T.SpriteMaterial({ map:dotTex, color, transparent:true, depthWrite:false, blending:T.AdditiveBlending }));
      m.scale.set(size, size, 1); R.g.add(m);
      const core = new T.Sprite(new T.SpriteMaterial({ map:dotTex, color:0xffffff, transparent:true, depthWrite:false, blending:T.AdditiveBlending }));
      core.scale.set(size*.32, size*.32, 1); m.add(core); core.scale.divideScalar(size);
      const s = { m, a0 }; R.sats.push(s); return s;
    }
    const rTasks = ring(1.48, ICE, .28, [0, 0, .06], 0); rTasks.speed = .22;
    [0, 2.1, 4.2].forEach((a,i) => sat(rTasks, i ? ICE : SUN, a, .2));
    const rInt = ring(1.92, new T.Color('#B9D4FF'), .2, [.12, 0, -.2], 96); rInt.speed = -.07;
    const conns = (JV.data && JV.data.connections) || [];
    conns.forEach((c,i) => sat(rInt, new T.Color(c.c || '#8BE9FF'), i/conns.length*Math.PI*2, .15));
    const rOuter = ring(2.5, SUN, .14, [-.08, 0, .32], 180); rOuter.speed = .03;
    sat(rOuter, CORAL, 1.2, .24);

    /* ── motion state ── */
    const cur = poseFor(room), tw = { from:null, to:null, t0:0, dur:1, ease:null };
    let mx = 0, my = 0, cmx = 0, cmy = 0, spin = 0, spinV = .05, scrollY = 0;
    const st = { energy:1, pulse:0, speed:1, target:{ energy:1, pulse:0, speed:1 }, mode:'idle' };
    const easeOut = t => 1 - Math.pow(1-t, 4), easeIn = t => t*t*t, easeInOut = t => t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
    function tweenTo(to, dur, ease){ tw.from = Object.assign({}, cur); tw.to = to; tw.t0 = performance.now(); tw.dur = dur; tw.ease = ease || easeInOut; }

    /* arrival: continue the flight that the previous page started, else a gentle intro */
    let flight = null; try{ flight = JSON.parse(sessionStorage.getItem('jv-flight') || 'null'); sessionStorage.removeItem('jv-flight'); }catch(e){}
    const home = poseFor(room);
    if(!JV.motion.reduced){
      if(flight && Date.now() - flight.at < 5000 && flight.pose){ Object.assign(cur, flight.pose); spin = flight.spin || 0; }
      else Object.assign(cur, home, { s:home.s*.55, z:9 });
      tweenTo(home, flight ? 1500 : 1900, easeOut);
    }

    function layout(){
      const w = innerWidth, h = innerHeight;
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, w < 768 ? 1.5 : 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = w/h; camera.updateProjectionMatrix();
      U.uPR.value = renderer.getPixelRatio() * Math.min(1.4, Math.max(.7, h/900));
    }
    function apply(){
      const halfH = Math.tan(camera.fov/2*Math.PI/180) * 6, halfW = halfH * camera.aspect;
      pose.position.set(cur.fx*halfW, cur.fy*halfH + scrollY*halfH*.9, 0);
      pose.scale.setScalar(cur.s);
      tilt.rotation.x = cur.tx - .85;
      camera.position.set(cmx*.18, cmy*.12, cur.z);
      camera.lookAt(0, 0, 0);
    }
    const frameFns = [];
    let last = performance.now(), raf = 0, running = false, time = 0;
    function frame(now){
      const dt = Math.min(.05, (now - last)/1000); last = now; time += dt;
      if(tw.to){ const p = Math.min(1, (now - tw.t0)/tw.dur), e = tw.ease(p); for(const k in tw.to) cur[k] = tw.from[k] + (tw.to[k]-tw.from[k])*e; if(p >= 1) tw.to = null; }
      ['energy','pulse','speed'].forEach(k => st[k] += (st.target[k]-st[k]) * Math.min(1, dt*3));
      const pulse = st.mode==='speak' ? (.5+.5*Math.sin(time*9))*(.6+.4*Math.sin(time*2.3)) : st.pulse;
      U.uTime.value = time; U.uEnergy.value = st.energy; U.uPulse.value = pulse;
      spin += dt * spinV * st.speed; planet.rotation.y = spin;
      rings.forEach(R => R.sats.forEach(s => { const a = s.a0 + time*R.speed*st.speed; s.m.position.set(Math.cos(a)*R.r, 0, Math.sin(a)*R.r); }));
      rTasks.g.rotation.y += dt*.02*st.speed; rOuter.g.rotation.y -= dt*.01;
      arcs.forEach(a => {
        if(a.wait > 0){ a.wait -= dt; a.geo.setDrawRange(0,0); return; }
        a.t += dt*st.speed/a.dur; const n = ARC_SEG+1;
        if(a.t < 1){ a.geo.setDrawRange(0, Math.ceil(n*easeOut(a.t))); a.mat.opacity = .9; }
        else if(a.t < 1.8){ const k = (a.t-1)/.8, s0 = Math.floor(n*k); a.geo.setDrawRange(s0, n-s0); a.mat.opacity = .9*(1-k*.6); }
        else { newArc(a); a.wait = Math.random()*(st.mode==='think' ? .2 : 1.4); }
      });
      cmx += (mx - cmx)*Math.min(1, dt*2.5); cmy += (my - cmy)*Math.min(1, dt*2.5);
      apply();
      renderer.render(scene, camera);
      frameFns.forEach(fn => fn(time));
      if(running) raf = requestAnimationFrame(frame);
    }
    function start(){ if(running || JV.motion.reduced || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    function stop(){ running = false; cancelAnimationFrame(raf); }
    function still(){ stop(); if(tw.to){ Object.assign(cur, tw.to); tw.to = null; } last = performance.now(); frame(last); }

    layout();
    if(JV.motion.reduced){ Object.assign(cur, home); still(); } else start();
    addEventListener('resize', () => { if(html.classList.contains('shot-freeze')) return; layout(); const h = poseFor(room); if(!tw.to) Object.assign(cur, h); else tw.to = h; if(!running) still(); });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
    JV.on('motion', r => r ? (Object.assign(cur, poseFor(room)), still()) : start());
    if(matchMedia('(hover:hover)').matches) addEventListener('pointermove', e => { mx = (e.clientX/innerWidth - .5)*2; my = -(e.clientY/innerHeight - .5)*2; }, { passive:true });
    let deep = false;
    addEventListener('scroll', () => {
      scrollY = Math.min(1.2, window.scrollY / innerHeight);
      const d = window.scrollY > innerHeight*.55; if(d !== deep){ deep = d; html.classList.toggle('is-deep', d); }
      if(!running) still();
    }, { passive:true });

    /* ── public API ── */
    const MODES = { idle:{ energy:1, pulse:0, speed:1 }, think:{ energy:1.45, pulse:.35, speed:3.2 }, speak:{ energy:1.25, pulse:0, speed:1.6 } };
    api.state = m => { st.mode = MODES[m] ? m : 'idle'; st.target = Object.assign({}, MODES[st.mode]); html.dataset.core = st.mode; };
    api.preview = id => {
      if(JV.motion.reduced) return;
      const h = poseFor(room);
      if(!id || id===room){ tweenTo(h, 700, easeOut); return; }
      const t = poseFor(id); tweenTo({ fx:h.fx + (t.fx-h.fx)*.22, fy:h.fy + (t.fy-h.fy)*.22, s:h.s + (t.s-h.s)*.22, tx:t.tx, z:5.6 }, 700, easeOut);
      spinV = .05 + Math.random()*.08; setTimeout(() => spinV = .05, 700);
    };
    api.flyTo = href => new Promise(res => {
      const id = roomOf(href);
      if(JV.motion.reduced){ res(); return; }
      const t = poseFor(id);
      tweenTo({ fx:t.fx, fy:t.fy, s:t.s*1.35, tx:t.tx, z:3.4 }, 560, easeIn);
      spinV = .9; st.target = Object.assign({}, MODES.think);
      setTimeout(() => {
        try{ sessionStorage.setItem('jv-flight', JSON.stringify({ at:Date.now(), from:room, pose:Object.assign({}, cur), spin })); }catch(e){}
        res();
      }, 560);
    });
    api.onFrame = fn => frameFns.push(fn);
    const vec3 = new T.Vector3();
    api.satScreen = i => {
      const s = rInt.sats[i]; if(!s) return null;
      s.m.getWorldPosition(vec3); const wz = vec3.clone().project(camera);
      const camDir = vec3.clone().sub(pose.position).dot(camera.position.clone().sub(pose.position));
      return { x:(wz.x*.5+.5)*innerWidth, y:(-wz.y*.5+.5)*innerHeight, front: camDir > 0 };
    };
    api.room = room;
    JV.emit('scene:ready');
  });
})();
