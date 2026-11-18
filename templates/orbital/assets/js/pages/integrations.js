/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Integrations: satellite labels on the planet, connections table (+ filter, drawer), file processors (switches), catalog (tabs + search + drawer) */
JV.use(() => {
  const D = JV.data;
  const group = c => c.k==='OpenAI-compatible' && /Local/.test(c.n) ? 'local' : ['Training','IDE','Messaging','Telephony','Search'].includes(c.k) ? 'tool' : 'model';
  const maxLat = Math.max(...D.connections.map(c=>c.lat));
  let cf = 'all';

  /* § 1 connections */
  function rows(){
    JV.$('#conn').innerHTML = D.connections.filter(c => cf==='all' || group(c)===cf).map(c => `
      <tr data-drawer="${c.id}" tabindex="0" aria-label="${JV.esc(c.n)} details">
        <td class="cell-main"><span class="ent">${JV.r.mark(c.n,c.c)}<span style="min-width:0"><span class="ent-t" style="display:block">${JV.esc(c.n)}</span><span class="ent-s">${c.k} · ${c.cap} capabilities</span></span></span></td>
        <td data-k="Kind" class="hide-l mono" style="font-size:.75rem">${c.k}</td>
        <td class="r hide-t" data-k="Caps">${c.cap}</td>
        <td class="r" data-k="Calls">${c.calls}</td>
        <td data-k="p50" class="hide-t"><span class="lat">${c.lat?`<i style="--v:${(c.lat/maxLat*100).toFixed(0)}%"></i></span><span class="mono">${c.lat} ms</span>`:'</span><span class="mono dim">—</span>'}</td>
        <td class="r" data-k="Spend">${JV.money(c.spend)}</td>
        <td class="cell-end"><span class="st st--ok">Verified</span></td>
        <td class="in-act">${c.cap?`<button class="btn btn--sm" data-act="refresh" data-id="${c.id}">Refresh prices</button>`:''}<button class="btn btn--sm btn--ghost btn--icon" aria-label="Open ${JV.esc(c.n)}" data-act="open" data-id="${c.id}">${JV.ico('chevron','icon icon--sm')}</button></td>
      </tr>`).join('');
  }
  JV.on('chips:conn-f', v => { cf=v; rows(); });
  JV.$('#conn').addEventListener('click', e => {
    const b = e.target.closest('[data-act="refresh"]');
    if(b){ e.stopPropagation(); b.classList.add('is-loading'); setTimeout(()=>{ b.classList.remove('is-loading'); JV.toast('Prices refreshed', D.connections.find(c=>c.id===b.dataset.id).n); }, 900); return; }
    const tr = e.target.closest('tr[data-drawer]'); if(tr) openConn(tr.dataset.drawer);
  });
  JV.$('#conn').addEventListener('keydown', e => { const tr=e.target.closest('tr[data-drawer]'); if(tr && (e.key==='Enter'||e.key===' ')){ e.preventDefault(); openConn(tr.dataset.drawer); } });

  function openConn(id){
    const c = D.connections.find(x=>x.id===id); if(!c) return;
    const tg = c.recipients ? `
      <div class="field"><label for="tg-ids">Notification recipients</label><span class="hint">Every notification is delivered independently to every verified chat ID.</span>
        <input id="tg-ids" class="input input--mono" value="${c.recipients}"></div>
      <button class="btn btn--block" id="tg-save">Verify and save IDs</button>` : '';
    JV.drawer.open({
      kicker:`${c.k} · connection`, title:JV.esc(c.n), sub:c.url || (c.k==='OpenAI-compatible'?'OpenAI-compatible endpoint':'Native adapter'),
      body:`
        <div class="row"><span class="st st--ok">Verified</span><span class="label">checked 2 min ago</span></div>
        <div class="kpis" style="--n:3"><div class="kpi"><span class="label">Calls</span><span class="kpi-v kpi-v--sm">${c.calls}</span></div><div class="kpi"><span class="label">p50</span><span class="kpi-v kpi-v--sm">${c.lat||'—'}<small>ms</small></span></div><div class="kpi"><span class="label">Spend</span><span class="kpi-v kpi-v--sm">${JV.money(c.spend,4)}</span></div></div>
        <div><div class="label" style="margin-bottom:8px">Calls · last 24 h</div><div id="dr-spark"></div></div>
        <dl class="dl"><dt>Capabilities</dt><dd>${c.cap}</dd><dt>Secret</dt><dd>•••• •••• ${c.id.slice(0,2).toUpperCase()}7F</dd><dt>Scope</dt><dd>workspace · Acme</dd><dt>Added</dt><dd>02 Nov 2026</dd></dl>
        ${tg}
        <div class="field"><label for="dr-key">Rotate secret</label><input id="dr-key" class="input input--mono" type="password" placeholder="Paste a new key" autocomplete="off"><span class="hint">Stored encrypted. The old key keeps working until the new one is verified.</span></div>`,
      foot:`<button class="btn btn--danger" id="dr-remove">${JV.ico('trash','icon icon--sm')} Remove</button><button class="btn" data-close>Close</button><button class="btn btn--primary" id="dr-verify">Verify</button>`,
      onOpen: el => {
        JV.chart.spark(JV.$('#dr-spark',el), [2,3,1,4,6,3,5,8,6,9,7,11,8,6,9,12,10,7,9,13,11,9,12,c.calls/3+4], { h:56 });
        JV.$('#dr-verify',el).onclick = e => { e.target.classList.add('is-loading'); setTimeout(()=>{ e.target.classList.remove('is-loading'); JV.toast('Connection verified', c.n); }, 1000); };
        JV.$('#dr-remove',el).onclick = e => { const b=e.currentTarget; if(b.dataset.armed){ JV.drawer.close(); JV.toast('Connection removed', c.n+' · undo within 10 s', 'warn'); } else { b.dataset.armed=1; b.innerHTML='Confirm remove'; } };
        const s = JV.$('#tg-save',el); if(s) s.onclick = () => { const i=JV.$('#tg-ids',el); const ok=/^\d{5,}(,\s*\d{5,})*$/.test(i.value.trim()); i.setAttribute('aria-invalid', !ok); JV.toast(ok?'Chat IDs verified':'Invalid chat ID', ok?i.value:'Use digits, separate with commas', ok?'ok':'err'); };
      }
    });
  }

  /* § 2 processors */
  JV.$('#proc').innerHTML = D.processors.map((p,i) => `
    <li class="proc-row">
      <span class="proc-n">${JV.pad(i+1)}</span>
      <div class="proc-main"><div class="t-md">${p.n}</div><div class="label" style="margin-top:4px">${p.ops}</div></div>
      <div class="proc-mime mono">${p.mime}<span class="dim"> · up to ${p.limit}</span></div>
      <div class="proc-ctl">${p.required ? `<span class="st st--off">Required</span>` : `<label class="switch"><input type="checkbox" checked data-proc="${p.n}"><span class="track"></span><span class="sr-only">${p.n}</span><span class="proc-on">Enabled</span></label>`}</div>
    </li>`).join('');
  JV.$('#proc').addEventListener('change', e => { const i=e.target; if(!i.dataset.proc) return; i.parentElement.querySelector('.proc-on').textContent = i.checked?'Enabled':'Disabled'; JV.toast(i.checked?'Processor enabled':'Processor disabled', i.dataset.proc, i.checked?'ok':'warn'); });

  /* § 3 catalog */
  let tab = 'all', q = '';
  const counts = { all:D.catalog.length }; D.catalog.forEach(c => counts[c[1]] = (counts[c[1]]||0)+1);
  JV.$('#cat-tabs').innerHTML = D.catalogTabs.map(([k,l],i)=>`<button class="tab" role="tab" data-tab="${k}" aria-selected="${i===0}" aria-controls="cat">${l} <span class="count">${counts[k]}</span></button>`).join('');
  JV.$$('#cat-tabs [role=tab]').forEach(b=>b.tabIndex = b.getAttribute('aria-selected')==='true'?0:-1);
  let showAll = innerWidth >= 768;   /* phones: first 12 cards + "show all" */
  function cards(){
    const all = D.catalog.map((c,i)=>[c[0],c[1],c[2],c[3],!!c[4],i]).filter(c => (tab==='all'||c[1]===tab) && (!q || (c[0]+' '+c[2]+' '+c[3]).toLowerCase().includes(q)));
    const items = showAll || q ? all : all.slice(0, 12);
    JV.$('#cat-count').textContent = `${all.length} of ${D.catalog.length}${q?` · “${q}”`:''}`;
    JV.$('#cat').innerHTML = items.length ? items.map(c => `
      <article class="card ${c[4]?'is-on':''}">
        <div class="card-top">${JV.r.mark(c[0], c[4]?'#8BE9FF':'')}<span class="card-idx">${JV.pad(c[5]+1)}</span></div>
        <div><h3>${JV.esc(c[0])}</h3><div class="label" style="margin-top:4px">${c[2]}</div></div>
        <p class="${/^https?:/.test(c[3])?'mono':''}" style="${/^https?:/.test(c[3])?'font-size:.75rem':''}">${JV.esc(c[3])}</p>
        <div class="card-foot">${c[4]?`<span class="st st--ok">Connected</span>`:'<span></span>'}
          <button class="card-cta" data-cat="${c[5]}">${c[1]==='mcp'?'Connect':'Configure'} ${JV.ico('arrow','icon icon--sm')}</button></div>
      </article>`).join('') : `<div class="empty" style="grid-column:1/-1"><div class="t-lg">Nothing matches “${JV.esc(q)}”</div><p>Try a provider name, a host like <span class="mono">api.groq.com</span>, or switch to All.</p><button class="btn" style="margin-top:16px" id="cq-clear">Clear search</button></div>`;
    if(items.length < all.length) JV.$('#cat').insertAdjacentHTML('beforeend', `<button class="btn btn--block" id="cat-more" style="grid-column:1/-1">Show all ${all.length}</button>`);
    const more = JV.$('#cat-more'); if(more) more.onclick = () => { showAll = true; cards(); };
    const clr = JV.$('#cq-clear'); if(clr) clr.onclick = () => { JV.$('#cq').value=''; q=''; cards(); };
  }
  JV.on('tab:cat', k => { tab=k; cards(); });
  JV.$('#cq').addEventListener('input', e => { q=e.target.value.trim().toLowerCase(); cards(); });
  JV.$('#cat').addEventListener('click', e => { const b=e.target.closest('[data-cat]'); if(!b) return; const c=D.catalog[+b.dataset.cat]; const mcp=c[1]==='mcp';
    JV.drawer.open({ kicker:`${c[2]} · ${mcp?'MCP server':'preset'}`, title:JV.esc(c[0]), sub:/^https?:/.test(c[3])?c[3]:'',
      body:`<p class="muted">${/^https?:/.test(c[3])?'OpenAI-compatible endpoint. JARVIS reads the model list and prices after verification.':JV.esc(c[3])}</p>
        ${mcp?`<div class="field"><label for="m-url">Server URL</label><input id="m-url" class="input input--mono" value="https://registry.modelcontextprotocol.io/${c[0].toLowerCase().replace(/[^a-z0-9.]+/g,'-')}"></div>
        <label class="check"><input type="checkbox" checked> Ask before each tool call</label>`:`
        <div class="field"><label for="c-key">API key</label><input id="c-key" class="input input--mono" type="password" autocomplete="off" placeholder="sk-…"><span class="hint">Encrypted at rest. Never sent to other providers.</span></div>
        <div class="field"><label for="c-url">Base URL <span class="dim">(optional)</span></label><input id="c-url" class="input input--mono" value="${/^https?:/.test(c[3])?c[3]:''}" placeholder="https://…/v1"></div>
        <div class="field"><label for="c-b">Daily budget</label><select id="c-b" class="select"><option>$0.10</option><option selected>$0.50</option><option>$2.00</option><option>No limit</option></select></div>`}`,
      foot:`<button class="btn" data-close>Cancel</button><button class="btn btn--primary" id="c-go">${mcp?'Connect':'Verify &amp; save'}</button>`,
      onOpen: el => { JV.$('#c-go',el).onclick = ev => { const k=JV.$('#c-key',el); if(k && !k.value){ k.setAttribute('aria-invalid','true'); k.focus(); if(!JV.$('.error-msg',el)) k.insertAdjacentHTML('afterend','<span class="error-msg">Paste an API key to verify the connection.</span>'); return; }
        ev.target.classList.add('is-loading'); setTimeout(()=>{ JV.drawer.close(); JV.toast(mcp?'MCP server connected':'Connection verified', c[0]); }, 1100); }; } }); });

  /* satellite labels: HTML tags that follow the 13 satellites of the integrations ring (desktop, WebGL only) */
  const wrap = JV.$('#sat-labels');
  if(JV.scene.ok && matchMedia('(min-width:1024px)').matches){
    wrap.innerHTML = D.connections.map(c => `<span class="sat-l" style="--c:${c.c}"><i></i>${JV.esc(c.s||c.n)}</span>`).join('');
    const tags = JV.$$('.sat-l', wrap);
    JV.scene.onFrame(() => {
      const fade = Math.max(0, 1 - scrollY/(innerHeight*.5));
      wrap.style.opacity = fade; if(!fade) return;
      tags.forEach((el,i) => { const p = JV.scene.satScreen(i); if(!p) return;
        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`; el.classList.toggle('is-back', !p.front); });
    });
  }
  rows(); cards();
  const h = location.hash.slice(1); if(h && D.connections.some(c=>c.id===h)) setTimeout(()=>openConn(h), 400);
});
