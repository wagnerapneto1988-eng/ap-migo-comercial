const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const CFG=window.WAP_APP_CONFIG||{};
const PROSPECTS=window.WAP_PROSPECTS||{};

const SEGMENTS=[
 {id:'pizzaria',label:'Pizzaria',icon:'🍕',family:'food'},
 {id:'lanchonete',label:'Lanchonete',icon:'🍔',family:'food'},
 {id:'marmitaria',label:'Marmitaria',icon:'🍱',family:'food'},
 {id:'doceria',label:'Doceria',icon:'🧁',family:'food'},
 {id:'restaurante',label:'Restaurante',icon:'🍽️',family:'food'},
 {id:'hamburgueria',label:'Hamburgueria',icon:'🍔',family:'food'},
 {id:'escola',label:'Escola',icon:'🏫',family:'education'},
 {id:'professor',label:'Professor',icon:'👨‍🏫',family:'education'},
 {id:'curso_livre',label:'Curso Livre',icon:'📘',family:'education'},
 {id:'idiomas',label:'Idiomas',icon:'🌍',family:'education'}
];

const QUESTIONS=[
 {id:'segment',title:'Qual cenário mais se aproxima da sua atividade?',hint:'Usamos esta resposta apenas quando sua origem ainda não identificou o segmento.',choices:[
  ['food','🍽️','Alimentação / delivery','Pizzaria, restaurante, lanchonete...'],
  ['education','🎓','Educação / cursos','Professor, escola, curso livre...'],
  ['other','✨','Outro segmento','Vamos aprofundar antes de recomendar.']]},
 {id:'objective',title:'Qual é o principal objetivo do seu negócio hoje?',hint:'Escolha o que mais importa neste momento.',choices:[
  ['experience','↗','Melhorar experiência','Tornar a jornada mais clara e agradável'],
  ['automation','⚙','Otimizar processos','Reduzir tarefas repetitivas'],
  ['conversion','◎','Aumentar resultado','Melhorar conversão e fechamento'],
  ['presence','◖','Divulgar minha marca','Fortalecer presença digital']]},
 {id:'difficulty',title:'Onde está o maior ponto de dificuldade?',hint:'Isso ajuda a separar sintoma de necessidade.',choices:[
  ['abandon','↪','Pessoas abandonam o caminho','Há atrito antes da conclusão'],
  ['manual','⚙','Processos muito manuais','Tempo gasto em tarefas repetidas'],
  ['clarity','✦','Comunicação pouco clara','O público não entende o próximo passo'],
  ['measure','▥','Difícil medir o que funciona','Falta leitura da jornada']]},
 {id:'channel',title:'Qual canal hoje mais aproxima você do público?',hint:'Queremos entender onde a jornada realmente acontece.',choices:[
  ['whatsapp','☎','WhatsApp','Contato direto e fechamento'],
  ['social','◎','Redes sociais','Descoberta e relacionamento'],
  ['site','▣','Site / plataforma','Experiência própria'],
  ['mixed','⌁','Canais sem integração','Cada canal funciona isolado']]},
 {id:'automation',title:'Quanto do processo já é automatizado?',hint:'Não existe resposta certa. Queremos medir o estágio atual.',choices:[
  ['none','◷','Quase tudo manual','Baixo nível de automação'],
  ['some','⌘','Algumas etapas','Automação pontual'],
  ['medium','⚙','Boa parte integrada','Processos conectados'],
  ['high','↗','Automação estratégica','Integração madura']]},
 {id:'result',title:'Qual resultado você mais gostaria de enxergar melhor?',hint:'Última leitura antes de mostrarmos o cenário identificado.',choices:[
  ['journey','↝','Onde o público abandona','Leitura de jornada'],
  ['priority','◎','Qual é a prioridade','Direção mais clara'],
  ['conversion','↗','Conversão / vendas','Resultado comercial'],
  ['engagement','✦','Engajamento','Relacionamento e recorrência']]}
];


