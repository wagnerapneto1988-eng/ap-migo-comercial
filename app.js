const CONFIG = {
  whatsappNumber: "", // Ex.: 5511999999999 — preencher quando o número comercial estiver ativo.
  companyName: "WAP Consultoria Digital",
  supabaseUrl: "https://fqmjfhgxapssqrpxzfnw.supabase.co",
  supabasePublishableKey: "sb_publishable_oEr35MM3vFxy_Pg9t0W_gQ_c9DxxskL"
};

const services = [
  {id:"site-profissional",icon:"WEB",name:"Site profissional",desc:"Presença digital clara, responsiva e pronta para apresentar a empresa e gerar contatos.",niches:["Todos","Serviços profissionais","Comércio local"],pain:"empresa sem presença própria na internet",benefit:"centralizar informações e facilitar novos contatos"},
  {id:"landing-page",icon:"LP",name:"Landing page de vendas",desc:"Página focada em uma oferta, campanha, produto ou captação de contatos.",niches:["Todos","Serviços profissionais","Cursos e treinamentos"],pain:"divulgação sem página focada em conversão",benefit:"transformar campanhas em contatos e oportunidades"},
  {id:"cardapio-digital",icon:"MENU",name:"Cardápio digital",desc:"Cardápio visual e organizado para facilitar a escolha do cliente e o pedido.",niches:["Pizzaria e delivery","Restaurante e bar","Doces e confeitaria"],pain:"cardápio enviado por foto ou PDF confuso",benefit:"facilitar a escolha e acelerar o pedido"},
  {id:"delivery",icon:"PED",name:"Sistema de pedidos / delivery",desc:"Produtos, carrinho e pedido estruturado com finalização pelo WhatsApp.",niches:["Pizzaria e delivery","Restaurante e bar","Doces e confeitaria"],pain:"pedidos manuais e desorganizados pelo WhatsApp",benefit:"organizar pedidos e reduzir erros no atendimento"},
  {id:"catalogo",icon:"CAT",name:"Catálogo digital",desc:"Produtos ou serviços organizados em uma vitrine compartilhável e fácil de atualizar.",niches:["Comércio local","Moda e beleza","Serviços profissionais"],pain:"produtos apresentados de forma improvisada",benefit:"mostrar o portfólio de forma profissional"},
  {id:"loja-virtual",icon:"LOJA",name:"Loja virtual",desc:"Estrutura de venda online para catálogo, carrinho e jornada de compra.",niches:["Comércio local","Moda e beleza","Doces e confeitaria"],pain:"vendas dependentes apenas de mensagens individuais",benefit:"criar uma jornada digital de compra"},
  {id:"agendamento",icon:"AGEN",name:"Sistema de agendamento",desc:"Agenda digital para serviço, profissional, data e horário, com fluxo simples para o cliente.",niches:["Salão e barbearia","Clínicas e estética","Serviços profissionais","Pet shop"],pain:"agendamento manual pelo WhatsApp ou caderno",benefit:"organizar horários e reduzir trabalho repetitivo"},
  {id:"reservas",icon:"RES",name:"Reservas online",desc:"Captação e organização de reservas com dados do cliente, data, horário e confirmação.",niches:["Restaurante e bar","Eventos e lazer","Serviços profissionais"],pain:"reservas espalhadas entre mensagens e ligações",benefit:"centralizar reservas e facilitar confirmações"},
  {id:"orcamento",icon:"ORC",name:"Orçamento online",desc:"Formulário inteligente para coletar as informações necessárias antes do orçamento.",niches:["Construção e manutenção","Serviços profissionais","Automotivo"],pain:"perda de tempo pedindo as mesmas informações a cada cliente",benefit:"qualificar pedidos de orçamento antes do atendimento"},
  {id:"captacao",icon:"LEAD",name:"Captação de clientes",desc:"Formulários e páginas para transformar visitantes em contatos organizados.",niches:["Todos","Serviços profissionais","Imobiliário"],pain:"divulgação sem captura organizada de interessados",benefit:"gerar e registrar novos contatos"},
  {id:"automacao-atendimento",icon:"AUTO",name:"Automação de atendimento",desc:"Fluxos para perguntas recorrentes, triagem e encaminhamento ao atendimento humano.",niches:["Todos","Clínicas e estética","Comércio local"],pain:"tempo gasto repetindo respostas e orientações",benefit:"agilizar o atendimento sem perder o contato humano"},
  {id:"whatsapp-business",icon:"WA",name:"WhatsApp Business profissional",desc:"Organização de perfil, catálogo, respostas rápidas, etiquetas e fluxo comercial.",niches:["Todos","Comércio local","Serviços profissionais"],pain:"WhatsApp usado sem organização comercial",benefit:"organizar atendimento, produtos e oportunidades"},
  {id:"chatbot",icon:"BOT",name:"Chatbot / assistente",desc:"Assistente de triagem para dúvidas, necessidades e encaminhamento comercial.",niches:["Todos","Cursos e treinamentos","Serviços profissionais"],pain:"atendimento inicial lento ou repetitivo",benefit:"dar resposta inicial e qualificar a necessidade"},
  {id:"crm",icon:"CRM",name:"CRM simples de clientes",desc:"Controle de contatos, etapas, follow-up e histórico comercial em uma visão organizada.",niches:["Todos","Serviços profissionais","Imobiliário"],pain:"clientes e propostas sem acompanhamento",benefit:"não perder oportunidades e organizar follow-ups"},
  {id:"status-pedidos",icon:"STS",name:"Acompanhamento de pedidos",desc:"Status como recebido, em produção, saiu para entrega e concluído.",niches:["Pizzaria e delivery","Comércio local","Automotivo"],pain:"cliente perguntando repetidamente sobre o andamento",benefit:"dar visibilidade ao status e reduzir consultas"},
  {id:"propostas",icon:"PROP",name:"Automação de propostas",desc:"Geração e organização de propostas a partir de dados do cliente e solução indicada.",niches:["Serviços profissionais","Construção e manutenção","Imobiliário"],pain:"tempo gasto montando propostas repetitivas",benefit:"agilizar propostas e padronizar apresentação comercial"},
  {id:"satisfacao",icon:"NPS",name:"Pesquisa de satisfação",desc:"Coleta estruturada de avaliações e feedback para acompanhar a experiência do cliente.",niches:["Todos","Restaurante e bar","Clínicas e estética"],pain:"falta de visão sobre a experiência dos clientes",benefit:"identificar problemas e oportunidades de melhoria"},
  {id:"ead",icon:"EAD",name:"Treinamento / EAD",desc:"Ambiente digital para conteúdos, treinamentos, avaliações e acompanhamento de aprendizagem.",niches:["Cursos e treinamentos","Empresas e equipes","Serviços profissionais"],pain:"treinamentos repetitivos ou sem acompanhamento",benefit:"padronizar conhecimento e ampliar o alcance do treinamento"},
  {id:"apresentacao",icon:"APRE",name:"Apresentação comercial interativa",desc:"Apresentação digital para demonstrar serviços, soluções, cases e propostas de forma visual.",niches:["Todos","Serviços profissionais","Imobiliário"],pain:"apresentação comercial pouco clara ou pouco visual",benefit:"explicar valor com mais impacto e clareza"},
  {id:"diagnostico-digital",icon:"DX",name:"Diagnóstico de presença digital",desc:"Análise orientada para identificar prioridades, gargalos e oportunidades digitais.",niches:["Todos"],pain:"dúvida sobre qual solução digital priorizar",benefit:"transformar necessidades em um plano objetivo de melhoria"}
];

