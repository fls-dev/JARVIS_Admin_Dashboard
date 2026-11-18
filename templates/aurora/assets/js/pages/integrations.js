/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* Integrations — demo connection data (see data.js).
   Scene: channels/tools → orchestrator → models, processors below.
   Mobile: grouped lists + catalog chips instead of the canvas & sky. */
J.shell('Integrations <span>/</span> <em>Canvas</em>');
$$('[data-ico]').forEach(e=>e.outerHTML=ico(e.dataset.ico,17));
J.Orb($('#orb'),{energy:1.3,rings:true});
const C=DATA.connections,L=$('#L');
const mono=n=>n.replace('Jarvis Local · ','').replace('GPT · ','').split(/[\s·-]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const lgStyle=c=>{const lt=['#E8E8E8','#F2F2F2'].includes(c.c);return `background:${c.c};color:${lt?'#111':'#fff'}`};
const itHTML=(c,cls,style='')=>`<div class="it g1 ${cls}" data-n="${c.n}" style="${style}"><span class="lg" style="${lgStyle(c)}">${mono(c.n)}</span><span class="nm2">${c.s||c.n}<small>${c.k.toLowerCase()}${c.rec?' · '+c.rec:''}</small></span><span class="c">${c.calls||'—'}</span><span class="d ${c.calls?'':'idle'}"></span></div>`;
const IN=['Telegram Bot','Twilio ConversationRelay','Cursor IDE','Tavily','RunPod GPU'];
const by=g=>C.filter(c=>c.g==g),find=n=>C.find(c=>c.n==n);
const place=(c,x,y)=>{L.insertAdjacentHTML('beforeend',itHTML(c,'',`left:${x}px;top:${y}px`));c.el=L.lastElementChild};
['Telegram Bot','Twilio ConversationRelay','Cursor IDE'].forEach((n,i)=>place(find(n),42,148+i*60));
['Tavily','RunPod GPU'].forEach((n,i)=>place(find(n),42,392+i*60));
const MODELS=[...by('model'),...by('local')];MODELS.forEach((c,i)=>place(c,858,36+i*54));
const PROCS=['S3 storage','Source','PDF','Word','Spreadsheet','Slides'];
PROCS.forEach((n,i)=>L.insertAdjacentHTML('beforeend',`<div class="proc g1" style="left:${364+(i%3)*134}px;top:${458+Math.floor(i/3)*48}px"><i></i>${n}</div>`));
J.Scene($('#scene'),{w:1140,h:560});
/* mobile lists */
$('#lists').innerHTML=`<div class="lh">Channels · in</div>${['Telegram Bot','Twilio ConversationRelay','Cursor IDE'].map(n=>itHTML(find(n),'flat')).join('')}
<div class="lh">Tools &amp; compute</div>${['Tavily','RunPod GPU'].map(n=>itHTML(find(n),'flat')).join('')}
<div class="lh">Models · 8</div>${MODELS.map(c=>itHTML(c,'flat')).join('')}
<div class="lh" style="color:var(--tool)">File processors · 6 · up to 250 MB</div><div class="pgrid">${PROCS.map(n=>`<div class="proc flat g1"><i></i>${n}</div>`).join('')}</div>`;
let SEL=null;
function draw(){const s=$('#ed');s.innerHTML='';const [ox,oy]=P($('#orc'),'c',L);
 C.forEach(c=>{const isIn=IN.includes(c.n);const col=c===SEL?'#C9BBFF':c.calls?'#58E6A6':'#8D88A3';const w=c.calls?1.2+Math.min(2.4,c.calls/14):1;
  const [ex,ey]=P(c.el,isIn?'r':'l',L);const d=isIn?bez2(ex,ey,ox-110,oy+(ey-oy)*.2):bez2(ox+110,oy+(ey-oy)*.2,ex,ey);
  s.insertAdjacentHTML('beforeend',`<path d="${d}" fill="none" stroke="${col}" stroke-opacity="${c.calls?.16:0}" stroke-width="${w+6}"/><path class="${c.calls?'flow':''}" d="${d}" fill="none" stroke="${col}" stroke-opacity="${c.calls?.9:.4}" stroke-width="${w}" ${c.calls?'':'stroke-dasharray="2 5"'} style="animation-duration:${Math.max(.4,2.4-c.calls/18)}s"/>`)});
 s.insertAdjacentHTML('beforeend',`<path d="M${ox} ${oy+120} L${ox} 430" stroke="#6AA8FF" stroke-opacity=".7" stroke-width="1.4" class="flow slow" fill="none"/>`)}
function inspect(c){SEL=c;$$('.it').forEach(x=>x.classList.toggle('sel',x.dataset.n==c.n));draw();const I=$('#ins');
 const isA=c.n=='Anthropic';
 I.querySelectorAll(':scope>:not(.sheet-handle)').forEach(n=>n.remove());
 I.insertAdjacentHTML('beforeend',`<div class="ins-h"><span class="logo" style="${lgStyle(c)}">${mono(c.n)}</span><div><h2>${c.n}</h2><div class="sub">${c.k} · ${c.cap} capabilities</div></div><button class="icon-btn ins-x" aria-label="Close">${ico('close',18)}</button></div>
 <div class="seg g1" style="margin-top:18px;display:flex"><button class="on" style="flex:1">Overview</button><button style="flex:1">Models</button><button style="flex:1">Routing</button><button style="flex:1">Logs</button></div>
 <div class="kv" style="margin-top:16px"><div><b>${c.calls}</b>calls · 24h</div><div><b>${c.lat||'—'}<small style="font:500 12px var(--mono);color:var(--ink-3)"> ms</small></b>p50 latency</div><div><b>$${c.spend.slice(0,6)}</b>spend</div></div>
 <div class="sec-t">Models · prices refreshed 2h ago</div><div class="mdl">${(isA?[['claude-sonnet-4.5','$3.00','$15.00',1],['claude-haiku-4.5','$1.00','$5.00',1],['claude-opus-4.1','$15.00','$75.00',0]]:[['default','—','—',1]]).map(m=>`<div><b>${m[0]}</b><span>in ${m[1]}</span><span>out ${m[2]}</span><span class="toggle ${m[3]?'on':''}" style="transform:scale(.8)"></span></div>`).join('')}</div>
 <div class="sec-t">Routing rule</div><div class="rt">when <em>task.type</em> = security · report<br>→ prefer <em>claude-sonnet-4.5</em>, max <em>$0.05</em><br>fallback → <em>Mistral AI</em> on 5xx / 429</div>
 <div class="sec-t">Last calls</div><div class="mdl"><div><b>analyze_vulns</b><span>T-0142</span><span>2 140 tok</span><span style="color:var(--ok)">✓</span></div><div><b>summarize</b><span>T-0137</span><span>820 tok</span><span style="color:var(--ok)">✓</span></div></div>
 <div class="ins-act"><button class="btn btn-pri" style="flex:1">${ico('refresh',15,2)}Refresh prices</button><button class="btn btn-glass">Test</button><button class="btn btn-danger">Remove</button></div>`)}
document.addEventListener('click',e=>{const it=e.target.closest('.it');if(it){inspect(find(it.dataset.n));if(J.bp()=='m'||J.bp()=='s')J.inspector.open(true)}});
/* catalog: sky (desktop/tablet) + chip list (mobile), one filter for both */
const SHORT={'Custom OpenAI-compatible':'Custom OpenAI-compat.'};
const G={ai:[0,34,570],tools:[580,34,310],mcp:[900,34,236]},NB={ai:'AI providers',tools:'Search · video · voice',mcp:'MCP registry'};
let sh='';Object.entries(G).forEach(([k,[x,y]])=>sh+=`<span class="neb" style="left:${x+14}px;top:${y-24}px">${NB[k]}</span>`);
let seed=7;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};const placed={ai:0,tools:0,mcp:0};
DATA.catalog.forEach(c=>{const [gx,gy,gw]=G[c[1]];const i=placed[c[1]]++;const cols=c[1]=='ai'?4:2;const cw=gw/cols;
 const x=gx+18+(i%cols)*cw+rnd()*6,y=gy+16+Math.floor(i/cols)*26+rnd()*4;
 sh+=`<div class="star ${c[3]?'has':''} ${c[1]=='mcp'?'mcp':''}" data-n="${(c[0]+' '+c[2]+' '+c[1]).toLowerCase()}" data-f="${c[1]}" style="left:${x}px;top:${y}px" title="${c[2]}"><i style="animation-delay:${(rnd()*3).toFixed(2)}s"></i><span>${SHORT[c[0]]||c[0]}</span></div>`});
