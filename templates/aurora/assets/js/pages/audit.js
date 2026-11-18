/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Audit trail — demo events (T-0142 / T-0143 events mirror the sample task);
   a health-check event is appended live every 9s unless motion is reduced. */
J.shell('Audit trail <span>/</span> <em>Timeline</em>');
$$('[data-ico]').forEach(e=>e.outerHTML=ico(e.dataset.ico,14));
const H=[3,2,1,1,0,0,1,4,9,12,8,10,14,9,7,11,13,16,10,12,18,22,15,26];
$('#bars').innerHTML=H.map((v,i)=>`<i class="${i==21?'e':''} ${i==23?'now':''}" style="height:${8+v/26*92}%"></i>`).join('');
const T={model:['#A897FF','ai','model call'],tool:['#6AA8FF','integrations','tool call'],file:['#3BE8C8','file','file'],plan:['#FF8FC0','tasks','plan'],err:['#FF6B7A','alert','error'],retry:['#FFC15C','refresh','retry'],cfg:['#FF9B45','key','config'],mem:['#58E6A6','memory','memory'],me:['#F4F2FF','user','approval']};
$('#facets').innerHTML=`<div class="sec-t" style="margin-top:0">Event type</div><div class="rows">${Object.entries({model:61,tool:48,file:17,plan:22,retry:6,err:1,cfg:3,mem:29,me:27}).map(([k,n])=>`<div class="row"><i style="background:${T[k][0]};box-shadow:0 0 8px ${T[k][0]}"></i>${T[k][2]}<b class="r">${n}</b></div>`).join('')}</div>
<div class="sec-t">Actor</div><div style="display:flex;flex-wrap:wrap;gap:6px"><span class="chip" style="height:28px"><b>Jarvis</b> 187</span><span class="chip" style="height:28px"><b>Alex</b> 27</span></div>`;
const E=[
 ['today'],
 ['00:23:41','model','issue_certs · cert 3/5 issued','T-0143 · gpt-5-mini · ACME','$0.001270','run'],
 ['00:23:12','plan','plan approved · 3 steps','T-0143 · est. $0.0071','Alex','me'],
 ['23:59:02','file','cve-2026-31337.pdf created','T-0142 · 6 pages · 412 KB · pdf renderer','$0.003112','sel'],
 ['23:58:30','retry','render_report attempt 2','T-0142 · chart timeout → weasyprint',''],
 ['23:57:48','model','analyze_vulns · 7 of 42 hosts','T-0142 · claude-sonnet-4.5','$0.029870'],
 ['23:57:10','me','plan approved by Alex','T-0142 · rev 3 · via Telegram 123456789',''],
 ['23:56:52','tool','scan_hosts · 42 hosts','T-0142 · nmap + nuclei · 2.1s','$0.004102'],
 ['23:41:19','mem','RCA saved to memory','T-0141 · cluster Infrastructure · +3 facts',''],
 ['23:02:11','cfg','API key rotated · Mistral AI','by Alex · old key revoked',''],
 ['21:02:44','err','patch_coredns failed · RBAC','T-0139 · kubectl · HTTP 403',''],
];
let h='';E.forEach(e=>{if(e.length==1){h+=`<div class="day">Last 24 hours · Europe/Warsaw</div>`;return}const [tm,k,t,p,r,f]=e;const [c,ic]=T[k];
 h+=`<div class="ev ${f||''}" style="color:${c}"><span class="tm">${tm}</span><span class="pin"></span><div class="card g1"><span class="ic" style="background:color-mix(in srgb,${c} 15%,transparent);color:${c}">${ico(ic,16)}</span><div style="color:var(--ink);min-width:0"><b>${t}</b><p data-t="${tm}">${p}</p></div><span class="rt">${f=='run'?'<span class="badge b-run">running</span>':''}${k=='err'?'<span class="badge b-bad">error</span>':''}${r}</span></div></div>`});
$('#feed').innerHTML=h;
/* live: a new event slides in every few seconds */
if(!J.motion.reduced)setInterval(()=>{const d=new Date();const tm=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;const [c,ic]=T.tool;
 $('.day').insertAdjacentHTML('afterend',`<div class="ev new" style="color:${c}"><span class="tm">${tm}</span><span class="pin"></span><div class="card g1"><span class="ic" style="background:color-mix(in srgb,${c} 15%,transparent);color:${c}">${ico(ic,16)}</span><div style="color:var(--ink);min-width:0"><b>health check · 13 integrations</b><p data-t="${tm}">scheduled · every 15m · all green</p></div><span class="rt">0 ms</span></div></div>`)},9000);
$('#ins').insertAdjacentHTML('beforeend',`<div class="ins-h"><div class="logo" style="background:rgba(59,232,200,.15);color:var(--file)">${ico('file',24)}</div><div><h2>File created</h2><div class="sub">evt_01JD…7Q2 · 23:59:02</div></div><button class="icon-btn ins-x">${ico('close',18)}</button></div>
<div class="kv" style="margin-top:18px"><div><b>T-0142</b>task</div><div><b>×2</b>attempt</div><div><b>9.8s</b>duration</div></div>
<div class="sec-t">Actor → target</div><div class="rows"><div class="row">${ico('ai',14)}<b>Jarvis orchestrator</b><span class="r">actor</span></div><div class="row">${ico('file',14)}<b>PDF renderer</b><span class="r">processor</span></div><div class="row">${ico('db',14)}<b>S3 · files/cve-2026-31337.pdf</b><span class="r">write</span></div></div>
<div class="sec-t">Payload</div><div class="diff"><span class="k">step</span>: render_report
<span class="k">input</span>: findings.md (9.6 KB)
<span class="d">- renderer: chromium     # timeout 30s</span>
<span class="a">+ renderer: weasyprint   # fallback</span>
<span class="k">output</span>: cve-2026-31337.pdf · 6 pages
<span class="k">sha256</span>: 4be1…09ac</div>
<div class="sec-t">Integrity</div><div class="rows"><div class="row">${ico('lock',14)}<b>Signed</b> · ed25519<span class="r" style="color:var(--ok)">valid ✓</span></div><div class="row">${ico('layers',14)}<b>Chain</b> prev 77c0…a41b<span class="r" style="color:var(--ok)">linked ✓</span></div></div>
<div class="ins-act"><button class="btn btn-pri" style="flex:1">Open task T-0142</button><button class="btn btn-glass">Copy JSON</button></div>`);
