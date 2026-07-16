const translations = {
  uz: {
    meta: {
      title: "Marufjon Hamzayev — Marketolog & Vibecoder",
      description: "Marufjon Hamzayev — marketolog va vibecoder. Loyihalar, xizmatlar va bog'lanish."
    },
    nav: {
      about: "Men haqimda",
      projects: "Loyihalar",
      services: "Xizmatlar",
      contact: "Bog'lanish"
    },
    hero: {
      eyebrow: "Salom, men",
      name: "Marufjon Hamzayev",
      tagline: "Marketolog va Vibecoder — marketing strategiyasi va sun'iy intellekt yordamida ijodni birlashtiruvchi mutaxassis.",
      bio: "Men brendlar yaratishga ishtiyoqli marketolog va sun'iy intellekt yordamida veb-saytlar/ilovalar yaratishni o'rganayotgan boshlang'ich darajadagi vibecoder'man. Bu — mening shaxsiy veb-sahifam, bu yerda ishlarim va g'oyalarimni ulashaman.",
      ctaProjects: "Loyihalarim",
      ctaContact: "Bog'lanish",
      photoAlt: "Marufjon Hamzayevning portret suvrati"
    },
    projects: {
      eyebrow: "Ishlarim",
      title: "Loyihalar",
      aurus: {
        name: "Aurus-Pharm",
        desc: "Farmatsevtika kompaniyasi uchun marketing va brending ishlari. Brend taqdimoti va marketing strategiyasini shakllantirishga ko'maklashdim. (Batafsil ma'lumot tez orada.)"
      },
      soon: {
        name: "Vibecoding loyihalari",
        desc: "Yangi Vibecoding loyihalari — tez orada. Sun'iy intellekt yordamida yaratilayotgan yangi loyihalarni kuzatib boring."
      }
    },
    services: {
      eyebrow: "Nima qila olaman",
      title: "Xizmatlar",
      marketing: {
        title: "Marketing",
        smm: { title: "SMM", desc: "Kontent strategiyasi va auditoriya bilan ishlash orqali ijtimoiy tarmoqlarni boshqarish va rivojlantirish." },
        brand: { title: "Brend strategiyasi", desc: "Auditoriyangiz bilan bog'lanadigan brend identifikatsiyasi va pozitsiyalashni yaratish." },
        content: { title: "Kontent marketing", desc: "Diqqatni jalb qiluvchi va konversiyani oshiruvchi kontent yaratish." }
      },
      vibecoding: {
        title: "Vibecoding",
        sites: { title: "Landing sahifalar / saytlar", desc: "Sun'iy intellekt yordamida (vibecoding) yaratilgan zamonaviy va sodda veb-saytlar." },
        proto: { title: "AI-yordamida prototiplash", desc: "G'oyalarni sun'iy intellekt vositalari yordamida tezda ishlaydigan prototiplarga aylantirish." }
      }
    },
    contact: {
      eyebrow: "Aloqa",
      title: "Bog'lanish",
      line: "Bog'lanish uchun ijtimoiy tarmoqlarga o'ting"
    },
    footer: {
      tagline: "Vibecoding bilan yaratilgan"
    }
  },
  en: {
    meta: {
      title: "Marufjon Hamzayev — Marketer & Vibecoder",
      description: "Marufjon Hamzayev — marketer and vibecoder. Projects, services and contact."
    },
    nav: {
      about: "About",
      projects: "Projects",
      services: "Services",
      contact: "Contact"
    },
    hero: {
      eyebrow: "Hi, I'm",
      name: "Marufjon Hamzayev",
      tagline: "Marketer & Vibecoder — blending marketing strategy with AI-assisted creativity.",
      bio: "I'm a marketer passionate about building brands, and a beginner-level vibecoder learning to build digital products with the help of AI tools. This is my personal corner of the web, where I share my work and ideas.",
      ctaProjects: "My Projects",
      ctaContact: "Get in Touch",
      photoAlt: "Portrait photo of Marufjon Hamzayev"
    },
    projects: {
      eyebrow: "My Work",
      title: "Projects",
      aurus: {
        name: "Aurus-Pharm",
        desc: "Marketing and branding work for a pharmaceutical company, helping shape brand presence and marketing strategy. (Details coming soon.)"
      },
      soon: {
        name: "Vibecoding Projects",
        desc: "New Vibecoding projects — coming soon. Stay tuned as I build and share more AI-assisted projects."
      }
    },
    services: {
      eyebrow: "What I Do",
      title: "Services",
      marketing: {
        title: "Marketing",
        smm: { title: "SMM", desc: "Managing and growing social media presence through content strategy and community engagement." },
        brand: { title: "Brand Strategy", desc: "Building brand identity and positioning that connects with your audience." },
        content: { title: "Content Marketing", desc: "Creating engaging content that drives awareness and conversions." }
      },
      vibecoding: {
        title: "Vibecoding",
        sites: { title: "Landing Pages / Websites", desc: "Simple, modern static websites built using AI-assisted (vibecoding) workflows." },
        proto: { title: "AI-assisted Prototyping", desc: "Turning ideas into working prototypes quickly using AI coding tools." }
      }
    },
    contact: {
      eyebrow: "Contact",
      title: "Get in Touch",
      line: "Reach out via social media"
    },
    footer: {
      tagline: "Built with vibecoding"
    }
  }
};

function t(lang, key) {
  return key.split(".").reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : null), translations[lang]);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(lang, el.dataset.i18n);
    if (value !== null) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const [attr, key] = el.dataset.i18nAttr.split(":");
    const value = t(lang, key);
    if (value !== null) el.setAttribute(attr, value);
  });

  const title = t(lang, "meta.title");
  if (title) document.title = title;

  localStorage.setItem("site-lang", lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("site-lang");
  applyLanguage(saved || "uz");

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
});
