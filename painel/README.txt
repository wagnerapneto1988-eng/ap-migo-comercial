WAP_Painel_Vagas_Emprego_v02

CORREÇÃO PRINCIPAL
- O painel antigo consultava vw_painel_vagas_emprego / vagas_emprego.
- O banco atual possui public.vagas com 20 registros.
- Esta versão consulta public.vagas diretamente.
- config-jobs.js já aponta para o projeto Supabase correto.

ANTES DE PUBLICAR
1. No Supabase > SQL Editor, execute 02_patch_leitura_publica.sql.
   Isso libera SOMENTE SELECT para anon, necessário porque GitHub Pages é público e não compartilha sua sessão do Supabase Dashboard.
2. Substitua no GitHub os arquivos do painel por:
   index.html
   style.css
   jobs.js
   config-jobs.js
3. Recarregue a página com Ctrl+Shift+R.

SEGURANÇA
- A chave publishable/anon pode ficar no front-end.
- O patch libera somente leitura pública das vagas.
- Escrita continua dependente das policies existentes.

RESULTADO ESPERADO
Total: 20
Para candidatar: 20
Lista ordenada por compatibilidade.
