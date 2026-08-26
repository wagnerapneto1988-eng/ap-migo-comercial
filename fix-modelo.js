// WAP - correção de entrada no modelo EAD Semiótica
// Carregado depois de script.js para corrigir os caminhos sem alterar o motor principal.
(() => {
  const EAD_URL = 'modulos/ead/ead-semiotica/index.html';
  const EAD_IMG = 'modulos/ead/ead-semiotica/assets/portugues-aula-visual.png';
  const DELIVERY_URL = 'modulos/delivery/index.html';

  function isEducationView() {
    const app = document.querySelector('#app');
    const family = app?.dataset?.family;
    if (family === 'education') return true;

    const heading = (document.querySelector('#demoHeading')?.textContent || '').toLowerCase();
    const segment = (document.querySelector('#planSegment')?.textContent || '').toLowerCase();
    return heading.includes('ead') ||
      /escola|professor|curso|idioma|educa/.test(segment);
  }

  function fixLinks() {
    const education = isEducationView();

    const openModel = document.querySelector('#openModel');
    if (openModel) {
      openModel.href = education ? EAD_URL : DELIVERY_URL;
    }

    const demoProduct = document.querySelector('#demoProduct');
    if (demoProduct && education) {
      const a = demoProduct.querySelector('a');
      if (a) {
        a.href = EAD_URL;
        a.textContent = 'VER MODELO EAD';
      }

      const img = demoProduct.querySelector('img');
      if (img) {
        // Só troca se o asset existir na estrutura nova.
        img.src = EAD_IMG;
        img.onerror = () => {
          img.onerror = null;
          img.src = 'modulos/ead/ead-portugues/assets/portugues-aula-visual.png';
        };
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    fixLinks();

    // script.js altera os links quando renderiza demo/plano;
    // este observer reaplica o caminho correto logo em seguida.
    const target = document.querySelector('#app') || document.body;
    const observer = new MutationObserver(() => fixLinks());
    observer.observe(target, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['href', 'data-family', 'class']
    });

    document.addEventListener('click', (event) => {
      const el = event.target.closest('#openModel, #demoProduct a');
      if (!el) return;
      fixLinks();
    }, true);
  });
})();
