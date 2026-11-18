/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Fine-tuning — pipeline (scene / vertical flow on mobile), training set,
   adapters & runs (empty state by default, #runs shows a live run), run config.
   Demo: base model Qwen/Qwen3-Coder-30B-A3B-Instruct, LoRA rank 16, DPO; all values are placeholders. */
J.shell('Fine-tuning <span>/</span> <em>Qwen3-Coder</em>');
const STATE=location.hash=='#runs'?'runs':'empty';
$$('#sw button').forEach(b=>{b.classList.toggle('on',b.dataset.s==STATE);b.onclick=()=>{location.hash=b.dataset.s=='runs'?'runs':'';location.reload()}});
const R=STATE=='runs',cv=$('#cv');
/* pipeline nodes: [id, state class, x, html] */
const N=[
 ['n1','ok',24,`<div class="hd"><span class="ic" style="background:rgba(106,168,255,.14);color:var(--tool)">${ico('db',19)}</span><div><b>Training set</b><small>history-r3 · ready</small></div></div><div class="ln"><span>examples</span><b>1 248</b></div><div class="ln"><span>DPO pairs</span><b>186</b></div><div class="ln"><span>tokens</span><b>2.1M</b></div>`],
 ['n2',R?'run':'queued',324,`<div class="hd"><span class="ic" style="background:rgba(255,193,92,.14);color:var(--run)">${ico('gpu',19)}</span><div><b>Training</b><small>A100 80GB</small></div>${R?'<span class="badge b-run" style="margin-left:auto">410/600</span>':'<span class="badge b-idle" style="margin-left:auto">idle</span>'}</div>
  <div class="substeps"><span class="${R?'on':''}">SFT · 600</span><span>DPO · β 0.1</span></div>${R?'<div class="bar"><i style="width:68%;animation:none"></i></div><div class="ln"><span>loss 0.612</span><b>eta 14m</b></div>':'<div class="ln"><span>No training run yet</span><b>est. 42m</b></div>'}`],
 ['n3',R?'ok':'queued',624,`<div class="hd"><span class="ic" style="background:rgba(168,151,255,.14);color:var(--ai)">${ico('layers',19)}</span><div><b>LoRA adapter</b><small>${R?'jarvis-coder-r16-b':'not created'}</small></div></div><div class="ln"><span>rank · alpha</span><b>16 · 32</b></div><div class="ln"><span>size</span><b>${R?'412 MB':'—'}</b></div><div class="ln"><span>eval win-rate</span><b>${R?'71% vs base':'—'}</b></div>`],
 ['n4','sel',924,`<div class="orb mini-orb"><canvas id="mo"></canvas></div><div class="hd"><div><b>Local model</b><small>Jarvis Local · Mac</small></div></div><div class="ln" style="margin-top:22px"><span>base</span><b>Qwen3-Coder-30B</b></div><div class="ln"><span>adapter</span><b>${R?'r16-b · active':'none'}</b></div><div class="ln"><span>p50</span><b>410 ms</b></div>`]];
N.forEach(([id,c,x,h])=>cv.insertAdjacentHTML('beforeend',`<div class="node pn ${c}" id="${id}" style="left:${x}px;top:24px">${h}</div>`));
J.Scene($('#scene'),{w:1160,h:260});
$('#vf').innerHTML=N.map(([id,c,x,h])=>`<div class="node pn ${c}">${h.replace('id="mo"','id="mo2"')}</div>`).join('');
J.Orb($('#mo'),{energy:R?1.6:.8,size:.4});J.Orb($('#mo2'),{energy:R?1.6:.8,size:.4});
J.ready(()=>{const e=$('#ed');
 edge(e,$('#n1'),'r',$('#n2'),'l',{color:'#58E6A6',flow:true});
 edge(e,$('#n2'),'r',$('#n3'),'l',{color:R?'#FFC15C':'#8D88A3',flow:R,dash:!R});
 edge(e,$('#n3'),'r',$('#n4'),'l',{color:R?'#A897FF':'#8D88A3',flow:R,slow:true,dash:!R});
 const [x1,y1]=P($('#n4'),'b',cv),[x2,y2]=P($('#n1'),'b',cv);e.insertAdjacentHTML('beforeend',`<path d="M${x1} ${y1} C${x1} ${y1+60} ${x2} ${y2+60} ${x2} ${y2}" fill="none" stroke="#FF8FC0" stroke-opacity=".5" stroke-dasharray="2 6"/><text x="${(x1+x2)/2}" y="${y1+52}" text-anchor="middle" fill="rgba(244,242,255,.44)" font-family="Geist Mono" font-size="11">feedback loop · new tasks become training data</text>`)});
$('#ds').innerHTML=`<div class="panel-h"><h3>Training set</h3><span class="badge b-ai">auto-curated</span><span class="meta">updated 23:59</span></div>
<div class="kv4"><div><b>1 248</b>examples</div><div><b>312</b>tasks</div><div><b>186</b>DPO pairs</div><div><b>2.1M</b>tokens</div></div>
<div class="sec-t">Sources</div>
<div class="rows">
<div class="row">${ico('check',14)}<b>Completed tasks · 👍 feedback</b><span class="r">742</span></div>
<div class="row">${ico('chat',14)}<b>Chat corrections</b><span class="r">281</span></div>
<div class="row">${ico('integrations',14)}<b>Cursor IDE · accepted edits</b><span class="r">225</span></div>
<div class="row" style="color:var(--bad)">${ico('alert',14)}<b>Rejected answers → DPO “rejected”</b><span class="r">186</span></div></div>
<div class="sec-t">Quality · dedup 4% · PII scrubbed</div><div class="qbar"><i style="width:60%;background:#58E6A6"></i><i style="width:22%;background:#A897FF"></i><i style="width:14%;background:#6AA8FF"></i><i style="width:4%;background:#FF6B7A"></i></div>
<div class="ex"><span class="r">user ›</span> Write a systemd timer that runs pg_dump nightly at 02:00<br><span class="a">assistant ›</span> [Timer] OnCalendar=*-*-* 02:00:00 · Persistent=true · Unit=pg-backup.service …</div>`;
$('#rn').innerHTML=R?`<div class="panel-h"><h3>Adapters &amp; runs</h3><span class="meta">3 runs · 1 adapter active</span></div>
<svg class="loss" viewBox="0 0 518 150" preserveAspectRatio="none"><defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#B7A4FF"/><stop offset="1" stop-color="#FF8FC0"/></linearGradient><linearGradient id="lf" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#A897FF" stop-opacity=".35"/><stop offset="1" stop-color="#A897FF" stop-opacity="0"/></linearGradient></defs>
${[0,1,2,3].map(i=>`<line x1="0" x2="518" y1="${20+i*36}" y2="${20+i*36}" stroke="rgba(255,255,255,.06)"/>`).join('')}
<path d="M0 22 C40 40 70 80 120 92 S220 112 260 118 S330 124 352 126" fill="none" stroke="url(#lg)" stroke-width="2.2"/><path d="M0 22 C40 40 70 80 120 92 S220 112 260 118 S330 124 352 126 L352 150 L0 150Z" fill="url(#lf)"/>
<path d="M0 30 C50 52 90 96 150 108 S300 126 518 132" fill="none" stroke="rgba(255,255,255,.25)" stroke-dasharray="3 5"/>
<circle cx="352" cy="126" r="5" fill="#FF8FC0"/><text x="362" y="118" fill="#F4F2FF" font-family="Geist Mono" font-size="11">run-003 · loss 0.612</text><text x="420" y="146" fill="rgba(244,242,255,.44)" font-family="Geist Mono" font-size="10.5">run-002 final 0.548</text></svg>
<div class="sec-t">Runs</div>
<div class="rw"><span class="badge b-run" style="padding:0 6px"></span><b>run-003 · SFT+DPO</b><span>step 410/600</span><span>$0.86</span><span style="color:var(--run)">running</span></div>
<div class="rw"><span class="badge b-ok" style="padding:0 6px"></span><b>run-002 · SFT</b><span>600 steps</span><span>$1.27</span><span style="color:var(--ok)">adapter ✓</span></div>
<div class="rw"><span class="badge b-bad" style="padding:0 6px"></span><b>run-001 · SFT</b><span>step 88</span><span>$0.19</span><span style="color:var(--bad)">OOM</span></div>
<div class="sec-t">Adapters</div>
<div class="rw" style="grid-template-columns:22px 1fr 110px 84px 92px"><span style="color:var(--ai)">${ico('layers',15)}</span><b>jarvis-coder-r16-b</b><span>r16 · 412 MB</span><span>71% win</span><span class="toggle on" style="transform:scale(.85)"></span></div>`
:`<div class="panel-h"><h3>Adapters &amp; runs</h3><span class="meta">0 runs</span></div>
<div class="empty"><div class="ring">${ico('ft',30)}</div><h4>No training run yet</h4><p style="max-width:340px;line-height:1.5">Your training set is ready. Start the first SFT run — Jarvis will produce a LoRA adapter and plug it into the local model.</p>
<div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-pri">${ico('play',14)}Start first run</button><button class="btn btn-glass">Dry-run 20 steps</button></div><p class="mono" style="font-size:11.5px;margin-top:6px">est. 42 min · RunPod A100 80GB · ≈ $1.30</p></div>`;
$('#ins').insertAdjacentHTML('beforeend',`<div class="ins-h"><div class="logo" style="background:var(--grad-core);color:#fff">${ico('ft',24)}</div><div><h2>Run config</h2><div class="sub">${R?'run-003 · locked while running':'draft · run-001'}</div></div><button class="icon-btn ins-x">${ico('close',18)}</button></div>
<div class="sec-t">Base model</div><div class="field" style="height:48px">${ico('cpu',16)}<input value="Qwen/Qwen3-Coder-30B-A3B-Instruct" readonly></div>
<div class="sec-t">Compute</div><div class="cfg"><div class="f">GPU<b>RunPod · A100 80GB</b></div><div class="f">Precision<b>bf16 · QLoRA 4-bit</b></div></div>
<div class="sec-t">SFT</div><div class="cfg">
<div class="f" style="flex-direction:column;align-items:stretch;gap:10px"><div style="display:flex;justify-content:space-between">SFT steps<b>600</b></div><div class="slider"><u style="width:50%"></u><i style="left:50%"></i></div></div>
<div class="f">Max sequence<b>8 192</b></div><div class="f">LoRA rank · alpha<b>16 · 32</b></div><div class="f">Learning rate<b>2e-4 · cosine</b></div></div>
<div class="sec-t">Preference</div><div class="cfg"><div class="f">DPO after SFT<span class="toggle on"></span></div><div class="f">β · pairs<b>0.1 · 186</b></div></div>
<div class="ins-act"><button class="btn btn-pri" style="flex:1">${ico('play',14)}${R?'Running…':'Start training'}</button><button class="btn btn-glass">Save draft</button></div>`);
