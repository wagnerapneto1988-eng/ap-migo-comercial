WAP EXPERIÊNCIA INTELIGENTE — V24 CLEAN SHELL

BASE FUNCIONAL
- Lógica adaptada da V22: origem/prospect, 5–6 perguntas, segmento, 3 pontos de atenção + 2 positivos,
  demonstração correspondente, plano, contato e registro local da jornada.
- Mantidos config.js, prospects.js, Supabase/admin e módulos Delivery/EAD da V22.

ARQUITETURA VISUAL
- index.html, style.css e script.js foram refeitos do zero.
- Nenhum CSS R1/R2/R3 foi herdado.
- Nenhum app-modern.js paralelo.
- Tela inicial usa somente a arte aprovada.
- Professor Migo aparece somente na abertura.
- Pós-PLAY existe um único shell: header + área principal + painel Sua Jornada + HUD inferior.
- A geometria não muda entre pergunta, resultado, demonstração, plano e contato.
- WhatsApp/Instagram/Facebook são componentes de interface, não imagens da tela.
- Navegação Voltar/Avançar permanece na mesma faixa e nunca depende do conteúdo acima.

CRITÉRIO DE TESTE
1. Chrome 100%.
2. PLAY.
3. Responder todas as perguntas.
4. Voltar e avançar em perguntas.
5. Resultado: 3 pontos de atenção + 2 positivos.
6. Demonstração visual sem sobreposição.
7. Plano de ação.
8. Contato.
9. Testar Voltar em cada etapa.
10. Nenhum botão deve sumir ou exigir alteração de zoom.

REFERÊNCIAS
- assets/layout-inicio-aprovado.png
- assets/referencia-fluxo-aprovado.png