function iconSVG(key){
 const icons={
  food:'<svg viewBox="0 0 24 24"><path d="M4 3v8m3-8v8M4 7h3m-1.5 4v10M15 3v8c0 2 1 3 3 3V3m0 11v7"/></svg>',
  education:'<svg viewBox="0 0 24 24"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v5c3 2 7 2 10 0v-5M21 9v6"/></svg>',
  other:'<svg viewBox="0 0 24 24"><path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l3 3m6 6 3 3m0-12-3 3m-6 6-3 3"/></svg>',
  experience:'<svg viewBox="0 0 24 24"><path d="M4 19V9m6 10V5m6 14v-7m-9 3 5-5 3 3 5-6"/></svg>',
  automation:'<svg viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M4 12H2m20 0h-2M12 4V2m0 20v-2M6.3 6.3 4.9 4.9m14.2 14.2-1.4-1.4m0-11.4 1.4-1.4M4.9 19.1l1.4-1.4"/></svg>',
  conversion:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m15 9 5-5m0 0v4m0-4h-4"/></svg>',
  presence:'<svg viewBox="0 0 24 24"><path d="M4 13v-2l10-5v12L4 13Z"/><path d="M14 9h3l3-2v10l-3-2h-3M6 14l1 5h4"/></svg>',
  abandon:'<svg viewBox="0 0 24 24"><path d="M5 5v14h14"/><path d="m7 8 4 4 3-3 4 5"/></svg>',
  manual:'<svg viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M4 12H2m20 0h-2M12 4V2m0 20v-2M6.3 6.3 4.9 4.9m14.2 14.2-1.4-1.4"/></svg>',
  clarity:'<svg viewBox="0 0 24 24"><path d="M9 18h6m-5 3h4"/><path d="M8 14c-1.5-1.2-2-2.7-2-4.5a6 6 0 1 1 12 0c0 1.8-.5 3.3-2 4.5-1 .8-1 1.5-1 2H9c0-.5 0-1.2-1-2Z"/></svg>',
  measure:'<svg viewBox="0 0 24 24"><path d="M4 19V9m5 10v-6m5 6V5m5 14v-9"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 2.8 2.1 4.4 4.8 5"/></svg>',
  social:'<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="7" r="2"/><path d="M3 20c0-4 2-7 5-7s5 3 5 7M14 14c3 0 5 2 5 6"/></svg>',
  site:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18m-13-3h.01m3 0h.01"/></svg>',
  mixed:'<svg viewBox="0 0 24 24"><path d="M7 7h10M7 17h10M5 7l-2 2 2 2m14 6 2-2-2-2"/></svg>',
  none:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="m7 7 10 10"/></svg>',
  some:'<svg viewBox="0 0 24 24"><path d="M5 12h14M9 8l-4 4 4 4"/><circle cx="17" cy="12" r="2"/></svg>',
  medium:'<svg viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M4 12H2m20 0h-2M12 4V2m0 20v-2"/></svg>',
  high:'<svg viewBox="0 0 24 24"><path d="M4 18 10 12l4 4 6-9"/><path d="M16 7h4v4"/></svg>',
  journey:'<svg viewBox="0 0 24 24"><path d="M4 6h7a3 3 0 0 1 3 3v6a3 3 0 0 0 3 3h3"/><path d="m17 15 3 3-3 3"/><circle cx="4" cy="6" r="2"/></svg>',
  priority:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg>',
  engagement:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-4 4v-4H4Z"/><path d="M8 9h8m-8 3h5"/></svg>'
 };
 return icons[key]||icons.other;
}
function signalSVG(type,index){
 const keys=type==='need'?['abandon','automation','measure']:['experience','clarity'];
 return iconSVG(keys[index%keys.length]);
}

const state={
 view:'intro',screen:'question',segment:'unknown',family:'unknown',
 answers:{},queue:[],qIndex:0,prospect:null
};

const params=new URLSearchParams(location.search);
const prospectId=params.get('prospect');
const source=params.get('source')||document.referrer||'direct';

function normalizeSegment(v){
 if(!v)return null;
 const n=String(v).toLowerCase().trim().replace(/\s+/g,'_');
 return SEGMENTS.some(s=>s.id===n)?n:null;
}
if(prospectId&&PROSPECTS[prospectId]){
 state.prospect={id:prospectId,...PROSPECTS[prospectId]};
 state.segment=normalizeSegment(state.prospect.segmento)||'unknown';
}else state.segment=normalizeSegment(params.get('segment'))||'unknown';
state.family=SEGMENTS.find(s=>s.id===state.segment)?.family||'unknown';

