/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · core: helpers, icons, event bus, boot order.
   Plain scripts (no ES modules) so pages open straight from disk (file://). Each module = one file adding to window.JV. */
(function(){
  const JV = window.JV = window.JV || {};
  JV.$  = (s, r=document) => r.querySelector(s);
  JV.$$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  JV.esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  JV.money = (v, d=6) => '$' + Number(v).toFixed(d);
  JV.pad = (n, l=2) => String(n).padStart(l, '0');
  JV.page = document.documentElement.dataset.page || '';
  JV.go = href => { location.href = href; };   /* nav.js upgrades this to a camera flight */
  JV.isTyping = e => { const t = e.target; return t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)); };

  /* tiny event bus */
  const bus = {};
  JV.on   = (ev, fn) => (bus[ev] = bus[ev] || []).push(fn);
  JV.emit = (ev, d) => (bus[ev] || []).forEach(fn => fn(d));

  /* icon set: 24-grid, stroke = currentColor (Lucide-compatible geometry) */
  const P = {
    overview:'<path d="M3 3h8v10H3zM13 3h8v6h-8zM13 11h8v10h-8zM3 15h8v6H3z"/>',
    tasks:'<path d="M4 6h2M4 12h2M4 18h2M9 6h11M9 12h11M9 18h7"/>',
    operations:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    'local-chat':'<path d="M4 5h16v11H9l-5 4z"/>',
    'fine-tuning':'<path d="M5 4v16M12 4v16M19 4v16"/><circle cx="5" cy="14" r="2"/><circle cx="12" cy="8" r="2"/><circle cx="19" cy="16" r="2"/>',
    scheduled:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    memory:'<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>',
    integrations:'<path d="M9 3v5M15 3v5M6.5 8h11v4a5.5 5.5 0 0 1-11 0zM12 17.5V21"/>',
    audit:'<path d="M12 21s7-3.5 7-9.5V5.5L12 3 5 5.5v6c0 6 7 9.5 7 9.5z"/><path d="M9 12l2 2 4-4"/>',
    search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    bell:'<path d="M6 9a6 6 0 0 1 12 0c0 6.5 2.5 8 2.5 8h-17S6 15.5 6 9M10 20.5a2.2 2.2 0 0 0 4 0"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    up:'<path d="M7 17L17 7M8 7h9v9"/>',
    x:'<path d="M6 6l12 12M18 6L6 18"/>',
    index:'<path d="M4 6h3M4 12h3M4 18h3M10 6h10M10 12h10M10 18h10"/>',
    mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    clip:'<path d="M20 11.5l-8.2 8.2a5.3 5.3 0 0 1-7.5-7.5l8.6-8.6a3.5 3.5 0 0 1 5 5l-8.6 8.6a1.8 1.8 0 0 1-2.5-2.5L14.6 7"/>',
    file:'<path d="M14 3H6.5v18h11V6.5zM14 3v3.5h3.5"/>',
    check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    refresh:'<path d="M20 12a8 8 0 1 1-2.6-5.9L20 8.5M20 4v4.5h-4.5"/>',
    play:'<path d="M7 4.5v15l12-7.5z"/>',
    pause:'<path d="M8 5v14M16 5v14"/>',
    download:'<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
    spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
    chevron:'<path d="M9 6l6 6-6 6"/>',
    external:'<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
    trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l2 2M14.5 8.5l2 2"/>',
    motion:'<path d="M3 12c2.5-6 5.5-6 9 0s6.5 6 9 0"/>',
    send:'<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
    dots:'<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    gate:'<path d="M5 21V5h14v16M5 12h14M12 5v16"/>',
    left:'<path d="M15 6l-6 6 6 6"/>',
    'chev-up':'<path d="M6 15l6-6 6 6"/>',
    grid:'<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>',
    orbit:'<circle cx="12" cy="12" r="3.2"/><ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(-20 12 12)"/>',
    server:'<rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/><path d="M8 7.5h.01M8 16.5h.01"/>',
    terminal:'<path d="M5 7l5 5-5 5M12 18h7"/>',
    lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M10 10h4v4h-4zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5"/>',
    bolt:'<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
    layers:'<path d="M12 4l9 5-9 5-9-5zM3 14l9 5 9-5"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    hub:'<circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="8.5" stroke-dasharray="2 3"/>',
    kit:'<path d="M4 7h16v13H4zM9 7V4h6v3M4 12h16"/>'
  };
  JV.icons = P;
  JV.ico = (k, cls='icon', sw=1.6) => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[k]||''}</svg>`;

  /* hydrate <i data-ico="name"> placeholders */
  JV.hydrateIcons = (root=document) => JV.$$('[data-ico]', root).forEach(el => { el.outerHTML = JV.ico(el.dataset.ico, el.className || 'icon'); });

  /* boot: modules push init fns; run after DOM ready in registration order */
  const queue = [];
  JV.use = fn => queue.push(fn);
  document.addEventListener('DOMContentLoaded', () => {
    queue.forEach(fn => { try{ fn(); }catch(err){ console.error('[JV]', err); } });
    JV.hydrateIcons();
    JV.emit('ready');
  });
})();
