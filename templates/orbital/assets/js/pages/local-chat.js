/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* Local chat: render conversation, presets, fake streaming reply (core switches think → speak → idle) */
JV.use(() => {
  const C = JV.data.chat, box = JV.$('#msgs'), ta = JV.$('#lc-in');
  const bubble = m => `<li class="msg msg--${m.who}">${m.who==='ai'?'<span class="msg-core" aria-hidden="true"></span>':''}<div class="msg-b"><p>${JV.esc(m.t)}</p>${m.meta?`<span class="mono msg-meta">${m.meta}</span>`:''}</div></li>`;
  box.innerHTML = C.messages.map(bubble).join('');
  JV.$('#lc-pre').innerHTML = C.presets.map(p => `<button type="button" class="chip" aria-pressed="false" data-v="${p}">${p}</button>`).join('');
  JV.on('chips:lc-pre', v => { ta.value = v; ta.focus(); });
  const answers = {
    'Summarize last night':'17 ops, $0.091 spent. TLS for *.example.com renewed on 24/24 hosts, Postgres backup and restore test passed, IAM audit found 7 unused keys. One failure: the HPA patch for checkout-svc was denied by the admission webhook.',
    'Explain T-0212 failure':'The HPA patch set minReplicas to 2, but the PodDisruptionBudget requires 3 available pods, so the admission webhook rejected it. Raise minReplicas to 3 or relax the PDB, then re-run.'
  };
  JV.$('#lc-form').addEventListener('submit', e => {
    e.preventDefault(); const q = ta.value.trim(); if(!q) return;
    box.insertAdjacentHTML('beforeend', bubble({ who:'me', t:q })); ta.value = '';
    const text = answers[q] || 'Checked the last 24 h of telemetry: nothing abnormal beyond gateway-eu-west p95 and the DNS SERVFAIL blip. Want a plan to fix either?';
    box.insertAdjacentHTML('beforeend', `<li class="msg msg--ai is-typing"><span class="msg-core" aria-hidden="true"></span><div class="msg-b"><p></p><span class="mono msg-meta">qwen3-4b · thinking…</span></div></li>`);
    const li = box.lastElementChild, p = JV.$('p', li); box.scrollTop = box.scrollHeight;
    JV.scene.state('think');
    setTimeout(() => {
      JV.scene.state('speak'); const words = text.split(' '); let i = 0;
      const t = setInterval(() => { p.textContent = words.slice(0, ++i).join(' '); box.scrollTop = box.scrollHeight;
        if(i >= words.length){ clearInterval(t); li.classList.remove('is-typing'); JV.$('.msg-meta', li).textContent = `qwen3-4b · ${words.length} tok · ${(words.length/41.7+.18).toFixed(1)} s · $0.000000`; JV.scene.state('idle'); } }, JV.motion.reduced ? 0 : 45);
    }, 700);
  });
  ta.addEventListener('keydown', e => { if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); JV.$('#lc-form').requestSubmit(); } });
});
