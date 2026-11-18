/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · ⌘K command line. Opens on ⌘K / Ctrl K / "/" or any [data-cmdk].
   Sources: sections, tasks, integrations, actions. Unmatched query → "Ask JARVIS" row. */
(function(){
  const D = JV.data;
  let root, input, list, items = [], sel = 0, lastFocus;
  const actions = [
    { t:'New task', s:'compose a request', ico:'plus', run:()=>JV.go('overview.html#compose') },
    { t:'Toggle reduced motion', s:'animations on / off', ico:'motion', run:()=>{ const r=JV.motion.toggle(); JV.toast(r?'Reduced motion on':'Motion on', r?'Planet frozen, flights off':'Planet and flights resumed'); } },
    { t:'Open UI kit', s:'components & states', ico:'spark', run:()=>JV.go('ui-kit.html') },
    { t:'Home', s:'all pages', ico:'index', run:()=>JV.go('index.html') }
  ];
  function source(){
    return [
      ...D.nav.map((n,i)=>({ g:'Rooms', n:JV.pad(i+1), t:n.label, s:n.desc, k:String(i+1), run:()=>JV.go(n.href) })),
      ...D.tasks.map(t=>({ g:'Tasks', n:t.no, t:t.t, s:`${t.id} · ${JV.money(t.cost)}`, run:()=>JV.go('tasks.html#'+t.id) })),
      ...D.connections.map(c=>({ g:'Integrations', n:'', t:c.n, s:c.k, dot:c.c, run:()=>JV.go('integrations.html#'+c.id) })),
      ...actions.map(a=>({ g:'Actions', n:'', t:a.t, s:a.s, ico:a.ico, run:a.run }))
    ];
  }
  function build(){
    root = document.createElement('div'); root.className='cmdk'; root.setAttribute('role','dialog'); root.setAttribute('aria-modal','true'); root.setAttribute('aria-label','Command line');
    root.innerHTML = `<div class="cmdk-panel">
      <div class="cmdk-in">${JV.ico('search')}<input type="text" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list" placeholder="Jump to, search, or ask JARVIS…" autocomplete="off" spellcheck="false"><kbd class="kbd">esc</kbd></div>
      <div class="cmdk-list" id="cmdk-list" role="listbox"></div>
      <div class="cmdk-foot"><span><kbd class="kbd">↑↓</kbd> move</span><span><kbd class="kbd">↵</kbd> open</span><span><kbd class="kbd">1–9</kbd> rooms</span><span style="margin-left:auto"><kbd class="kbd">G</kbd> orbit dial</span></div>
    </div>`;
    document.body.appendChild(root);
    input = JV.$('input', root); list = JV.$('.cmdk-list', root);
    root.addEventListener('click', e => { if(e.target===root) close(); const it=e.target.closest('.cmdk-item'); if(it){ sel=+it.dataset.i; go(); } });
    root.addEventListener('mousemove', e => { const it=e.target.closest('.cmdk-item'); if(it && +it.dataset.i!==sel){ sel=+it.dataset.i; mark(); } });
    input.addEventListener('input', render);
    input.addEventListener('keydown', e => {
      if(e.key==='ArrowDown'){ e.preventDefault(); sel=Math.min(sel+1, items.length-1); mark(); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); sel=Math.max(sel-1,0); mark(); }
      else if(e.key==='Enter'){ e.preventDefault(); go(); }
      else if(e.key==='Escape'){ close(); }
      else if(e.key==='Tab'){ e.preventDefault(); }
    });
  }
  function render(){
    const q = input.value.trim().toLowerCase();
    const all = source();
    items = q ? all.filter(x => (x.t+' '+x.s+' '+x.g).toLowerCase().includes(q)) : all.filter(x=>x.g!=='Integrations').slice(0, 18);
    if(q) items.push({ g:'Ask', t:`Ask JARVIS: “${input.value.trim()}”`, s:'plan → approve → run', ico:'spark', ask:true, run:()=>{ JV.toast('Request sent to JARVIS', 'Planning… you will approve the plan first'); JV.emit('ask', input.value.trim()); } });
    sel = 0;
    let g = '', html = '';
    items.forEach((x,i) => {
      if(x.g!==g){ g=x.g; html += `<div class="cmdk-group label">${g}</div>`; }
      const lead = x.dot ? `<span class="mark mark--sm" style="--c:${x.dot};width:24px;height:24px;font-size:.6875rem">${JV.esc(x.t[0])}</span>` : x.ico ? JV.ico(x.ico,'icon icon--sm') : `<span class="ci-n">${x.n}</span>`;
      html += `<button class="cmdk-item${x.ask?' cmdk-ask':''}" role="option" data-i="${i}" id="ci-${i}">${lead}<span class="trunc"><span class="ci-t">${JV.esc(x.t)}</span> <span class="ci-s">${JV.esc(x.s||'')}</span></span>${x.k?`<kbd class="kbd">${x.k}</kbd>`:JV.ico('chevron','icon icon--sm')}</button>`;
    });
    list.innerHTML = html || `<div class="cmdk-empty">Nothing found</div>`;
    mark();
  }
  function mark(){ JV.$$('.cmdk-item', list).forEach(b => { const on=+b.dataset.i===sel; b.setAttribute('aria-selected', on); if(on){ input.setAttribute('aria-activedescendant', b.id); b.scrollIntoView({block:'nearest'}); } }); }
  function go(){ const it = items[sel]; if(!it) return; close(); it.run(); }
  function open(q=''){ if(!root) build(); lastFocus=document.activeElement; input.value=q; render(); root.classList.add('is-open'); setTimeout(()=>input.focus(), 30); }
  function close(){ if(!root) return; root.classList.remove('is-open'); lastFocus&&lastFocus.focus&&lastFocus.focus({preventScroll:true}); }
  JV.cmdk = { open, close };
  document.addEventListener('keydown', e => {
    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); root&&root.classList.contains('is-open') ? close() : open(); }
    else if(e.key==='/' && !JV.isTyping(e)){ e.preventDefault(); open(); }
  });
  document.addEventListener('click', e => { const b=e.target.closest('[data-cmdk]'); if(b){ e.preventDefault(); open(b.dataset.cmdk||''); } });
})();
