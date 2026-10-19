/*
  MELI SPORTS — JavaScript para iniciantes
  ----------------------------------------
  1. Configure STREAM_URL com o endereço real do streaming da rádio.
  2. Este exemplo não envia cadastros a um servidor nem autentica usuários.
  3. Para contas reais, use um backend e armazene senhas com segurança no servidor.
*/

// Cole aqui a URL de transmissão fornecida pela plataforma de streaming.
// Exemplo de formato: "https://servidor-exemplo.com/stream" (use a URL real da sua rádio).
const STREAM_URL = "";

// Elementos principais da página.
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const playButton = document.querySelector("#playButton");
const playIcon = document.querySelector("#playIcon");
const playLabel = document.querySelector("#playLabel");
const playerStatus = document.querySelector("#playerStatus");
const radioAudio = document.querySelector("#radioAudio");
const volumeControl = document.querySelector("#volumeControl");
const wave = document.querySelector(".radio-player__wave");
const signupForm = document.querySelector("#signupForm");
const signupMessage = document.querySelector("#signupMessage");
const loginModal = document.querySelector("#loginModal");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const toast = document.querySelector("#toast");

let toastTimer;

// Atualiza o ano do rodapé automaticamente.
document.querySelector("#currentYear").textContent = new Date().getFullYear();

// Menu responsivo: abre e fecha no celular.
menuToggle.addEventListener("click", () => {
  const menuIsOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
  menuToggle.setAttribute("aria-label", menuIsOpen ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu mobile depois que uma seção é escolhida.
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

// Exibe mensagens simples no canto inferior da tela.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4200);
}

// Configura o player se uma URL de streaming tiver sido informada.
if (STREAM_URL.trim() !== "") {
  radioAudio.src = STREAM_URL;
  playerStatus.textContent = "Transmissão pronta para tocar";
} else {
  playerStatus.textContent = "Aguardando configurar a transmissão";
}

// Define o volume inicial do player.
radioAudio.volume = Number(volumeControl.value);
volumeControl.addEventListener("input", () => {
  radioAudio.volume = Number(volumeControl.value);
});

// Botão de reprodução da rádio.
playButton.addEventListener("click", async () => {
  if (STREAM_URL.trim() === "") {
    const message = "O player está pronto, mas falta adicionar a URL real da transmissão no arquivo script.js.";
    playerStatus.textContent = "Transmissão ainda não configurada";
    showToast(message);
    return;
  }

  if (radioAudio.paused) {
    try {
      await radioAudio.play();
    } catch (error) {
      playerStatus.textContent = "Não foi possível iniciar a transmissão";
      showToast("Confira a URL do streaming e tente novamente.");
    }
  } else {
    radioAudio.pause();
  }
});

radioAudio.addEventListener("play", () => {
  playIcon.textContent = "Ⅱ";
  playButton.setAttribute("aria-label", "Pausar transmissão");
  playLabel.textContent = "Você está ouvindo a rádio";
  playerStatus.textContent = "Transmitindo agora";
  wave.classList.add("is-playing");
});

radioAudio.addEventListener("pause", () => {
  playIcon.textContent = "▶";
  playButton.setAttribute("aria-label", "Reproduzir transmissão");
  playLabel.textContent = "Ouça a Meli Sports";
  wave.classList.remove("is-playing");
  if (STREAM_URL.trim() !== "") {
    playerStatus.textContent = "Transmissão pausada";
  }
});

radioAudio.addEventListener("error", () => {
  playerStatus.textContent = "Erro ao carregar o streaming";
  showToast("Não foi possível carregar o áudio. Verifique a URL de transmissão.");
});

// Exibe uma mensagem junto ao formulário sem recarregar a página.
function showFormMessage(element, message, type) {
  element.textContent = message;
  element.className = `form-message is-visible is-${type}`;
}

function clearInvalidState(form) {
  form.querySelectorAll("input").forEach((input) => {
    input.removeAttribute("aria-invalid");
  });
}

// Cadastro demonstrativo: valida os campos, mas não envia dados a um servidor.
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearInvalidState(signupForm);

  const nameInput = document.querySelector("#signupName");
  const emailInput = document.querySelector("#signupEmail");
  const consentInput = document.querySelector("#consent");

  if (!nameInput.checkValidity()) {
    nameInput.setAttribute("aria-invalid", "true");
    nameInput.focus();
    showFormMessage(signupMessage, "Informe seu nome com pelo menos 2 caracteres.", "error");
    return;
  }

  if (!emailInput.checkValidity()) {
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.focus();
    showFormMessage(signupMessage, "Digite um endereço de e-mail válido.", "error");
    return;
  }

  if (!consentInput.checked) {
    consentInput.focus();
    showFormMessage(signupMessage, "Marque a caixa de consentimento para continuar.", "error");
    return;
  }

  showFormMessage(
    signupMessage,
    `Obrigado, ${nameInput.value.trim()}! O formulário foi validado nesta demonstração. Nenhum dado foi enviado ou armazenado. Para receber cadastros reais, conecte um backend ou serviço de formulários.`,
    "success"
  );
  signupForm.reset();
});

// Abre o modal de entrada.
function openLoginModal() {
  loginModal.classList.add("is-open");
  loginModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  loginMessage.textContent = "";
  loginMessage.className = "form-message";
  window.setTimeout(() => document.querySelector("#loginEmail").focus(), 50);
}

// Fecha o modal e devolve o foco para a página.
function closeLoginModal() {
  loginModal.classList.remove("is-open");
  loginModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelector("#openLogin").addEventListener("click", openLoginModal);
document.querySelector("#openLoginInline").addEventListener("click", openLoginModal);
document.querySelector("#closeLogin").addEventListener("click", closeLoginModal);
loginModal.querySelector("[data-close-modal]").addEventListener("click", closeLoginModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && loginModal.classList.contains("is-open")) {
    closeLoginModal();
  }
});

// O formulário de entrada é apenas visual nesta versão front-end.
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearInvalidState(loginForm);

  const emailInput = document.querySelector("#loginEmail");
  const passwordInput = document.querySelector("#loginPassword");

  if (!emailInput.checkValidity()) {
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.focus();
    showFormMessage(loginMessage, "Digite um e-mail válido.", "error");
    return;
  }

  if (!passwordInput.checkValidity()) {
    passwordInput.setAttribute("aria-invalid", "true");
    passwordInput.focus();
    showFormMessage(loginMessage, "A senha de demonstração precisa ter pelo menos 6 caracteres.", "error");
    return;
  }

  showFormMessage(
    loginMessage,
    "Os campos foram validados, mas o login real ainda não está conectado. Não use sua senha verdadeira neste protótipo.",
    "success"
  );
  passwordInput.value = "";
});

// Marca visualmente no menu qual seção está em destaque.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isCurrent);
        });
      }
    });
  }, { rootMargin: "-30% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}
