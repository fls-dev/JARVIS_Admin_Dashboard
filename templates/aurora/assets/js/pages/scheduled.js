/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Scheduled work — demo routines on a 24h dial (00 at top, clockwise),
   live 'now' hand from the local clock (Europe/Warsaw on the box). */
J.shell('Scheduled <span>/</span> <em>24h orbit</em>');
J.Orb($('#orb'),{energy:.9,size:.36});
const CX=440,CY=440,R=300;const ang=h=>h/24*Math.PI*2-Math.PI/2;const pt=(h,r)=>[CX+Math.cos(ang(h))*r,CY+Math.sin(ang(h))*r];
const JOBS=[[9,'On-call digest','daily · → Telegram','#FF8FC0','sched',.08,R],[2,'Postgres backup','daily · → S3 + restore test','#A897FF','ft',.4,R],[3.5,'TLS expiry check','daily · 38 domains','#6AA8FF','refresh',.15,R-92],[12,'CVE feed sync','Mon · Thu · NVD + GHSA','#3BE8C8','search',.6,R-92],[18.5,'IAM access review','Mon · 14 admin roles','#FFC15C','cost',.3,R],[22,'Log rotation','Sun · 24 servers','#58E6A6','memory',.5,R-92],[15,'Patch window nginx','once · Thu 15:00','#FF9B45','send',.1,R-92]];
let s=`<defs><radialGradient id="dg"><stop offset=".6" stop-color="#A897FF" stop-opacity="0"/><stop offset="1" stop-color="#A897FF" stop-opacity=".08"/></radialGradient><linearGradient id="nowg" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>
<circle cx="${CX}" cy="${CY}" r="${R+40}" fill="url(#dg)"/>
<path d="M${pt(21,R+40)} A${R+40} ${R+40} 0 0 1 ${pt(30,R+40)}" fill="none" stroke="#6D4AFF" stroke-opacity=".08" stroke-width="80"/>`;
// day/night arc label
for(const r of [R,R-92])s+=`<circle cx="${CX}" cy="${CY}" r="${r}" fill="none" stroke="rgba(255,255,255,.12)"/>`;
s+=`<circle cx="${CX}" cy="${CY}" r="${R+52}" fill="none" stroke="rgba(183,164,255,.35)" stroke-dasharray="1 ${(2*Math.PI*(R+52)/96-1).toFixed(2)}" stroke-width="7"/>`;
for(let h=0;h<24;h++){const [x1,y1]=pt(h,R+24),[x2,y2]=pt(h,R+(h%6?32:40));s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,${h%6?.25:.6})" stroke-width="${h%6?1:1.6}"/>`;
 const [tx,ty]=pt(h,R+72);s+=`<text x="${tx}" y="${ty+4}" text-anchor="middle" font-family="Geist Mono" font-size="${h%6?11:13}" fill="rgba(244,242,255,${h%6?.4:.85})">${String(h).padStart(2,'0')}</text>`}
const now=new Date();const nh=now.getHours()+now.getMinutes()/60;
// elapsed arc
const big=nh>12?1:0;const [ax,ay]=pt(0,R+52),[bx,by]=pt(nh,R+52);
s+=`<path d="M${ax} ${ay} A${R+52} ${R+52} 0 ${big} 1 ${bx} ${by}" fill="none" stroke="url(#nowg)" stroke-width="2"/>`;
const [hx,hy]=pt(nh,R+60),[hx0,hy0]=pt(nh,130);s+=`<line x1="${hx0}" y1="${hy0}" x2="${hx}" y2="${hy}" stroke="#fff" stroke-opacity=".7" stroke-width="1.4"/><circle cx="${hx}" cy="${hy}" r="6" fill="#fff"/><circle cx="${hx}" cy="${hy}" r="13" fill="none" stroke="#fff" stroke-opacity=".4"><animate attributeName="r" values="7;18;7" dur="2.4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;0;.6" dur="2.4s" repeatCount="indefinite"/></circle>`;
const [lx,ly]=pt(nh,R+110);s+=`<g transform="translate(${lx},${ly})"><rect x="-38" y="-13" width="76" height="26" rx="13" fill="#fff"/><text text-anchor="middle" y="4.5" font-family="Geist Mono" font-size="12" font-weight="600" fill="#0B0A12">now ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}</text></g>`;
let jh='';JOBS.forEach(([h,n,sub,c,ic,dur,r],i)=>{const [x,y]=pt(h,r);const a0=pt(h,r),a1=pt(h+dur,r);
 s+=`<path d="M${a0} A${r} ${r} 0 0 1 ${a1}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round" opacity=".85"/><line x1="${x}" y1="${y}" x2="${CX+(x-CX)*.42}" y2="${CY+(y-CY)*.42}" stroke="${c}" stroke-opacity=".22" stroke-dasharray="2 5"/>`;
 const side=Math.cos(ang(h))>=0?1:-1;jh+=`<div class="job g3 ${i==0?'sel':''}" style="left:${x+side*0}px;top:${y}px"><span class="jo" style="background:${c};box-shadow:0 0 14px ${c}">${ico(ic,15,2)}</span><div><b>${String(Math.floor(h)).padStart(2,'0')}:${String(Math.round(h%1*60)).padStart(2,'0')} · ${n}</b><small>${sub}</small></div></div>`});
