/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Memory: kind chips + recall search → weighted cards; drawer with provenance */
JV.use(() => {
  const M = JV.data.memory, col = { fact:'#8BE9FF', runbook:'#FFB36B', file:'#A99BFF', host:'#6CF0C2', policy:'#FF8A5C' };
  let kind = 'all', q = '';
  JV.$('#mem-k').innerHTML = `<button class="chip" aria-pressed="true" data-v="all">All <b>${M.total.toLocaleString('en-US').replace(',',' ')}</b></button>` + M.kinds.map(k => `<button class="chip" aria-pressed="false" data-v="${k[0]}"><span class="dot" style="width:8px;height:8px;border-radius:50%;background:${col[k[0]]}"></span>${k[0]} <b>${k[1]}</b></button>`).join('');
  JV.$('#mem-bar').innerHTML = M.kinds.map(k => `<div style="--w:${k[1]};--c:${col[k[0]]}"></div>`).join('');
  function render(){
    const items = M.items.filter(i => (kind==='all'||i.k===kind) && (!q || (i.t+i.src+i.k).toLowerCase().includes(q)));
    JV.$('#mem-items').innerHTML = items.length ? items.map((m,i) => `<article class="card mem-card rise" style="--i:${i}">
      <div class="card-top"><span class="st" style="color:${col[m.k]};border-color:${col[m.k]}55">${m.k}</span><span class="card-idx">${m.src} · ${m.at}</span></div>
      <p class="mem-t">${JV.esc(m.t)}</p>
      <div><div class="row between"><span class="label">Recall weight</span><span class="mono">${m.w.toFixed(2)}</span></div><div class="meter" style="--v:${m.w*100}%;margin-top:8px"><i></i></div></div>
      <div class="card-foot"><a class="card-cta" href="tasks.html#${m.src}">Source ${JV.ico('arrow','icon icon--sm')}</a><button class="btn btn--sm btn--ghost btn--icon" aria-label="Forget this item" data-forget>${JV.ico('trash','icon icon--sm')}</button></div></article>`).join('')
      : `<div class="empty" style="grid-column:1/-1"><div class="t-lg">Nothing recalled for “${JV.esc(q)}”</div><p>Memory grows as tasks finish. Try a host, a tool or a task id.</p></div>`;
  }
  JV.on('chips:mem-k', v => { kind = v; render(); });
  JV.$('#mq').addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); render(); });
  JV.$('#mem-items').addEventListener('click', e => { const b = e.target.closest('[data-forget]'); if(!b) return; const c = b.closest('.card'); c.style.opacity=.3; JV.toast('Item forgotten', 'Undo within 10 s', 'warn'); });
  render();
});
