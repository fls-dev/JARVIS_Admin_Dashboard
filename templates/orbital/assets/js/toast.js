/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS · toasts: JV.toast(title, sub?, type?='ok'|'warn'|'err', ms?) */
(function(){
  let stack;
  JV.toast = (title, sub='', type='ok', ms=3600) => {
    if(!stack){ stack = document.createElement('div'); stack.className='toasts'; stack.setAttribute('role','status'); stack.setAttribute('aria-live','polite'); document.body.appendChild(stack); }
    const t = document.createElement('div');
    t.className = 'toast' + (type!=='ok' ? ' toast--'+type : '');
    t.innerHTML = `<span class="ti" aria-hidden="true"></span><div><div class="toast-t">${JV.esc(title)}</div>${sub?`<div class="toast-s">${JV.esc(sub)}</div>`:''}</div><button class="btn btn--ghost btn--icon btn--sm" aria-label="Dismiss">${JV.ico('x','icon icon--sm')}</button>`;
    const kill = () => { t.classList.add('out'); setTimeout(() => t.remove(), 300); };
    t.querySelector('button').onclick = kill;
    stack.appendChild(t);
    if(stack.children.length > 3) stack.firstElementChild.remove();
    setTimeout(kill, ms);
    return t;
  };
  /* declarative: <button data-toast="Title|Sub|warn"> */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-toast]'); if(!b) return;
    const [a, s, ty] = b.dataset.toast.split('|'); JV.toast(a, s, ty || 'ok');
  });
})();
