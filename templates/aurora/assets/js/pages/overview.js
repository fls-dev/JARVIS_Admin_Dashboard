/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Overview — sphere reacts to the typed prompt; task canvas (scene) on
   desktop/tablet, vertical flow on mobile; orb→task links overlay. */
J.shell('<em>Overview</em>');
$$('[data-ico]').forEach(e=>e.insertAdjacentHTML('afterbegin',ico(e.dataset.ico,e.classList.contains('ai')?18:15,e.classList.contains('ai')?2:1.7)));
const orb=J.Orb($('#orb'),{energy:1,rings:true});

/* typing prompt → orb energy */
const prompts=['Patch CVE-2026-31337 on the nginx fleet, canary first','Set up nightly Postgres backups to S3 and verify restore','Every morning at 09:00 send the on-call digest to Telegram'];
let pi=0,ci=0,dir=1;const ty=$('#typed');
function type(){const p=prompts[pi];if(J.motion.reduced){ty.innerHTML=p+'<span class="caret"></span>';return}
 ci+=dir;ty.innerHTML=p.slice(0,ci)+'<span class="caret"></span>';orb.energy=dir>0?2.6:1.2;
 if(ci>=p.length){dir=-1;orb.energy=1;return setTimeout(type,2600)}if(ci<=0){dir=1;pi=(pi+1)%prompts.length;return setTimeout(type,500)}setTimeout(type,dir>0?55:18)}
type();

/* KPIs */
const tr=DATA.trend,mx=Math.max(...tr);const pts=tr.map((v,i)=>`${i/(tr.length-1)*260},${54-v/mx*48}`).join(' ');
$('#kpis').innerHTML=`<div class="kpi g2"><div class="label">Spend · today</div><div class="big num">$0.084881</div><div class="sub">14 operations · avg $0.00606</div>
 <svg class="spark" viewBox="0 0 260 60" preserveAspectRatio="none"><defs><linearGradient id="sp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#A897FF" stop-opacity=".45"/><stop offset="1" stop-color="#A897FF" stop-opacity="0"/></linearGradient><linearGradient id="sl"><stop offset="0" stop-color="#B7A4FF"/><stop offset="1" stop-color="#FF8FC0"/></linearGradient></defs><polygon points="0,60 ${pts} 260,60" fill="url(#sp)"/><polyline points="${pts}" fill="none" stroke="url(#sl)" stroke-width="2" vector-effect="non-scaling-stroke"/></svg></div>
<div class="kpi g2"><div class="label">Operations</div><div class="big num">14<small>today</small></div>
 <div class="split"><div><b style="color:var(--ok)">4</b>done</div><div><b style="color:var(--run)">1</b>running</div><div><b style="color:var(--bad)">1</b>failed</div></div></div>
<div class="kpi g2"><div class="label">Spend by model</div>
 ${[['claude-sonnet-4.5',.042712,'#D97757'],['gemini-2.5-pro',.021107,'#4F8BFF'],['gpt-5-mini',.011204,'#10A37F'],['mistral-large',.006210,'#FF7000'],['deepseek-chat',.004318,'#4D6BFE'],['qwen3-4b · local',0,'#B48CFF']].map(([n,v,c])=>`<div class="mb"><span>${n}</span><i><u style="width:${Math.max(3,v/.042712*100)}%;background:${c}"></u></i></div>`).join('')}</div>
<div class="kpi g2 grow"><div class="label">Up next</div>
 <div class="rows" style="margin-top:12px"><div class="row">${ico('sched',14)}<b>09:00</b> On-call digest → Telegram</div><div class="row">${ico('ft',14)}<b>02:00</b> Postgres backup → S3</div><div class="row">${ico('memory',14)}<b>Sun</b> CVE feed sync</div></div></div>`;

