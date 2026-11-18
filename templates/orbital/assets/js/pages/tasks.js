/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Tasks: list (filter + search) → mission detail (cost split, revisions, plan, step timeline, result, artifacts) */
JV.use(() => {
  const D = JV.data, list = JV.$('#tk-items'), det = JV.$('#tk-detail');
  const h = location.hash.slice(1);
  let filter = 'all', q = '', sel = D.tasks.some(t=>t.id===h) ? h : 'T-0216';
  const tagIco = { security:'lock', incident:'bolt', data:'memory', ci:'refresh', k8s:'layers', network:'globe', cost:'filter' };

  function renderList(){
    const items = D.tasks.filter(t => (filter==='all' || t.st===filter) && (!q || (t.t+t.id+t.model+t.tag).toLowerCase().includes(q)));
    list.innerHTML = items.length ? items.map(t => `
      <li><button class="tk-item ${t.id===sel?'is-active':''} ${t.st==='run'?'is-live':''}" data-id="${t.id}" aria-pressed="${t.id===sel}">
        <span class="tk-ico">${JV.ico(tagIco[t.tag]||'tasks','icon icon--sm')}</span>
        <span style="min-width:0"><span class="tk-t">${JV.esc(t.t)}</span>
        <span class="tk-sub"><span class="mono">${t.id}</span><span class="mono">${JV.money(t.cost)}</span>${JV.r.st(t.st)}</span></span>
      </button></li>`).join('') : `<li class="empty"><div class="t-md">No tasks match</div><div class="t-sm">Try another filter or clear the search.</div></li>`;
  }

  function detail(t){
    const d = D.taskDetail[t.id] || {
      request:t.t, revisions:[{ r:1, at:t.time, note:'Plan approved as proposed', st:'approved' }],
      plan:t.steps.map((s,i)=>({ n:i+1, t:s[0].replace(/_/g,' '), tool:t.model, est:s[1], gate:false })),
      result: t.st==='run' ? 'Running. Results stream in here as each step finishes.' : t.st==='fail' ? 'Stopped on apply_patch: the admission webhook denied the HPA change (minReplicas below PodDisruptionBudget). Simulation results are saved; the re-tune is scheduled as S-06 at 02:30.' : 'Completed. Findings saved to memory and the artifacts below.',
      files: t.st==='run' ? [{ n:'traces-sample.json', k:'application/json', size:'1.2 MB', v:'r1' },{ n:'p95-by-upstream.csv', k:'text/csv', size:'84 KB', v:'r1' }] : [{ n:'report.md', k:'text/markdown', size:'9 KB', v:'r1' }],
      tokens:{ in:3100, out:820 } };
    const secs = t.steps.reduce((a,s)=>a+s[4],0) || 1;
    let acc = 0;
    const wf = t.steps.map(s => { const left = acc/secs*100, w = Math.max(s[4]/secs*100, 1.5); acc += s[4];
      return `<li class="wf-row"><span class="mono wf-n">${s[0]}${s[2]>1?` <span class="warn">×${s[2]}</span>`:''}</span>
        <span class="wf-track"><span class="wf-bar ${s[3]}" style="left:${left}%;width:${w}%"></span></span>
        <span class="mono wf-t">${s[4]?s[4]+' s':'—'}</span><span class="mono wf-c">${JV.money(s[1])}</span></li>`; }).join('');
    return `
      <header class="tk-head">
        <div class="tk-no">${t.no}</div>
        <div style="min-width:0">
          <div class="row" style="margin-bottom:10px">${JV.r.st(t.st)}<span class="label">${t.id} · ${t.time} · revision ${t.rev} · ${t.tag}</span></div>
          <h2 class="t-xl balance">${JV.esc(d.request)}</h2>
        </div>
      </header>
      <div class="kpis tk-kpis" style="--n:4">
        <div class="kpi"><span class="label">Cost</span><span class="kpi-v kpi-v--sm">${JV.money(t.cost)}</span><span class="kpi-d">budget $0.025</span></div>
        <div class="kpi"><span class="label">Duration</span><span class="kpi-v kpi-v--sm">${t.dur}</span><span class="kpi-d">${t.steps.length} steps</span></div>
        <div class="kpi"><span class="label">Tokens in / out</span><span class="kpi-v kpi-v--sm">${(d.tokens.in/1000).toFixed(1)}k<small>/ ${(d.tokens.out/1000).toFixed(1)}k</small></span><span class="kpi-d">cache 31%</span></div>
        <div class="kpi"><span class="label">Model</span><span class="kpi-v kpi-v--txt">${t.model}</span><span class="kpi-d">routed · auto</span></div>
      </div>
      <section class="pane"><div class="pane-h"><h3>Cost split</h3><span class="label">width = cost · ${JV.money(t.cost)}</span></div>${JV.r.steps(t)}</section>
      <div class="grid tk-two">
        <section class="pane c-6 l-c-12"><div class="pane-h"><h3>Revisions</h3><span class="label">${d.revisions.length} total</span></div>
          <div class="tabs" role="tablist" data-tabs="rev">${d.revisions.map((r,i)=>`<button class="tab" role="tab" data-tab="${r.r}" aria-selected="${i===d.revisions.length-1}">r${r.r} <span class="count">${r.at}</span></button>`).join('')}</div>
          ${d.revisions.map((r,i)=>`<div class="tk-rev" data-tabpanel="rev:${r.r}" ${i===d.revisions.length-1?'':'hidden'}><span class="st ${r.st==='approved'?'st--ok':r.st==='rejected'?'st--err':'st--off'}">${r.st}</span><p>${r.note}</p></div>`).join('')}
        </section>
        <section class="pane c-6 l-c-12"><div class="pane-h"><h3>Plan</h3><span class="label">approved ${d.revisions.at(-1).at}</span></div>
          <ol class="plan">${d.plan.map(s=>`<li><span class="plan-n">${JV.pad(s.n)}</span><div><div>${s.t}</div><div class="mono dim" style="font-size:.75rem;margin-top:4px">${s.tool} · est. ${JV.money(s.est,4)}${s.gate?' · <span class="sun">approval gate ✓</span>':''}</div></div></li>`).join('')}</ol>
        </section>
      </div>
      <section class="pane"><div class="pane-h"><h3>Step timeline</h3><div class="legend"><span><i style="background:var(--ice)"></i>done</span><span><i style="background:var(--sun)"></i>running</span><span><i style="background:var(--err)"></i>failed</span><span>${secs} s</span></div></div>
        <ul class="wf">${wf}</ul></section>
      <div class="grid tk-two">
        <section class="pane c-7 l-c-12"><div class="pane-h"><h3>Result</h3><button class="btn btn--sm" data-toast="Copied|Result copied to clipboard">{{copy}} Copy</button></div>
          <p class="tk-result">${d.result}</p></section>
        <section class="pane c-5 l-c-12"><div class="pane-h"><h3>Artifacts</h3><span class="label">${d.files.length}</span></div>
          <ul class="tk-files">${d.files.map(f=>`<li><button class="tk-file" data-file="${f.n}" data-k="${f.k}" data-size="${f.size}">${JV.ico('file')}<span style="min-width:0"><span class="trunc" style="display:block">${f.n}</span><span class="mono dim" style="font-size:.6875rem">${f.k} · ${f.size} · ${f.v}</span></span>${JV.ico('chevron','icon icon--sm')}</button></li>`).join('')}</ul></section>
      </div>
      <div class="row tk-actions"><button class="btn btn--primary" data-toast="Re-run queued|${t.id} · same plan, fresh budget">${JV.ico('refresh','icon icon--sm')} Re-run</button><button class="btn" data-cmdk="${t.id} ">Ask about this task</button><button class="btn btn--danger" data-toast="Run cancelled|${t.id}|warn" ${t.st!=='run'?'disabled':''}>Cancel run</button></div>`.replace(/\{\{(\w+)\}\}/g, (m,k)=>JV.ico(k,'icon icon--sm'));
  }

  function show(id, scroll){
    sel = id; const t = D.tasks.find(x=>x.id===id);
    det.innerHTML = detail(t);
    JV.$$('[data-tabs]', det).forEach(l => l.addEventListener('click', e => { const b=e.target.closest('[role=tab]'); if(b) JV.tabs.select(l,b); }));
    renderList();
    history.replaceState(null,'','#'+id);
    JV.scene.state(t.st==='run' ? 'think' : 'idle');
    if(scroll && innerWidth < 1024) det.scrollIntoView({ behavior: JV.motion.reduced?'auto':'smooth' });
  }
  list.addEventListener('click', e => { const b=e.target.closest('.tk-item'); if(b) show(b.dataset.id, true); });
  JV.on('tab:tk', k => { filter=k; renderList(); });
  JV.$('#tq').addEventListener('input', e => { q=e.target.value.trim().toLowerCase(); renderList(); });
  det.addEventListener('click', e => { const f=e.target.closest('.tk-file'); if(!f) return;
    JV.drawer.open({ kicker:'Artifact preview', title:f.dataset.file, sub:`${f.dataset.k} · ${f.dataset.size}`,
      body:`<div class="doc-prev"><div class="label" style="color:#4a5875">Acme · SRE</div><div class="doc-t">${JV.esc(D.tasks.find(x=>x.id===sel).t)}</div><div class="mono" style="color:#4a5875;font-size:.75rem">${sel} · ${f.dataset.file}</div><div class="doc-lines">${'<i></i>'.repeat(7)}</div></div>
      <dl class="dl"><dt>Processor</dt><dd>Managed PDF renderer</dd><dt>Stored</dt><dd>S3 · versioned</dd><dt>Produced by</dt><dd>${sel} · render</dd><dt>SHA-256</dt><dd>c03d…77</dd></dl>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn btn--primary" data-toast="Download started|${f.dataset.file}">${JV.ico('download','icon icon--sm')} Download</button>` }); });
  show(sel, false);
});
