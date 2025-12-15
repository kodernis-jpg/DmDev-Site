// Minimal page-transition stub to avoid 404s.
// You can expand this with fade/slide transitions if desired.
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    // noop for now; placeholder to prevent missing-script errors
    // Example: add a small fade-in for main content
    try{
      const main = document.querySelector('main');
      if(main) main.style.opacity = 0;
      requestAnimationFrame(()=>{
        if(main) main.style.transition = 'opacity .25s ease-in', main.style.opacity = 1;
      });
    }catch(e){ /* ignore */ }
  });
})();
