/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · ORBIT NAV — top capsules + the floating Orbit pill that unfolds into a dial of 9 room portals.
   Keys: 1–9 jump · [ ] previous / next room · G (or click the pill) open the dial · arrows + Enter inside · Esc close · ⌘K palette.
   Every internal link becomes a camera flight: page fades, the planet flies to the next room's pose, then the browser navigates. */
(function(){
  const html = document.documentElement;
  const D = JV.data, NAV = D.nav;
  const EXTRA = { index:{ label:'Home', short:'Hub', ico:'hub', desc:'All rooms of the deck' }, 'ui-kit':{ label:'UI kit', short:'UI kit', ico:'kit', desc:'Components and states' } };
  const idx = NAV.findIndex(n => n.id === JV.page);
  const me = idx >= 0 ? NAV[idx] : Object.assign({ id:JV.page }, EXTRA[JV.page] || { label:'Blank room', short:'Blank', desc:'Start a new page here' });
  const roomNo = idx >= 0 ? JV.pad(idx+1) : '00';

  /* flights */
  JV.go = href => {
    if(!href) return;
    const u = new URL(href, location.href);
    if(u.pathname === location.pathname){ location.href = href; return; }
    close();
    html.classList.add('is-leaving');
    const nav = () => { location.href = href; };
    const guard = setTimeout(nav, 1200);
    (JV.scene && JV.scene.ok ? JV.scene.flyTo(href) : new Promise(r => setTimeout(r, JV.motion.reduced ? 0 : 260))).then(() => { clearTimeout(guard); nav(); });
  };
  addEventListener('pageshow', e => { if(e.persisted) html.classList.remove('is-leaving'); });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if(!a || e.defaultPrevented) return;
    const h = a.getAttribute('href');
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute('download') || /^(https?:|mailto:|tel:|#)/.test(h) || !/\.html(#.*)?$/.test(h)) return;
    e.preventDefault(); JV.go(h);
  });

  /* markup */
  function topbar(){
    const prev = idx > 0 ? NAV[idx-1] : NAV[NAV.length-1], next = idx >= 0 && idx < NAV.length-1 ? NAV[idx+1] : NAV[0];
    return `<header class="top">
      <a class="cap glass brand" href="index.html" aria-label="JARVIS Orbital home"><span class="brand-core" aria-hidden="true"></span><span><span class="brand-word">JARVIS</span><span class="brand-sub">Orbital deck</span></span></a>
      <div class="cap glass room">
        <a class="ibtn" href="${prev.href}" aria-label="Previous room: ${prev.label}" data-tip="[ ${prev.short}">${JV.ico('left')}</a>
        <div class="room-t"><span>${idx>=0 ? `Room ${roomNo} / 09` : 'Deck · 9 rooms'}</span><b>${me.label}</b></div>
        <a class="ibtn" href="${next.href}" aria-label="Next room: ${next.label}" data-tip="${next.short} ]">${JV.ico('chevron')}</a>
      </div>
      <div class="top-spacer"></div>
      <div class="cap glass">
        <div class="status"><span><span class="live-dot" aria-hidden="true"></span> <b data-live="running">02</b> running</span><span class="hide-l">spend <b data-live="spendPlain"></b></span><span class="hide-l"><b data-clock>00:00</b> CET</span></div>
        <button class="cmdk-btn" data-cmdk aria-label="Open command palette">${JV.ico('search','icon icon--sm')}<span>Search or ask</span><kbd class="kbd">⌘K</kbd></button>
        <button class="ibtn hide-m" aria-label="Notifications, 2 new" data-toast="2 alerts|gateway-eu-west p95 · dns SERVFAIL|warn">${JV.ico('bell')}<span class="dot"></span></button>
        <span class="avatar hide-m" title="${D.user.name}">${D.user.short}</span>
      </div>
    </header>`;
  }
  function orbit(){
    const portals = NAV.map((n,i) => `<a class="portal" href="${n.href}" role="menuitem" data-room="${n.id}" style="--i:${i}" ${n.id===JV.page?'aria-current="page"':''}>
        <span class="portal-orb">${JV.ico(n.id)}<span class="portal-n">${i+1}</span></span><span class="portal-l">${n.short}</span><span class="portal-c">${n.count}</span></a>`).join('');
    return `<div class="orbit-scrim" data-orbit-close></div>
    <nav class="orbit" aria-label="Rooms">
      <div class="orbit-deck" id="orbit-deck" role="menu" aria-label="Rooms of the deck">
        <svg class="deck-arc" aria-hidden="true"><path/></svg>
        ${portals}
        <div class="deck-center"><div class="label" data-dc-k>Room ${roomNo}</div><div class="t-xl" data-dc-t>${me.label}</div><p data-dc-d>${me.desc}</p><p class="label" style="margin-top:14px">1–9 jump · [ ] step · esc close</p></div>
      </div>
      <button class="orbit-pill glass" aria-expanded="false" aria-controls="orbit-deck" aria-label="Rooms: ${me.label}. Open the dial">
        <span class="orbit-glyph" style="--a:${(idx<0?0:idx)*40-90}" aria-hidden="true"><i></i></span>
        <span class="orbit-t"><span>${idx>=0 ? 'Room '+roomNo : 'Rooms'}<span class="hide-m"> · press G</span></span><b>${me.label}</b></span>
        <span class="orbit-chev">${JV.ico('chev-up','icon icon--sm')}</span>
      </button>
      <button class="orbit-k glass" data-cmdk aria-label="Command palette (⌘K)">${JV.ico('search')}</button>
    </nav>`;
  }

  let orbitEl, deck, pill, scrim, hot = -1;
  function layoutArc(){
    if(innerWidth < 768) return;
    const w = deck.clientWidth, h = deck.clientHeight, cx = w/2, cy = h - 34, rx = w/2 - 64, ry = h - 110;
    JV.$$('.portal', deck).forEach((p,i) => {
      const a = Math.PI - i/(NAV.length-1)*Math.PI;
      p.style.setProperty('--x', (cx + Math.cos(a)*rx).toFixed(1)+'px');
      p.style.setProperty('--y', (cy - Math.sin(a)*ry).toFixed(1)+'px');
    });
    JV.$('.deck-arc path', deck).setAttribute('d', `M ${cx-rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx+rx} ${cy}`);
  }
  function setHot(i, focus){
    hot = i; const ps = JV.$$('.portal', deck);
    ps.forEach((p,k) => p.classList.toggle('is-hot', k===i));
    const n = NAV[i] || me;
    JV.$('[data-dc-k]', deck).textContent = 'Room ' + (NAV[i] ? JV.pad(i+1) : roomNo) + ' · ' + n.count;
    JV.$('[data-dc-t]', deck).textContent = n.label; JV.$('[data-dc-d]', deck).textContent = n.desc;
    if(focus && ps[i]) ps[i].focus();
    JV.scene && JV.scene.preview(NAV[i] ? NAV[i].id : null);
  }
  function open(){
    if(orbitEl.classList.contains('is-open')) return;
    layoutArc(); orbitEl.classList.add('is-open'); scrim.classList.add('is-open'); pill.setAttribute('aria-expanded','true');
    setHot(idx >= 0 ? idx : 0, true);
  }
  function close(){
    if(!orbitEl || !orbitEl.classList.contains('is-open')) return;
    orbitEl.classList.remove('is-open'); scrim.classList.remove('is-open'); pill.setAttribute('aria-expanded','false');
    JV.scene && JV.scene.preview(null);
  }
  JV.orbit = { open, close };

  JV.use(() => {
    const mount = JV.$('[data-jv-nav]'); if(!mount) return;
    mount.innerHTML = topbar() + orbit();
    orbitEl = JV.$('.orbit'); deck = JV.$('#orbit-deck'); pill = JV.$('.orbit-pill'); scrim = JV.$('.orbit-scrim');
    pill.addEventListener('click', () => orbitEl.classList.contains('is-open') ? close() : open());
    scrim.addEventListener('click', close);
    deck.addEventListener('pointerover', e => { const p = e.target.closest('.portal'); if(p) setHot(JV.$$('.portal', deck).indexOf(p)); });
    deck.addEventListener('focusin', e => { const p = e.target.closest('.portal'); if(p) setHot(JV.$$('.portal', deck).indexOf(p)); });
    addEventListener('resize', () => orbitEl.classList.contains('is-open') && layoutArc());
    const clock = () => { const d = new Date(); JV.$$('[data-clock]').forEach(el => el.textContent = JV.pad(d.getHours())+':'+JV.pad(d.getMinutes())); };
    clock(); setInterval(clock, 15000);
  });

  document.addEventListener('keydown', e => {
    if(JV.isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return;
    if(document.querySelector('.cmdk.is-open, .drawer.is-open')) return;
    const isOpen = orbitEl && orbitEl.classList.contains('is-open');
    if(/^[1-9]$/.test(e.key)){ const n = NAV[+e.key-1]; if(n && n.id !== JV.page){ e.preventDefault(); JV.go(n.href); } }
    else if(e.key === '['){ JV.go((NAV[idx-1] || NAV[NAV.length-1]).href); }
    else if(e.key === ']'){ JV.go((NAV[idx+1] || NAV[0]).href); }
    else if(e.key.toLowerCase() === 'g'){ e.preventDefault(); isOpen ? close() : open(); }
    else if(isOpen && e.key === 'Escape'){ close(); pill.focus(); }
    else if(isOpen && /^Arrow(Left|Up)$/.test(e.key)){ e.preventDefault(); setHot((hot-1+NAV.length)%NAV.length, true); }
    else if(isOpen && /^Arrow(Right|Down)$/.test(e.key)){ e.preventDefault(); setHot((hot+1)%NAV.length, true); }
  });
})();
