/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · live numbers (demo simulator). Replace tick() with your WebSocket/SSE handler.
   [data-live="spend|ops|running|completed|tokens|budget"]  [data-feed] list  [data-live-bar] meter */
(function(){
  const T = JV.data.today;
  const fmtSpend = v => { const s = v.toFixed(6); return `<span class="cur">$</span>${s.slice(0,4)}<span class="tail">${s.slice(4)}</span>`; };
  const fmt = { spend:fmtSpend, spendPlain:v=>JV.money(v), ops:v=>JV.pad(v), completed:v=>JV.pad(v), failed:v=>JV.pad(v), running:v=>JV.pad(v), queued:v=>JV.pad(v), tokens:v=>v.toLocaleString('en-US').replace(/,/g,' '), budget:v=>Math.round(v*100)+'%' };
  function paint(flash){
    JV.$$('[data-live]').forEach(el => {
      const k = el.dataset.live; let v = k==='budget' ? T.spend/T.budget : k==='spendPlain' ? T.spend : T[k];
      if(v===undefined) return;
      const html = (fmt[k]||String)(v);
      if(el.innerHTML !== html){ el.innerHTML = html; if(flash){ el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } }
    });
    JV.$$('[data-live-bar]').forEach(el => el.style.setProperty('--v', Math.min(100, T.spend/T.budget*100).toFixed(1)+'%'));
  }
  function pushFeed(){
    const pool = JV.data.activityPool, e = pool[Math.floor(Math.random()*pool.length)];
    const d = new Date(), time = `${JV.pad(d.getHours())}:${JV.pad(d.getMinutes())}:${JV.pad(d.getSeconds())}`;
    JV.$$('[data-feed]').forEach(ul => {
      const li = document.createElement('li'); li.className = 'is-new' + (e[0]==='generate'?' is-ice':'');
      li.innerHTML = `<time>${time}</time><span class="ev">${e[0]}</span><span class="msg">${e[1]} · ${JV.esc(e[2])}</span>`;
      ul.prepend(li); const max = +(ul.dataset.max||8); while(ul.children.length > max) ul.lastElementChild.remove();
    });
    JV.emit('feed', e);
  }
  function tick(){
    T.spend += Math.random()*.00009; T.tokens += Math.round(40+Math.random()*180);
    if(Math.random() < .12){ T.ops++; }
    paint(true); JV.emit('tick', T);
  }
  JV.live = { paint, tick, data:T };
  JV.use(() => {
    paint(false);
    setInterval(() => { if(!document.hidden) tick(); }, 2600);
    setInterval(() => { if(!document.hidden && JV.$('[data-feed]')) pushFeed(); }, 5200);
  });
})();
