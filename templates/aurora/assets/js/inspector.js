/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* ==========================================================================
   JARVIS · inspector.js — slide-out inspector / bottom sheet
   Desktop: a g3 glass panel docked on the right (body.has-ins reserves room).
   Tablet & mobile: the same element becomes a bottom sheet. It peeks with
   its header above the dock; tap the handle/header or swipe up to open,
   swipe down / tap outside to close.
     J.inspector(el)        – enhance an <aside class="inspector">
     J.inspector.open(bool) – programmatic toggle (sheet mode)
   ========================================================================== */
J.inspector=function(el){
 document.body.classList.add('has-ins');
 el.insertAdjacentHTML('afterbegin','<div class="sheet-handle" aria-hidden="true"></div>');
 const bg=document.createElement('div');bg.className='sheet-bg';document.body.appendChild(bg);
 const set=o=>{el.classList.toggle('open',o);bg.classList.toggle('on',o);if(!o)el.scrollTop=0};
 J.inspector.open=set;
 const peek=()=>{const h=el.querySelector('.ins-h');if(h)el.style.setProperty('--peek',(h.offsetTop+h.offsetHeight+14)+'px')};
 const sheet=()=>J.bp()=='m'||J.bp()=='s';
 el.addEventListener('click',e=>{if(!sheet())return;if(e.target.closest('.sheet-handle,.ins-h'))set(!el.classList.contains('open'));else if(!el.classList.contains('open'))set(true)});
 bg.onclick=()=>set(false);
 let y0=null;el.addEventListener('touchstart',e=>{y0=e.touches[0].clientY},{passive:true});
 el.addEventListener('touchend',e=>{if(y0==null||!sheet())return;const dy=e.changedTouches[0].clientY-y0;if(dy<-40)set(true);if(dy>60&&el.scrollTop<=0)set(false);y0=null});
 el.addEventListener('click',e=>{if(e.target.closest('.ins-x')&&!sheet()){el.style.display='none';document.body.classList.remove('has-ins')}});
 new MutationObserver(peek).observe(el,{childList:true});requestAnimationFrame(peek);J.onResize(peek);
};