let session=localStorage.getItem('wap_session_id')||(crypto.randomUUID?.()||('wap-'+Date.now()));
localStorage.setItem('wap_session_id',session);
let events=JSON.parse(localStorage.getItem('wap_journey_events')||'[]');

function track(type,data={}){
 const e={session,type,screen:state.screen,segment:state.segment,family:state.family,prospect_id:state.prospect?.id||null,source,ts:new Date().toISOString(),...data};
 events.push(e);events=events.slice(-800);localStorage.setItem('wap_journey_events',JSON.stringify(events));
}
function toast(msg){
 const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1800);
}

function showGame(){
 $('#intro').classList.remove('active');$('#gameView').classList.add('active');$('#app').dataset.view='game';
}
function showScreen(name){
 state.screen=name;
 $$('.screen').forEach(s=>s.classList.toggle('active',s.dataset.screen===name));
 updateJourney(name);updateHud(name);track('state_view',{name});
}
function goIntro(){
 $('#gameView').classList.remove('active');$('#intro').classList.add('active');$('#app').dataset.view='intro';state.view='intro';
}
function stepForScreen(name){
 return {question:1,result:2,demo:4,plan:5,contact:6}[name]||1;
}
function updateJourney(name){
 const step=stepForScreen(name);
 const pct={1:20,2:40,3:50,4:60,5:80,6:100}[step]||20;
 $('#progressPercent').textContent=pct+'%';$('#progressRing').style.setProperty('--progress',pct);
 $('#progressLabel').textContent=`${step} de 6 etapas`;
 $$('#journeySteps li').forEach(li=>{
   const n=+li.dataset.step;li.classList.toggle('current',n===step);li.classList.toggle('done',n<step);
 });
 const tip={
  question:'Cada resposta aumenta a precisão da leitura.',
  result:'A próxima etapa mostra a solução aplicada ao cenário.',
  demo:'Explore a demonstração sem perder o caminho de volta.',
  plan:'Seu contexto já está pronto para continuar no atendimento.',
  contact:'A conversa continua exatamente de onde a experiência terminou.'
 }[name]||'Continue sua jornada.';
 $('#journeyTip').textContent=tip;
 $('#journeyHeading').textContent=step===1?'O QUE VEM POR AÍ':'PRÓXIMOS PASSOS';
}
function updateHud(name){
 const map={question:0,result:1,demo:2,plan:2,contact:3};
 const idx=map[name]??0;
 $$('.hud-flow button').forEach((b,i)=>b.classList.toggle('active',i===idx));
}

function prepareQuestions(){
 state.answers={};state.qIndex=0;
 state.queue=QUESTIONS.filter(q=>!(q.id==='segment'&&state.segment!=='unknown'));
 renderQuestion();
}
function renderQuestion(){
 const q=state.queue[state.qIndex];
 $('#qNumber').textContent=state.qIndex+1;
 $('#questionTitle').textContent=q.title;$('#questionHint').textContent=q.hint;
 $('#qDots').innerHTML=state.queue.map((_,i)=>`<i class="${i===state.qIndex?'active':''}"></i>`).join('');
 const root=$('#choices');root.innerHTML='';root.dataset.count=q.choices.length;
 q.choices.forEach(([value,icon,label,desc])=>{
  const b=document.createElement('button');b.className='choice';b.type='button';
  b.innerHTML=`<span class="choice-icon">${iconSVG(value)}</span><span><b>${label}</b><small>${desc||''}</small></span>`;
  if(state.answers[q.id]===value)b.classList.add('selected');
  b.onclick=()=>{
   state.answers[q.id]=value;
   $$('.choice',root).forEach(x=>x.classList.remove('selected'));b.classList.add('selected');
   $('#questionNext').disabled=false;$('#questionStatus').textContent='Resposta registrada';
   track('answer',{question:q.id,value});
  };
  root.appendChild(b);
 });
 $('#questionNext').disabled=!state.answers[q.id];
 $('#questionBack').textContent=state.qIndex?'← Anterior':'← Voltar';
 $('#questionStatus').textContent=state.answers[q.id]?'Resposta registrada':'Escolha uma opção';
}

