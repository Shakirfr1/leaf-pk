const machines = {
  "370i": {name:"LF-370I", type:"DTF PRINTING SYSTEM", desc:"Compact DTF system for vivid, durable garment-transfer production.", head:"Epson i600-A1 × 2", width:"≤ 300 mm", speed:"8 PASS: 3 m²/hr\n12 PASS: 2 m²/hr", fit:"Garment transfers, samples and compact production.", img:"assets/lf-370i.webp"},
  "720a": {name:"LF-720A", type:"DTF PRINTING SYSTEM", desc:"60 cm DTF production system for apparel, sportswear and merchandise.", head:"Epson i3200-A1 × 2", width:"≤ 600 mm", speed:"4 PASS: 9.5 m²/hr\n6 PASS: 7.5 m²/hr", fit:"Apparel, sportswear and growing commercial production.", img:"assets/lf-720a.webp"},
  "740a": {name:"LF-740A", type:"HIGH-OUTPUT DTF SYSTEM", desc:"Four-head DTF system built for faster production and scalable output.", head:"Epson i3200-A1 × 4", width:"≤ 600 mm", speed:"4 PASS: 25 m²/hr\n6 PASS: 16 m²/hr", fit:"Higher-volume apparel and production-focused DTF operations.", img:"assets/lf-740a.webp"},
  "720c": {name:"LF-720C", type:"UV DTF PRINTING SYSTEM", desc:"Compact UV DTF system for premium transfers on bottles, glass, acrylic, metal and smooth objects.", head:"Epson i3200 U1HD × 1", width:"< 300 mm", speed:"8 PASS: 0.2–0.6 m²/hr", fit:"Bottles, cups, glass, acrylic, gifts and smooth hard surfaces.", img:"assets/lf-720c.webp"},
  "740c": {name:"LF-740C", type:"3D UV PRINTING SYSTEM", desc:"60 cm UV platform for raised, textured and dimensional label effects using colour, white and varnish.", head:"Epson i3200 U1HD × 1", width:"< 600 mm", speed:"6 PASS: 3.5 m²/hr\n8 PASS: 2.9 m²/hr", fit:"Raised labels, textured effects, varnish and premium decoration.", img:"assets/lf-740c.webp"},
  "194": {name:"LF-194", type:"SUBLIMATION PRINTER", desc:"Wide-format sublimation platform for sportswear, fashion fabrics, signage and textile production.", head:"Industrial print platform", width:"Wide-format textile output", speed:"Production configuration", fit:"Sportswear, fashion fabric and commercial textile printing.", img:"assets/lf-194.webp"},
  "198": {name:"LF-198", type:"SUBLIMATION PRINTER", desc:"High-productivity sublimation solution for continuous textile printing and commercial fabric workflows.", head:"Industrial print platform", width:"Wide-format textile output", speed:"Production configuration", fit:"Continuous textile workflows and higher-volume fabric production.", img:"assets/lf-198.webp"},
  "1912": {name:"LF-1912", type:"SUBLIMATION PRINTER", desc:"Production-scale sublimation printer for sportswear, fashion, soft signage and home textiles.", head:"Industrial multi-head platform", width:"Wide-format textile output", speed:"High-output configuration", fit:"Production-scale sportswear, soft signage and home textiles.", img:"assets/lf-1912.webp"}
};

