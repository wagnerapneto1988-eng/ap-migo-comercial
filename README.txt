WAP CONSULTORIA DIGITAL — VERSÃO COMERCIAL V1

Conteúdo:
- index.html: página comercial completa.
- style.css: identidade visual responsiva.
- app.js: catálogo de 20 soluções, filtros, links direcionados, diagnóstico, gerador de abordagem e mini-CRM.

CONFIGURAÇÃO DO WHATSAPP
1. Abra app.js.
2. Procure: whatsappNumber: ""
3. Preencha somente com números, incluindo país e DDD.
   Exemplo fictício: whatsappNumber: "5511999999999"
4. Salve.

COMO FUNCIONAM OS LINKS DIRECIONADOS
Ao escolher um serviço/nicho na Central de Prospecção, a página gera uma URL parecida com:
?service=agendamento&niche=Sal%C3%A3o%20e%20barbearia
Quando o cliente abre esse link, a solução indicada é apresentada automaticamente.

MINI CRM
- Salva dados localmente no navegador via localStorage.
- Não usa banco de dados.
- O botão "Exportar CSV" gera uma planilha simples dos leads.
- Ao limpar os dados do navegador, o CRM local também pode ser apagado. Exporte periodicamente.

PUBLICAÇÃO
Pode ser publicada em hospedagem estática como GitHub Pages, Netlify, Cloudflare Pages ou Tiiny Host.
Basta enviar os arquivos mantendo index.html, style.css e app.js na mesma pasta.

CONSULTOR MIGO / LOGO
Esta V1 usa a identidade textual/visual da WAP e um avatar funcional "M" para o Consultor Migo.
Quando o arquivo oficial do logo e a imagem oficial do Consultor Migo estiverem disponíveis, substitua sem alterar o mecanismo comercial.

IMPORTANTE
A Central de Prospecção gera a mensagem e abre o WhatsApp para revisão e envio manual. Não há disparo automático em massa.

INTEGRAÇÃO SUPABASE — 16/08/2026
- O diagnóstico agora coleta nome, empresa, WhatsApp e e-mail opcional ao final.
- O envio grava diretamente na tabela public.diagnosticos via Data API.
- Usa somente Project URL + Publishable Key no navegador.
- NÃO usa service_role / secret key.
- Campos enviados: nome_cliente, nome_empresa, whatsapp, email, segmento, respostas, pontuacao, relatorio, recomendacoes, prioridade e status="novo".
- Requer RLS ativo e policy de INSERT para anon na tabela diagnosticos.
