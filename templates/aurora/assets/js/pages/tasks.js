/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Tasks — T-0142 analytics. Plan → steps (cost, attempts) → file on a scene;
   mobile gets the same nodes as a vertical flow. Inspector: result JSON + files. */
J.shell('Tasks <span>/</span> <em>T-0142</em>');
const T=DATA.tasks[0];
$('#cmeta').innerHTML=`<span class="badge b-ok" style="height:32px;padding:0 12px">done</span><span class="chip">${ico('cost',14)}<b>$${T.cost}</b></span><span class="chip">${ico('clock',14)}<b>1m 12s</b></span><span class="chip">${ico('ai',14)}<b>claude-sonnet-4.5</b></span><span class="chip">${ico('refresh',14)}<b>4</b> attempts · 3 steps</span>`;
const sc={done:'var(--ok)',run:'var(--run)',fail:'var(--bad)'};
$('#trail').innerHTML=DATA.tasks.map(t=>`<span class="chip ${t.id=='T-0142'?'on':''}"><i style="background:${sc[t.st]}"></i><b>${t.id}</b></span>`).join('');
$('#revs').innerHTML=`
<div class="rv me"><span class="d"></span><div class="h"><b>Alex</b> · rev 1 · 23:56:41</div><div class="b">Scan the nginx fleet for CVE-2026-31337 and give me a PDF report</div></div>
<div class="rv"><span class="d"></span><div class="h"><b>Jarvis</b> · clarify · 23:56:44</div><div class="b">Should I include staging hosts? Add remediation commands per host?</div></div>
<div class="rv me"><span class="d"></span><div class="h"><b>Alex</b> · rev 2 · 23:57:02</div><div class="b">Prod only, <ins>add patch commands and a rollout order</ins>, no <del>raw scanner logs</del></div></div>
<div class="rv fin"><span class="d"></span><div class="h"><b>Plan</b> · rev 3 · approved 23:57:10</div><div class="b">scan_hosts → analyze_vulns → render_report<br><span class="mono" style="font-size:11.5px;color:var(--ink-3)">est. $0.041 · actual $0.038394</span></div></div>`;
const W=760,cx=W/2;
const N=[
 ['plan','sel',`<div class="nt"><span>${ico('tasks',14)} plan</span><span class="badge b-ai">approved</span></div><div class="nm"><span>3 steps · est. $0.041</span><span>rev 3</span></div>`,cx-150,10],
 ['s1','ok',`<div class="nt"><span>scan_hosts</span><span class="badge b-ok">ok</span></div><div class="nm"><span>nmap + nuclei · 42 hosts</span><span>2.1s</span></div><div class="meta"><span>$0.004102</span><span>attempt 1</span><span>1 840 tok</span></div><div class="share"><u style="width:10.7%"></u></div>`,cx-150,150],
 ['s2','ok',`<div class="nt"><span>analyze_vulns</span><span class="badge b-ok">ok</span></div><div class="nm"><span>claude-sonnet-4.5</span><span>38.4s</span></div><div class="meta"><span>$0.029870</span><span>7 vulnerable</span><span>2 140 tok out</span></div><div class="share"><u style="width:77.8%"></u></div>`,cx-150,310],
 ['a1','bad',`<div class="nt"><span>render_report</span><span class="attempt" style="color:var(--bad);background:rgba(255,107,122,.14)">×1</span></div><div class="nm"><span style="color:var(--bad)">chart render timeout</span></div><div class="meta"><span>$0.001310</span><span>6.2s</span></div>`,cx-340,490],
 ['a2','ok',`<div class="nt"><span>render_report</span><span class="attempt">×2</span></div><div class="nm"><span>fallback → weasyprint</span><span>9.8s</span></div><div class="meta"><span>$0.003112</span><span>pdf renderer</span></div><div class="share"><u style="width:11.5%"></u></div>`,cx+40,490],
 ['f','file',`<div class="nt"><span>${ico('file',14)} cve-2026-31337.pdf</span><span class="badge b-tool">output</span></div><div class="nm"><span>6 pages · 412 KB</span><span>23:59:02</span></div>`,cx-150,660]];
