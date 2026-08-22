const cfg = window.WAP_JOBS_CONFIG || {};
const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

const $ = s => document.querySelector(s);
const jobsEl = $('#jobs');
const searchEl = $('#search');
const statusFilter = $('#statusFilter');
const priorityFilter = $('#priorityFilter');
const channelFilter = $('#channelFilter');
const refreshBtn = $('#refreshBtn');
const dialog = $('#jobDialog');
const jobForm = $('#jobForm');
const formMessage = $('#formMessage');

let allJobs = [];
let currentView = 'dashboard';

function esc(v=''){
  return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function money(min,max,moeda='BRL'){
  const f=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:moeda}).format(v);
  if(min && max) return `${f(Number(min))} – ${f(Number(max))}`;
  if(min) return `a partir de ${f(Number(min))}`;
  if(max) return `até ${f(Number(max))}`;
  return 'Salário não informado';
}

function normalizePhone(v=''){
  return String(v).replace(/\D/g,'');
}

function buildMessage(job){
  return (cfg.MESSAGE_TEMPLATE || '')
    .replaceAll('{empresa}',job.empresa || '')
    .replaceAll('{cargo}',job.cargo || '')
    .replaceAll('{portfolio}',cfg.PORTFOLIO_URL || '');
}

function whatsappLink(job){
  const phone = normalizePhone(job.whatsapp);
  if(!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(buildMessage(job))}`;
}

function scoreClass(v){
  if(v>=80) return 'high';
  if(v>=60) return 'mid';
  return 'low';
}

function metrics(){
  $('#mTotal').textContent = allJobs.length;
  $('#mApply').textContent = allJobs.filter(j=>j.status==='Candidatar').length;
  $('#mSent').textContent = allJobs.filter(j=>j.status==='Candidatado').length;
  $('#mInterview').textContent = allJobs.filter(j=>['Entrevista','Teste técnico','Proposta'].includes(j.status)).length;
  const avg = allJobs.length ? Math.round(allJobs.reduce((s,j)=>s+(Number(j.compatibilidade)||0),0)/allJobs.length) : 0;
  $('#mScore').textContent = `${avg}%`;
}

function matchesView(j){
  if(currentView==='candidatar') return j.status==='Candidatar';
  if(currentView==='candidatado') return j.status==='Candidatado';
  if(currentView==='entrevista') return ['Entrevista','Teste técnico','Proposta'].includes(j.status);
  return true;
}

function filtered(){
  const q = searchEl.value.trim().toLowerCase();
  return allJobs.filter(j=>{
    const hay = [
      j.empresa,j.cargo,j.modalidade,j.regime,j.senioridade,
      ...(j.stack||[])
    ].join(' ').toLowerCase();

    const channel = channelFilter.value;
    const channelOk = !channel || Boolean(j[`${channel}_url`] || (channel==='whatsapp' && j.whatsapp));

    return matchesView(j)
      && (!q || hay.includes(q))
      && (!statusFilter.value || j.status===statusFilter.value)
      && (!priorityFilter.value || j.prioridade===priorityFilter.value)
      && channelOk;
  });
}

function actionButton(label,url,cls=''){
  if(!url) return '';
  return `<button class="action ${cls}" data-url="${esc(url)}">${label}</button>`;
}

function render(){
  const list = filtered();
  if(!list.length){
    jobsEl.innerHTML = '<div class="empty-list">Nenhuma vaga encontrada com esses filtros.</div>';
    return;
  }

  jobsEl.innerHTML = list.map(j=>{
    const wa = whatsappLink(j);
    const stack = (j.stack||[]).slice(0,5).map(s=>`<span class="tag">${esc(s)}</span>`).join('');

    return `
      <article class="job">
        <div>
          <div class="company">${esc(j.empresa)}</div>
          <h3>${esc(j.cargo)}</h3>
          <div class="tags">
            <span class="tag">${esc(j.modalidade||'')}</span>
            ${j.regime ? `<span class="tag">${esc(j.regime)}</span>`:''}
            ${j.senioridade ? `<span class="tag">${esc(j.senioridade)}</span>`:''}
            ${stack}
          </div>
        </div>

        <div class="job-meta">
          <span>${money(j.salario_min,j.salario_max,j.moeda)}</span>
          <span>Status: <b>${esc(j.status)}</b></span>
          <span class="priority ${esc(j.prioridade)}">${esc(j.prioridade)}</span>
        </div>

        <div>
          <div class="score ${scoreClass(Number(j.compatibilidade)||0)}">${Number(j.compatibilidade)||0}%</div>
          <small>compatibilidade</small>
        </div>

        <div class="actions">
          ${actionButton('WhatsApp',wa,'whatsapp')}
          ${actionButton('Instagram',j.instagram_url,'instagram')}
          ${actionButton('Facebook',j.facebook_url,'facebook')}
          ${actionButton('LinkedIn',j.linkedin_url)}
          ${actionButton('Vaga',j.origem_url)}
          <button class="action" data-copy="${j.id}">Copiar mensagem</button>
          <button class="action" data-status="${j.id}">Marcar candidata</button>
        </div>
      </article>
    `;
  }).join('');

  jobsEl.querySelectorAll('[data-url]').forEach(btn=>{
    btn.addEventListener('click',()=>window.open(btn.dataset.url,'_blank','noopener'));
  });

  jobsEl.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click',async()=>{
      const job=allJobs.find(j=>j.id===btn.dataset.copy);
      await navigator.clipboard.writeText(buildMessage(job));
      btn.textContent='Copiado ✓';
      setTimeout(()=>btn.textContent='Copiar mensagem',1200);
    });
  });

  jobsEl.querySelectorAll('[data-status]').forEach(btn=>{
    btn.addEventListener('click',()=>markApplied(btn.dataset.status));
  });
}

async function loadJobs(){
  jobsEl.innerHTML='<div class="loading">Carregando vagas...</div>';

  const {data,error}=await sb
    .from('vw_painel_vagas_emprego')
    .select('*')
    .order('compatibilidade',{ascending:false});

  if(error){
    console.error(error);
    jobsEl.innerHTML=`<div class="empty-list">Erro ao carregar: ${esc(error.message)}<br><small>Verifique config-jobs.js, login e RLS.</small></div>`;
    $('#sessionStatus').textContent='Erro de conexão';
    return;
  }

  allJobs=data||[];
  $('#sessionStatus').textContent='Conectado ao Supabase';
  metrics();
  render();
}

async function markApplied(id){
  const {error}=await sb.from('vagas_emprego').update({status:'Candidatado'}).eq('id',id);
  if(error){ alert(error.message); return; }

  const job=allJobs.find(j=>j.id===id);
  if(job) job.status='Candidatado';
  metrics(); render();
}

async function saveContact(vagaId,tipo,valor,url){
  if(!valor && !url) return;
  const payload={
    vaga_id:vagaId,
    tipo,
    valor:valor || null,
    url:url || null,
    publicado_para_candidatura:true
  };
  const {error}=await sb.from('vagas_contatos').insert(payload);
  if(error) throw error;
}

jobForm.addEventListener('submit',async e=>{
  e.preventDefault();
  formMessage.textContent='Salvando...';

  const fd=new FormData(jobForm);
  const stack=String(fd.get('stack')||'')
    .split(',').map(v=>v.trim()).filter(Boolean);

  const payload={
    empresa:fd.get('empresa'),
    cargo:fd.get('cargo'),
    modalidade:fd.get('modalidade'),
    regime:fd.get('regime') || null,
    senioridade:fd.get('senioridade') || 'Não informado',
    compatibilidade:Number(fd.get('compatibilidade')||0),
    prioridade:fd.get('prioridade'),
    status:fd.get('status'),
    salario_min:fd.get('salario_min') ? Number(fd.get('salario_min')) : null,
    salario_max:fd.get('salario_max') ? Number(fd.get('salario_max')) : null,
    stack,
    origem_nome:fd.get('origem_nome') || null,
    origem_url:fd.get('origem_url') || null,
    observacoes:fd.get('observacoes') || null
  };

  try{
    const {data,error}=await sb.from('vagas_emprego').insert(payload).select().single();
    if(error) throw error;

    const wa=normalizePhone(fd.get('whatsapp'));
    await saveContact(data.id,'WhatsApp',wa,wa ? `https://wa.me/${wa}` : null);
    await saveContact(data.id,'Instagram',null,fd.get('instagram'));
    await saveContact(data.id,'Facebook',null,fd.get('facebook'));
    await saveContact(data.id,'LinkedIn',null,fd.get('linkedin'));

    formMessage.textContent='Vaga salva ✓';
    jobForm.reset();
    setTimeout(()=>dialog.close(),500);
    await loadJobs();
  }catch(err){
    console.error(err);
    formMessage.textContent=err.message;
  }
});

$('#newJobBtn').addEventListener('click',()=>dialog.showModal());
$('#closeDialog').addEventListener('click',()=>dialog.close());
refreshBtn.addEventListener('click',loadJobs);

[searchEl,statusFilter,priorityFilter,channelFilter].forEach(el=>{
  el.addEventListener(el.tagName==='INPUT'?'input':'change',render);
});

document.querySelectorAll('.nav').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentView=btn.dataset.view;
    render();
  });
});

loadJobs();
