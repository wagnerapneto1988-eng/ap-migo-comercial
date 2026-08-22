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

function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function scoreClass(v){v=Number(v||0);return v>=85?'high':v>=70?'mid':'low';}
function buildMessage(job){return (cfg.MESSAGE_TEMPLATE||'').replaceAll('{empresa}',job.empresa||'').replaceAll('{cargo}',job.cargo||'').replaceAll('{portfolio}',cfg.PORTFOLIO_URL||'');}
function metrics(){
  const total=allJobs.length;
  const apply=allJobs.filter(j=>j.status==='Para candidatar').length;
  const applied=allJobs.filter(j=>j.status==='Candidatado').length;
  const interviews=allJobs.filter(j=>j.status==='Entrevista').length;
  const avg=total?Math.round(allJobs.reduce((s,j)=>s+Number(j.compatibilidade||0),0)/total):0;
  $('#mTotal').textContent=total; $('#mApply').textContent=apply; $('#mApplied').textContent=applied; $('#mInterview').textContent=interviews; $('#mAvg').textContent=`${avg}%`;
}
function render(){
  const q=searchEl.value.toLowerCase().trim();
  const st=statusFilter.value, pr=priorityFilter.value, ch=channelFilter.value;
  const list=allJobs.filter(j=>{
    const hay=`${j.empresa||''} ${j.cargo||''} ${j.tecnologias||''} ${j.descricao||''}`.toLowerCase();
    return (!q||hay.includes(q))&&(!st||j.status===st)&&(!pr||j.prioridade===pr)&&(!ch||j.fonte===ch);
  });
  if(!list.length){jobsEl.innerHTML='<div class="empty-list">Nenhuma vaga encontrada.</div>';return;}
  jobsEl.innerHTML=list.map(j=>{
    const tech=String(j.tecnologias||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,10);
    const link=j.link_vaga?`<a href="${esc(j.link_vaga)}" target="_blank" rel="noopener">Abrir vaga</a>`:'';
    return `<article class="job-card">
      <div class="job-head"><div class="job-title"><h3>${esc(j.cargo)}</h3><p>${esc(j.empresa)} • ${esc(j.modalidade||'Não informado')} • ${esc(j.localizacao||'')}</p></div><div class="score ${scoreClass(j.compatibilidade)}">${Number(j.compatibilidade||0)}%</div></div>
      <div class="chips">${tech.map(t=>`<span class="chip">${esc(t)}</span>`).join('')}<span class="chip">${esc(j.prioridade||'Media')}</span><span class="chip">${esc(j.status||'Para candidatar')}</span></div>
      <div class="job-grid"><div>Fonte<b>${esc(j.fonte||'—')}</b></div><div>Salário<b>${esc(j.salario||'Não informado')}</b></div><div>Modalidade<b>${esc(j.modalidade||'—')}</b></div><div>Localização<b>${esc(j.localizacao||'—')}</b></div></div>
      ${j.descricao?`<p class="description">${esc(j.descricao)}</p>`:''}
      ${j.observacoes?`<p class="description"><strong>Observação:</strong> ${esc(j.observacoes)}</p>`:''}
      <div class="actions">${link}<button data-copy="${j.id}">Copiar mensagem</button>${j.status!=='Candidatado'?`<button class="apply" data-applied="${j.id}">Marcar como candidatada</button>`:''}</div>
    </article>`;
  }).join('');
  jobsEl.querySelectorAll('[data-copy]').forEach(b=>b.onclick=async()=>{const job=allJobs.find(j=>String(j.id)===String(b.dataset.copy));await navigator.clipboard.writeText(buildMessage(job));b.textContent='Copiado ✓';setTimeout(()=>b.textContent='Copiar mensagem',1200);});
  jobsEl.querySelectorAll('[data-applied]').forEach(b=>b.onclick=()=>markApplied(b.dataset.applied));
}
async function loadJobs(){
  jobsEl.innerHTML='<div class="loading">Carregando vagas...</div>';
  $('#sessionStatus').textContent='Conectando...';
  try{
    const {data,error}=await sb.from(cfg.TABLE||'vagas').select('*').order('compatibilidade',{ascending:false});
    if(error) throw error;
    allJobs=data||[];
    $('#sessionStatus').textContent=`Conectado • ${allJobs.length} vagas`;
    metrics(); render();
  }catch(err){
    console.error('WAP Jobs:',err);
    jobsEl.innerHTML=`<div class="empty-list">Erro ao carregar vagas: ${esc(err.message||err)}<br><small>Execute o arquivo 02_patch_leitura_publica.sql no Supabase e recarregue.</small></div>`;
    $('#sessionStatus').textContent='Erro de conexão';
  }
}
async function markApplied(id){
  const {error}=await sb.from(cfg.TABLE||'vagas').update({status:'Candidatado',data_candidatura:new Date().toISOString().slice(0,10)}).eq('id',id);
  if(error){alert('O painel está em leitura pública. Para alterar status, faça login no Supabase ou libere update apenas para usuário autenticado.\n\n'+error.message);return;}
  const job=allJobs.find(j=>String(j.id)===String(id)); if(job){job.status='Candidatado';job.data_candidatura=new Date().toISOString().slice(0,10);} metrics();render();
}

searchEl.addEventListener('input',render); statusFilter.addEventListener('change',render); priorityFilter.addEventListener('change',render); channelFilter.addEventListener('change',render); refreshBtn.addEventListener('click',loadJobs);
document.querySelectorAll('[data-status-view]').forEach(b=>b.onclick=()=>{statusFilter.value=b.dataset.statusView;render();});
$('#newJobBtn').onclick=()=>dialog.showModal(); $('#closeDialog').onclick=()=>dialog.close(); $('#cancelDialog').onclick=()=>dialog.close();
jobForm.addEventListener('submit',async e=>{
  e.preventDefault(); formMessage.textContent='Salvando...'; const fd=new FormData(jobForm);
  const payload={empresa:fd.get('empresa'),cargo:fd.get('cargo'),descricao:fd.get('descricao')||null,tecnologias:fd.get('tecnologias')||null,modalidade:fd.get('modalidade')||'Remoto',localizacao:fd.get('localizacao')||'Brasil',salario:fd.get('salario')||null,fonte:fd.get('fonte')||null,link_vaga:fd.get('link_vaga')||null,compatibilidade:Number(fd.get('compatibilidade')||0),prioridade:fd.get('prioridade')||'Media',status:'Para candidatar',observacoes:fd.get('observacoes')||null};
  const {error}=await sb.from(cfg.TABLE||'vagas').insert(payload);
  if(error){formMessage.textContent='Sem permissão para inserir pela página pública: '+error.message;return;}
  formMessage.textContent='Salvo!'; dialog.close(); jobForm.reset(); await loadJobs();
});
loadJobs();