const cv=$('#cv');
N.forEach(([id,c,h,x,y])=>cv.insertAdjacentHTML('beforeend',`<div class="node sn ${c}" id="${id}" style="left:${x}px;top:${y}px">${h}</div>`));
cv.insertAdjacentHTML('beforeend',`<div class="group" style="left:${cx-360}px;top:470px;width:720px;height:136px"><span>render_report · 2 attempts</span></div><div class="label" style="position:absolute;left:${cx+170}px;top:780px">total · <b style="color:var(--ink)">$0.038394</b></div>`);
J.Scene($('#scene'),{w:W,h:810});
$('#vf').innerHTML=`<div class="vh">Plan → steps · total $0.038394</div>`+N.map(([id,c,h])=>`<div class="node sn ${c}">${h}</div>`).join('');
J.ready(()=>{const e=$('#ed'),g=id=>$('#'+id);
 edge(e,g('plan'),'b',g('s1'),'t',{vert:true,color:'#A897FF',flow:true,slow:true,label:'rev 3'});
 edge(e,g('s1'),'b',g('s2'),'t',{vert:true,color:'#58E6A6',flow:true,slow:true,label:'42 hosts'});
 edge(e,g('s2'),'b',g('a1'),'t',{vert:true,color:'#FF6B7A',dash:true});
 edge(e,g('s2'),'b',g('a2'),'t',{vert:true,color:'#58E6A6',flow:true,slow:true});
 edge(e,g('a1'),'r',g('a2'),'l',{color:'#FFC15C',dash:true,label:'retry'});
 edge(e,g('a2'),'b',g('f'),'t',{vert:true,color:'#3BE8C8',flow:true,slow:true})});
const JS=`<span class="p">{</span>
  <span class="k">"task_id"</span>: <span class="s">"T-0142"</span>,
  <span class="k">"status"</span>: <span class="s">"done"</span>,
  <span class="k">"cost_usd"</span>: <span class="n">0.038394</span>,
  <span class="k">"steps"</span>: <span class="p">[</span><span class="s">"scan_hosts"</span>, <span class="s">"analyze_vulns"</span>, <span class="s">"render_report"</span><span class="p">]</span>,
  <span class="k">"attempts"</span>: <span class="p">{</span> <span class="k">"render_report"</span>: <span class="n">2</span> <span class="p">}</span>,
  <span class="k">"result"</span>: <span class="p">{</span>
    <span class="k">"cve"</span>: <span class="s">"CVE-2026-31337"</span>,
    <span class="k">"sections"</span>: <span class="p">[</span><span class="s">"Summary"</span>, <span class="s">"Affected hosts"</span>, <span class="s">"Remediation"</span>, <span class="s">"Rollout"</span><span class="p">]</span>,
    <span class="k">"hosts_scanned"</span>: <span class="n">42</span>,
    <span class="k">"vulnerable"</span>: <span class="n">7</span>,
    <span class="k">"file"</span>: <span class="s">"files/cve-2026-31337.pdf"</span>
  <span class="p">}</span>
<span class="p">}</span>`;
$('#ins').innerHTML=`<div class="ins-h"><div class="logo" style="background:rgba(59,232,200,.14);color:var(--file)">${ico('file',24)}</div><div><h2>Final result</h2><div class="sub">result.json · 23:59:02</div></div><button class="icon-btn ins-x" aria-label="Close">${ico('close',18)}</button></div>
<div class="kv" style="margin-top:18px"><div><b>4</b>attempts</div><div><b>1m 12s</b>duration</div><div><b>3 980</b>tokens</div></div>
<div class="sec-t">Result JSON</div><div class="code">${JS}</div>
<div class="sec-t">Files</div><div class="rows files">
<div class="row"><span class="fi" style="background:rgba(59,232,200,.14);color:var(--file)">${ico('file',15)}</span><b>cve-2026-31337.pdf</b><span class="r">412 KB</span></div>
<div class="row"><span class="fi" style="background:rgba(168,151,255,.14);color:var(--ai)">${ico('file',15)}</span><b>findings.md</b><span class="r">9.6 KB</span></div>
<div class="row"><span class="fi" style="background:rgba(106,168,255,.14);color:var(--tool)">${ico('search',15)}</span><b>scan.json</b><span class="r">42 hosts</span></div></div>
<div class="ins-act"><button class="btn btn-pri" style="flex:1">${ico('play',14)} Replay with local model</button><button class="btn btn-glass">Open PDF</button></div>`;
