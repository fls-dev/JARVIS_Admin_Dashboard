/* JARVIS Aurora · by fls-dev · https://github.com/fls-dev */
/* ==========================================================================
   JARVIS · data.js
   Content for the template. ALL of it is demo data (fictional names, hosts,
   costs and timings): replace it with your API responses.
   ========================================================================== */
const DATA={
 user:'Alex',
 spend:'0.084881', ops:14, completed:4, failed:1, running:1,
 tasks:[
  {id:'T-0142',t:'Scan nginx fleet for CVE-2026-31337 and generate a vulnerability report PDF',cost:'0.038394',st:'done',dur:'1m 12s',model:'claude-sonnet-4.5',steps:[['scan_hosts',.004102,1],['analyze_vulns',.029870,1],['render_report',.004422,2]],time:'23:58'},
  {id:'T-0141',t:'Investigate p95 latency spike on gateway-eu-west',cost:'0.021107',st:'done',dur:'48s',model:'gemini-2.5-pro',steps:[['fetch_metrics',.006310,1],['correlate',.010420,1],['summarize',.004377,1]],time:'23:41'},
  {id:'T-0143',t:'Rotate TLS certificates on api.example.com before expiry',cost:'0.005010',st:'run',dur:'running',model:'gpt-5-mini',steps:[['inventory',.001200,1],['issue_certs',.003810,1],['deploy_certs',0,0]],time:'00:21'},
  {id:'T-0140',t:'Audit IAM roles with admin privileges',cost:'0.009842',st:'done',dur:'31s',model:'qwen3-4b · local',steps:[['list_roles',.000000,1],['analyze_policies',.004120,1],['write_report',.005722,1]],time:'22:16'},
  {id:'T-0139',t:'Diagnose DNS resolution failures on k8s-prod',cost:'0.006210',st:'fail',dur:'22s',model:'mistral-large',steps:[['fetch_logs',.000810,1],['dig_trace',.005400,3],['patch_coredns',0,0]],time:'21:02'},
  {id:'T-0138',t:'Harden SSH config across 24 servers',cost:'0.004318',st:'done',dur:'9s',model:'deepseek-chat',steps:[['inventory',.000918,1],['apply_sshd',.003400,1]],time:'20:47'}
 ],
 trend:[.0021,.0034,.0018,.0052,.0041,.0067,.0049,.0072,.0058,.0091,.0063,.0105,.0088,.0126],
 activity:[
  ['00:23:41','issue_certs','T-0143','cert 3/5 issued · ACME · Let\'s Encrypt'],
  ['00:23:12','plan','T-0143','plan approved · 3 steps · est. $0.0071'],
  ['23:59:02','render_report','T-0142','cve-2026-31337.pdf · 6 pages · 412 KB'],
  ['23:58:30','retry','T-0142','render_report attempt 2 · renderer fallback'],
  ['23:57:48','analyze_vulns','T-0142','7 of 42 hosts vulnerable · claude-sonnet-4.5'],
  ['23:41:19','summarize','T-0141','root cause: conn-pool exhaustion · saved to memory'],
  ['21:02:44','error','T-0139','patch_coredns: RBAC denied · kube-system'],
 ],
 nav:[['Overview','overview'],['Tasks','tasks'],['Operations','ops'],['Local chat','chat'],['Fine-tuning','ft'],['Scheduled work','sched'],['Memory','memory'],['Integrations','integrations'],['Audit trail','audit']],
 connections:[
  {n:'Anthropic',k:'AI provider',cap:5,g:'model',calls:38,lat:820,spend:'0.042712',c:'#D97757'},
  {n:'GPT · OpenAI',k:'AI provider',cap:4,g:'model',calls:21,lat:640,spend:'0.011204',c:'#10A37F'},
  {n:'Google Gemini',k:'AI provider',cap:19,g:'model',calls:17,lat:590,spend:'0.021107',c:'#4F8BFF'},
  {n:'Mistral AI',k:'AI provider',cap:18,g:'model',calls:6,lat:710,spend:'0.006210',c:'#FF7000'},
  {n:'DeepSeek',k:'AI provider',cap:2,g:'model',calls:4,lat:930,spend:'0.004318',c:'#4D6BFE'},
  {n:'xAI',k:'OpenAI-compatible',cap:18,g:'model',calls:0,lat:0,spend:'0.000000',c:'#E8E8E8'},
  {n:'Jarvis Local · Qwen3 4B Q5_K_M',s:'Qwen3 4B',k:'OpenAI-compatible',cap:1,g:'local',calls:12,lat:180,spend:'0.000000',c:'#B48CFF'},
  {n:'Jarvis Local · Mac Qwen3-Coder-30B',s:'Qwen3-Coder 30B',k:'OpenAI-compatible',cap:1,g:'local',calls:3,lat:410,spend:'0.000000',c:'#B48CFF'},
  {n:'RunPod GPU',k:'Training',cap:0,g:'compute',calls:1,lat:0,spend:'0.000000',c:'#8B5CF6'},
  {n:'Cursor IDE',k:'IDE',cap:0,g:'tool',calls:2,lat:0,spend:'0.000000',c:'#F2F2F2'},
  {n:'Telegram Bot',k:'Messaging',cap:0,g:'channel',calls:9,lat:120,spend:'0.000000',c:'#2AABEE',rec:'123456789'},
  {n:'Twilio ConversationRelay',s:'Twilio Relay',k:'Telephony',cap:0,g:'channel',calls:0,lat:0,spend:'0.000000',c:'#F22F46'},
  {n:'Tavily',k:'Search',cap:0,g:'tool',calls:14,lat:950,spend:'0.000000',c:'#5BE49B',warn:false},
 ],
 processors:[['S3 object storage','*/*','required'],['Text & source editor','text/*, json, xml, yaml, sql'],['PDF renderer','application/pdf'],['Word renderer','.docx'],['Spreadsheet renderer','.xlsx'],['Presentation renderer','.pptx']],
 catalog:[
  ['OpenAI','ai','api.openai.com/v1',1],['Anthropic','ai','Native API adapter',1],['Google Gemini','ai','Native API adapter',1],['Mistral AI','ai','Native API adapter',1],['DeepSeek','ai','Native API adapter',1],
  ['Groq','ai','api.groq.com/openai/v1'],['xAI','ai','api.x.ai/v1',1],['OpenRouter','ai','openrouter.ai/api/v1'],['Together AI','ai','api.together.xyz/v1'],['Fireworks AI','ai','api.fireworks.ai/inference/v1'],
  ['Perplexity','ai','api.perplexity.ai'],['Cerebras','ai','api.cerebras.ai/v1'],['NVIDIA NIM','ai','integrate.api.nvidia.com/v1'],['Kimi · Moonshot AI','ai','api.moonshot.ai/v1'],['Alibaba Qwen','ai','dashscope-intl.aliyuncs.com'],
  ['Zhipu AI','ai','open.bigmodel.cn/api/paas/v4'],['SiliconFlow','ai','api.siliconflow.com/v1'],['Novita AI','ai','api.novita.ai/openai/v1'],['SambaNova','ai','api.sambanova.ai/v1'],['Custom OpenAI-compatible','ai','Any /v1 endpoint'],
  ['Tavily Search','tools','Purpose-built adapter',1],['Brave Search','tools','Purpose-built adapter'],['Serper','tools','Google SERP API'],['OpenAI Video','tools','Sora video generation'],['Google Veo','tools','Veo 3 video'],['Kling AI Video','tools','Kling 2.x video'],
  ['Twilio Media Streams','tools','Realtime voice'],['Telegram Bot','tools','Messaging',1],['RunPod GPU','tools','Training',1],['Cursor IDE','tools','IDE',1],['GitHub Issues','tools','Productivity'],['Slack','tools','Productivity'],['Google Workspace','tools','Productivity'],['Clerk','tools','Auth'],
  ['inference.sh','mcp','150+ AI apps · 1.0.1'],['Mizan','mcp','game ban records · 1.2.0'],['ac.snag/snag','mcp','console & replay evidence'],['ac.tandem/docs-mcp','mcp','Tandem docs · 0.3.1'],['filesystem','mcp','local files · official'],['playwright','mcp','browser automation'],['postgres','mcp','SQL over MCP'],['notion','mcp','pages & databases'],['linear','mcp','issues & cycles'],['sentry','mcp','errors & traces'],['stripe','mcp','payments'],['figma','mcp','design files']
 ]
};
/* page routing used by the wheel, dock, radial menu and ⌘K */
DATA.pages={overview:'overview.html',tasks:'tasks.html',ops:'operations.html',chat:'local-chat.html',ft:'fine-tuning.html',sched:'scheduled.html',memory:'memory.html',integrations:'integrations.html',audit:'audit.html'};
DATA.dock=['overview','tasks','chat','integrations'];

