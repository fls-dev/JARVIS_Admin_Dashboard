/* JARVIS Orbital · by fls-dev · https://github.com/fls-dev */
/* JARVIS Orbital — demo data. The ONLY place with content; every page renders from window.JV.data.
   All content is demo data (plausible DevOps / SRE placeholders). Replace it with API responses. */
window.JV = window.JV || {};
JV.data = {
  user: { name:'Alex Morgan', short:'AM', workspace:'Acme', role:'Platform owner' },

  /* rooms: order = hotkey 1–9 and the position on the orbit dial. glyph = icon key */
  nav: [
    { id:'overview',     href:'overview.html',     label:'Overview',       short:'Overview',     count:'today',  desc:'Spend, live ledger, fleet health' },
    { id:'tasks',        href:'tasks.html',        label:'Tasks',          short:'Tasks',        count:'12',     desc:'Plans, revisions, steps and artifacts', live:true },
    { id:'operations',   href:'operations.html',   label:'Operations',     short:'Ops',          count:'2 live', desc:'Queue, workers, throughput, errors' },
    { id:'local-chat',   href:'local-chat.html',   label:'Local chat',     short:'Chat',         count:'qwen3',  desc:'Talk to on-device models, $0 per token' },
    { id:'fine-tuning',  href:'fine-tuning.html',  label:'Fine-tuning',    short:'Tuning',       count:'1 run',  desc:'Datasets, runs and LoRA adapters' },
    { id:'scheduled',    href:'scheduled.html',    label:'Scheduled work', short:'Scheduled',    count:'6 jobs', desc:'Cron jobs on a 24 h timeline' },
    { id:'memory',       href:'memory.html',       label:'Memory',         short:'Memory',       count:'2 148',  desc:'Facts, runbooks, hosts and files' },
    { id:'integrations', href:'integrations.html', label:'Integrations',   short:'Integrations', count:'13/46',  desc:'Connections, processors, catalog' },
    { id:'audit',        href:'audit.html',        label:'Audit trail',    short:'Audit',        count:'318',    desc:'Every action, signed and chained' }
  ],

  today: { spend:0.091264, budget:0.50, ops:17, completed:8, failed:1, running:2, queued:3, models:7, tokens:52840, vsYesterday:+24 },
  trend: [.0024,.0031,.0019,.0049,.0044,.0061,.0052,.0075,.0057,.0094,.0066,.0102,.0091,.0131],

  /* fleet health ring (DEMO) */
  fleet: [
    { n:'gateway-eu-west', k:'edge',  st:'warn', v:'p95 1.84 s', load:.78 },
    { n:'nginx fleet · 24',k:'edge',  st:'run',  v:'patch 14/24', load:.58 },
    { n:'k8s prod-eu',     k:'k8s',   st:'ok',   v:'42 / 60 pods', load:.70 },
    { n:'postgres-main',   k:'db',    st:'ok',   v:'lag 0.3 s', load:.41 },
    { n:'ci-runners',      k:'ci',    st:'ok',   v:'6 idle', load:.22 },
    { n:'dns · cloudflare',k:'net',   st:'err',  v:'SERVFAIL 0.4 %', load:.12 }
  ],

  /* TASKS (DEMO) — steps: [name, cost, attempts, state, seconds] */
  tasks: [
    { id:'T-0218', no:218, t:'Investigate latency spike on gateway-eu-west', cost:0.007420, st:'run', dur:'running', model:'claude-sonnet-4.5', time:'00:21', rev:1, tag:'incident',
      steps:[['pull_metrics',.00041,1,'done',6],['trace_sample',.00218,1,'done',14],['correlate',.00483,1,'run',38],['report',0,0,'wait',0]] },
    { id:'T-0217', no:217, t:'Patch CVE-2026-1182 on the nginx fleet (24 hosts)', cost:0.012960, st:'run', dur:'running', model:'qwen3-coder-30b · local', time:'00:08', rev:2, tag:'security',
      steps:[['inventory',.0003,1,'done',9],['canary',.00412,1,'done',120],['rollout',.00854,1,'run',410],['verify',0,0,'wait',0]] },
    { id:'T-0216', no:216, t:'Rotate TLS certificates for *.example.com before expiry', cost:0.018431, st:'done', dur:'2m 04s', model:'claude-sonnet-4.5', time:'23:52', rev:3, tag:'security',
      steps:[['scan_expiry',.00102,1,'done',8],['issue_acme',.00431,1,'done',31],['deploy_certs',.0113,2,'done',72],['probe_tls',.0018,1,'done',13]] },
    { id:'T-0215', no:215, t:'Postgres backup to S3 and full restore test', cost:0.014220, st:'done', dur:'6m 41s', model:'gemini-2.5-pro', time:'23:10', rev:1, tag:'data',
      steps:[['pg_basebackup',.0009,1,'done',190],['upload_s3',.0004,1,'done',88],['restore_staging',.00872,1,'done',96],['checksum',.0042,1,'done',27]] },
    { id:'T-0214', no:214, t:'IAM audit: unused keys and over-privileged roles', cost:0.021107, st:'done', dur:'58s', model:'gemini-2.5-pro', time:'22:41', rev:1, tag:'security',
      steps:[['list_principals',.00211,1,'done',12],['diff_policies',.01402,1,'done',31],['summarize',.00497,1,'done',15]] },
    { id:'T-0213', no:213, t:'Migrate CI from Jenkins to GitHub Actions (api-core)', cost:0.026380, st:'done', dur:'3m 22s', model:'claude-sonnet-4.5', time:'21:57', rev:2, tag:'ci',
      steps:[['read_jenkinsfile',.0011,1,'done',7],['write_workflows',.01906,1,'done',64],['dry_run',.00622,2,'done',131]] },
    { id:'T-0212', no:212, t:'Tune k8s HPA autoscaling for checkout-svc', cost:0.006210, st:'fail', dur:'22s', model:'mistral-large', time:'21:02', rev:1, tag:'k8s',
      steps:[['fetch_hpa',.00081,1,'done',3],['simulate_load',.0054,3,'done',17],['apply_patch',0,1,'fail',2]] },
    { id:'T-0211', no:211, t:'Fix intermittent DNS SERVFAIL for api.example.com', cost:0.004318, st:'done', dur:'41s', model:'deepseek-chat', time:'20:47', rev:1, tag:'network',
      steps:[['dig_trace',.000918,1,'done',9],['check_dnssec',.0034,1,'done',32]] },
    { id:'T-0210', no:210, t:'Harden SSH on bastion hosts (keys only, no root)', cost:0.003120, st:'done', dur:'27s', model:'qwen3-4b · local', time:'19:30', rev:2, tag:'security',
      steps:[['audit_sshd',.00052,1,'done',6],['write_config',.0021,1,'done',15],['reload_verify',.0005,1,'done',6]] },
    { id:'T-0209', no:209, t:'Write incident postmortem PDF for INC-0412', cost:0.017890, st:'done', dur:'1m 12s', model:'claude-sonnet-4.5', time:'18:05', rev:2, tag:'incident',
      steps:[['collect_timeline',.00189,1,'done',10],['draft_rca',.01302,1,'done',41],['render_pdf',.00298,2,'done',21]] },
    { id:'T-0208', no:208, t:'Clean up orphaned EBS volumes and snapshots', cost:0.002640, st:'done', dur:'18s', model:'qwen3-4b · local', time:'17:12', rev:1, tag:'cost',
      steps:[['list_volumes',.0004,1,'done',6],['tag_orphans',.00224,1,'done',12]] },
    { id:'T-0207', no:207, t:'Rotate Vault root token and re-seal staging', cost:0.001890, st:'done', dur:'14s', model:'qwen3-coder-30b · local', time:'16:40', rev:1, tag:'security',
      steps:[['generate_root',0,1,'done',4],['reseal',.00189,1,'done',10]] }
  ],

  /* detail for the selected task on tasks.html (DEMO) */
  taskDetail: {
    'T-0216': {
      request:'Rotate TLS certificates for *.example.com — 9 days to expiry. Zero downtime, keep OCSP stapling on.',
      revisions:[
        { r:1, at:'23:44', note:'First plan: 5 steps incl. manual CSR, est. $0.031', cost:0, st:'rejected' },
        { r:2, at:'23:47', note:'Switched to ACME DNS-01, budget $0.025', cost:0, st:'superseded' },
        { r:3, at:'23:49', note:'Approved · 4 steps · est. $0.021', cost:.018431, st:'approved' }
      ],
      plan:[
        { n:1, t:'Scan all endpoints for certificate expiry', tool:'ssl.scan', est:.0011, gate:false },
        { n:2, t:'Issue wildcard via ACME DNS-01 (Cloudflare)', tool:'acme.issue', est:.0045, gate:false },
        { n:3, t:'Deploy to 24 nginx hosts, rolling, reload not restart', tool:'ansible.play', est:.0120, gate:true },
        { n:4, t:'Probe TLS chain, OCSP and HSTS on every host', tool:'tls.probe', est:.0020, gate:false }
      ],
      result:'Done: wildcard *.example.com renewed (valid until 16 Feb 2027, ECDSA P-256). Rolled out to 24/24 nginx hosts in 3 waves with zero dropped connections. Host edge-17 needed a second attempt (stale config lock). OCSP stapling verified, HSTS preload intact, old cert revoked.',
      files:[
        { n:'tls-rotation-report.pdf', k:'application/pdf', size:'212 KB', v:'r2' },
        { n:'rollout.log', k:'text/plain', size:'48 KB', v:'r1' },
        { n:'probe-results.json', k:'application/json', size:'9 KB', v:'r1' },
        { n:'nginx-ssl.conf', k:'text/plain', size:'3 KB', v:'r1' }
      ],
      tokens:{ in:11240, out:2380 }
    }
  },

  activity: [
    ['00:23:41','correlate','T-0218','p95 tracks upstream auth-svc · r=0.91'],
    ['00:23:12','rollout','T-0217','wave 2/3 · edge-09…edge-16 patched'],
    ['23:59:02','probe_tls','T-0216','24/24 hosts · chain OK · OCSP stapled'],
    ['23:58:30','retry','T-0216','deploy_certs attempt 2 · edge-17 lock'],
    ['23:17:48','checksum','T-0215','restore verified · 214 GB · 0 diffs'],
    ['22:41:19','summarize','T-0214','7 unused keys · 3 roles with *:*'],
    ['21:02:44','error','T-0212','apply_patch: admission webhook denied']
  ],
  activityPool: [
    ['rollout','T-0217','edge-17 patched · nginx 1.27.3'],
    ['tokens','T-0218','prompt cache hit · 1 204 tokens saved'],
    ['correlate','T-0218','auth-svc pool saturation at 23:58'],
    ['alert','—','gateway-eu-west p95 back under 600 ms'],
    ['memory','—','runbook saved: TLS rotation via ACME'],
    ['heartbeat','—','Jarvis Local · Qwen3 4B · 182 ms'],
    ['schedule','S-02','pg-backup scheduled 03:00'],
    ['probe','—','dns SERVFAIL rate 0.02 %']
  ],

  /* spend by model today (DEMO) */
  models: [
    { n:'claude-sonnet-4.5', v:.044281, c:'#8BE9FF' },
    { n:'gemini-2.5-pro',    v:.035327, c:'#A99BFF' },
    { n:'mistral-large',     v:.00621,  c:'#FFB36B' },
    { n:'deepseek-chat',       v:.004318, c:'#FF8A5C' },
    { n:'qwen3-coder · local',v:.001128,c:'#6CF0C2' },
    { n:'qwen3-4b · local',  v:0,       c:'#5B6AA8' }
  ],

  /* INTEGRATIONS — names, kinds, capability counts, recipient id: demo */
  connections: [
    { id:'mac-coder', n:'Jarvis Local · Mac Qwen3-Coder-30B', s:'Qwen3-Coder 30B', k:'OpenAI-compatible', cap:1,  calls:3,  lat:410, spend:0,       c:'#B48CFF', url:'https://jarvis.example.com/mac-llm/v1' },
    { id:'qwen4b',    n:'Jarvis Local · Qwen3 4B Q5_K_M',     s:'Qwen3 4B',        k:'OpenAI-compatible', cap:1,  calls:12, lat:182, spend:0,       c:'#B48CFF', url:'https://jarvis.example.com/local-llm/v1' },
    { id:'xai',       n:'xAI',             k:'OpenAI-compatible', cap:18, calls:0,  lat:0,   spend:0,        c:'#EDEDE6', url:'https://api.x.ai/v1' },
    { id:'anthropic', n:'Anthropic',       k:'Anthropic',         cap:5,  calls:38, lat:820, spend:.042712,  c:'#D97757' },
    { id:'gemini',    n:'Google Gemini',   k:'Google',            cap:19, calls:17, lat:590, spend:.021107,  c:'#4F8BFF' },
    { id:'mistral',   n:'Mistral AI',      k:'Mistral',           cap:18, calls:6,  lat:710, spend:.00621,   c:'#FF7000' },
    { id:'deepseek',  n:'DeepSeek',        k:'DeepSeek',          cap:2,  calls:4,  lat:930, spend:.004318,  c:'#4D6BFE' },
    { id:'gpt',       n:'gpt',             k:'OpenAI',            cap:4,  calls:21, lat:640, spend:.011204,  c:'#10A37F' },
    { id:'runpod',    n:'RunPod GPU',      k:'Training',          cap:0,  calls:1,  lat:0,   spend:0,        c:'#8B5CF6' },
    { id:'cursor',    n:'Cursor IDE',      k:'IDE',               cap:0,  calls:2,  lat:0,   spend:0,        c:'#EDEDE6' },
    { id:'telegram',  n:'Telegram Bot',    k:'Messaging',         cap:0,  calls:9,  lat:120, spend:0,        c:'#2AABEE', recipients:'123456789' },
    { id:'twilio',    n:'Twilio ConversationRelay', s:'Twilio Relay', k:'Telephony', cap:0, calls:0, lat:0, spend:0, c:'#F22F46' },
    { id:'tavily',    n:'Tavily',          k:'Search',            cap:0,  calls:14, lat:950, spend:0,        c:'#5BE49B' }
  ],
  processors: [
    { n:'Managed S3 object storage',        ops:'upload · download · version · delete', mime:'*/*', limit:'250.0 MB', required:true },
    { n:'Native text and source editor',    ops:'create · read · edit · version', mime:'text/*, application/json, application/ld+json, application/xml, application/javascript, application/typescript, application/sql, application/yaml', limit:'250.0 MB' },
    { n:'Managed PDF renderer',             ops:'create · edit · version · render', mime:'application/pdf', limit:'250.0 MB' },
    { n:'Managed Word document renderer',   ops:'create · edit · version · render', mime:'application/vnd.openxmlformats-officedocument.wordprocessingml.document', limit:'250.0 MB' },
    { n:'Managed spreadsheet renderer',     ops:'create · edit · version · render', mime:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', limit:'250.0 MB' },
    { n:'Managed presentation renderer',    ops:'create · edit · version · render', mime:'application/vnd.openxmlformats-officedocument.presentationml.presentation', limit:'250.0 MB' }
  ],
  /* catalog: [name, tab, kind, description, connected?]  tabs: ai | tools | mcp.
     demo entries. */
  catalog: [
    ['OpenAI','ai','AI provider','Native API adapter',1],
    ['Anthropic','ai','AI provider','Native API adapter',1],
    ['Google Gemini','ai','AI provider','Native API adapter',1],
    ['Mistral AI','ai','AI provider','Native API adapter',1],
    ['DeepSeek','ai','AI provider','Native API adapter',1],
    ['Jarvis Local · Qwen3 4B','ai','AI provider','https://jarvis.example.com/local-llm/v1',1],
    ['Jarvis Local · Mac Qwen3-Coder-30B','ai','AI provider','https://jarvis.example.com/mac-llm/v1',1],
    ['Groq','ai','AI provider','https://api.groq.com/openai/v1'],
    ['xAI','ai','AI provider','https://api.x.ai/v1',1],
    ['OpenRouter','ai','AI provider','https://openrouter.ai/api/v1'],
    ['Together AI','ai','AI provider','https://api.together.xyz/v1'],
    ['Fireworks AI','ai','AI provider','https://api.fireworks.ai/inference/v1'],
    ['Perplexity','ai','AI provider','https://api.perplexity.ai'],
    ['Cerebras','ai','AI provider','https://api.cerebras.ai/v1'],
    ['NVIDIA NIM','ai','AI provider','https://integrate.api.nvidia.com/v1'],
    ['Kimi · Moonshot AI','ai','AI provider','https://api.moonshot.ai/v1'],
    ['Alibaba Qwen','ai','AI provider','https://dashscope-intl.aliyuncs.com/compatible-mode/v1'],
    ['Zhipu AI','ai','AI provider','https://open.bigmodel.cn/api/paas/v4'],
    ['SiliconFlow','ai','AI provider','https://api.siliconflow.com/v1'],
    ['Novita AI','ai','AI provider','https://api.novita.ai/openai/v1'],
    ['SambaNova','ai','AI provider','https://api.sambanova.ai/v1'],
    ['Custom OpenAI-compatible','ai','AI provider','Native API adapter'],
    ['Tavily Search','tools','Search','Purpose-built, verified adapter',1],
    ['Brave Search','tools','Search','Purpose-built, verified adapter'],
    ['OpenAI Video','tools','Video','Purpose-built, verified adapter'],
    ['Google Veo','tools','Video','Purpose-built, verified adapter'],
    ['Kling AI Video','tools','Video','Purpose-built, verified adapter'],
    ['Twilio Media Streams','tools','Telephony','Purpose-built, verified adapter'],
    ['Telegram Bot','tools','Messaging','Purpose-built, verified adapter',1],
    ['RunPod GPU','tools','Training','Purpose-built, verified adapter',1],
    ['Cursor IDE','tools','IDE','Purpose-built, verified adapter',1],
    ['GitHub Issues','tools','Productivity','Purpose-built, verified adapter'],
    ['Slack','tools','Productivity','Purpose-built, verified adapter'],
    ['Google Workspace','tools','Productivity','Purpose-built, verified adapter'],
    ['inference.sh','mcp','MCP · 1.0.0','Run 150+ AI apps — image, video, audio, LLMs, 3D and more. Browse, execute, stream results.'],
    ['inference.sh','mcp','MCP · 1.0.1','Run 150+ AI apps — image, video, audio, LLMs, 3D and more. Browse, execute, stream results.'],
    ['inference.sh','mcp','MCP · 2.0.0','run any ai model. compose agents, stack knowledge, connect tools. one api, pay per run.'],
    ['inference.sh','mcp','MCP · 2.0.1','run any ai model. compose agents, stack knowledge, connect tools. one api, pay per run.'],
    ['Mizan','mcp','MCP · 1.2.0','Player ban records from 560+ game community ban lists, with Steam\u2019s own bans. Reads need no key.'],
    ['ac.snag/snag','mcp','MCP · 1.0.0','Gives your coding agent the captured console, network, replay and screenshot evidence for a bug.'],
    ['ac.tandem/docs-mcp','mcp','MCP · 0.3.0','Remote MCP server for Tandem docs, install guides, SDKs, workflows, and agent setup help.'],
    ['ac.tandem/docs-mcp','mcp','MCP · 0.3.1','Remote MCP server for Tandem docs, install guides, SDKs, workflows, and agent setup help.'],
    ['filesystem','mcp','MCP','Local files, read and write inside an allow-listed root.'],
    ['playwright','mcp','MCP','Browser automation: navigate, click, capture screenshots.'],
    ['postgres','mcp','MCP','Read-only SQL over MCP with schema introspection.'],
    ['notion','mcp','MCP','Pages and databases as agent context.']
  ],
  catalogTabs: [ ['all','All'], ['ai','AI providers'], ['tools','Search, video & voice'], ['mcp','MCP registry'] ],

  /* FINE-TUNING (DEMO) */
  ft: {
    base:'Qwen3 4B', method:'LoRA · r16 · α32', gpu:'RunPod · 1× A40 48 GB',
    run:{ id:'ft-0009', name:'jarvis-sre-runbooks-r3', status:'training', epoch:2, epochs:3, step:1840, steps:2760, eta:'14 min', cost:1.84, lr:'2e-4', batch:16, ctx:4096 },
    loss:[2.41,2.12,1.93,1.78,1.66,1.58,1.49,1.43,1.37,1.33,1.28,1.25,1.21,1.19,1.16,1.14,1.12,1.11,1.09,1.08],
    evalLoss:[2.45,2.2,2.02,1.88,1.79,1.71,1.65,1.6,1.56,1.53,1.5,1.48,1.46,1.45,1.44,1.43,1.42,1.42,1.41,1.41],
    datasets:[
      { n:'incident-chats-2026', rows:4210, tokens:'3.1M', q:96, note:'on-call threads, PII scrubbed' },
      { n:'runbooks-r2',         rows:1180, tokens:'0.9M', q:91, note:'runbooks with step outcomes' },
      { n:'tool-calls-json',     rows:2630, tokens:'1.4M', q:88, note:'kubectl / terraform calls, strict JSON' }
    ],
    runs:[
      { id:'ft-0009', n:'jarvis-sre-runbooks-r3', st:'run',  loss:1.08, ev:'—',    cost:1.84, at:'today 23:30' },
      { id:'ft-0008', n:'jarvis-sre-runbooks-r2', st:'done', loss:1.21, ev:'71.4', cost:2.65, at:'14 Nov' },
      { id:'ft-0007', n:'tool-json-strict',       st:'done', loss:0.94, ev:'83.0', cost:1.12, at:'09 Nov' },
      { id:'ft-0006', n:'jarvis-sre-runbooks-r1', st:'fail', loss:'—',  ev:'—',    cost:0.31, at:'02 Nov' }
    ],
    adapters:[ { n:'jarvis-sre-runbooks-r2', base:'Qwen3 4B', size:'66 MB', active:true, score:'71.4' }, { n:'tool-json-strict', base:'Qwen3 4B', size:'66 MB', active:false, score:'83.0' } ]
  },

  /* LOCAL CHAT (DEMO) */
  chat: {
    model:'Qwen3 4B Q5_K_M', endpoint:'jarvis.example.com/local-llm/v1', ctx:'4 096', tps:41.7, ttft:182,
    messages:[
      { who:'me', t:'Why did p95 on gateway-eu-west jump after midnight?' },
      { who:'ai', t:'p95 went from 410 ms to 1.84 s at 23:58. It tracks auth-svc: its DB pool hit 100/100 connections right when the nightly IAM sync started. The gateway itself is fine — CPU 38 %, no 5xx. T-0218 is still correlating traces to confirm.', meta:'qwen3-4b · 64 tok · 1.5 s · $0.000000' },
      { who:'me', t:'Quick mitigation?' },
      { who:'ai', t:'Raise the auth-svc pool to 160 and move the IAM sync to 03:30, after the pg backup. Both are reversible in one command. Want me to queue them as a plan for approval?', meta:'qwen3-4b · 41 tok · 1.0 s · $0.000000' }
    ],
    presets:['Summarize last night','Find the costliest steps','Explain T-0212 failure','Draft postmortem outline']
  },

  /* MEMORY (DEMO) */
  memory: {
    total:2148, kinds:[['fact',1312],['runbook',204],['file',388],['host',96],['policy',148]],
    items:[
      { k:'runbook', t:'TLS rotation: ACME DNS-01 via Cloudflare, roll nginx in 3 waves, reload not restart', src:'T-0216', at:'23:58', w:.92 },
      { k:'host',    t:'edge-17 keeps a stale config lock — clear /var/lock/nginx-deploy before rollout', src:'T-0216', at:'23:58', w:.81 },
      { k:'file',    t:'tls-rotation-report.pdf · 4 pages · r2', src:'T-0216', at:'23:59', w:.77 },
      { k:'fact',    t:'auth-svc DB pool saturates at 100 connections during IAM sync', src:'T-0218', at:'00:23', w:.84 },
      { k:'policy',  t:'Production changes need a canary and an approval gate before rollout', src:'T-0217', at:'00:08', w:.88 },
      { k:'fact',    t:'Postgres restore of 214 GB takes 96 s on staging (gp3, 6k IOPS)', src:'T-0215', at:'23:17', w:.69 },
      { k:'policy',  t:'SSH: keys only, PermitRootLogin no, AllowGroups ops', src:'T-0210', at:'19:30', w:.66 },
      { k:'runbook', t:'Postmortem template: impact, timeline, root cause, 5 whys, action items', src:'T-0209', at:'18:05', w:.71 }
    ]
  },

  /* SCHEDULED (DEMO) — h = hour on the 24 h timeline */
  scheduled: [
    { id:'S-01', n:'Certificate expiry scan',        cron:'0 6 * * *',   human:'Every day · 06:00',  next:'in 5 h 38 min', last:'ok',   lastAt:'06:00',   model:'qwen3-4b · local',  cost:0,      on:true,  h:6 },
    { id:'S-02', n:'Postgres backup → S3',           cron:'0 3 * * *',   human:'Every day · 03:00',  next:'in 2 h 38 min', last:'ok',   lastAt:'03:00',   model:'qwen3-4b · local',  cost:0.0004, on:true,  h:3 },
    { id:'S-03', n:'Weekly restore drill',           cron:'0 4 * * 0',   human:'Sundays · 04:00',    next:'Sun 04:00',     last:'ok',   lastAt:'Sun 04:00', model:'gemini-2.5-pro', cost:0.014,  on:true,  h:4 },
    { id:'S-04', n:'IAM drift report',               cron:'30 9 * * 1',  human:'Mondays · 09:30',    next:'Mon 09:30',     last:'ok',   lastAt:'Mon 09:30', model:'gemini-2.5-pro', cost:0.021,  on:true,  h:9.5 },
    { id:'S-05', n:'CVE feed triage · nginx, openssl',cron:'0 */6 * * *',human:'Every 6 h',          next:'in 5 h 38 min', last:'ok',   lastAt:'00:00',   model:'claude-sonnet-4.5', cost:0.006,  on:true,  h:12 },
    { id:'S-06', n:'k8s HPA re-tune · checkout-svc', cron:'30 2 * * *',  human:'Every day · 02:30',  next:'in 2 h 08 min', last:'fail', lastAt:'yesterday', model:'mistral-large',  cost:0.006,  on:false, h:2.5 }
  ],

  /* AUDIT (DEMO) */
  audit: [
    { at:'00:23:12', who:'Alex M.',  act:'plan.approve',      obj:'T-0218', sev:'info', ip:'203.0.113.x', hash:'9f2c…a1' },
    { at:'00:08:04', who:'Alex M.',  act:'gate.approve',      obj:'T-0217 · rollout', sev:'warn', ip:'203.0.113.x', hash:'71be…0c' },
    { at:'23:59:02', who:'JARVIS',    act:'file.write',        obj:'tls-rotation-report.pdf', sev:'info', ip:'—', hash:'c03d…77' },
    { at:'23:58:30', who:'JARVIS',    act:'tool.retry',        obj:'deploy_certs · edge-17', sev:'warn', ip:'—', hash:'5ab1…e9' },
    { at:'23:49:41', who:'Alex M.',  act:'budget.set',        obj:'$0.025 · T-0216', sev:'info', ip:'203.0.113.x', hash:'d4e8…13' },
    { at:'22:40:11', who:'Alex M.',  act:'secret.rotate',     obj:'Anthropic key', sev:'warn', ip:'203.0.113.x', hash:'e1aa…5f' },
    { at:'21:02:44', who:'JARVIS',    act:'tool.error',        obj:'kubectl apply · admission webhook', sev:'err', ip:'—', hash:'aa90…2b' },
    { at:'20:12:09', who:'Alex M.',  act:'integration.verify',obj:'Telegram Bot · 123456789', sev:'info', ip:'203.0.113.x', hash:'3c6f…d0' },
    { at:'19:58:31', who:'deploy-bot',act:'adapter.activate',  obj:'jarvis-sre-runbooks-r2', sev:'info', ip:'10.0.0.4', hash:'b8d2…44' },
    { at:'18:44:20', who:'Unknown',   act:'auth.fail',         obj:'ssh bastion-2 · 3 attempts', sev:'err', ip:'185.220.x.x', hash:'0e7c…9a' },
    { at:'17:30:02', who:'Alex M.',  act:'processor.disable', obj:'Presentation renderer', sev:'warn', ip:'203.0.113.x', hash:'6f41…c8' },
    { at:'16:05:55', who:'Alex M.',  act:'auth.login',        obj:'2FA · Chrome', sev:'info', ip:'203.0.113.x', hash:'12ad…f3' }
  ],

  /* OPERATIONS (DEMO) */
  ops: {
    throughput:[3,5,2,6,4,8,5,9,7,11,6,12,9,14,10,13,8,12,15,11,9,13,16,14],
    queue:[
      { id:'OP-2281', task:'T-0218', step:'correlate', model:'claude-sonnet-4.5', st:'run', t:'38 s', cost:.00483 },
      { id:'OP-2282', task:'T-0217', step:'rollout · wave 3', model:'qwen3-coder-30b · local', st:'run', t:'6 m 50 s', cost:.00854 },
      { id:'OP-2283', task:'T-0218', step:'report', model:'claude-sonnet-4.5', st:'wait', t:'—', cost:0 },
      { id:'OP-2284', task:'S-06',   step:'simulate_load', model:'mistral-large', st:'wait', t:'02:30', cost:0 },
      { id:'OP-2285', task:'S-02',   step:'pg_basebackup', model:'qwen3-4b · local', st:'wait', t:'03:00', cost:0 }
    ],
    workers:[
      { n:'cloud-router',          load:.62, note:'7 models · p95 840 ms' },
      { n:'local · qwen3-4b',      load:.18, note:'41.7 tok/s · 4.1 GB VRAM' },
      { n:'local · qwen3-coder-30b', load:.54, note:'rollout agent · 19 GB unified' },
      { n:'runpod · A40',          load:.91, note:'fine-tune ft-0009' }
    ],
    errors:[ ['apply_patch','admission webhook denied · checkout-svc','21:02'], ['deploy_certs','edge-17 stale config lock → retry','23:58'] ]
  }
};
