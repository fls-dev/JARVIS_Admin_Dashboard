/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Operations — demo queue, workers and errors from DATA.ops.
   Picking a queue step fills the inspector; the window switch re-slices the chart. */
J.shell('Operations <span>/</span> <em>Queue</em>');
$$('[data-ico]').forEach(e=>e.outerHTML=ico(e.dataset.ico,15));
const O=DATA.ops,ST={run:['b-run','running'],wait:['b-idle','queued'],done:['b-ok','done'],fail:['b-bad','failed']};
$('#opk').innerHTML=`<div class="kpi g2 hot"><small>Running</small><b>02</b><small>T-0218 · T-0217</small></div>
<div class="kpi g2"><small>Queued</small><b>03</b><small>next 02:30</small></div>
<div class="kpi g2"><small>Steps / hour</small><b>14<i>avg 9.4</i></b><small><span class="up">▲ 24%</span> vs yesterday</small></div>
<div class="kpi g2"><small>p95 step</small><b>840<i>ms</i></b><small>cloud-router</small></div>`;
/* throughput: area + line for steps, dotted line for failures */
function chart(n){
 const W=600,H=190,pt=6,s=O.throughput.slice(-n),f=O.fails.slice(-n).map(v=>v*10+1),max=Math.max(...s,...f)*1.15;
 const x=i=>pt+i/(s.length-1)*(W-2*pt),y=v=>H-pt-v/max*(H-2*pt);
 const line=a=>a.map((v,i)=>`${i?'L':'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
 let g='';for(let k=1;k<4;k++)g+=`<line x1="0" x2="${W}" y1="${H*k/4}" y2="${H*k/4}" stroke="rgba(255,255,255,.07)"/>`;
 $('#chart').innerHTML=`<svg class="opc" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Steps per hour"><defs><linearGradient id="opa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A897FF" stop-opacity=".45"/><stop offset="1" stop-color="#A897FF" stop-opacity="0"/></linearGradient><linearGradient id="opl" x1="0" x2="1"><stop offset="0" stop-color="#B7A4FF"/><stop offset="1" stop-color="#FF8FC0"/></linearGradient></defs>${g}
  <path d="${line(s)} L${x(s.length-1)} ${H} L${x(0)} ${H} Z" fill="url(#opa)"/><path d="${line(f)}" fill="none" stroke="#FFC15C" stroke-width="1.4" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/>
  <path d="${line(s)}" fill="none" stroke="url(#opl)" stroke-width="2.2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`;
}
chart(24);
$('#win').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#win button').forEach(x=>x.classList.toggle('on',x==b));chart(+b.dataset.w);toast('Window: '+b.textContent,'chart updated','refresh','var(--ai)',2200)});
$('#wk').innerHTML=O.workers.map(([n,l,note])=>`<div class="${l>.85?'hi':''}"><div class="wh">${n}<span>${Math.round(l*100)}%</span></div><div class="mt"><i style="width:${Math.round(l*100)}%"></i></div><small>${note}</small></div>`).join('');
$('#er').innerHTML=O.errors.map(([a,m,t])=>`<div class="row">${ico('alert',14)}<b>${a}</b><span>${m}</span><span class="r" style="flex:none">${t}</span></div>`).join('');
const usd=v=>'$'+v.toFixed(6);
$('#q').innerHTML=O.queue.map(([id,step,task,model,st,t,c],i)=>`<button class="qr ${i==0?'sel':''}" data-i="${i}"><span>${id}</span><b>${step}<small>${task} · ${model}</small></b><span class="badge ${ST[st][0]}">${ST[st][1]}</span><span class="r">${t}</span><span class="r">${usd(c)}</span></button>`).join('');
function inspect(i){
 const [id,step,task,model,st,t,c]=O.queue[i];
 $('#insb').innerHTML=`<div class="ins-h"><div class="logo" style="background:rgba(168,151,255,.16);color:var(--ai)">${ico('ops',24)}</div><div><h2>${step}</h2><div class="sub">${id} · ${task}</div></div><button class="icon-btn ins-x">${ico('close',18)}</button></div>
<div class="kv" style="margin-top:18px"><div><b>${t}</b>${st=='run'?'running':'wait'}</div><div><b>${c?'$'+c.toFixed(5):'$0'}</b>cost</div><div><b>${ST[st][1]}</b>state</div></div>
<div class="sec-t">Execution</div><div class="rows"><div class="row">${ico('ai',14)}<b>${model}</b><span class="r">model</span></div><div class="row">${ico('tasks',14)}<b>${task}</b><span class="r">task</span></div><div class="row">${ico('layers',14)}<b>cloud-router</b><span class="r">worker</span></div></div>
<div class="sec-t">Trace</div><div class="diff"><span class="k">op</span>: ${id}
<span class="k">step</span>: ${step}
<span class="k">attempt</span>: 1 of 3
<span class="k">timeout</span>: 120s
<span class="a">+ retry on 5xx</span></div>
<div class="ins-act"><button class="btn btn-pri" style="flex:1">Open task ${task}</button><button class="btn btn-danger">Cancel step</button></div>`;
}
inspect(0);
$('#q').addEventListener('click',e=>{const b=e.target.closest('.qr');if(!b)return;$$('.qr').forEach(x=>x.classList.toggle('sel',x==b));inspect(+b.dataset.i)});
$('#pause').addEventListener('click',()=>toast('Queue paused','new steps wait until you resume','alert','var(--run)'));
