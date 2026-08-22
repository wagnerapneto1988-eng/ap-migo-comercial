-- WAP Painel de Vagas v02
-- Permite SOMENTE LEITURA pública da tabela de vagas no GitHub Pages.
-- INSERT/UPDATE/DELETE continuam protegidos pelas regras existentes.

alter table public.vagas enable row level security;

drop policy if exists "vagas_anon_select" on public.vagas;
create policy "vagas_anon_select"
on public.vagas
for select
to anon
using (true);

grant select on public.vagas to anon;

-- Conferência
select id, empresa, cargo, compatibilidade, prioridade, status
from public.vagas
order by compatibilidade desc;