function start(){
 showGame();prepareQuestions();showScreen('question');track('diagnostic_start');
}
$('#startBtn').onclick=start;
$('#questionNext').onclick=()=>{
 const q=state.queue[state.qIndex];if(!state.answers[q.id])return;
 if(state.qIndex<state.queue.length-1){state.qIndex++;renderQuestion();return}
 if(state.segment==='unknown'){
  if(state.answers.segment==='food'){state.segment='restaurante';state.family='food'}
  else if(state.answers.segment==='education'){state.segment='curso_livre';state.family='education'}
  else state.family='unknown';
 }
 $('#app').dataset.family=state.family;renderResult();showScreen('result');track('diagnostic_complete',{answers:state.answers});
};
$('#questionBack').onclick=()=>{
 if(state.qIndex>0){state.qIndex--;renderQuestion()}else goIntro();
};

function defaultSignals(){
 if(state.family==='food')return{
  attention:[
   ['◎','Presença digital limitada','A jornada ainda pode depender demais de canais isolados.'],
   ['⌁','Pedido pode ser mais direto','Reduzir atrito entre descoberta, escolha e fechamento.'],
   ['▥','Abandono precisa ficar visível','Saber em qual etapa o potencial cliente desiste.']],
  good:[
   ['✦','Produto tem forte apelo','Alimentação trabalha muito bem com apresentação visual.'],
   ['✓','WhatsApp já é familiar','O fechamento pode continuar em um canal conhecido.']]
 };
 if(state.family==='education')return{
  attention:[
   ['◎','Jornada do aluno precisa ser clara','Trilhas e próximos passos precisam aparecer com precisão.'],
   ['⌁','Conteúdo precisa virar experiência','Material ganha valor quando forma uma sequência didática.'],
   ['▥','Abandono precisa ficar visível','É importante enxergar onde o aluno interrompe o percurso.']],
  good:[
   ['✦','Conhecimento já é um ativo','A tecnologia pode organizar e ampliar o conteúdo existente.'],
   ['✓','Relação humana pode ser mantida','O digital pode ampliar acompanhamento sem perder proximidade.']]
 };
 return{
  attention:[
   ['◎','Prioridade precisa aparecer','Sem evidência, não faz sentido inventar uma solução.'],
   ['⌁','A jornada precisa ser observada','Entrada, decisão e abandono revelam atrito.'],
   ['▥','Objetivo precisa ser mensurável','Melhoria precisa estar ligada a resultado observável.']],
  good:[
   ['✦','Diagnosticar reduz erro','Perguntar primeiro evita decisão por impulso.'],
   ['✓','Poucas respostas organizam o caminho','O diagnóstico separa necessidade de desejo.']]
 };
}
function renderResult(){
 let data=defaultSignals();
 if(state.prospect?.atencoes?.length>=3&&state.prospect?.positivos?.length>=2){
  data={
   attention:state.prospect.atencoes.slice(0,3).map((x,i)=>[['◎','⌁','▥'][i],x[1],x[2]]),
   good:state.prospect.positivos.slice(0,2).map((x,i)=>[['✦','✓'][i],x[1],x[2]])
  };
 }
 const group=(type,title,items)=>`<section class="signal-group ${type}"><h3>${title}</h3>${items.map(([ico,h,p],i)=>`<article class="signal ${type==='need'?'need':'good'}"><span class="signal-icon">${signalSVG(type,i)}</span><div class="signal-content"><b>${h}</b><p>${p}</p></div></article>`).join('')}</section>`;
 $('#signals').innerHTML=group('need','3 PONTOS DE ATENÇÃO',data.attention)+group('good','2 PONTOS POSITIVOS',data.good);
 $('#recommendationText').textContent=state.family==='education'?'Organize conhecimento, jornada e acompanhamento antes de ampliar tecnologia.':state.family==='food'?'Reduza atrito na jornada e torne apresentação, pedido e contato parte do mesmo caminho.':'Aprofunde contexto e prioridade antes de definir a solução.';
}
$('[data-back="question"]').onclick=()=>showScreen('question');
$('#toDemo').onclick=()=>{renderDemo();showScreen('demo')};