// every-15-min health checks
$('#dial').innerHTML=s;$('#jobs').innerHTML=jh;
J.Scene($('#scene'),{w:880,h:880});
$('#jlist').innerHTML='<div class="vflow"><div class="vh">Routines · by time</div></div>'+[...JOBS].sort((a,b)=>a[0]-b[0]).map(([h,n,sub,c,ic])=>`<div class="job flat g1"><span class="jo" style="background:${c}">${ico(ic,15,2)}</span><div><b>${pad(Math.floor(h))}:${pad(Math.round(h%1*60))} · ${n}</b><small>${sub}</small></div></div>`).join('');
const diff=((9-nh)+24)%24;
$('#side').innerHTML=`<div class="kpi g2" style="border-color:rgba(255,143,192,.4)"><small>NEXT RUN IN</small><b>${Math.floor(diff)}h ${Math.round(diff%1*60)}m</b><small>09:00 · On-call digest → Telegram</small></div><div class="kpi g2"><small>NEXT 24H</small><b>11 runs</b><small>≈ $0.031 est. · 0 conflicts</small></div><div class="kpi g2"><small>HEALTH CHECK</small><b>every 15m</b><small>outer ring · 13 integrations</small></div><div class="kpi g2"><small>LAST FAILURE</small><b style="color:var(--bad)">21:02</b><small>T-0139 · RBAC denied · k8s</small></div>
<button class="btn btn-glass" style="margin-top:4px">${ico('plus',15)}New routine</button>`;
$('#ins').insertAdjacentHTML('beforeend',`<div class="ins-h"><div class="logo" style="background:#FF8FC0;color:#0B0A12">${ico('sched',24)}</div><div><h2>On-call digest</h2><div class="sub">daily · 09:00 Europe/Warsaw</div></div><button class="icon-btn ins-x">${ico('close',18)}</button></div>
<div class="sec-t">Schedule</div><div class="seg g1" style="display:flex"><button style="flex:1">Once</button><button class="on" style="flex:1">Daily</button><button style="flex:1">Weekly</button><button style="flex:1">Cron</button></div>
<div class="field" style="margin-top:8px">${ico('clock',16)}<input value="0 9 * * *" readonly style="font:500 14px/1 var(--mono);letter-spacing:.08em"><kbd>cron</kbd></div>
<div class="sec-t">Instruction</div><div class="field" style="height:auto;padding:12px 14px;align-items:flex-start;color:var(--ink);font:500 13.5px/1.5 var(--sans)">Send a summary: overnight incidents and alerts, failed jobs, cert expiries and today's planned changes.</div>
<div class="sec-t">Deliver to</div><div class="rows"><div class="row"><span style="width:22px;height:22px;border-radius:7px;background:#2AABEE;display:grid;place-items:center;color:#fff;font:700 10px var(--sans)">TB</span><b>Telegram Bot</b> 123456789<span class="r"><span class="toggle on"></span></span></div><div class="row">${ico('memory',14)}<b>Save to memory</b><span class="r"><span class="toggle"></span></span></div></div>
<div class="sec-t">Last runs</div><div class="rows"><div class="row"><span class="badge b-ok">ok</span><b>Tue 09:00</b><span class="r">$0.0021 · 6s</span></div><div class="row"><span class="badge b-ok">ok</span><b>Mon 09:00</b><span class="r">$0.0024 · 7s</span></div><div class="row"><span class="badge b-bad">fail</span><b>Sun 09:00</b><span class="r">Telegram 502 · retried</span></div></div>
<div class="ins-act"><button class="btn btn-pri" style="flex:1">${ico('play',14)}Run now</button><button class="btn btn-glass">${ico('pause',14)}Pause</button></div>`);
