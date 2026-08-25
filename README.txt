WAP EXPERIÊNCIA INTELIGENTE v17 — ARQUITETURA REFATORADA

ARQUITETURA DE CAMADAS
1. WORLD: fundo tecnológico CSS.
2. scene-left.png: Professor Migo e marca, FIXOS.
3. scene-right.png: mensagem/benefícios, FIXOS.
4. scene-base.png: base inferior do equipamento, FIXA.
5. wheel-disc.png: ÚNICO DISCO ROTATIVO.
6. fixed-pointer: ponteiro CSS, FIXO.
7. wheel-hub: hub WAP e interação, FIXOS.
8. PLAY STAGE: perguntas, leitura, demo, relatório e contato.

REGRA PRINCIPAL
Somente wheel-disc.png recebe transform: rotate().
Professor Migo, mãos, ponteiro, hub, cenário e interface nunca giram.

FLUXO
INTRO → GIRO → 5/6 PERGUNTAS UMA POR VEZ → 3 ATENÇÕES + 2 POSITIVOS → DEMO → RELATÓRIO → CONTATO.

INTELIGÊNCIA DE ORIGEM
- Segmento conhecido por URL/prospect: pergunta de segmento é pulada.
- Visitante desconhecido: 6 perguntas.
- Prospect personalizado: leitura 3+2 pode vir de prospects.js.
- Nunca inventar falhas não sustentadas pelos dados públicos.

ASSETS NOVOS
- scene-left.png
- scene-right.png
- scene-base.png
- wheel-disc.png
- migo-face-v17.png
- whatsapp-mark.png

RESPONSIVIDADE
Desktop, notebook de baixa altura, tablet e smartphone, mantendo cenário e próxima ação visíveis.

VERSÃO
WAP_Experiencia_Inteligente_v17/

V19 — CORREÇÃO DE CAMADAS E CONTINUIDADE COMERCIAL
- Corrigido o motivo estrutural da duplicação: assets laterais foram recortados novamente sem nenhum trecho da roleta.
- wheel-disc-clean.png possui apenas o disco, com furo central; hub e ponteiro continuam camadas fixas.
- Removida scene-base.png do HTML; base do equipamento passou a ser CSS.
- Corrigido seletor inválido [data-state!="intro"] para :not([data-state="intro"]).
- Assim que o diagnóstico começa, o painel lateral “Inicie seu diagnóstico” desaparece.
- O cenário visual continua presente nas etapas, sem virar tela azul genérica.
- Modelo funcional continua como parte da jornada comercial: Delivery/EAD recebem barra fixa WhatsApp + Instagram + Facebook.
- O prospect pode explorar o modelo e falar com a WAP sem ficar sem canal de retorno.

V20 — DIAGNÓSTICO VISUAL CORRIGIDO
- O fundo estático foi recortado novamente e NÃO contém mais roleta nem WhatsApp.
- wheel-disc-v20.png é a única roleta: PNG circular transparente, com furo central; o hub WAP é fixo via HTML.
- migo-face-v20.png e whatsapp-v20.png são assets próprios e nítidos.
- Ao iniciar o diagnóstico, o painel lateral “Inicie seu diagnóstico” desaparece.
- O cenário tecnológico permanece durante toda a jornada.
- Delivery/EAD mantêm WhatsApp, Instagram e Facebook dentro do modelo funcional, para o prospect não perder o caminho de contato.

V21 — PAINEL INTELIGENTE DINÂMICO
- Mantém a mesma página/cenário da V20.
- Depois do giro, o espaço do painel inicial deixa de ficar vazio e vira uma leitura dinâmica.
- O painel apresenta progresso do diagnóstico e quatro indicadores visuais: clareza, estrutura digital, automação e potencial de resultado.
- Os valores são derivados somente das respostas da própria jornada; não representam dados públicos ou desempenho real da empresa.
- Cada resposta atualiza visualmente o painel, criando sensação de evolução e inteligência durante o jogo.
- Em mobile, o painel se reorganiza abaixo da pergunta sem perder o PLAY.

V22 — CAMADA JAVASCRIPT MODERNA / INTERATIVIDADE
- Mantém o motor funcional da V21 e adiciona uma camada ES Module independente.
- JavaScript moderno sem framework: const/let, modules, CustomEvent, MutationObserver, ResizeObserver, Pointer Events e Web Animations/CSS animations.
- Progressive enhancement com View Transition API quando disponível; navegadores sem suporte continuam funcionando normalmente.
- Microinterações: tilt 3D leve nos cards, feedback de toque, PLAY pulsante quando pronto, hub da roleta respirando e atualização animada dos indicadores.
- Luz contextual acompanha o ponteiro no desktop.
- Acessibilidade: aria-live, foco por teclado, Escape fecha etapa e Enter pode acionar o PLAY quando apropriado.
- prefers-reduced-motion respeitado.
- Data attribute viewport atualizado por ResizeObserver para futuras decisões responsivas sem depender de zoom manual.
- Eventos internos wap:statechange e wap:interaction preparados para integração posterior com Supabase/analytics/API.
- Sem CDN e sem dependências externas: mais leve, estável e fácil de hospedar no GitHub Pages.
