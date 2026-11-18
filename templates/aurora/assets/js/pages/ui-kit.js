/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* UI kit — fills icon placeholders, starts two orbs (idle / energised),
   draws demo edges and a mini wheel. */
J.shell('UI kit <span>/</span> <em>components</em>');
const M={PLUS:ico('plus',15,2),BELL:ico('bell',17),SEND:ico('send',16,2),SEARCH:ico('search',16),KEY:ico('key',16),CLOCK:ico('clock',16),SPARK:ico('spark',16,2),COST:ico('cost',14),CPU:ico('cpu',14),FILE:ico('file',13),FT:ico('ft',17),PLAY:ico('play',15),ALERT:ico('alert',15)};
document.querySelector('.kit').innerHTML=document.querySelector('.kit').innerHTML.replace(/\$\{(\w+)\}/g,(m,k)=>M[k]||m);
J.Orb($('#o1'),{energy:.8,size:.34});J.Orb($('#o2'),{energy:2.6,size:.34});
$('#tst').innerHTML=`<div class="toast g3" style="min-width:0;animation:none"><span class="ti" style="background:rgba(88,230,166,.18);color:var(--ok)">${ico('check',17,2)}</span><div><b>cve-2026-31337.pdf ready</b><small>T-0142 · 6 pages · $0.038394</small></div></div>
<div class="toast g3" style="min-width:0;animation:none"><span class="ti" style="background:rgba(255,107,122,.18);color:var(--bad)">${ico('alert',17,2)}</span><div><b>patch_coredns failed</b><small>RBAC denied · retry in 30s</small></div></div>`;
J.ready(()=>{const e=$('#ke'),g=i=>$('#'+i);edge(e,g('k1'),'r',g('k2'),'l',{color:'#58E6A6',flow:true});edge(e,g('k1'),'b',g('k3'),'t',{color:'#FF6B7A',vert:true,dash:true});edge(e,g('k2'),'b',g('k4'),'t',{color:'#FFC15C',vert:true,flow:true});edge(e,g('k4'),'b',g('k5'),'t',{color:'#3BE8C8',vert:true,glow:false})});
/* mini wheel */
const mw=$('#mw');const W=mw.clientWidth||340,Hh=150;const cx=-170,cy=75,R=230;let h=`<svg width="${W}" height="${Hh}" style="position:absolute;inset:0"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(183,164,255,.4)"/></svg>`;
[['Tasks','tasks',-1],['Overview','overview',0],['Local chat','chat',1]].forEach(([l,k,d])=>{const a=d*.24;const x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R;h+=`<span class="wi ${d==0?'on':''}" style="left:${x}px;top:${y}px;opacity:${d?0.7:1}"><span class="o">${ico(k,15,1.8)}</span><span class="l">${l}</span></span>`});
mw.innerHTML=h;
