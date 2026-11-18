/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · shared renderers (HTML strings) used by several pages */
(function(){
  const stLabel = { run:['st--live','Live'], done:['st--ok','Done'], fail:['st--err','Failed'], wait:['st--off','Queued'], ok:['st--ok','OK'], warn:['st--warn','Warn'], err:['st--err','Error'], info:['st--off','Info'] };
  const st = s => { const [c,l] = stLabel[s] || ['', s]; return `<span class="st ${c}">${l}</span>`; };
  /* steps bar: width ∝ cost (min share 7 % so free steps stay readable); heaviest done step is inverted */
  function steps(t){
    const total = t.steps.reduce((a,s)=>a+s[1],0) || 1;
    const heavy = t.steps.reduce((m,s,i)=> s[1] > t.steps[m][1] ? i : m, 0);
    return `<div class="steps" role="img" aria-label="Steps by cost: ${t.steps.map(s=>s[0]+' '+JV.money(s[1])).join(', ')}">` + t.steps.map((s,i) => {
      const w = Math.max(s[1]/total, .07).toFixed(3);
      const cls = s[3]==='run'?'run': s[3]==='wait'?'wait': s[3]==='fail'?'fail': (i===heavy && t.st!=='fail' ? 'heavy' : 'done');
      return `<span class="step ${cls}" style="--w:${w}" title="${s[0]} · ${JV.money(s[1])} · ${s[2]} attempt(s)">${s[0]}${s[2]>1?`<span class="x">×${s[2]}</span>`:''}</span>`;
    }).join('') + `</div>`;
  }
  function ledgerRow(t, opts={}){
    const cls = t.st==='run'?'is-live':t.st==='fail'?'is-fail':'';
    return `<a class="lg-row ${cls}" href="tasks.html#${t.id}" data-task="${t.id}" ${opts.selected?'aria-selected="true"':''}>
      <span class="lg-no">${t.no}<small>${t.time}</small></span>
      <span style="min-width:0"><span class="lg-title">${JV.esc(t.t)}</span><span class="lg-meta">${t.id} · ${t.model} · ${t.dur}</span></span>
      ${steps(t)}
      <span class="lg-cost">${JV.money(t.cost)}</span>
      <span class="lg-st">${st(t.st)}</span>
    </a>`;
  }
  function ledgerHead(){ return `<div class="lg-head label"><span>No.</span><span>Task · model · duration</span><span class="h-steps">Steps — width = cost</span><span style="text-align:right">Cost</span><span class="h-st" style="text-align:right">Status</span></div>`; }
  const mark = (name, color, sm) => `<span class="mark${sm?' mark--sm':''}" style="--c:${color||'transparent'}" aria-hidden="true">${JV.esc(name.replace(/^Jarvis Local · /,'').trim()[0].toUpperCase())}</span>`;
  /* a step label that does not fit its pill is hidden instead of being cut mid-word (the name stays in the tooltip) */
  const fitRow = row => row.querySelectorAll('.step').forEach(s => { s.classList.remove('is-tight'); if(s.scrollWidth > s.clientWidth + 1) s.classList.add('is-tight'); });
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(es => es.forEach(e => fitRow(e.target))) : null;
  const watch = () => document.querySelectorAll('.steps').forEach(r => { fitRow(r); ro && ro.observe(r); });
  let queued = false;
  new MutationObserver(() => { if(queued) return; queued = true; requestAnimationFrame(() => { queued = false; watch(); }); }).observe(document.documentElement, { childList:true, subtree:true });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(watch);
  addEventListener('load', watch);
  JV.r = { st, steps, ledgerRow, ledgerHead, mark };
})();