$('#stars').innerHTML=sh+'<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" id="lines"></svg>';
J.Scene($('#skyScene'),{w:1160,h:230});
$('#catList').innerHTML=Object.keys(G).map(k=>`<div class="lh">${NB[k]}</div><div class="cl">${DATA.catalog.filter(c=>c[1]==k).map(c=>`<span class="chip ${c[3]?'has':''} ${k=='mcp'?'mcp':''}" data-n="${(c[0]+' '+c[2]+' '+k).toLowerCase()}" data-f="${k}"><i></i>${c[0]}</span>`).join('')}</div>`).join('');
function filter(){const q=$('#q').value.toLowerCase(),f=$('#seg .on').dataset.f;$$('[data-f][data-n]').forEach(s=>{const ok=(f=='all'||s.dataset.f==f)&&s.dataset.n.includes(q);s.classList.toggle('off',!ok);s.classList.toggle('hit',!!q&&ok)})}
$('#q').oninput=filter;$('#seg').onclick=e=>{const b=e.target.closest('button');if(!b)return;$('#seg .on').classList.remove('on');b.classList.add('on');filter()};
(function(){const st=$$('.star');let l='';for(let i=1;i<st.length;i++){if(st[i].dataset.f!=st[i-1].dataset.f||rnd()>.55)continue;const a=st[i-1],b=st[i];l+=`<line x1="${parseFloat(a.style.left)}" y1="${parseFloat(a.style.top)}" x2="${parseFloat(b.style.left)}" y2="${parseFloat(b.style.top)}" stroke="rgba(255,255,255,.08)"/>`}$('#lines').innerHTML=l})();
$$('.star').forEach(s=>s.addEventListener('mouseenter',()=>{$$('.tip').forEach(t=>t.remove());const c=DATA.catalog.find(c=>(SHORT[c[0]]||c[0])==s.querySelector('span').textContent);
 const t=document.createElement('div');t.className='tip g3';t.style.left=Math.min(890,parseFloat(s.style.left)+s.offsetWidth+14)+'px';t.style.top='10px';
 t.innerHTML=`<b>${c[0]}</b><p>${c[2]}<br>${c[1]=='mcp'?'MCP server':'OpenAI-compatible'}</p><div style="display:flex;gap:6px"><button class="btn btn-pri btn-sm">${c[3]?'Inspect':c[1]=='mcp'?'Connect':'Configure'}</button><button class="btn btn-glass btn-sm">Docs ↗</button></div>`;$('#stars').appendChild(t)}));
$('#stars').addEventListener('mouseleave',()=>$$('.tip').forEach(t=>t.remove()));
inspect(find('Anthropic'));J.ready(draw);
