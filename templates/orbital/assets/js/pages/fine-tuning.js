/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Fine-tuning: run progress, loss chart, config, datasets, runs, adapters */
JV.use(() => {
  const F = JV.data.ft, r = F.run;
  JV.chart.line(JV.$('#ft-loss'), [F.loss, F.evalLoss], { h:200, label:'Loss curves' });
  JV.$('#ft-cfg').innerHTML = [['Base',F.base],['Method',F.method],['GPU',F.gpu],['LR',r.lr],['Batch',r.batch],['Context',r.ctx],['Epochs',r.epochs]].map(x=>`<dt>${x[0]}</dt><dd>${x[1]}</dd>`).join('');
  JV.$('#ft-ds').innerHTML = F.datasets.map((d,i) => `<article class="card ds-card"><div class="card-top"><span class="mark mark--sm" style="--c:${['#4CC9FF','#A99BFF','#FFB36B'][i]}">${d.n[0].toUpperCase()}</span><span class="card-idx">${d.tokens} tokens</span></div>
    <div><h3 class="mono" style="font-size:.9375rem">${d.n}</h3><div class="label" style="margin-top:4px">${d.rows.toLocaleString('en-US')} rows</div></div><p>${d.note}</p>
    <div><div class="row between"><span class="label">Quality</span><span class="mono">${d.q}%</span></div><div class="meter" style="--v:${d.q}%;margin-top:8px"><i></i></div></div></article>`).join('');
  JV.$('#ft-runs').innerHTML = F.runs.map(x => `<tr><td class="cell-main"><span class="ent"><span style="min-width:0"><span class="ent-t mono" style="display:block;font-size:.8125rem">${x.n}</span><span class="ent-s">${x.id}</span></span></span></td><td class="r" data-k="Loss">${x.loss}</td><td class="r" data-k="Eval">${x.ev}</td><td class="r" data-k="Cost">$${x.cost.toFixed(2)}</td><td data-k="At" class="mono" style="font-size:.75rem">${x.at}</td><td class="cell-end">${JV.r.st(x.st)}</td></tr>`).join('');
  JV.$('#ft-ad').innerHTML = F.adapters.map(a => `<li class="pane"><div class="row between"><div style="min-width:0"><div class="mono trunc" style="font-size:.8125rem">${a.n}</div><div class="label" style="margin-top:4px">${a.base} · ${a.size} · score ${a.score}</div></div>
    <label class="switch"><input type="checkbox" ${a.active?'checked':''} data-ad="${a.n}"><span class="track"></span><span class="sr-only">Activate ${a.n}</span></label></div></li>`).join('');
  JV.$('#ft-ad').addEventListener('change', e => { const i = e.target; if(i.dataset.ad) JV.toast(i.checked?'Adapter active':'Adapter off', i.dataset.ad+' · Jarvis Local', i.checked?'ok':'warn'); });
  /* demo progress */
  let step = r.step; const ring = JV.$('.ft-ring-fg'), v = JV.$('#ft-ring .kpi-v');
  setInterval(() => { if(document.hidden || step >= r.steps) return; step += 6; const p = step/r.steps; ring.style.setProperty('--p', p.toFixed(3)); v.innerHTML = Math.round(p*100)+'<small>%</small>'; }, 2400);
});
