import{a as g,S as h,i as w}from"./assets/vendor-b0d10f48.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const L="https://pixabay.com",b="44423269-f21c5bc9414954348df27e7dd";async function m(t,o=1,n=15){const a="/api/",e=new URLSearchParams({key:b,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:n}),r=`${L}${a}?${e}`;try{const s=await g.get(r);if(s.status!==200)throw new Error("Network response was not ok");return s.data}catch(s){throw console.error("Error fetching images:",s),s}}let d;function p(t,o=!1){const n=document.getElementById("gallery"),a=t.map(e=>`
      <a href="${e.largeImageURL}" data-lightbox="gallery">
        <div class="image-card">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <p>${e.tags}</p>
        </div>
      </a>
    `).join("");o?n.insertAdjacentHTML("beforeend",a):n.innerHTML=a,d?d.refresh():d=new h(".gallery a",{})}function u(t){w.error({title:"Error",message:t})}function E(){const t=document.getElementById("gallery");t.innerHTML=""}const i=document.querySelector(".loader-wrapper"),l=document.querySelector(".load-more");let c=1,y="";const f={form:document.querySelector(".js-picture-form"),input:document.querySelector('.js-picture-form input[name="query"]'),gallery:document.getElementById("gallery")};f.form.addEventListener("submit",async function(t){t.preventDefault();const o=f.input.value.trim();if(o===""){u("Please enter a search term");return}o!==y&&(y=o,c=1,E(),l.style.display="none"),i.style.display="block";try{const n=await m(y,c);i.style.display="none",n.hits.length===0?u("Sorry, there are no images matching your search query. Please try again!"):(p(n.hits,c>1),n.hits.length===15?l.style.display="block":l.style.display="none")}catch{i.style.display="none",u("An error occurred while fetching the images. Please try again.")}});l.addEventListener("click",async function(){c+=1,i.style.display="block";try{const t=await m(y,c);i.style.display="none",p(t.hits,!0),t.hits.length<15&&(l.style.display="none")}catch{i.style.display="none",u("An error occurred while fetching the images. Please try again.")}});
//# sourceMappingURL=commonHelpers.js.map