-- ============================================================
-- WAP CONSULTORIA DIGITAL
-- PAINEL SEPARADO — VAGAS DE EMPREGO
-- Supabase / PostgreSQL
-- Versão: v01
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 1) VAGAS
-- ------------------------------------------------------------
create table if not exists public.vagas_emprego (
  id uuid primary key default gen_random_uuid(),
  empresa text not null,
  cargo text not null,
  descricao_resumida text,
  modalidade text default 'Remoto'
    check (modalidade in ('Remoto','Híbrido','Presencial')),
  regime text
    check (regime is null or regime in ('CLT','PJ','Freelancer','Estágio','Temporário','Outro')),
  senioridade text
    check (senioridade is null or senioridade in ('Júnior','Pleno','Sênior','Especialista','Não informado')),
  salario_min numeric(12,2),
  salario_max numeric(12,2),
  moeda text default 'BRL',
  stack text[],
  compatibilidade integer default 0 check (compatibilidade between 0 and 100),
  prioridade text default 'Média'
    check (prioridade in ('Baixa','Média','Alta','Urgente')),
  status text default 'Nova'
    check (status in ('Nova','Analisar','Candidatar','Candidatado','Entrevista','Teste técnico','Proposta','Descartada','Encerrada')),
  data_publicacao date,
  data_limite date,
  origem_nome text,
  origem_url text,
  observacoes text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_vagas_emprego_status
  on public.vagas_emprego(status);

create index if not exists idx_vagas_emprego_prioridade
  on public.vagas_emprego(prioridade);

create index if not exists idx_vagas_emprego_compatibilidade
  on public.vagas_emprego(compatibilidade desc);

create index if not exists idx_vagas_emprego_empresa
  on public.vagas_emprego(empresa);

-- ------------------------------------------------------------
-- 2) CONTATOS PÚBLICOS / PROFISSIONAIS DA VAGA
-- ------------------------------------------------------------
create table if not exists public.vagas_contatos (
  id uuid primary key default gen_random_uuid(),
  vaga_id uuid not null references public.vagas_emprego(id) on delete cascade,
  tipo text not null
    check (tipo in ('WhatsApp','Instagram','Facebook','LinkedIn','E-mail','Site','Outro')),
  valor text,
  url text,
  nome_contato text,
  publicado_para_candidatura boolean default false,
  fonte_url text,
  observacoes text,
  criado_em timestamptz not null default now()
);

create index if not exists idx_vagas_contatos_vaga
  on public.vagas_contatos(vaga_id);

create index if not exists idx_vagas_contatos_tipo
  on public.vagas_contatos(tipo);

-- ------------------------------------------------------------
-- 3) CANDIDATURAS / HISTÓRICO
-- ------------------------------------------------------------
create table if not exists public.vagas_candidaturas (
  id uuid primary key default gen_random_uuid(),
  vaga_id uuid not null references public.vagas_emprego(id) on delete cascade,
  canal text,
  mensagem text,
  portfolio_url text,
  status text default 'Enviado'
    check (status in ('Preparado','Enviado','Respondido','Entrevista','Teste','Proposta','Sem retorno','Encerrado')),
  data_envio timestamptz default now(),
  proximo_followup timestamptz,
  observacoes text,
  criado_em timestamptz not null default now()
);

create index if not exists idx_vagas_candidaturas_vaga
  on public.vagas_candidaturas(vaga_id);

create index if not exists idx_vagas_candidaturas_followup
  on public.vagas_candidaturas(proximo_followup);

-- ------------------------------------------------------------
-- 4) TRIGGER updated_at
-- ------------------------------------------------------------
create or replace function public.set_updated_at_vagas()
returns trigger
language plpgsql
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists trg_vagas_emprego_updated_at on public.vagas_emprego;

create trigger trg_vagas_emprego_updated_at
before update on public.vagas_emprego
for each row execute function public.set_updated_at_vagas();