const niches = ["Todos", ...Array.from(new Set(services.flatMap(s=>s.niches).filter(n=>n!=="Todos"))).sort()];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function waUrl(text=""){
  const encoded = encodeURIComponent(text);
  return CONFIG.whatsappNumber ? `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}
function setWaLinks(){
  const text = `Olá! Gostaria de conhecer as soluções da ${CONFIG.companyName}.`;
  ["#topWhatsapp","#footerWhatsapp","#floatingWhatsapp"].forEach(id=>$(id).href=waUrl(text));
}
function fillSelect(el, items){el.innerHTML = items.map(x=>`<option value="${x}">${x}</option>`).join("")}
function renderServices(){
  const niche = $("#nicheFilter").value || "Todos";
  const q = $("#serviceSearch").value.trim().toLowerCase();
  const filtered = services.filter(s => (niche==="Todos" || s.niches.includes(niche) || s.niches.includes("Todos")) && (`${s.name} ${s.desc} ${s.pain}`.toLowerCase().includes(q)));
  $("#serviceGrid").innerHTML = filtered.map(s=>`<article class="service-card">
    <div class="service-icon">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p>
    <div class="service-tags">${s.niches.slice(0,2).map(n=>`<span class="tag">${n}</span>`).join("")}</div>
    <div class="service-actions"><button class="btn ghost" data-service="${s.id}">Ver solução</button><button class="btn" data-diag="${s.id}">Diagnóstico</button></div>
  </article>`).join("");
  $$('[data-service]').forEach(b=>b.onclick=()=>openService(b.dataset.service));
  $$('[data-diag]').forEach(b=>b.onclick=()=>startDiagnostic(b.dataset.diag));
}
function openModal(id){$(id).classList.add("open");$(id).setAttribute("aria-hidden","false")}
function closeModal(modal){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
$$('[data-close]').forEach(x=>x.onclick=()=>closeModal(x.closest('.modal')));
function servicePublicLink(serviceId,niche="Todos"){
  const base = location.href.split('?')[0].split('#')[0];
  return `${base}?service=${encodeURIComponent(serviceId)}&niche=${encodeURIComponent(niche)}`;
}
function openService(id){
  const s=services.find(x=>x.id===id); if(!s)return;
  $("#serviceModalContent").innerHTML=`<div class="eyebrow">SOLUÇÃO WAP</div><h2>${s.name}</h2><p>${s.desc}</p><h3>Quando faz sentido</h3><p>Quando existe <strong>${s.pain}</strong> e o objetivo é ${s.benefit}.</p><h3>O que pode ser entregue</h3><ul class="modal-bullets"><li>Interface responsiva para celular e computador</li><li>Fluxo adaptado à realidade do cliente</li><li>Integração com WhatsApp quando aplicável</li><li>Publicação e orientação de uso</li></ul><div class="button-row"><button class="btn" id="modalDiag">Fazer diagnóstico</button><a class="btn ghost" href="${waUrl(`Olá! Tenho interesse em ${s.name}.`)}" target="_blank">Pedir proposta</a></div>`;
  openModal("#serviceModal");
  $("#modalDiag").onclick=()=>{closeModal($("#serviceModal"));startDiagnostic(id)};
}
const genericQuestions = [
  {q:"Como essa atividade é feita hoje?",opts:["Principalmente pelo WhatsApp","Planilha ou papel","Já existe um sistema, mas é limitado","Ainda não existe processo definido"]},
  {q:"Qual é a principal dificuldade?",opts:["Perda de tempo","Desorganização","Perda de clientes ou vendas","Erros e retrabalho"]},
  {q:"Qual é a prioridade agora?",opts:["Vender mais","Atender melhor","Organizar o processo","Automatizar tarefas repetitivas"]},
  {q:"Quando gostaria de melhorar isso?",opts:["O quanto antes","Neste mês","Nos próximos 60 dias","Estou apenas avaliando"]}
];
function escapeHtml(value=""){
  return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]));
}
function diagnosticPriority(answers){
  const when=answers[3]||"";
  if(when==="O quanto antes" || when==="Neste mês") return "alta";
  if(when==="Nos próximos 60 dias") return "media";
  return "baixa";
}
function diagnosticScore(answers){
  const when=answers[3]||"";
  if(when==="O quanto antes") return 90;
  if(when==="Neste mês") return 80;
  if(when==="Nos próximos 60 dias") return 65;
  return 45;
}
async function saveDiagnostic(payload){
  const response=await fetch(`${CONFIG.supabaseUrl}/rest/v1/diagnosticos`,{
    method:"POST",
    headers:{
      "apikey":CONFIG.supabasePublishableKey,
      "Authorization":`Bearer ${CONFIG.supabasePublishableKey}`,
      "Content-Type":"application/json",
      "Prefer":"return=minimal"
    },
    body:JSON.stringify(payload)
  });
  if(!response.ok){
    let detail="";
    try{ detail=await response.text(); }catch{}
    throw new Error(`Supabase ${response.status}: ${detail||response.statusText}`);
  }
}
function startDiagnostic(serviceId="diagnostico-digital"){
  const s=services.find(x=>x.id===serviceId)||services[19];
  let answers=[],i=0;
  $("#diagTitle").textContent=`Diagnóstico: ${s.name}`;

  function showLeadForm(){
    const summary=`Solução analisada: ${s.name}. Prioridade identificada: ${answers[2]||"não informada"}. Situação atual: ${answers[0]||"não informada"}. Prazo desejado: ${answers[3]||"não informado"}.`;
    $("#diagContent").innerHTML=`
      <div class="eyebrow">QUASE PRONTO</div>
      <h4>Para salvar seu diagnóstico, conte quem você é.</h4>
      <p>${escapeHtml(summary)}</p>
      <div class="diag-lead-form">
        <label>Seu nome<input id="diagName" autocomplete="name" placeholder="Ex.: Wagner" required /></label>
        <label>Empresa / estabelecimento<input id="diagBusiness" placeholder="Ex.: Pizzaria Central" required /></label>
        <label>WhatsApp<input id="diagWhatsapp" inputmode="tel" autocomplete="tel" placeholder="Ex.: 11999999999" required /></label>
        <label>E-mail (opcional)<input id="diagEmail" type="email" autocomplete="email" placeholder="voce@empresa.com" /></label>
      </div>
      <div class="button-row"><button class="btn" id="diagSave">Salvar diagnóstico</button><button class="btn ghost" id="diagAgain">Refazer</button></div>
      <p class="hint" id="diagStatus">Seus dados serão usados para gerar e acompanhar este diagnóstico.</p>`;

    $("#diagAgain").onclick=()=>startDiagnostic(serviceId);
    $("#diagSave").onclick=async()=>{
      const name=$("#diagName").value.trim();
      const business=$("#diagBusiness").value.trim();
      const whatsapp=$("#diagWhatsapp").value.replace(/\D/g,"");
      const email=$("#diagEmail").value.trim();
      const status=$("#diagStatus");
      if(!name || !business || whatsapp.length<10){
        status.textContent="Preencha nome, empresa e um WhatsApp válido.";
        return;
      }
      const btn=$("#diagSave");
      btn.disabled=true; btn.textContent="Salvando..."; status.textContent="Enviando seu diagnóstico para a WAP...";
      const niche=$("#nicheFilter")?.value || (s.niches.find(n=>n!=="Todos")||"Todos");
      const payload={
        nome_cliente:name,
        nome_empresa:business,
        whatsapp,
        email:email||null,
        segmento:niche,
        respostas:{
          solucao_id:s.id,
          solucao:s.name,
          perguntas:genericQuestions.map((q,idx)=>({pergunta:q.q,resposta:answers[idx]||null}))
        },
        pontuacao:diagnosticScore(answers),
        relatorio:summary,
        recomendacoes:[s.name],
        prioridade:diagnosticPriority(answers),
        status:"novo"
      };
      try{
        await saveDiagnostic(payload);
        const waText=`Olá! Sou ${name}, da ${business}. Fiz o diagnóstico da WAP para ${s.name}. ${summary} Gostaria de conversar sobre uma proposta.`;
        $("#diagContent").innerHTML=`<div class="eyebrow">DIAGNÓSTICO SALVO</div><h4>Pronto, ${escapeHtml(name)}. Recebemos seu diagnóstico.</h4><p>${escapeHtml(summary)}</p><div class="button-row"><a class="btn" target="_blank" href="${waUrl(waText)}">Solicitar proposta</a><button class="btn ghost" id="diagAgain">Fazer outro diagnóstico</button></div><p class="hint">Registro enviado com sucesso para a WAP Consultoria Digital.</p>`;
        $("#diagAgain").onclick=()=>startDiagnostic(serviceId);
      }catch(err){
        console.error(err);
        status.textContent="Não foi possível salvar agora. Verifique a conexão e tente novamente.";
        btn.disabled=false; btn.textContent="Tentar novamente";
      }
    };
  }

  function draw(){
    if(i>=genericQuestions.length){ showLeadForm(); return; }
    const item=genericQuestions[i];
    $("#diagContent").innerHTML=`<div class="diag-question"><div class="eyebrow">PERGUNTA ${i+1} DE ${genericQuestions.length}</div><h4>${item.q}</h4><div class="diag-options">${item.opts.map(o=>`<button class="diag-option">${o}</button>`).join("")}</div></div>`;
    $$('.diag-option').forEach(b=>b.onclick=()=>{answers.push(b.textContent);i++;draw()});
  }
  draw();openModal("#diagModal");
}
function updateLeadServices(){
  const niche=$("#leadNiche").value;
  const available=services.filter(s=>niche==="Todos"||s.niches.includes(niche)||s.niches.includes("Todos"));
  $("#leadService").innerHTML=available.map(s=>`<option value="${s.id}">${s.name}</option>`).join("");
}
function generatePitch(){
  const business=$("#leadBusiness").value.trim()||"seu negócio";
  const contact=$("#leadContact").value.trim();
  const niche=$("#leadNiche").value;
  const s=services.find(x=>x.id===$("#leadService").value)||services[0];
  const hello=contact?`Olá, ${contact}!`:`Olá!`;
  const msg=`${hello} Conheci o trabalho da ${business} e estou entrando em contato porque desenvolvemos uma solução de ${s.name.toLowerCase()} para negócios desse segmento. Ela pode ajudar a ${s.benefit}. Posso te mostrar uma demonstração/explicação rápida? O link abaixo já abre exatamente essa solução:\n\n${servicePublicLink(s.id,niche)}`;
  $("#pitchOutput").value=msg;$("#serviceLink").value=servicePublicLink(s.id,niche);return msg;
}
function copyText(text){navigator.clipboard?.writeText(text)}
function getCrm(){try{return JSON.parse(localStorage.getItem("wapCrm")||"[]")}catch{return []}}
function saveCrm(rows){localStorage.setItem("wapCrm",JSON.stringify(rows));renderCrm()}
function addLead(){
  const business=$("#leadBusiness").value.trim(); if(!business){alert("Informe o nome do estabelecimento.");return}
  const niche=$("#leadNiche").value;const s=services.find(x=>x.id===$("#leadService").value)||services[0];
  const rows=getCrm();rows.unshift({id:Date.now(),business,niche,service:s.name,status:"Não contatado",date:new Date().toLocaleDateString("pt-BR")});saveCrm(rows)
}
function renderCrm(){
  const rows=getCrm();$("#crmEmpty").style.display=rows.length?"none":"block";
  $("#crmBody").innerHTML=rows.map(r=>`<tr><td><b>${r.business}</b></td><td>${r.niche}</td><td>${r.service}</td><td><select class="status-select" data-status="${r.id}">${["Não contatado","Contatado","Respondeu","Diagnóstico","Proposta","Fechou","Sem interesse"].map(x=>`<option ${x===r.status?'selected':''}>${x}</option>`).join('')}</select></td><td>${r.date}</td><td><button class="icon-btn" data-delete="${r.id}">Excluir</button></td></tr>`).join("");
  $$('[data-status]').forEach(s=>s.onchange=()=>{const rows=getCrm();const r=rows.find(x=>x.id==s.dataset.status);if(r)r.status=s.value;saveCrm(rows)});
  $$('[data-delete]').forEach(b=>b.onclick=()=>saveCrm(getCrm().filter(x=>x.id!=b.dataset.delete)));
}
function exportCrm(){
  const rows=getCrm();if(!rows.length)return alert("Nenhum lead para exportar.");
  const csv=["Empresa;Nicho;Solução;Status;Data",...rows.map(r=>[r.business,r.niche,r.service,r.status,r.date].map(x=>`"${String(x).replaceAll('"','""')}"`).join(';'))].join('\n');
  const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='wap-crm.csv';a.click();URL.revokeObjectURL(a.href)
}
fillSelect($("#nicheFilter"),niches);fillSelect($("#leadNiche"),niches);updateLeadServices();renderServices();renderCrm();setWaLinks();
$("#nicheFilter").onchange=renderServices;$("#serviceSearch").oninput=renderServices;$("#leadNiche").onchange=updateLeadServices;
$("#generatePitch").onclick=generatePitch;$("#saveLead").onclick=addLead;
$("#copyPitch").onclick=()=>{copyText($("#pitchOutput").value);alert("Mensagem copiada.")};
$("#copyLink").onclick=()=>{copyText($("#serviceLink").value);alert("Link copiado.")};
$("#openWhatsapp").onclick=()=>{const msg=$("#pitchOutput").value||generatePitch();window.open(waUrl(msg),'_blank')};
$("#exportCrm").onclick=exportCrm;
["#heroDiagnostico","#migoStart","#sectionDiagnostico"].forEach(id=>$(id).onclick=()=>startDiagnostic());

const params=new URLSearchParams(location.search);const directService=params.get('service');const directNiche=params.get('niche');
if(directNiche&&niches.includes(directNiche)){$("#nicheFilter").value=directNiche;renderServices()}
if(directService&&services.some(s=>s.id===directService)){setTimeout(()=>openService(directService),350)}
