/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* ==========================================================================
   JARVIS · nav.js — navigation
   Desktop (>1100px): orbit wheel. The hub sits off-screen to the left; the
   active section always rests at the pointer and the others wrap ±4 around
   it. Scroll over the wheel to turn it, press 1–9 to jump.
   Tablet & mobile (≤1100px): glass bottom dock with 4 main sections and a
   "More" button that fans every section out as a radial menu.
   Sections come from DATA.nav; routes from DATA.pages (null = not built).
   ========================================================================== */
J.nav={
 go(k){const u=DATA.pages[k];if(u)location.href=u;else toast(DATA.nav.find(n=>n[1]==k)[0],'not part of this template set','alert','var(--run)')},
 wheel(){
  const w=document.createElement('nav');w.className='wheel';w.setAttribute('aria-label','Sections');document.body.appendChild(w);
  const N=DATA.nav.length,own=DATA.nav.findIndex(n=>n[1]==document.body.dataset.page);let act=Math.max(0,own);
  const render=()=>{const H=innerHeight,ww=w.clientWidth||290,R=430,narrow=ww<260,cy=Math.round(H*.52),step=narrow?.115:.135,reach=Math.floor(N/2),cx=Math.max(narrow?-360:ww-R-200,16+15-Math.cos(reach*step)*R);
   let h=`<svg width="${ww}" height="${H}"><defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#B7A4FF" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="url(#wg)" stroke-width="1.2"/><circle cx="${cx}" cy="${cy}" r="${R-52}" fill="none" stroke="rgba(255,255,255,.06)" stroke-dasharray="2 6"/><circle cx="${cx}" cy="${cy}" r="${R+64}" fill="none" stroke="rgba(183,164,255,.08)"/></svg>`;
   DATA.nav.forEach(([l,k],i)=>{let d=i-act;if(d>4)d-=N;if(d<-4)d+=N;const a=d*step,x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R;
    h+=`<a class="wi ${i==act&&own>=0?'on':''}" href="${DATA.pages[k]||'#'}" data-k="${k}" style="left:${x}px;top:${y}px;opacity:${y<22||y>H-22?0:1-Math.abs(d)*.14}${y<22||y>H-22?';pointer-events:none':''}"><span class="o">${ico(k,15,1.8)}</span><span class="l">${l}</span><kbd>${i+1}</kbd></a>`});
   w.innerHTML=h+`<div class="wheel-hint">scroll to turn · 1–9</div>`};
  render();J.onResize(render);
  w.addEventListener('click',e=>{const a=e.target.closest('.wi');if(a&&!DATA.pages[a.dataset.k]){e.preventDefault();J.nav.go(a.dataset.k)}});
  let acc=0;w.addEventListener('wheel',e=>{e.preventDefault();acc+=e.deltaY;if(Math.abs(acc)>60){act=(act+(acc>0?1:-1)+N)%N;acc=0;render()}},{passive:false});
  document.addEventListener('keydown',e=>{if(/^[1-9]$/.test(e.key)&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)&&!$('.pal-bg.on'))J.nav.go(DATA.nav[+e.key-1][1])});
 },
 dock(){
  const page=document.body.dataset.page;
  const d=document.createElement('nav');d.className='dock g3';d.setAttribute('aria-label','Sections');
  d.innerHTML=DATA.dock.map(k=>{const l=DATA.nav.find(n=>n[1]==k)[0];return `<a href="${DATA.pages[k]}" class="${k==page?'on':''}">${ico(k,21,1.8)}<span>${l.replace('Local chat','Chat')}</span></a>`}).join('')+`<button class="more ${DATA.dock.includes(page)?'':'on'}" aria-label="All sections"><span class="dot"></span><span>More</span></button>`;
  document.body.appendChild(d);
  const r=document.createElement('div');r.className='radial';
  const n=DATA.nav.length;r.innerHTML='<div class="bg"></div>'+DATA.nav.map(([l,k],i)=>{const a=Math.PI*(1.06+i/(n-1)*.88);const R=Math.min(innerWidth*.42,190)+(i%2?0:-58);
   return `<a href="${DATA.pages[k]||'#'}" data-k="${k}" class="${k==page?'on':''}" style="--x:${Math.cos(a)*R}px;--y:${Math.sin(a)*R*1.15-30}px"><span class="o g3">${ico(k,20,1.8)}</span>${l}</a>`}).join('');
  document.body.appendChild(r);
  const t=()=>r.classList.toggle('open');d.querySelector('.more').onclick=t;r.querySelector('.bg').onclick=t;
  r.addEventListener('click',e=>{const a=e.target.closest('a');if(a&&!DATA.pages[a.dataset.k]){e.preventDefault();t();J.nav.go(a.dataset.k)}});
 }
};
