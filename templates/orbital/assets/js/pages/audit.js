/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Audit: hash-chain strip, severity tabs, rows → drawer */
JV.use(() => {
  const A = JV.data.audit, sevSt = { info:'info', warn:'warn', err:'err' };
  JV.$('#chain').innerHTML = A.slice().reverse().map((a,i) => `<span class="link ${a.sev}" title="${a.act} · ${a.at}"><b class="mono">${a.hash}</b><span class="mono">${a.at.slice(0,5)}</span></span>`).join('<i class="link-j" aria-hidden="true"></i>');
  let sev = 'all';
  function rows(){
    JV.$('#au').innerHTML = A.filter(a => sev==='all' || a.sev===sev).map((a,i) => `<tr data-drawer="${i}" tabindex="0"><td class="mono cell-main">${a.at}</td><td data-k="By">${a.who}</td><td data-k="Act" class="mono ice" style="font-size:.78rem">${a.act}</td><td data-k="On" style="overflow-wrap:anywhere">${JV.esc(a.obj)}</td><td data-k="IP" class="mono dim" style="font-size:.75rem">${a.ip}</td><td data-k="Hash" class="mono dim" style="font-size:.75rem">${a.hash}</td><td class="cell-end">${JV.r.st(sevSt[a.sev])}</td></tr>`).join('');
  }
  JV.on('tab:sev', k => { sev = k; rows(); });
  JV.$('#au').addEventListener('click', e => { const tr = e.target.closest('tr'); if(!tr) return; const a = A.filter(x => sev==='all'||x.sev===sev)[+tr.dataset.drawer];
    JV.drawer.open({ kicker:`${a.sev} · ${a.at}`, title:a.act, sub:a.obj, body:`<dl class="dl"><dt>Actor</dt><dd>${a.who}</dd><dt>Object</dt><dd>${JV.esc(a.obj)}</dd><dt>IP</dt><dd>${a.ip}</dd><dt>Hash</dt><dd>${a.hash}</dd><dt>Prev</dt><dd>linked ✓</dd><dt>Signed by</dt><dd>jarvis-audit · ed25519</dd></dl><pre class="pane mono code">{ "at": "2026-11-18T${a.at}+01:00",\n  "actor": "${a.who}",\n  "action": "${a.act}",\n  "object": "${JV.esc(a.obj)}" }</pre>`, foot:`<button class="btn" data-close>Close</button>` }); });
  JV.$('#au').addEventListener('keydown', e => { if(e.key==='Enter') e.target.click(); });
  JV.$('#verify').onclick = e => { const b = e.currentTarget; b.classList.add('is-loading'); const ls = JV.$$('.link'); ls.forEach((l,i) => setTimeout(() => l.classList.add('is-ok'), i*90));
    setTimeout(() => { b.classList.remove('is-loading'); JV.toast('Chain intact', `${A.length} events · 0 gaps · ed25519`); }, ls.length*90+200); };
  rows();
});
