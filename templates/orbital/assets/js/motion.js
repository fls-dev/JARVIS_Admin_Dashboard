/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · reduced motion: OS setting + in-app override (localStorage "jv-motion" = "reduce"|"full") */
(function(){
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const pref = () => localStorage.getItem('jv-motion');
  const compute = () => pref() ? pref() === 'reduce' : mq.matches;
  JV.motion = {
    get reduced(){ return compute(); },
    set(mode){ localStorage.setItem('jv-motion', mode); apply(); },
    toggle(){ this.set(compute() ? 'full' : 'reduce'); return compute(); }
  };
  function apply(){ document.documentElement.classList.toggle('rm', compute()); JV.emit('motion', compute()); }
  mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
  apply();
})();
