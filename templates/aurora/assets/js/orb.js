/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* ==========================================================================
   JARVIS · orb.js — the living glass sphere (orchestrator core)
   Canvas2D: a noisy circle is clipped, colour blobs are painted with
   'lighter' compositing + blur, then fresnel shade, specular highlight and
   rim. `energy` raises the wobble (typing / speaking / generating).
     const orb = J.Orb(canvasEl,{energy:1,size:.36,rings:true});
     orb.energy = 2.4;   // eases towards the new value
   Pauses when off-screen and renders a single still frame in reduced motion.
   ========================================================================== */
/* ---------- orb core (liquid glass sphere) ---------- */
function Orb(canvas,opts={}){ /* opts: energy (wobble, 0.5–3), size (radius / box), rings (orbit arcs), cols (blob RGB list) */const c=canvas,x=c.getContext('2d');const DPR=Math.min(2,devicePixelRatio||1);let W,H;
 function fit(){W=c.clientWidth;H=c.clientHeight;c.width=W*DPR;c.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0)}fit();new ResizeObserver(fit).observe(c);
 let vis=true;new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis&&!J.motion.reduced)requestAnimationFrame(loop)}).observe(c);
 const cols=opts.cols||[[124,92,255],[255,92,170],[255,170,90],[59,232,210],[90,150,255]];
 let energy=opts.energy||1,target=energy,size=opts.size||.36;
 function path(cx,cy,r,t,amp){x.beginPath();const N=140;for(let i=0;i<=N;i++){const a=i/N*Math.PI*2;
   const k=1+amp*(.022*Math.sin(3*a+t*1.1)+.016*Math.sin(5*a-t*1.6+1)+.01*Math.sin(8*a+t*.9+2));const px=cx+Math.cos(a)*r*k,py=cy+Math.sin(a)*r*k;i?x.lineTo(px,py):x.moveTo(px,py)}x.closePath()}
 function draw(ms){const t=ms/1000;energy+=(target-energy)*.05;x.clearRect(0,0,W,H);const cx=W/2,cy=H/2,R=Math.min(W,H)*size;const amp=energy*(1+.3*Math.sin(t*.9*Math.max(1,energy)));
  const HR=Math.min(R*1.6,Math.min(W,H)/2);const halo=x.createRadialGradient(cx,cy,R*.8,cx,cy,HR);halo.addColorStop(0,`rgba(170,130,255,${.32+.12*energy})`);halo.addColorStop(.5,'rgba(255,92,170,.1)');halo.addColorStop(1,'rgba(255,92,170,0)');x.fillStyle=halo;x.fillRect(0,0,W,H);
  x.save();path(cx,cy,R,t,amp);x.clip();
  const base=x.createRadialGradient(cx-R*.2,cy-R*.3,R*.1,cx,cy,R*1.05);base.addColorStop(0,'#6a4cf0');base.addColorStop(1,'#1d1240');x.fillStyle=base;x.fillRect(0,0,W,H);
  x.globalCompositeOperation='lighter';x.filter='blur('+Math.max(4,Math.round(R*.22))+'px)';
  cols.forEach((col,i)=>{const sp=(.32+i*.08)*(.7+energy*.5);const a=t*sp+i*1.26;const rr=R*(.5+.1*Math.sin(t*.6+i));const px=cx+Math.cos(a)*R*.46,py=cy+Math.sin(a*1.15)*R*.42;
   const g=x.createRadialGradient(px,py,0,px,py,rr*1.3);g.addColorStop(0,`rgba(${col},.85)`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.beginPath();x.arc(px,py,rr*1.3,0,7);x.fill()});
  x.filter='none';x.globalCompositeOperation='source-over';
  x.globalAlpha=.16;x.strokeStyle='#fff';x.lineWidth=1.1;for(let k=0;k<2;k++){path(cx+Math.sin(t*.6+k)*R*.06,cy+Math.cos(t*.5+k)*R*.05,R*(.62+k*.16),t*1.4+k*2,amp*3);x.stroke()}x.globalAlpha=1;
  const sh=x.createRadialGradient(cx,cy,R*.6,cx,cy,R);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(.85,'rgba(10,6,24,.18)');sh.addColorStop(1,'rgba(255,255,255,.28)');x.fillStyle=sh;x.fillRect(0,0,W,H);
  x.save();x.translate(cx-R*.36,cy-R*.46);x.rotate(-.6);x.scale(1,.55);const hl=x.createRadialGradient(0,0,0,0,0,R*.36);hl.addColorStop(0,'rgba(255,255,255,.85)');hl.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=hl;x.beginPath();x.arc(0,0,R*.36,0,7);x.fill();x.restore();
  const hl2=x.createRadialGradient(cx+R*.42,cy+R*.5,0,cx+R*.42,cy+R*.5,R*.3);hl2.addColorStop(0,'rgba(255,200,230,.35)');hl2.addColorStop(1,'rgba(255,200,230,0)');x.fillStyle=hl2;x.fillRect(0,0,W,H);
  x.restore();
  path(cx,cy,R,t,amp);const rim=x.createLinearGradient(cx-R,cy-R,cx+R,cy+R);rim.addColorStop(0,'rgba(255,255,255,.9)');rim.addColorStop(.5,'rgba(255,255,255,.12)');rim.addColorStop(1,'rgba(255,190,230,.7)');x.strokeStyle=rim;x.lineWidth=1.4;x.stroke();
  if(opts.rings){x.strokeStyle='rgba(183,164,255,.35)';x.setLineDash([2,6]);x.beginPath();x.arc(cx,cy,R*1.18,t*.2,t*.2+Math.PI*2);x.stroke();x.setLineDash([]);x.strokeStyle='rgba(183,164,255,.7)';x.beginPath();x.arc(cx,cy,R*1.3,t*.8,t*.8+.9);x.stroke()}
 }
 function loop(ms){draw(ms);if(!J.motion.reduced&&vis)requestAnimationFrame(loop)}requestAnimationFrame(loop);
 return {set energy(v){target=v},get energy(){return target}};
}
J.Orb=Orb;
