// Simple RO/EN toggle + scene backgrounds
const dict = {
  ro: {
    nav_village: "Satul",
    nav_visit: "Vizită",
    nav_credits: "Credite",
    eyebrow_1: "Timiș • Banat • comuna Bogda",
    title_1: "Un sat șvăbesc mic, cu o poveste mare",
    lead_1: "Altringen (Kisrékás) e o așezare liniștită, cu case bănățene, livezi și dealuri domoale — aproape de Charlotenburg.",
    cta_1: "Planifică o vizită",
    cta_2: "Ascunde textul",
    scroll_hint: "derulează",
    title_2: "Vizită pe scurt",
    fact_1_k: "Unde",
    fact_1_v: "în nordul județului Timiș, la ~46 km de Timișoara",
    fact_2_k: "Atmosferă",
    fact_2_v: "sat de vacanță, restaurări și inițiative comunitare (ex: „Color the Village”)",
    fact_3_k: "Istorie",
    fact_3_v: "vatră mai veche (Recășel), apoi colonizare germană în sec. XVIII",
    map_link_osm: "OpenStreetMap →",
    map_link_gmaps: "Google Maps →",
    title_3: "Imagini & credite",
    credits_text: "În acest pachet, imaginile aeriene sunt „placeholders”. Pentru un site public, înlocuiește-le cu fotografii reale cu licență clară (CC BY / CC BY‑SA) sau cu poze proprii.",
    ph_1_t: "Ce trebuie să pui în /assets",
    ph_1_b: "1) aerial_top.jpg — vedere aeriană (sus) • 2) aerial_angle.jpg — vedere aeriană (oblic).\nDetalii în fișierul CREDITS.md.",
    footer_note: "Un proiect personal dedicat satului Altringen (Kisrékás)."
  },
  en: {
    nav_village: "Village",
    nav_visit: "Visit",
    nav_credits: "Credits",
    eyebrow_1: "Timiș • Banat • Bogda commune",
    title_1: "A small Swabian village with a big story",
    lead_1: "Altringen (Kisrékás) is a quiet Banat village of traditional houses, orchards and gentle hills — close to Charlotenburg.",
    cta_1: "Plan a visit",
    cta_2: "Hide text",
    scroll_hint: "scroll",
    title_2: "Visit essentials",
    fact_1_k: "Where",
    fact_1_v: "north of Timiș County, about ~46 km from Timișoara",
    fact_2_k: "Vibe",
    fact_2_v: "a weekend village, restorations and civic initiatives (e.g., “Color the Village”)",
    fact_3_k: "History",
    fact_3_v: "older settlement (Recășel), later German colonization in the 18th century",
    map_link_osm: "OpenStreetMap →",
    map_link_gmaps: "Google Maps →",
    title_3: "Images & credits",
    credits_text: "In this package, the aerial images are placeholders. For a public site, replace them with real photos with clear licensing (CC BY / CC BY‑SA) or your own photos.",
    ph_1_t: "What to put in /assets",
    ph_1_b: "1) aerial_top.jpg — top-down aerial view • 2) aerial_angle.jpg — angled aerial view.\nSee CREDITS.md for details.",
    footer_note: "A personal project dedicated to Altringen (Kisrékás)."
  }
};

function setLang(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });
  document.querySelectorAll(".lang-btn").forEach(b=>{
    const active = b.dataset.lang === lang;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", active ? "true" : "false");
  });
  localStorage.setItem("altringen_lang", lang);

  const toggleBtn = document.getElementById("toggle-ui");
  if(toggleBtn){
    const hidden = document.body.classList.contains("ui-hidden");
    toggleBtn.textContent = hidden
      ? (lang === "ro" ? "Arată textul" : "Show text")
      : (lang === "ro" ? "Ascunde textul" : "Hide text");
  }
}

document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
});

const initial = localStorage.getItem("altringen_lang") || "ro";
setLang(initial);

// apply background images via CSS variable (keeps HTML clean)
document.querySelectorAll(".scene").forEach(scene=>{
  const bg = scene.getAttribute("data-bg");
  scene.style.setProperty("--bg-img", `url('${bg}')`);
});

// hide/show UI text
const toggleBtn = document.getElementById("toggle-ui");
toggleBtn?.addEventListener("click", ()=>{
  const hidden = document.body.classList.toggle("ui-hidden");
  const lang = document.documentElement.lang || "ro";
  toggleBtn.textContent = hidden ? (lang === "ro" ? "Arată textul" : "Show text") : (lang === "ro" ? "Ascunde textul" : "Hide text");
});

// smooth anchor scrolling within the snap container
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",(e)=>{
    const id = a.getAttribute("href");
    if(!id || id.length < 2) return;
    const el = document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:"smooth", block:"start"});
  });
});
