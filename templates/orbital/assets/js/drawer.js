/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · inspector drawer (right glass panel; bottom sheet < 768px)
   JV.drawer.open({ kicker, title, sub, body, foot, onOpen }) · JV.drawer.close() */
(function(){
  let el, scrim, lastFocus;
  function build(){
    scrim = document.createElement('div'); scrim.className='scrim'; scrim.onclick = close;
    el = document.createElement('aside'); el.className='drawer'; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true'); el.setAttribute('aria-labelledby','drawer-title'); el.tabIndex=-1;
    document.body.append(scrim, el);
    el.addEventListener('keydown', trap);
  }
  function trap(e){
    if(e.key==='Escape'){ e.stopPropagation(); close(); return; }
    if(e.key!=='Tab') return;
    const f = JV.$$('a[href],button:not([disabled]),input,textarea,select,[tabindex="0"]', el).filter(x=>x.offsetParent);
    if(!f.length) return; const first=f[0], last=f[f.length-1];
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
  function open(o){
    if(!el) build();
    lastFocus = document.activeElement;
    el.innerHTML = `
      <header class="drawer-h"><div style="min-width:0">${o.kicker?`<div class="label" style="margin-bottom:8px">${o.kicker}</div>`:''}
        <h2 id="drawer-title" class="t-lg" style="overflow-wrap:anywhere">${o.title||''}</h2>${o.sub?`<div class="dim mono" style="font-size:.75rem;margin-top:6px">${o.sub}</div>`:''}</div>
        <button class="btn btn--icon" data-close aria-label="Close panel">${JV.ico('x')}</button></header>
      <div class="drawer-b">${o.body||''}</div>${o.foot?`<footer class="drawer-f">${o.foot}</footer>`:''}`;
    el.querySelectorAll('[data-close]').forEach(b=>b.onclick=close);
    JV.hydrateIcons(el);
    requestAnimationFrame(()=>{ scrim.classList.add('is-open'); el.classList.add('is-open'); });
    document.documentElement.style.overflow='hidden';
    setTimeout(()=>el.focus({preventScroll:true}), 60);
    o.onOpen && o.onOpen(el);
  }
  function close(){
    if(!el || !el.classList.contains('is-open')) return;
    el.classList.remove('is-open'); scrim.classList.remove('is-open');
    document.documentElement.style.overflow='';
    lastFocus && lastFocus.focus && lastFocus.focus({preventScroll:true});
  }
  JV.drawer = { open, close, get el(){ return el; } };
})();
