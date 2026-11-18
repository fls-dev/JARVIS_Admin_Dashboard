/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* ==========================================================================
   JARVIS · palette.js — ⌘K command palette
   ⌘K / Ctrl+K or the top-bar button opens it; type to filter; ↑↓ to move,
   ↵ to run, esc to close. Items: go-to for every section + actions,
   including theme and reduced-motion switches (see theme.js).
   ========================================================================== */
J.palette=function(){
 const p=document.createElement('div');p.className='pal-bg';p.id='pal';
 p.innerHTML=`<div class="pal g3" role="dialog" aria-label="Command palette"><div class="pal-in">${ico('search',20)}<input id="palIn" placeholder="Ask Jarvis or jump to…" autocomplete="off"><kbd>esc</kbd></div><div id="palList"></div></div>`;document.body.appendChild(p);
 const items=[...DATA.nav.map(([l,k],i)=>['Go to',l,k,'G '+(i+1),()=>J.nav.go(k)]),
  ['Actions','New autonomous task','plus','N',()=>location.href='overview.html#ask'],['Actions','Connect integration…','integrations','⌘I',()=>J.nav.go('integrations')],
  ['Actions','Start fine-tuning run','ft','↵',()=>J.nav.go('ft')],['Actions','Open UI kit','layers','',()=>location.href='ui-kit.html'],
  ['Preferences','Theme: '+(J.theme.get()=='aurora'?'Midnight':'Aurora'),'spark','T',()=>{J.theme.set(J.theme.get()=='aurora'?'midnight':'aurora');close()}],
  ['Preferences',(J.motion.reduced?'Enable':'Reduce')+' motion','pause','M',()=>{J.motion.set(!J.motion.reduced);location.reload()}]];
 let sel=0,list=[];
 const render=(q='')=>{list=items.filter(i=>i[1].toLowerCase().includes(q.toLowerCase()));sel=Math.min(sel,Math.max(0,list.length-1));
  if(!list.length){$('#palList').innerHTML=`<div class="pal-empty">No matches for “${q}” — press ↵ to ask Jarvis</div>`;return}
  let h='',g='';list.forEach((it,i)=>{if(it[0]!=g){g=it[0];h+=`<div class="pg">${g}</div>`}h+=`<div class="pr ${i==sel?'sel':''}" data-i="${i}">${ico(it[2],18)}${it[1]}<kbd>${it[3]}</kbd></div>`});$('#palList').innerHTML=h};
 const open=()=>{p.classList.add('on');sel=0;$('#palIn').value='';render();setTimeout(()=>$('#palIn').focus(),30)};
 const close=()=>p.classList.remove('on');
 J.palette.open=open;
 $('#palIn').oninput=e=>{sel=0;render(e.target.value)};
 $('#palList').onclick=e=>{const r=e.target.closest('.pr');if(r)list[+r.dataset.i][4]()};
 document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()=='k'){e.preventDefault();open()}
  if(!p.classList.contains('on'))return;if(e.key=='Escape')close();
  if(e.key=='ArrowDown'||e.key=='ArrowUp'){e.preventDefault();sel=(sel+(e.key=='ArrowDown'?1:-1)+list.length)%list.length;render($('#palIn').value)}
  if(e.key=='Enter'&&list[sel])list[sel][4]()});
 p.addEventListener('click',e=>{if(e.target==p)close()});
};
