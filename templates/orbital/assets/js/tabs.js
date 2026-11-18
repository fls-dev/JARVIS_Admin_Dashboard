/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · tabs + filterable collections.
   <div role="tablist" data-tabs="name"> <button role="tab" data-tab="key" aria-selected> … </div>
   Panels: [data-tabpanel="name:key"] are shown/hidden. Or listen: JV.on('tab:name', key). */
(function(){
  function select(list, btn, focus){
    const name = list.dataset.tabs;
    JV.$$('[role=tab]', list).forEach(b => { const on = b===btn; b.setAttribute('aria-selected', on); b.tabIndex = on?0:-1; });
    JV.$$(`[data-tabpanel^="${name}:"]`).forEach(p => p.hidden = p.dataset.tabpanel !== `${name}:${btn.dataset.tab}`);
    focus && btn.focus();
    JV.emit('tab:'+name, btn.dataset.tab);
  }
  JV.tabs = { select };
  JV.use(() => {
    JV.$$('[data-tabs]').forEach(list => {
      list.addEventListener('click', e => { const b = e.target.closest('[role=tab]'); if(b) select(list, b); });
      list.addEventListener('keydown', e => {
        const tabs = JV.$$('[role=tab]', list), i = tabs.indexOf(document.activeElement);
        if(i<0) return; let j = null;
        if(e.key==='ArrowRight') j=(i+1)%tabs.length; if(e.key==='ArrowLeft') j=(i-1+tabs.length)%tabs.length;
        if(e.key==='Home') j=0; if(e.key==='End') j=tabs.length-1;
        if(j!==null){ e.preventDefault(); select(list, tabs[j], true); }
      });
      JV.$$('[role=tab]', list).forEach(b => b.tabIndex = b.getAttribute('aria-selected')==='true' ? 0 : -1);
    });
    /* chips with aria-pressed inside [data-chipgroup] behave as single-select */
    document.addEventListener('click', e => {
      const c = e.target.closest('[data-chipgroup] [aria-pressed]'); if(!c) return;
      const g = c.closest('[data-chipgroup]');
      if(g.dataset.chipgroup==='multi'){ c.setAttribute('aria-pressed', c.getAttribute('aria-pressed')!=='true'); }
      else JV.$$('[aria-pressed]', g).forEach(x => x.setAttribute('aria-pressed', x===c));
      JV.emit('chips:'+(g.id||'x'), c.dataset.v);
    });
  });
})();
