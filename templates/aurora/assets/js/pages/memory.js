/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Memory — demo facts in 5 clusters around Alex's core; the prod-cluster fact
   open in the inspector with provenance (tasks / chat that wrote or read it). */
J.shell('Memory <span>/</span> <em>Constellation</em>');
$$('[data-ico]').forEach(e=>e.outerHTML=ico(e.dataset.ico,16));
J.Orb($('#orb'),{energy:.9,size:.3});
const cv=$('#cv'),CX=590,CY=395;
const CL=[
 ['Preferences','#A897FF',-126,0,[['Canary-first rollouts',1],['Terraform over ClickOps',.7],['Short answers, no fluff',.9],['Reports as PDF',.5]]],
 ['Projects','#3BE8C8',-54,0,[['Jenkins → GitHub Actions',1],['K8s autoscaling',.6],['example.com',.5],['Fine-tune Qwen3-Coder',.8]]],
 ['Environments','#FFC15C',14,0,[['k8s-prod · eu-west-1',1],['Change freeze Fri 16:00',.7],['On-call: PagerDuty',.4]]],
 ['Infrastructure','#6AA8FF',90,0,[['Mac · Qwen3-Coder-30B',.9],['RunPod A100 for training',.6],['Telegram 123456789',.8],['Tavily as default search',.5]]],
 ['Routines','#FF8FC0',166,0,[['On-call digest 09:00',.9],['Postgres backup 02:00',.6],['Europe/Warsaw',1]]]];
let h='';const pos=[];
CL.forEach(([n,c,ang,r,facts],ci)=>{const a=ang*Math.PI/180;const hx=CX+Math.cos(a)*330,hy=CY+Math.sin(a)*240;
 h+=`<div class="hub g2" id="hub${ci}" style="left:${hx}px;top:${hy}px;box-shadow:0 0 0 1px ${c}55,0 0 40px -6px ${c}88"><div>${n}<small>${facts.length*3+1} facts</small></div></div>`;
 facts.forEach(([f,w],fi)=>{const spread=(fi-(facts.length-1)/2)*(ci==3?1.0:0.75);const fa=a+spread;const fx=hx+Math.cos(fa)*175,fy=hy+Math.sin(fa)*105;
  h+=`<div class="fact g1 ${ci==2&&fi==0?'sel':''}" id="f${ci}_${fi}" style="left:${fx}px;top:${fy}px"><i style="background:${c};box-shadow:0 0 8px ${c}"></i>${f}</div>`;pos.push([ci,fi,w,c])})});
cv.insertAdjacentHTML('beforeend',h);
J.Scene($('#scene'),{w:1180,h:780});
$('#flist').innerHTML=CL.map(([n,c,a,r,f])=>`<div class="vflow"><div class="vh">${n} · ${f.length*3+1} facts</div></div><div class="fl">${f.map(([t])=>`<span class="chip"><i style="background:${c};box-shadow:0 0 8px ${c}"></i>${t}</span>`).join('')}</div>`).join('');
/* background stars */
let st='';let seed=3;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};for(let i=0;i<90;i++)st+=`<circle cx="${rnd()*1180}" cy="${rnd()*800}" r="${rnd()*1.3+.3}" fill="#fff" opacity="${rnd()*.5+.1}"/>`;
J.ready(()=>{const e=$('#ed');e.insertAdjacentHTML('beforeend',st);const core=$('#core');
 CL.forEach(([n,c],ci)=>{const [hx,hy]=P($('#hub'+ci),'c',cv);e.insertAdjacentHTML('beforeend',`<line x1="${CX}" y1="${CY}" x2="${hx}" y2="${hy}" stroke="${c}" stroke-opacity=".5" stroke-width="1.6" class="flow slow"/>`)});
 pos.forEach(([ci,fi,w,c])=>{const [hx,hy]=P($('#hub'+ci),'c',cv),[fx,fy]=P($('#f'+ci+'_'+fi),'c',cv);e.insertAdjacentHTML('beforeend',`<line x1="${hx}" y1="${hy}" x2="${fx}" y2="${fy}" stroke="${c}" stroke-opacity="${.2+w*.4}" stroke-width="${.6+w*1.8}"/>`)});
 const cross=[['f2_0','f1_0'],['f2_1','f0_0'],['f3_0','f1_3'],['f4_0','f3_2']];cross.forEach(([a,b])=>{const [x1,y1]=P($('#'+a),'c',cv),[x2,y2]=P($('#'+b),'c',cv);e.insertAdjacentHTML('beforeend',`<path d="M${x1} ${y1} Q${(x1+x2)/2+(y2-y1)*.15} ${(y1+y2)/2-(x2-x1)*.15} ${x2} ${y2}" fill="none" stroke="rgba(255,255,255,.22)" stroke-dasharray="2 5"/>`)})});
$('#ins').insertAdjacentHTML('beforeend',`<div class="ins-h"><div class="logo" style="background:rgba(255,193,92,.16);color:var(--run)">${ico('memory',24)}</div><div><h2>k8s-prod</h2><div class="sub">environment · pinned · confidence 0.96</div></div><button class="icon-btn ins-x">${ico('close',18)}</button></div>
<div class="sec-t">Fact</div><div class="prov">Production cluster k8s-prod in eu-west-1: 3 node pools, nginx ingress, CoreDNS. Changes go canary-first; no deploys after Fri 16:00.</div>
<div class="kv" style="margin-top:14px"><div><b>23</b>recalls</div><div><b>4</b>tasks</div><div><b>2d</b>age</div></div>
<div class="sec-t">Provenance</div><div class="rows">
<div class="row">${ico('tasks',14)}<b>T-0142</b> nginx CVE scan<span class="r">write</span></div>
<div class="row">${ico('tasks',14)}<b>T-0139</b> DNS failures<span class="r">read</span></div>
<div class="row">${ico('chat',14)}<b>Chat</b> 17 Nov, 22:10<span class="r">write</span></div></div>
<div class="sec-t">Linked</div><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="chip">Canary-first rollouts</span><span class="chip">K8s autoscaling</span><span class="chip">Change freeze Fri 16:00</span></div>
<div class="sec-t">Policy</div><div class="rows"><div class="row">Pinned<span class="r"><span class="toggle on"></span></span></div><div class="row">Share with local model<span class="r"><span class="toggle on"></span></span></div></div>
<div class="ins-act"><button class="btn btn-glass" style="flex:1">Edit fact</button><button class="btn btn-danger">Forget</button></div>`);