const processes = {
  dtf:{title:"DTF printing process",text:"Direct-to-film printing is a heat-transfer process for apparel and merchandise.",steps:[["Design","Create or customise the artwork"],["Print","Print the design onto PET film"],["Powder","Apply hot-melt adhesive powder"],["Heat press","Transfer the design onto fabric"],["Finish","Peel and inspect the finished product"]]},
  uvdtf:{title:"UV DTF printing process",text:"UV-curable ink is printed onto adhesive film, laminated and applied to rigid or smooth surfaces.",steps:[["Design","Prepare graphics and RIP the file"],["Materials","Load A+B film and UV DTF ink"],["Print","Print and laminate in one workflow"],["Cut","Cut the graphic by machine or hand"],["Apply","Stick to the object and peel the B film"]]},
  sub:{title:"Sublimation printing process",text:"Sublimation transfers dye into polyester fabric or coated products using heat and pressure.",steps:[["Design","Create or customise the artwork"],["Prepare","Load sublimation ink, paper and substrate"],["Print","Print using a sublimation printer"],["Transfer","Heat press onto the substrate"],["Finish","Inspect the vibrant finished product"]]}
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const menu = $(".menu");
const nav = $(".header nav");

menu?.addEventListener("click",()=>{
  nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(nav.classList.contains("open")));
});
$$('.header nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

function selectMachine(key){
  const m = machines[key];
  if(!m) return;
  $$('.tabs button').forEach(x=>{
    const active = x.dataset.machine === key;
    x.classList.toggle('active',active);
    x.setAttribute('aria-selected',String(active));
  });
  const image = $("#machineImg");
  image.style.opacity = ".08";
  image.style.transform = "scale(.97)";
  window.setTimeout(()=>{
    image.src = m.img;
    image.alt = `LEAF ${m.name} digital printing machine`;
    image.style.opacity = "1";
    image.style.transform = "scale(1)";
  },120);
  $("#machineName").textContent = m.name;
  $("#machineType").textContent = m.type;
  $("#machineDesc").textContent = m.desc;
  $("#specHead").textContent = m.head;
  $("#specWidth").textContent = m.width;
  $("#specSpeed").innerHTML = m.speed.replace(/\n/g,"<br>");
  $("#machineFit").textContent = m.fit;
  $("#modelQuote").href = `https://wa.me/923210028881?text=${encodeURIComponent(`Hi LEAF PK, I'm interested in ${m.name}. Please send me a quotation, available configuration and delivery details for Pakistan.`)}`;
}

$$('.tabs button').forEach(button=>button.addEventListener('click',()=>selectMachine(button.dataset.machine)));

$$('.machine-filters button').forEach(filter=>filter.addEventListener('click',()=>{
  const category = filter.dataset.category;
  $$('.machine-filters button').forEach(x=>x.classList.toggle('active',x===filter));
  const modelButtons = $$('.tabs button');
  modelButtons.forEach(button=>button.hidden = category !== 'all' && button.dataset.category !== category);
  const current = $('.tabs button.active');
  if(!current || current.hidden){
    const firstVisible = modelButtons.find(button=>!button.hidden);
    if(firstVisible) selectMachine(firstVisible.dataset.machine);
  }
}));

function renderProcess(key){
  const p=processes[key];
  $("#processPanel").innerHTML=`<div class="process-intro"><div><h3>${p.title}</h3><p>${p.text}</p></div><div class="steps">${p.steps.map((s,i)=>`<div class="step"><b>${String(i+1).padStart(2,"0")}</b><h4>${s[0]}</h4><p>${s[1]}</p></div>${i<p.steps.length-1?'<span class="arrow">→</span>':''}`).join("")}</div></div>`;
}
$$('.process-tabs button').forEach(button=>button.addEventListener('click',()=>{
  $$('.process-tabs button').forEach(x=>x.classList.remove('active'));
  button.classList.add('active');
  renderProcess(button.dataset.process);
}));
renderProcess('dtf');

const quoteForm = $('#quoteForm');
quoteForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const name = $('#qName').value.trim() || 'Not provided';
  const city = $('#qCity').value.trim() || 'Not provided';
  const tech = $('#qTech').value;
  const product = $('#qProduct').value.trim() || 'Not provided';
  const notes = $('#qNotes').value.trim() || 'Not provided';
  const message = [
    'Hi LEAF PK, I would like a quotation / recommendation.',
    '',
    `Name: ${name}`,
    `City: ${city}`,
    `Technology: ${tech}`,
    `Product / application: ${product}`,
    `Requirement: ${notes}`
  ].join('\n');
  window.open(`https://wa.me/923210028881?text=${encodeURIComponent(message)}`,'_blank','noopener');
});

// Highlight the current section in the sticky navigation.
const navLinks = $$('.header nav a[href^="#"]:not(.quote)');
const sections = navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){
  const observer = new IntersectionObserver(entries=>{
    const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible) return;
    navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${visible.target.id}`));
  },{rootMargin:'-30% 0px -55% 0px',threshold:[0,.15,.4,.7]});
  sections.forEach(section=>observer.observe(section));
}

// Keep the hero/header state clean: no section is highlighted while the visitor is at the top hero.
function clearNavAtHero(){
  if(window.scrollY < Math.min(420, window.innerHeight * 0.45)){
    $$('.header nav a.active').forEach(link=>link.classList.remove('active'));
  }
}
window.addEventListener('scroll', clearNavAtHero, {passive:true});
window.addEventListener('load', clearNavAtHero);
clearNavAtHero();


// V8 homepage moving banner
(() => {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.hero-slide')];
  const dots = [...slider.querySelectorAll('.hero-slider-dots button')];
  const prev = slider.querySelector('.hero-slider-arrow--prev');
  const next = slider.querySelector('.hero-slider-arrow--next');
  if (slides.length < 2) return;
  let current = 0;
  let timer = null;
  const delay = 5500;

  function show(index, userInitiated = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
    if (userInitiated) restart();
  }

  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stop();
    timer = window.setInterval(() => show(current + 1), delay);
  }
  function stop() { if (timer) window.clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  prev?.addEventListener('click', () => show(current - 1, true));
  next?.addEventListener('click', () => show(current + 1, true));
  dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.slideTo), true)));
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  let touchX = 0;
  slider.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, {passive:true});
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1), true);
  }, {passive:true});

  show(0);
  start();
})();