/* task groups: same builders feed the scene and the mobile vertical flow */
const groups=[DATA.tasks[2],DATA.tasks[0],DATA.tasks[4]];
const stCls={done:'ok',run:'run',fail:'bad'},stB={done:'b-ok',run:'b-run',fail:'b-bad'},stL={done:'done',run:'running',fail:'failed'};
const outs={'T-0142':['cve-2026-31337.pdf','6 pages · 412 KB','file','var(--file)'],'T-0143':['certs 3/5 issued','rotating · ACME','lock','var(--run)'],'T-0139':['patch_coredns failed','RBAC denied · kube-system','alert','var(--bad)']};
const headN=(t,id='')=>`<div class="node head ${stCls[t.st]} ${t.st=='run'?'sel':''}" ${id}><div class="nt"><span>${t.id} · ${t.model}</span><span class="badge ${stB[t.st]}">${stL[t.st]}</span></div><div class="t">${t.t}</div><div class="nm"><span>$${t.cost}</span><span>${t.dur} · ${t.time}</span></div>${t.st=='run'?'<div class="bar"><i></i></div>':''}</div>`;
const stepSt=(t,si,a)=>a==0?(t.st=='fail'?'bad':'queued'):(t.st=='run'&&si==1?'run':'ok');
const stepN=(t,[n,c,a],si,attr='')=>{const st=stepSt(t,si,a);return `<div class="node st ${st}" ${attr}><div class="nt"><span>${n}</span>${a>1?`<span class="attempt">×${a}</span>`:''}</div><div class="nm"><span>${a?'$'+c.toFixed(6):(st=='bad'?'error':'queued')}</span></div></div>`};
const outN=(t,attr='')=>{const o=outs[t.id];return `<div class="node out ${t.st=='fail'?'bad':t.st=='run'?'queued':'file'}" ${attr}><span class="fi" style="background:color-mix(in srgb,${o[3]} 16%,transparent);color:${o[3]}">${ico(o[2],16)}</span><div><div style="font:500 13px/1 var(--mono)">${o[0]}</div><div style="font:500 11.5px/1 var(--mono);color:var(--ink-3);margin-top:5px">${o[1]}</div></div><span style="margin-left:auto" class="label">${t.st=='fail'?'retry ↻':'output'}</span></div>`};
const cv=$('#cv');
groups.forEach((t,gi)=>cv.insertAdjacentHTML('beforeend',`<div class="tg" style="left:${14+gi*434}px;top:30px"><div class="group" style="inset:-18px -14px -16px -14px"><span>${t.id}</span></div>${headN(t,`id="h${gi}"`)}${t.steps.map((s,si)=>stepN(t,s,si,`id="s${gi}${si}" style="left:${si*141}px;top:140px"`)).join('')}${outN(t,`id="o${gi}"`)}</div>`));
const scene=J.Scene($('#scene'),{w:1300,h:370});
$('#vf').innerHTML=groups.map(t=>`<div class="vh">${t.id} · ${stL[t.st]}</div>${headN(t)}${t.steps.map((s,si)=>stepN(t,s,si)).join('')}${outN(t)}`).join('');

const col={done:'#58E6A6',run:'#FFC15C',fail:'#FF6B7A'};
J.ready(()=>{const ed=$('#ed');
 groups.forEach((t,gi)=>{const h=$('#h'+gi);
  t.steps.forEach((s,si)=>{const a=$('#s'+gi+si);edge(ed,h,'b',a,'t',{color:col[t.st],vert:true,flow:t.st=='run',glow:false,w:1.2});if(si>0)edge(ed,$('#s'+gi+(si-1)),'r',a,'l',{color:'rgba(255,255,255,.5)',glow:false,w:1.2})});
  edge(ed,$('#s'+gi+(t.steps.length-1)),'b',$('#o'+gi),'t',{color:t.st=='fail'?'#FF6B7A':'#3BE8C8',vert:true,dash:t.st!='done',glow:false})});
 links();J.onResize(links);
});
/* orb → task links in page space (redrawn on resize, hidden on mobile) */
function links(){const L=$('#links'),ov=$('#ov');L.innerHTML='';if(J.bp()!='xl')return;const [ox,oy]=P($('#orbBox'),'b',ov);
 groups.forEach((t,gi)=>{const [hx,hy]=P($('#h'+gi),'t',ov);const d=`M${ox} ${oy-10} C${ox} ${oy+80} ${hx} ${hy-90} ${hx} ${hy}`;
  L.insertAdjacentHTML('beforeend',`<path d="${d}" fill="none" stroke="${col[t.st]}" stroke-opacity=".15" stroke-width="7"/><path class="flow ${t.st=='run'?'':'slow'}" d="${d}" fill="none" stroke="${col[t.st]}" stroke-width="1.6"/><circle cx="${hx}" cy="${hy}" r="4" fill="${col[t.st]}"/>`)})}
const tk=DATA.activity.map(a=>`<span><b>${a[0]}</b> · ${a[2]} · <b>${a[1]}</b> — ${a[3]}</span>`).join('');$('#tk').innerHTML=tk+tk;
