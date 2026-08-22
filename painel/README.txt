WAP PAINEL DE VAGAS — v03

ALTERAÇÃO PRINCIPAL
- Adicionado botão “Enviar candidatura ↗” em cada card que possuir link_vaga válido.
- O botão abre o anúncio original em nova aba.
- Se link_vaga estiver vazio, o botão não aparece.
- Links são aceitos somente quando começam com http:// ou https://.

BANCO
- Continua usando public.vagas no Supabase.
- Nenhuma alteração de estrutura é necessária nesta versão.
- As 20 vagas já cadastradas continuam funcionando.

PUBLICAÇÃO
Substitua no diretório atual do painel do GitHub Pages:
- index.html
- style.css
- jobs.js
- config-jobs.js

Após publicar, use Ctrl+F5 no navegador para ignorar o cache.

IMPORTANTE
O botão aparece apenas nas vagas que tenham link_vaga preenchido no Supabase.
