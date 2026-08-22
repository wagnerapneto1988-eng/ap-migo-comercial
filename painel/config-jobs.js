// ============================================================
// WAP — Painel de Vagas de Emprego
// ============================================================

window.WAP_JOBS_CONFIG = {
  SUPABASE_URL: "COLE_AQUI_SUA_SUPABASE_URL",
  SUPABASE_ANON_KEY: "COLE_AQUI_SUA_SUPABASE_ANON_KEY",

  // Link enviado automaticamente nas mensagens:
  PORTFOLIO_URL: "https://SEU-LINK-DO-PORTFOLIO",

  // Nome usado na mensagem:
  CANDIDATE_NAME: "Wagner",

  // Mensagem base. Use {empresa}, {cargo} e {portfolio}.
  MESSAGE_TEMPLATE:
    "Olá! Vi a oportunidade para {cargo} na {empresa} e gostaria de apresentar meu perfil profissional. " +
    "Tenho experiência com desenvolvimento web, PHP, JavaScript, HTML/CSS, MySQL, integrações e projetos digitais.\\n\\n" +
    "Portfólio: {portfolio}\\n\\n" +
    "Fico à disposição para conversar sobre a oportunidade."
};
