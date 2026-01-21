/* =========================
   REVEAL ANIMATION
========================= */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  }
);

reveals.forEach(r => observer.observe(r));

/* =========================
   SCROLL PROGRESS BAR
========================= */
window.addEventListener("scroll", () => {
  const scroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scroll / height) * 100;
  document.getElementById("scroll-progress").style.width = progress + "%";
});

/* =========================
   THEME TOGGLE
========================= */
const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Atualiza o emoji do botão
function updateThemeIcon() {
  const currentTheme = html.dataset.theme;
  toggle.textContent = currentTheme === "dark" ? "🌙" : "☀️";
  
  // Atualiza meta theme-color para iOS
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.content = currentTheme === "dark" ? "#0b0f1a" : "#f0f0f3";
  }
}

// Toggle do tema
toggle.addEventListener("click", () => {
  const theme = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  updateThemeIcon();
});

// Carrega o tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.dataset.theme = savedTheme;
}
updateThemeIcon();

/* =========================
   NAVIGATION ACTIVE LINK
========================= */
const navLinks = document.querySelectorAll(".floating-nav a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   PROJECT MODAL
========================= */
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");
const modalLink = document.getElementById("modal-link");
const closeModal = document.querySelector(".close-modal");

const projects = {
  cripto: {
    title: "MINHA CRIPTO",
    desc: "App mobile focado em criptomoedas com usabilidade e segurança. Desenvolvido para facilitar transações e acompanhamento de ativos digitais.",
    tech: "Swift • Node.js • API REST",
    link: "https://github.com/Soarezzsemj/Minha-Cripto",
    images: [
      { src: "MinhaCripto/cel2.png", alt: "Tela 2" },
      { src: "MinhaCripto/cel3.png", alt: "Tela 3" },
      { src: "MinhaCripto/cel4.png", alt: "Tela 4" }
    ]
  },
  resume: {
    title: "RESUME AI",
    desc: "Aplicação full stack para geração automática de resumos usando inteligência artificial. Interface moderna e responsiva.",
    tech: "React • Node.js • TypeScript • IA",
    link: "https://github.com/Soarezzsemj/Resumo-IA",
    liveLink: "https://resumo-ia.vercel.app/",
    images: [
      { src: "ResumeAi/Resume2.png", alt: "Tela 1" },
      { src: "ResumeAi/Resume3.png", alt: "Tela 2" }
    ]
  }
};

// Abre modal ao clicar em um projeto
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const projectKey = card.dataset.project;
    const project = projects[projectKey];
    
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    modalTech.textContent = `Tecnologias: ${project.tech}`;
    modalLink.href = project.link;
    
    // Botão de versão online (se existir)
    const liveBtn = document.getElementById("modal-live-link");
    if (project.liveLink) {
      liveBtn.href = project.liveLink;
      liveBtn.style.display = "inline-flex";
    } else {
      liveBtn.style.display = "none";
    }
    
    // Adiciona galeria de imagens
    const gallery = document.getElementById("modal-gallery");
    gallery.innerHTML = "";
    
    if (project.images && project.images.length > 0) {
      project.images.forEach(img => {
        const imgItem = document.createElement("a");
        imgItem.href = img.src;
        imgItem.target = "_blank";
        imgItem.className = "modal-gallery-item";
        imgItem.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        gallery.appendChild(imgItem);
      });
    }
    
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

// Fecha modal
function fecharModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = ""; // Restaura scroll do body
}

closeModal.addEventListener("click", fecharModal);

// Fecha modal ao clicar fora do conteúdo
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    fecharModal();
  }
});

// Fecha modal com tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    fecharModal();
  }
});

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    
    if (target) {
      const offset = 80; // Offset para não ficar escondido atrás da nav
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

/* =========================
   FORM SUBMIT (WEB3FORMS)
========================= */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  // Desabilita o botão e mostra loading
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  
  // Esconde mensagens anteriores
  formStatus.classList.add("hidden");
  formStatus.classList.remove("success", "error");
  
  // Pega os dados do formulário
  const formData = new FormData(contactForm);
  
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Sucesso
      formStatus.textContent = "✓ Mensagem enviada com sucesso! Entrarei em contato em breve.";
      formStatus.classList.remove("hidden");
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      // Erro na resposta
      throw new Error(data.message || "Erro ao enviar mensagem");
    }
  } catch (error) {
    // Erro na requisição
    formStatus.textContent = "✗ Erro ao enviar mensagem. Tente novamente mais tarde.";
    formStatus.classList.remove("hidden");
    formStatus.classList.add("error");
    console.error("Erro:", error);
  } finally {
    // Reabilita o botão
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});