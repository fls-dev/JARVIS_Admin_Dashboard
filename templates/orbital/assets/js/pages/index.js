/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Home: room windows with thumbnails */
JV.use(() => {
  const D = JV.data;
  const rooms = [...D.nav, { id:'ui-kit', href:'ui-kit.html', label:'UI kit', count:'kit', desc:'Every component and state' }];
  JV.$('#hub-grid').innerHTML = rooms.map((n,i) => `<a class="hub-card card" href="${n.href}" style="--i:${i}">
    <span class="hub-thumb"><img src="assets/img/thumbs/${n.id}.jpg" alt="" loading="eager" decoding="async" width="640" height="360"></span>
    <span class="hub-meta"><span class="mono ice">${i < 9 ? JV.pad(i+1) : '··'}</span><span class="hub-l">${n.label}</span><span class="mono dim">${n.count}</span></span>
    <span class="t-sm muted">${n.desc}</span></a>`).join('');
  JV.$$('.hub-thumb img').forEach(img => img.addEventListener('error', () => img.remove()));
});
