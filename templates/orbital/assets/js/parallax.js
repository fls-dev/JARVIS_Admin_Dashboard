/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · depth: windows with [data-depth="0.2…1"] drift with the cursor (visionOS-like parallax);
   .card gets a pointer-follow tilt + light. Off on touch and with reduced motion. */
(function(){
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  JV.use(() => {
    if(!fine.matches) return;
    let els = [], tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const collect = () => { els = JV.$$('[data-depth]').map(el => ({ el, d:+el.dataset.depth || .3 })); };
    collect(); JV.on('rendered', collect);
    function loop(){
      cx += (tx-cx)*.08; cy += (ty-cy)*.08;
      els.forEach(o => o.el.style.transform = `translate3d(${(cx*o.d*14).toFixed(2)}px, ${(cy*o.d*10).toFixed(2)}px, 0)`);
      raf = Math.abs(tx-cx) + Math.abs(ty-cy) > .001 ? requestAnimationFrame(loop) : 0;
    }
    addEventListener('pointermove', e => {
      if(JV.motion.reduced) return;
      tx = (e.clientX/innerWidth - .5)*-2; ty = (e.clientY/innerHeight - .5)*-2;
      if(!raf) raf = requestAnimationFrame(loop);
    }, { passive:true });
    JV.on('motion', r => { if(r) els.forEach(o => o.el.style.transform = ''); });
    document.addEventListener('pointermove', e => {
      const c = e.target.closest && e.target.closest('.card'); if(!c || JV.motion.reduced) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left)/r.width, y = (e.clientY - r.top)/r.height;
      c.style.setProperty('--mx', (x*100).toFixed(1)+'%'); c.style.setProperty('--my', (y*100).toFixed(1)+'%');
      c.style.setProperty('--ry', ((x-.5)*6).toFixed(2)+'deg'); c.style.setProperty('--rx', ((.5-y)*6).toFixed(2)+'deg');
    }, { passive:true });
    document.addEventListener('pointerout', e => { const c = e.target.closest && e.target.closest('.card'); if(c && !c.contains(e.relatedTarget)){ c.style.setProperty('--rx','0deg'); c.style.setProperty('--ry','0deg'); } });
  });
})();
