(function(){
  const cfg=window.WAP_APP_CONFIG||{};
  const wa=(cfg.whatsapp||'').replace(/\D/g,'');
  const waHref=(wa?`https://wa.me/${wa}`:'https://wa.me/')+
    '?text='+encodeURIComponent('Olá! Estou visualizando o modelo funcional WAP e quero continuar minha jornada.');
  const bar=document.createElement('nav');
  bar.className='module-contact-bar';
  bar.setAttribute('aria-label','Fale conosco');
  bar.innerHTML=`
    <a class="mc-wa" href="${waHref}" target="_blank" aria-label="WhatsApp"><img src="../../assets/whatsapp-v20.png" alt=""></a>
    <a class="mc-ig" href="${cfg.instagram||'#'}" target="_blank" aria-label="Instagram"><span>◎</span></a>
    <a class="mc-fb" href="${cfg.facebook||'#'}" target="_blank" aria-label="Facebook"><span>f</span></a>`;
  document.body.appendChild(bar);
})();