function segmentMeta(){return SEGMENTS.find(s=>s.id===state.segment)}
function renderDemo(){
 const m=segmentMeta();
 if(state.family==='education'){
  $('#demoHeading').innerHTML='<em>Modelo EAD</em>';
  $('#demoSub').textContent=`Estrutura aplicada a ${m?.label||'educação'}: conteúdo, trilhas, progresso e acompanhamento.`;
  $('#demoProduct').innerHTML=`
   <div class="demo-hero">
    <img src="modulos/ead-portugues/assets/portugues-aula-visual.png" alt="Demonstração de experiência EAD">
    <div class="demo-copy"><b>Aprendizagem que mostra o caminho.</b><p>Conteúdo, progresso, avaliações e acompanhamento em uma experiência própria.</p><a href="modulos/ead-portugues/index.html">VER MODELO EAD</a></div>
   </div>
   <div class="demo-side"><b>TRILHA EAD</b><span>▶ Conteúdo</span><span>▣ Aulas</span><span>✓ Avaliações</span><article>Progresso do aluno<small>Leitura contínua</small></article><article>Acompanhamento<small>Pontos de abandono</small></article></div>`;
  $('#demoFeatures').innerHTML='<span>▣<b>Conteúdo</b><small>Organizado</small></span><span>✓<b>Progresso</b><small>Visível</small></span><span>◎<b>Avaliação</b><small>Integrada</small></span><span>✦<b>Acompanhamento</b><small>Contínuo</small></span>';
 }else{
  $('#demoHeading').innerHTML='<em>Modelo Delivery</em>';
  $('#demoSub').textContent=`Estrutura aplicada a ${m?.label||'alimentação'}: apresentação, pedido, conversão e contato.`;
  $('#demoProduct').innerHTML=`
   <div class="demo-hero">
    <img src="modulos/delivery/assets/pizza-portuguesa.png" alt="Demonstração visual de Delivery">
    <div class="demo-copy"><b>Sabor que chega quente na sua casa!</b><p>Experiência visual, escolha rápida, pedido e contato integrados.</p><a href="modulos/delivery/index.html">VER MODELO DELIVERY</a></div>
   </div>
   <div class="demo-side"><b>CARDÁPIO</b><span>🍕 Pizzas</span><span>🍔 Lanches</span><span>🥤 Bebidas</span><article>🍔 Burger Artesanal<small>R$ 29,90</small></article><article>🍟 Combo Família<small>R$ 69,90</small></article></div>`;
  $('#demoFeatures').innerHTML='<span>▣<b>Pedido rápido</b><small>É fácil</small></span><span>◎<b>Acompanhamento</b><small>Em tempo real</small></span><span>▰<b>Pagamentos</b><small>Seguros</small></span><span>★<b>Fidelização</b><small>de clientes</small></span>';
 }
}
$('[data-back="result"]').onclick=()=>showScreen('result');
$('#toPlan').onclick=()=>{renderPlan();showScreen('plan')};

function renderPlan(){
 const m=segmentMeta();
 $('#planSegment').textContent=m?.label||'Não identificado';
 $('#planSegmentText').textContent=state.family==='food'?'Perfil de alimentação e experiência de pedido.':state.family==='education'?'Perfil ligado a aprendizagem, conteúdo e acompanhamento.':'Cenário ainda em aprofundamento.';
 $('#planPriority').textContent=state.family==='food'?'Conversão e jornada':state.family==='education'?'Aprendizagem e acompanhamento':'Clareza da necessidade';
 $('#planPriorityText').textContent=state.family==='food'?'Reduzir atrito entre descoberta, pedido e fechamento.':state.family==='education'?'Organizar conteúdo, progresso e pontos de abandono.':'Aprofundar contexto antes da solução.';
 $('#planNext').textContent=state.family==='food'?'Estrutura funcional de Delivery':state.family==='education'?'Estrutura funcional EAD':'Diagnóstico ampliado';
 $('#planNextText').textContent='A demonstração permanece ligada à apresentação WAP e aos canais de contato.';
 const link=$('#openModel');
 if(state.family==='education'){link.href='modulos/ead-portugues/index.html';$('#modelIcon').textContent='🎓';$('#modelTitle').textContent='Abrir modelo EAD'}
 else{link.href='modulos/delivery/index.html';$('#modelIcon').textContent='🍽';$('#modelTitle').textContent='Abrir modelo Delivery'}
 sessionStorage.setItem('wap_journey_context',JSON.stringify({session,segment:state.segment,family:state.family,answers:state.answers,return_url:location.href}));
}
$('[data-back="demo"]').onclick=()=>showScreen('demo');
$('#toContact').onclick=()=>{renderContact();showScreen('contact')};