/* Operations — demo queue, workers and errors (the window switch only slices the throughput series) */
DATA.ops={
 throughput:[3,5,2,6,4,8,5,9,7,11,6,12,9,14,10,13,8,12,15,11,9,13,16,14],
 fails:[0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
 queue:[
  ['OP-2281','correlate','T-0218','claude-sonnet-4.5','run','38s',.00483],
  ['OP-2282','rollout · wave 3','T-0217','qwen3-coder-30b · local','run','6m 50s',.00854],
  ['OP-2283','report','T-0218','claude-sonnet-4.5','wait','—',0],
  ['OP-2284','simulate_load','S-06','mistral-large','wait','02:30',0],
  ['OP-2285','pg_basebackup','S-02','qwen3-4b · local','wait','03:00',0]
 ],
 workers:[
  ['cloud-router',.62,'7 models · p95 840 ms'],
  ['local · qwen3-4b',.18,'41.7 tok/s · 4.1 GB VRAM'],
  ['local · qwen3-coder-30b',.54,'rollout agent · 19 GB unified'],
  ['runpod · A40',.91,'fine-tune ft-0009']
 ],
 errors:[['apply_patch','admission webhook denied · checkout-svc','21:02'],['deploy_certs','edge-17 stale config lock → retry','23:58']]
};
