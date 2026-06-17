
function t(k){const l=localStorage.getItem('se_lang')||'es';const set=window.SE_TR[l]||window.SE_TR.en;return set[k]||window.SE_TR.en[k]||k}
function applyLang(l){localStorage.setItem('se_lang',l);document.documentElement.lang=l;document.getElementById('langSel').value=l;document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));}
function fakeSubmit(e){e.preventDefault();const box=e.target.querySelector('[data-success]');box.style.display='block';box.textContent=t('success');return false}
function openLightbox(src){document.getElementById('lightboxImg').src=src;document.getElementById('lightbox').classList.add('open')}
function closeLightbox(e){if(e.target.id==='lightbox')document.getElementById('lightbox').classList.remove('open')}
function openWhatsApp(e){const url='https://wa.me/525661858309?text=Hola%20Streamer%20Empire%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n.'; window.open(url,'_blank','noopener,noreferrer'); return false;}
document.addEventListener('DOMContentLoaded',()=>{applyLang(localStorage.getItem('se_lang')||'es');document.getElementById('langSel').addEventListener('change',e=>applyLang(e.target.value));});