-- ------------------------------------------------------------
-- 5) VIEW DO PAINEL
-- ------------------------------------------------------------
create or replace view public.vw_painel_vagas_emprego as
select
  v.id,
  v.empresa,
  v.cargo,
  v.modalidade,
  v.regime,
  v.senioridade,
  v.salario_min,
  v.salario_max,
  v.moeda,
  v.stack,
  v.compatibilidade,
  v.prioridade,
  v.status,
  v.data_publicacao,
  v.data_limite,
  v.origem_nome,
  v.origem_url,
  v.observacoes,
  max(case when c.tipo = 'WhatsApp' then c.valor end) as whatsapp,
  max(case when c.tipo = 'WhatsApp' then c.url end) as whatsapp_url,
  max(case when c.tipo = 'Instagram' then c.url end) as instagram_url,
  max(case when c.tipo = 'Facebook' then c.url end) as facebook_url,
  max(case when c.tipo = 'LinkedIn' then c.url end) as linkedin_url,
  max(case when c.tipo = 'E-mail' then c.valor end) as email,
  max(case when c.tipo = 'Site' then c.url end) as site_url,
  count(c.id) as total_contatos
from public.vagas_emprego v
left join public.vagas_contatos c on c.vaga_id = v.id
group by v.id;

-- ------------------------------------------------------------
-- 6) RLS
-- ATENÇÃO: política simples para usuário autenticado.
-- Ajuste conforme seu modelo administrativo.
-- ------------------------------------------------------------
alter table public.vagas_emprego enable row level security;
alter table public.vagas_contatos enable row level security;
alter table public.vagas_candidaturas enable row level security;

drop policy if exists "auth_vagas_select" on public.vagas_emprego;
drop policy if exists "auth_vagas_insert" on public.vagas_emprego;
drop policy if exists "auth_vagas_update" on public.vagas_emprego;
drop policy if exists "auth_vagas_delete" on public.vagas_emprego;

create policy "auth_vagas_select"
on public.vagas_emprego for select
to authenticated using (true);

create policy "auth_vagas_insert"
on public.vagas_emprego for insert
to authenticated with check (true);

create policy "auth_vagas_update"
on public.vagas_emprego for update
to authenticated using (true) with check (true);

create policy "auth_vagas_delete"
on public.vagas_emprego for delete
to authenticated using (true);

drop policy if exists "auth_contatos_select" on public.vagas_contatos;
drop policy if exists "auth_contatos_insert" on public.vagas_contatos;
drop policy if exists "auth_contatos_update" on public.vagas_contatos;
drop policy if exists "auth_contatos_delete" on public.vagas_contatos;

create policy "auth_contatos_select"
on public.vagas_contatos for select
to authenticated using (true);

create policy "auth_contatos_insert"
on public.vagas_contatos for insert
to authenticated with check (true);

create policy "auth_contatos_update"
on public.vagas_contatos for update
to authenticated using (true) with check (true);

create policy "auth_contatos_delete"
on public.vagas_contatos for delete
to authenticated using (true);

drop policy if exists "auth_cand_select" on public.vagas_candidaturas;
drop policy if exists "auth_cand_insert" on public.vagas_candidaturas;
drop policy if exists "auth_cand_update" on public.vagas_candidaturas;
drop policy if exists "auth_cand_delete" on public.vagas_candidaturas;

create policy "auth_cand_select"
on public.vagas_candidaturas for select
to authenticated using (true);

create policy "auth_cand_insert"
on public.vagas_candidaturas for insert
to authenticated with check (true);

create policy "auth_cand_update"
on public.vagas_candidaturas for update
to authenticated using (true) with check (true);

create policy "auth_cand_delete"
on public.vagas_candidaturas for delete
to authenticated using (true);

-- ------------------------------------------------------------
-- 7) EXEMPLO DE INSERT
-- Deixe comentado e substitua pelos dados reais pesquisados.
-- ------------------------------------------------------------
/*
insert into public.vagas_emprego (
  empresa, cargo, modalidade, regime, senioridade,
  salario_min, salario_max, stack, compatibilidade,
  prioridade, status, origem_nome, origem_url
) values (
  'EMPRESA REAL',
  'Desenvolvedor PHP Pleno',
  'Remoto',
  'CLT',
  'Pleno',
  6000,
  8000,
  array['PHP','JavaScript','MySQL'],
  92,
  'Alta',
  'Candidatar',
  'LinkedIn',
  'https://...'
)
returning id;

insert into public.vagas_contatos (
  vaga_id, tipo, valor, url, publicado_para_candidatura, fonte_url
) values (
  'UUID_DA_VAGA',
  'WhatsApp',
  '5511999999999',
  'https://wa.me/5511999999999',
  true,
  'https://fonte-publica-da-vaga'
);
*/
