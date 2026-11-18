/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* ==========================================================================
   JARVIS · theme.js
   Theme + motion preferences, persisted in localStorage.
     J.theme.get()/set('aurora'|'midnight')  → <html data-theme>
     J.motion.reduced                          → true if OS asks for reduced
                                                 motion or user forced it
     J.motion.set(true|false|null)             → force / clear override
   CSS honours both @media (prefers-reduced-motion) and html.rm.
   ========================================================================== */
J.theme={get:()=>localStorage.getItem('jarvis-theme')||'aurora',set(t){localStorage.setItem('jarvis-theme',t);document.documentElement.dataset.theme=t}};
J.motion={
  get reduced(){const o=localStorage.getItem('jarvis-motion');return o?o=='reduce':matchMedia('(prefers-reduced-motion: reduce)').matches},
  set(v){v==null?localStorage.removeItem('jarvis-motion'):localStorage.setItem('jarvis-motion',v?'reduce':'full');J.motion.apply()},
  apply(){document.documentElement.classList.toggle('rm',J.motion.reduced)}
};
document.documentElement.dataset.theme=J.theme.get();J.motion.apply();
const RM=J.motion.reduced; /* legacy alias used by pages */
