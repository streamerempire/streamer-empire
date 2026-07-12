function getLang(){return localStorage.getItem('se_lang')||'es'}
function t(k){
  const l=getLang();
  const set=window.SE_TR[l]||window.SE_TR.en||{};
  return set[k]||((window.SE_TR.en||{})[k])||k;
}
function googleFormUrlForLang(l){
  const base='https://forms.gle/Pxg7KzrS9zDD3qhu7';
  const map={es:'es',en:'en',nz:'en',it:'it',fr:'fr',pt:'pt-BR',ko:'ko',zh:'zh-CN',ja:'ja'};
  const hl=map[l]||'en';
  return base + '?hl=' + encodeURIComponent(hl);
}
function applyLang(l){
  localStorage.setItem('se_lang',l);
  document.documentElement.lang=l;
  const sel=document.getElementById('langSel');
  if(sel) sel.value=l;

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent=t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    el.setAttribute('placeholder',t(el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el=>{
    el.setAttribute('alt',t(el.dataset.i18nAlt));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{
    el.setAttribute('title',t(el.dataset.i18nTitle));
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el=>{
    el.setAttribute('aria-label',t(el.dataset.i18nAriaLabel));
  });
  document.querySelectorAll('[data-i18n-value]').forEach(el=>{
    el.setAttribute('value',t(el.dataset.i18nValue));
  });

  document.querySelectorAll('[data-google-form-link]').forEach(el=>{
    el.setAttribute('href',googleFormUrlForLang(l));
  });

  if(t('page_title')!=='page_title') document.title=t('page_title');
  const desc=document.querySelector('meta[name="description"]');
  if(desc && t('page_description')!=='page_description') desc.setAttribute('content',t('page_description'));
  const ogTitle=document.querySelector('meta[property="og:title"]');
  if(ogTitle && t('page_title')!=='page_title') ogTitle.setAttribute('content',t('page_title'));
  const ogDesc=document.querySelector('meta[property="og:description"]');
  if(ogDesc && t('page_description')!=='page_description') ogDesc.setAttribute('content',t('page_description'));
  const twTitle=document.querySelector('meta[name="twitter:title"]');
  if(twTitle && t('page_title')!=='page_title') twTitle.setAttribute('content',t('page_title'));
  const twDesc=document.querySelector('meta[name="twitter:description"]');
  if(twDesc && t('page_description')!=='page_description') twDesc.setAttribute('content',t('page_description'));
}
function fakeSubmit(e){
  e.preventDefault();
  const box=e.target.querySelector('[data-success]');
  if(box){box.style.display='block';box.textContent=t('success');}
  return false
}
function openLightbox(src){
  const img=document.getElementById('lightboxImg');
  const box=document.getElementById('lightbox');
  if(img&&box){img.src=src;box.classList.add('open');}
}
function closeLightbox(e){
  if(e.target.id==='lightbox')document.getElementById('lightbox').classList.remove('open')
}
function openWhatsApp(e){
  const url='https://wa.me/525661858309?text=Hola%20Streamer%20Empire%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n.';
  window.open(url,'_blank','noopener,noreferrer');
  return false;
}
document.addEventListener('DOMContentLoaded',()=>{
  applyLang(getLang());
  const sel=document.getElementById('langSel');
  if(sel) sel.addEventListener('change',e=>applyLang(e.target.value));
});
