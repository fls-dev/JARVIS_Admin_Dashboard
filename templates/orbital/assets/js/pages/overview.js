/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Overview: ledger, fleet, telemetry, model share, next jobs, busiest integrations, composer → plan drawer */
JV.use(() => {
  const D = JV.data;
  JV.$('#ledger').innerHTML = JV.r.ledgerHead() + D.tasks.slice(0,6).map(t => JV.r.ledgerRow(t)).join('');
  JV.$('#feed').innerHTML = D.activity.map(a => `<li class="${a[1]==='error'?'is-err':''}"><time>${a[0].slice(0,5)}</time><span class="ev">${a[1]}</span><span class="msg">${a[2]} · ${JV.esc(a[3])}</span></li>`).join('');
  JV.chart.bars(JV.$('#trend'), D.trend, { h:110, hi:'last', fmt:v=>JV.money(v,4), label:'Cost per hour, last 14 hours' });
  JV.$('#fleet').innerHTML = D.fleet.map(f => `<li><span class="fleet-dot st-${f.st}"></span><span style="min-width:0"><span class="trunc" style="display:block">${f.n}</span><span class="mono dim fleet-v">${f.v}</span></span>
    <span class="meter ${f.st==='warn'||f.st==='err'?'meter--warn':''}" style="--v:${Math.round(f.load*100)}%"><i></i></span><span class="mono num fleet-p">${Math.round(f.load*100)}%</span></li>`).join('');
  const tot = D.models.reduce((a,m)=>a+m.v,0);
  JV.$('#share').innerHTML = D.models.filter(m=>m.v>0).map(m=>`<div style="--w:${(m.v/tot).toFixed(4)};--c:${m.c}" title="${m.n}"></div>`).join('');
  JV.$('#share-list').innerHTML = D.models.map(m=>`<li style="--c:${m.c}"><i></i><span class="trunc">${m.n}</span><span class="mono dim">${Math.round(m.v/tot*100)}%</span><span class="mono num">${JV.money(m.v)}</span></li>`).join('');
  JV.$('#ov-next').innerHTML = D.scheduled.filter(s=>s.on).slice(0,4).map(s=>`<li><span class="mono ice">${s.next}</span><span class="trunc">${s.n}</span><span class="mono dim hide-s">${s.model}</span></li>`).join('');
  JV.$('#ov-int').innerHTML = D.connections.filter(c=>c.calls).sort((a,b)=>b.calls-a.calls).slice(0,4).map(c=>`
    <li><a href="integrations.html#${c.id}">${JV.r.mark(c.n,c.c,1)}<span class="trunc">${c.s||c.n}</span><span class="mono dim hide-s">${c.calls} calls</span><span class="mono num">${c.lat} ms</span></a></li>`).join('');

  /* composer: presets fill, submit → think → speak → plan drawer */
  const form = JV.$('#compose'), ta = JV.$('#req');
  JV.on('chips:presets', v => { ta.value = v; ta.focus(); });
  ta.addEventListener('focus', () => JV.scene.state('think'));
  ta.addEventListener('blur', () => JV.scene.state('idle'));
  form.addEventListener('submit', e => {
    e.preventDefault();
    if(!ta.value.trim()){ ta.value = 'Rotate TLS certificates for *.example.com'; }
    const b = form.querySelector('[type=submit]'); b.classList.add('is-loading'); JV.scene.state('think');
    setTimeout(() => { b.classList.remove('is-loading'); JV.scene.state('speak'); JV.drawer.open(planDrawer(ta.value)); setTimeout(() => JV.scene.state('idle'), 2600); }, 1300);
  });
  ta.addEventListener('keydown', e => { if((e.metaKey||e.ctrlKey) && e.key==='Enter') form.requestSubmit(); });
  JV.$('#mic').onclick = () => { JV.scene.state('speak'); JV.toast('Listening…', 'Speak your request, press again to stop'); setTimeout(() => JV.scene.state('idle'), 3500); };
  if(location.hash==='#compose') setTimeout(() => ta.focus(), 400);

  function planDrawer(q){
    const p = D.taskDetail['T-0216'].plan;
    return { kicker:'Plan · revision 1 · awaiting approval', title:JV.esc(q), sub:'est. $0.021 · 4 steps · ~2 min',
      body:`<ol class="plan">${p.map(s=>`<li><span class="plan-n">${JV.pad(s.n)}</span><div><div>${s.t}</div><div class="mono dim" style="font-size:.75rem;margin-top:4px">${s.tool} · est. ${JV.money(s.est,4)}${s.gate?' · <span class="sun">approval gate</span>':''}</div></div></li>`).join('')}</ol>
        <div class="pane"><div class="row between"><span class="label">Budget</span><span class="mono">$0.021 / $0.025</span></div><div class="meter" style="margin-top:10px;--v:84%"><i></i></div></div>`,
      foot:`<button class="btn" data-close>Edit plan</button><button class="btn btn--primary" data-close data-toast="Plan approved|T-0219 launched · watch it in the ledger">Approve &amp; launch</button>` };
  }
});
