/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* UI kit demos */
JV.use(() => {
  const D = JV.data;
  JV.on('chips:core-st', v => { JV.scene.state(v); JV.toast('Core: '+v, 'JV.scene.state("'+v+'")'); });
  JV.$('#kit-ledger').innerHTML = JV.r.ledgerHead() + D.tasks.slice(0,3).map(t => JV.r.ledgerRow(t)).join('');
  JV.$('#kit-feed').innerHTML = D.activity.slice(0,4).map(a => `<li class="${a[1]==='error'?'is-err':''}"><time>${a[0].slice(0,5)}</time><span class="ev">${a[1]}</span><span class="msg">${a[2]} · ${a[3]}</span></li>`).join('');
  JV.chart.bars(JV.$('#kit-chart'), D.trend, { h:80, hi:'max' });
  JV.$('#kit-table').innerHTML = D.connections.slice(2,6).map(c => `<tr><td class="cell-main"><span class="ent">${JV.r.mark(c.n,c.c)}<span class="ent-t">${c.n}</span></span></td><td class="r" data-k="Calls">${c.calls}</td><td class="r" data-k="Spend">${JV.money(c.spend)}</td><td class="cell-end"><span class="st st--ok">Verified</span></td></tr>`).join('');
  JV.$('#kit-cards').innerHTML = D.catalog.slice(0,4).map((c,i) => `<article class="card ${c[4]?'is-on':''}"><div class="card-top">${JV.r.mark(c[0], c[4]?'#8BE9FF':'')}<span class="card-idx">${JV.pad(i+1)}</span></div><div><h3>${c[0]}</h3><div class="label" style="margin-top:4px">${c[2]}</div></div><p>${c[3]}</p><div class="card-foot">${c[4]?'<span class="st st--ok">Connected</span>':'<span></span>'}<button class="card-cta">Configure ${JV.ico('arrow','icon icon--sm')}</button></div></article>`).join('');
  JV.$('#kit-drawer').onclick = () => JV.drawer.open({ kicker:'Drawer · example', title:'Inspector panel', sub:'JV.drawer.open({...})', body:`<p class="muted">Right glass panel on desktop, bottom sheet under 768 px. Focus is trapped, Esc closes.</p><dl class="dl"><dt>Width</dt><dd>500 px</dd><dt>Radius</dt><dd>32 px</dd></dl>`, foot:`<button class="btn" data-close>Close</button><button class="btn btn--primary" data-close>Confirm</button>` });
});
