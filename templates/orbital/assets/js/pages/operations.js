/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Operations: throughput line, workers, queue table, errors */
JV.use(() => {
  const O = JV.data.ops;
  const fails = O.throughput.map((v,i) => [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0][i]*10 + 1);
  const draw = n => JV.chart.line(JV.$('#op-line'), [O.throughput.slice(-n), fails.slice(-n)], { h:220, label:'Steps per hour' });
  draw(24);
  JV.on('chips:ops-win', v => { draw(v==='1h' ? 6 : 24); JV.toast('Window: '+v, 'Chart updated'); });
  JV.$('#workers').innerHTML = O.workers.map(w => `<li><div class="row between"><span class="t-sm" style="font-weight:500">${w.n}</span><span class="mono num">${Math.round(w.load*100)}%</span></div>
    <div class="meter ${w.load>.85?'meter--warn':''}" style="--v:${Math.round(w.load*100)}%"><i></i></div><div class="mono dim" style="font-size:.6875rem">${w.note}</div></li>`).join('');
  JV.$('#queue').innerHTML = O.queue.map(q => `<tr><td class="cell-main"><span class="mono">${q.id}</span> <span class="dim mono" style="font-size:.6875rem">· ${q.task}</span></td><td data-k="Step">${q.step}</td><td data-k="Model" class="mono" style="font-size:.75rem">${q.model}</td><td class="r" data-k="Time">${q.t}</td><td class="r" data-k="Cost">${JV.money(q.cost)}</td><td class="cell-end">${JV.r.st(q.st)}</td></tr>`).join('');
  JV.$('#errs').innerHTML = O.errors.map(e => `<li><span class="mono err">${e[0]}</span><p>${e[1]}</p><span class="mono dim">${e[2]}</span></li>`).join('');
});
