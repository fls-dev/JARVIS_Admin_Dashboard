/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Scheduled: 24 h horizon timeline with pins + job cards (toggle, run now, drawer) */
JV.use(() => {
  const S = JV.data.scheduled, tl = JV.$('#tl');
  JV.$('#tl-axis').innerHTML = Array.from({length:25}, (_,h) => `<span style="left:${h/24*100}%"><i></i>${h%3===0?`<b class="mono">${JV.pad(h%24)}:00</b>`:''}</span>`).join('');
  const now = new Date(), nh = now.getHours() + now.getMinutes()/60;
  JV.$('#tl-now').style.left = (nh/24*100)+'%';
  /* greedy lanes: a label is ~5 h wide on the axis, stack pins that would collide */
  const ends = [], lane = {};
  S.slice().sort((a,b) => a.h-b.h).forEach(s => { let l = ends.findIndex(e => e <= s.h); if(l < 0){ l = ends.length; ends.push(0); } ends[l] = s.h + 4.6; lane[s.id] = l; });
  tl.insertAdjacentHTML('beforeend', S.map((s,i) => {
    return `<button class="pin ${s.on?'':'is-off'} ${s.last==='fail'?'is-fail':''}" style="left:${s.h/24*100}%;--lane:${lane[s.id]}" data-job="${s.id}"><span class="pin-dot"></span><span class="pin-l"><b>${s.n}</b><span class="mono">${s.human}</span></span></button>`; }).join(''));
  function card(s){
    return `<article class="card job ${s.on?'is-on':''}" id="${s.id}">
      <div class="card-top"><span class="mono ice">${s.id}</span>${s.last==='fail'?'<span class="st st--err">Last run failed</span>':'<span class="st st--ok">Last run ok</span>'}</div>
      <div><h3>${s.n}</h3><div class="mono dim" style="font-size:.75rem;margin-top:6px">${s.cron} · ${s.human}</div></div>
      <dl class="dl"><dt>Next</dt><dd class="${s.on?'ice':'dim'}">${s.on?s.next:'paused'}</dd><dt>Model</dt><dd>${s.model}</dd><dt>Cost / run</dt><dd>${JV.money(s.cost,4)}</dd></dl>
      <div class="card-foot"><label class="switch"><input type="checkbox" ${s.on?'checked':''} data-job-on="${s.id}"><span class="track"></span><span class="sr-only">Enable ${s.n}</span></label><button class="btn btn--sm" data-run="${s.id}">${JV.ico('play','icon icon--sm')} Run now</button></div></article>`;
  }
  JV.$('#jobs').innerHTML = S.map(card).join('');
  JV.$('#jobs').addEventListener('change', e => { const i = e.target; if(!i.dataset.jobOn) return; const s = S.find(x=>x.id===i.dataset.jobOn); s.on = i.checked; i.closest('.job').classList.toggle('is-on', s.on); JV.$(`.pin[data-job="${s.id}"]`).classList.toggle('is-off', !s.on); JV.toast(s.on?'Job enabled':'Job paused', s.n, s.on?'ok':'warn'); });
  JV.$('#jobs').addEventListener('click', e => { const b = e.target.closest('[data-run]'); if(!b) return; b.classList.add('is-loading'); JV.scene.state('think'); setTimeout(() => { b.classList.remove('is-loading'); JV.scene.state('idle'); JV.toast('Run finished', S.find(x=>x.id===b.dataset.run).n); }, 1300); });
  tl.addEventListener('click', e => { const p = e.target.closest('.pin'); if(!p) return; const s = S.find(x=>x.id===p.dataset.job);
    JV.drawer.open({ kicker:`${s.id} · ${s.human}`, title:s.n, sub:`cron ${s.cron}`,
      body:`<dl class="dl"><dt>Next run</dt><dd>${s.on?s.next:'paused'}</dd><dt>Last run</dt><dd>${s.lastAt} · ${s.last}</dd><dt>Model</dt><dd>${s.model}</dd><dt>Cost / run</dt><dd>${JV.money(s.cost,4)}</dd></dl>
        <div class="field"><label for="j-cron">Schedule (cron)</label><input id="j-cron" class="input input--mono" value="${s.cron}"><span class="hint">Times are CET. JARVIS skips a run if the previous one is still active.</span></div>
        <label class="check"><input type="checkbox" checked> Notify Telegram on failure</label>`,
      foot:`<button class="btn" data-close>Close</button><button class="btn btn--primary" data-close data-toast="Schedule saved|${s.n}">Save</button>` }); });
  const sc = JV.$('.tl-scroll'); if(sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (nh/24) * sc.scrollWidth - sc.clientWidth/3;
});