function waUrl(msg){
 const n=String(CFG.whatsapp||'').replace(/\D/g,'');
 return `${n?'https://wa.me/'+n:'https://wa.me/'}?text=${encodeURIComponent(msg)}`;
}
function contextText(){
 const m=segmentMeta();
 return ['Olá! Concluí a experiência WAP.',`Segmento: ${m?.label||'não identificado'}.`,`Prioridade: ${$('#planPriority').textContent||'diagnóstico'}.`,state.prospect?.nome?`Prospect: ${state.prospect.nome}.`:''].filter(Boolean).join('\n');
}
function updateLinks(){
 const generic=waUrl('Olá! Quero conhecer a WAP.');
 const contextual=waUrl(contextText());
 $('#waDock').href='#';$('#waDock').removeAttribute('target');
 $('#igDock').href=$('#igContact').href=CFG.instagram||'#';
 $('#fbDock').href=$('#fbContact').href=CFG.facebook||'#';
}
function renderContact(){
 updateLinks();
 const m=segmentMeta();
 $('#contactSummary').innerHTML=`<b>Resumo desta jornada:</b><br>Segmento: ${m?.label||'não identificado'} • Prioridade: ${$('#planPriority').textContent||'em análise'} • Respostas registradas: ${Object.keys(state.answers).length}.`;
}
$('[data-back="plan"]').onclick=()=>showScreen('plan');
$('#restart').onclick=()=>{session=crypto.randomUUID?.()||('wap-'+Date.now());localStorage.setItem('wap_session_id',session);state.answers={};goIntro();track('restart')};

$$('[data-home]').forEach(b=>b.onclick=goIntro);
$$('[data-contact]').forEach(b=>b.onclick=()=>{showGame();renderPlan();renderContact();showScreen('contact')});
$$('[data-jump]').forEach(b=>b.onclick=()=>{
 const target=b.dataset.jump;
 if(target==='question'){showScreen('question');return}
 if(target==='result'&&Object.keys(state.answers).length){renderResult();showScreen('result');return}
 if(target==='demo'&&Object.keys(state.answers).length){renderDemo();showScreen('demo');return}
 if(target==='contact'){renderPlan();renderContact();showScreen('contact');return}
 toast('Conclua o diagnóstico para liberar esta etapa.');
});

updateLinks();
track('session_start',{segment_initial:state.segment});


// V25 — contato provisório por formulário/e-mail; amanhã basta trocar contactMode/WhatsApp.
function openLeadForm(){
 const f=$('#leadForm'); if(!f)return;
 f.hidden=false; f.scrollIntoView({block:'center'}); $('#leadName')?.focus(); track('contact_form_open');
}
function closeLeadForm(){const f=$('#leadForm');if(f)f.hidden=true}
$('#waContact')?.addEventListener('click',openLeadForm);
$('#waDock')?.addEventListener('click',(e)=>{e.preventDefault();showGame();renderPlan();renderContact();showScreen('contact');setTimeout(openLeadForm,40)});
$('#closeLeadForm')?.addEventListener('click',closeLeadForm);
$('#leadForm')?.addEventListener('submit',(e)=>{
 e.preventDefault();
 const name=$('#leadName').value.trim(), phone=$('#leadPhone').value.trim(), email=$('#leadEmail').value.trim(), message=$('#leadMessage').value.trim();
 if(!name||!message){toast('Preencha nome e mensagem.');return}
 const m=segmentMeta();
 const subject=`Contato WAP — ${name}`;
 const body=[`Olá, WAP!`,``, `Nome: ${name}`,`WhatsApp/telefone: ${phone||'não informado'}`,`E-mail: ${email||'não informado'}`,`Segmento: ${m?.label||'não identificado'}`,`Prioridade: ${$('#planPriority').textContent||'em análise'}`,``,`Mensagem:`,message,``,`Origem: experiência WAP`].join('\n');
 const lead={session,name,phone,email,message,segment:m?.label||'não identificado',priority:$('#planPriority').textContent||'',ts:new Date().toISOString()};
 const leads=JSON.parse(localStorage.getItem('wap_leads')||'[]');leads.push(lead);localStorage.setItem('wap_leads',JSON.stringify(leads.slice(-500)));track('lead_submit',lead);
 const dest=CFG.contactEmail||'wagnerapneto1988@gmail.com';
 window.location.href=`mailto:${encodeURIComponent(dest)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 toast('Contato preparado no seu e-mail.');
});
