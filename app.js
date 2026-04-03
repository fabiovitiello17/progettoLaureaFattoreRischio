(function () {
  'use strict';

  function $(id){ return document.getElementById(id); }

  function setStatus(msg){
    const el = $('qr-status');
    if (el) el.textContent = msg || '';
  }

  function buildPdfUrl(){
    return "https://pdfhost.io/v/pvBTtATeCH_guida_fattore_rischio";
  }

  async function copyToClipboard(text){
    try{
      await navigator.clipboard.writeText(text);
      return true;
    }catch(e){
      return false;
    }
  }

  function init(){
    const pdfUrl = buildPdfUrl();
    const linkInput = $('pdf-link');
    const copyBtn = $('copy-btn');
    const canvas = $('qr-canvas');

    if (linkInput) linkInput.value = pdfUrl;

    if (copyBtn){
      copyBtn.addEventListener('click', async () => {
        const ok = await copyToClipboard(pdfUrl);
        if (ok){
          copyBtn.textContent = 'Copiato ✅';
          setTimeout(() => (copyBtn.textContent = 'Copia link'), 1200);
        }else{
          setStatus('Impossibile copiare automaticamente. Seleziona il link e copialo manualmente.');
        }
      });
    }

  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();
