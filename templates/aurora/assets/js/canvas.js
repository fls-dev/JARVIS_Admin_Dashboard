/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* ==========================================================================
   JARVIS · canvas.js — living canvas: scenes, nodes, edges
   J.Scene(el,{w,h})  turns <div class="scene"><div class="world">…</div></div>
                      into a fixed-size world (w×h px) scaled to fit the box,
                      with pan & zoom: ctrl/⌘ + wheel or pinch to zoom, drag
                      to pan when zoomed, double-click / double-tap to reset,
                      and +/−/fit buttons. Nodes are positioned in world px.
                      The box height follows the scale; worlds never upscale
                      past maxScale (default 1) and are centred instead.
   P(el,side,root)    port position of el ('l','r','t','b','c') in root's
                      own (unscaled) coordinates – works inside scaled scenes.
   bez2(x1,y1,x2,y2,vert)  cubic bezier path (horizontal or vertical)
   edge(svg,a,sa,b,sb,opts) draws an edge between two nodes into an <svg>;
                      opts: color, flow (animated dashes), slow, dash, vert,
                      w (width), label, glow.
   ========================================================================== */
function bez2(x1,y1,x2,y2,vert){if(vert){const dy=Math.max(30,Math.abs(y2-y1)*.5);return `M${x1} ${y1} C${x1} ${y1+dy} ${x2} ${y2-dy} ${x2} ${y2}`}const s=x2>=x1?1:-1;const dx=Math.max(40,Math.abs(x2-x1)*.5);return `M${x1} ${y1} C${x1+s*dx} ${y1} ${x2-s*dx} ${y2} ${x2} ${y2}`}
function P(el,side,root){root=root||el.offsetParent;const L=root.getBoundingClientRect(),r=el.getBoundingClientRect();const k=(L.width/root.offsetWidth)||1;
 const x=(r.left-L.left)/k,y=(r.top-L.top)/k,w=r.width/k,h=r.height/k;
 return side=='l'?[x,y+h/2]:side=='r'?[x+w,y+h/2]:side=='t'?[x+w/2,y]:side=='b'?[x+w/2,y+h]:[x+w/2,y+h/2]}
function edge(svg,a,sa,b,sb,{color='#A897FF',flow=false,slow=false,dash=false,vert=false,w=1.6,label='',glow=true}={}){const root=svg.parentElement;const [x1,y1]=P(a,sa,root),[x2,y2]=P(b,sb,root);const d=bez2(x1,y1,x2,y2,vert);
 svg.insertAdjacentHTML('beforeend',`${glow?`<path d="${d}" fill="none" stroke="${color}" stroke-opacity=".16" stroke-width="${w+5}"/>`:''}<path class="${flow?'flow':''} ${slow?'slow':''}" d="${d}" fill="none" stroke="${color}" stroke-opacity="${dash?.5:.9}" stroke-width="${w}" ${dash?'stroke-dasharray="2 6"':''}/>`);
 if(label){const mx=(x1+x2)/2,my=(y1+y2)/2;svg.insertAdjacentHTML('beforeend',`<g transform="translate(${mx},${my})"><rect x="-36" y="-11" width="72" height="22" rx="11" fill="#0E0D15" stroke="${color}" stroke-opacity=".5"/><text text-anchor="middle" y="4" fill="${color}" font-family="Geist Mono" font-size="11">${label}</text></g>`)}}

J.Scene=function(el,{w,h,maxZoom=3,maxScale=1}={}){
 const world=el.querySelector('.world');el.style.setProperty('--w',w);el.style.setProperty('--h',h);
 let base=1,k=1,x=0,y=0,ox=0;
 const apply=()=>{world.style.transform=`translate(${x+(k==1?ox:0)}px,${y}px) scale(${base*k})`;el.classList.toggle('grab',k>1);el.style.touchAction=k>1?'none':'pan-y'};
 const clamp=()=>{const W=el.clientWidth,H=el.clientHeight,sw=w*base*k,sh=h*base*k;x=sw<W?0:Math.min(0,Math.max(W-sw,x));y=Math.min(0,Math.max(H-sh,y))};
 const fit=()=>{const cw=el.clientWidth;base=Math.min(maxScale,cw/w);ox=Math.max(0,(cw-w*base)/2);el.style.height=Math.round(h*base)+'px';clamp();apply()};
 const zoomAt=(nk,cx,cy)=>{nk=Math.max(1,Math.min(maxZoom,nk));const s0=base*k,s1=base*nk;x=cx-(cx-x)*s1/s0;y=cy-(cy-y)*s1/s0;k=nk;clamp();apply()};
 const reset=()=>{k=1;x=0;y=0;apply()};
 el.insertAdjacentHTML('beforeend',`<div class="zoom g3"><button aria-label="Zoom out" data-z="-">−</button><button aria-label="Fit" data-z="0">${ico('overview',14)}</button><button aria-label="Zoom in" data-z="+">+</button></div><div class="scene-hint">pinch to zoom · drag to pan</div>`);
 el.querySelector('.zoom').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const W=el.clientWidth/2,H=el.clientHeight/2;b.dataset.z=='0'?reset():zoomAt(k*(b.dataset.z=='+'?1.4:1/1.4),W,H)});
 el.addEventListener('wheel',e=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();const r=el.getBoundingClientRect();zoomAt(k*Math.exp(-e.deltaY*.002),e.clientX-r.left,e.clientY-r.top)},{passive:false});
 el.addEventListener('dblclick',reset);
 const pts=new Map();let last=null;
 el.addEventListener('pointerdown',e=>{if(e.target.closest('.zoom'))return;pts.set(e.pointerId,[e.clientX,e.clientY]);if(k>1||pts.size==2){el.setPointerCapture(e.pointerId);el.classList.add('grabbing')}last=null});
 el.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const prev=pts.get(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);const r=el.getBoundingClientRect();
  if(pts.size==2){const [a,b]=[...pts.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);const cx=(a[0]+b[0])/2-r.left,cy=(a[1]+b[1])/2-r.top;if(last){zoomAt(k*d/last.d,cx,cy);x+=cx-last.cx;y+=cy-last.cy;clamp();apply()}last={d,cx,cy}}
  else if(k>1){x+=e.clientX-prev[0];y+=e.clientY-prev[1];clamp();apply()}});
 const up=e=>{pts.delete(e.pointerId);last=null;if(!pts.size)el.classList.remove('grabbing')};el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
 el.classList.toggle('touch',J.isTouch());new ResizeObserver(fit).observe(el);fit();
 return {world,fit,reset,get scale(){return base*k}};
};
