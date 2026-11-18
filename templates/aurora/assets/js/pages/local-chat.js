/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Local chat — demo conversation; a frame loop alternates 'generating'
   (orb pulses with token rate, text streams) and 'listening' (orb + waveform
   + mic meter follow a simulated voice level). */
J.shell('Local chat <span>/</span> <em>Qwen3 4B</em>');
$('#setBtn').onclick=()=>J.inspector.open(true);
$('#mic').innerHTML=ico('mic',22,2);$('.send').innerHTML=ico('send',18,2);
const orb=J.Orb($('#orb'),{energy:1.2,size:.3,rings:true});
$('#th').innerHTML=`
<div class="msg me">Why is gateway-eu-west p95 at 1.8s since 23:10?<div class="mt"><span>voice · 4.2s</span><span>23:41</span></div></div>
<div class="msg ai g2">Upstream connection pool is exhausted: <b>512/512</b> active on auth-svc after the 23:05 deploy. Error rate is flat, so it is saturation, not failures.<div class="mt"><span>qwen3-4b</span><span>412 tok · 36 tok/s</span></div></div>
<div class="msg me">Show me the command to roll it back<div class="mt"><span>typed</span><span>23:42</span></div></div>
<div class="msg ai g2" id="gen">Run this:<pre><span class="k">kubectl</span> rollout undo deploy/<span class="s">auth-svc</span> \\
  -n <span class="s">prod</span> --to-revision=41</pre><span id="stream"></span><span class="caret"></span><div class="mt"><span>qwen3-4b</span><span id="tk">generating…</span></div></div>`;
const tail='Then watch p95 on the gateway dashboard; it should drop within 2 minutes. ';let ti=0;
/* waveform ring around the orb */
const wv=$('#wave'),M=$('#meter');M.innerHTML=Array.from({length:14},()=>'<i></i>').join('');
let phase='gen',t0=performance.now();
function frame(ms){const t=ms/1000,el=(ms-t0)/1000;
 if(phase=='gen'&&el>7){phase='listen';t0=ms;$('#st').innerHTML='Listening <em>· voice</em>';$('#sub').textContent='speak — the core breathes with your voice'}
 else if(phase=='listen'&&el>5){phase='gen';t0=ms;ti=0;$('#stream').textContent='';$('#st').innerHTML='Generating <em>· 38 tok/s</em>';$('#sub').textContent='the core pulses with every token'}
 const lvl=phase=='gen'?.55+.45*Math.abs(Math.sin(t*9))*Math.abs(Math.sin(t*2.3)):.25+.75*Math.abs(Math.sin(t*3.1)*Math.sin(t*1.7+1));
 orb.energy=phase=='gen'?1.1+lvl*1.1:1+lvl*1.6;
 if(phase=='gen'&&ti<tail.length&&Math.random()<.5){ti++;$('#stream').textContent=tail.slice(0,ti);$('#tk').textContent=`${120+ti} tok · 38 tok/s`}
 let p='';const N=96,cx=280,cy=280,R=200;for(let i=0;i<N;i++){const a=i/N*Math.PI*2;const v=(phase=='gen'?.4:1)*lvl*(.35+.65*Math.abs(Math.sin(i*.7+t*(phase=='gen'?4:7))*Math.sin(i*.23-t*2)));const r1=R,r2=R+6+v*38;
  p+=`<line x1="${cx+Math.cos(a)*r1}" y1="${cy+Math.sin(a)*r1}" x2="${cx+Math.cos(a)*r2}" y2="${cy+Math.sin(a)*r2}"/>`}
 wv.innerHTML=`<defs><linearGradient id="wg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B7A4FF"/><stop offset=".5" stop-color="#FF8FC0"/><stop offset="1" stop-color="#3BE8C8"/></linearGradient></defs><g stroke="url(#wg2)" stroke-width="2.4" stroke-linecap="round" opacity="${phase=='listen'?.95:.55}">${p}</g>`;
 [...M.children].forEach((b,i)=>b.style.height=(phase=='listen'?6+28*lvl*Math.abs(Math.sin(i*.9+t*8)):4)+'px');
 if(!J.motion.reduced)requestAnimationFrame(frame)}
requestAnimationFrame(frame);
$('#ins').insertAdjacentHTML('beforeend',`<div class="ins-h"><div class="logo" style="background:#B48CFF;color:#fff">Q4</div><div><h2>Qwen3 4B</h2><div class="sub">Q5_K_M · Jarvis Local</div></div><button class="icon-btn ins-x">${ico('close',18)}</button></div>
<div class="kv" style="margin-top:18px"><div><b>38</b>tok/s</div><div><b>180</b>ms p50</div><div><b>$0</b>cost</div></div>
<div class="sec-t">Model</div><div class="seg g1" style="display:flex"><button class="on" style="flex:1">Qwen3 4B</button><button style="flex:1">Qwen3-Coder 30B</button></div>
<div class="sec-t">Generation</div><div class="rows">
<div class="row">Temperature<b class="r">0.6</b></div><div class="row">Context<b class="r">32 768</b></div><div class="row">Adapter<b class="r">r16-b · off</b></div><div class="row">System prompt<b class="r">Jarvis · SRE</b></div></div>
<div class="sec-t">Voice</div><div class="rows"><div class="row">Push-to-talk<span class="r"><span class="toggle on"></span></span></div><div class="row">Speak answers<span class="r"><span class="toggle"></span></span></div><div class="row">Whisper · local STT<b class="r">base · en</b></div></div>
<div class="sec-t">Memory</div><div class="rows"><div class="row">${ico('memory',14)}<b>Use 12 facts about Alex</b><span class="r"><span class="toggle on"></span></span></div></div>
<div class="ins-act"><button class="btn btn-glass" style="flex:1">${ico('refresh',14)}New session</button><button class="btn btn-glass">Export</button></div>`);
/* tablet & mobile: open at the latest message, composer pinned above the dock */
if(J.bp()=='m'||J.bp()=='s')J.ready(()=>scrollTo(0,document.documentElement.scrollHeight));
