function cargarComponente(rutaArchivo, idContainer) {
  fetch(rutaArchivo)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`No se pudo cargar el archivo: ${rutaArchivo}`);
      }
      return respuesta.text();
    })
    .then(htmlContenido => {
      const contenedor = document.getElementById(idContainer);
      if (contenedor) {
        contenedor.outerHTML = htmlContenido;
      }
    })
    .catch(error => console.error("Error al cargar componente:", error));
}

// Ejecutar cuando el HTML base esté listo
document.addEventListener("DOMContentLoaded", () => {

  cargarComponente("./html/menu.html", "menuContainer");
  cargarComponente("./html/footer.html", "footerContainer");
  cargarComponente("./html/banner.html", "bannerContainer");
  cargarComponente("./html/dots.html", "dotsContainer");

  cargarComponente("menu.html", "menuContainerEnHTML");
  cargarComponente("footer.html", "footerContainerEnHTML");

  // Iniciar reproductor synthwave
  initSynthwavePlayer();

  // Iniciar efectos de clic
  initClickEffects();
});

//Popover
document.addEventListener("DOMContentLoaded", function () {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

/* ============================================================
   🎵 REPRODUCTOR SYNTHWAVE 80s
   ============================================================ */
function initSynthwavePlayer() {
  if (document.getElementById("synthwavePlayer")) return;

  const player = document.createElement("div");
  player.id = "synthwavePlayer";
  player.className = "synthwave-player";
  player.innerHTML = `
    <audio id="synthAudio" loop preload="auto">
      <source src="./audio/synthwave.mp3" type="audio/mpeg">
    </audio>

    <button id="synthToggle" class="synth-btn" title="Reproducir / Pausar" aria-label="Reproducir música">
      <i class="bi bi-play-fill" id="synthIcon"></i>
    </button>

    <div class="synth-equalizer" id="synthEq">
      <span></span><span></span><span></span><span></span><span></span>
    </div>

    <input
      type="range"
      id="synthVolume"
      class="synth-volume"
      min="0"
      max="1"
      step="0.01"
      value="0.35"
      title="Volumen"
    />

    <span class="synth-label">♪ SYNTHWAVE</span>
  `;

  document.body.appendChild(player);

  const audio = document.getElementById("synthAudio");
  const toggleBtn = document.getElementById("synthToggle");
  const icon = document.getElementById("synthIcon");
  const volumeSlider = document.getElementById("synthVolume");

  audio.volume = parseFloat(volumeSlider.value);

  // Intento de autoplay silencioso
  audio.muted = true;
  audio.play().then(() => {
    audio.muted = false;
    icon.classList.remove("bi-play-fill");
    icon.classList.add("bi-pause-fill");
    player.classList.add("is-playing");
  }).catch(() => {
    audio.muted = false;
    player.classList.add("needs-click");
  });

  // Activación por primera interacción
  const activateOnInteraction = () => {
    if (audio.paused) {
      audio.play().then(() => {
        icon.classList.remove("bi-play-fill");
        icon.classList.add("bi-pause-fill");
        player.classList.add("is-playing");
        player.classList.remove("needs-click");
      }).catch(err => console.warn("No se pudo reproducir:", err));
    }
    document.removeEventListener("click", activateOnInteraction);
    document.removeEventListener("keydown", activateOnInteraction);
  };
  document.addEventListener("click", activateOnInteraction, { once: true });
  document.addEventListener("keydown", activateOnInteraction, { once: true });

  // Botón play/pause
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      icon.classList.remove("bi-play-fill");
      icon.classList.add("bi-pause-fill");
      player.classList.add("is-playing");
    } else {
      audio.pause();
      icon.classList.remove("bi-pause-fill");
      icon.classList.add("bi-play-fill");
      player.classList.remove("is-playing");
    }
    player.classList.remove("needs-click");
  });

  // Volumen
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = parseFloat(e.target.value);
    updateSliderBg(e.target);
  });
  updateSliderBg(volumeSlider);

  audio.addEventListener("play", () => {
    icon.classList.remove("bi-play-fill");
    icon.classList.add("bi-pause-fill");
    player.classList.add("is-playing");
  });
  audio.addEventListener("pause", () => {
    icon.classList.remove("bi-pause-fill");
    icon.classList.add("bi-play-fill");
    player.classList.remove("is-playing");
  });
}

function updateSliderBg(el) {
  const val = el.value * 100;
  el.style.background = `linear-gradient(to right, #dd5ed7 0%, #dd5ed7 ${val}%, rgba(255,255,255,0.15) ${val}%, rgba(255,255,255,0.15) 100%)`;
}

/* ============================================================
   🖱️ EFECTOS DE CLIC 80s (neón synthwave)
   ============================================================ */
function initClickEffects() {
  // Paleta neón del portafolio
  const PALETTE = ["#dd5ed7", "#00f0ff", "#adf505", "#ff2a8d", "#f1f505"];

  // Cursor personalizado con anillo neón
  createNeonCursor();

  document.addEventListener("mousedown", (e) => {
    // 1. Onda expansiva (ripple ring)
    createRipple(e.clientX, e.clientY);

    // 2. Explosión de partículas
    createParticles(e.clientX, e.clientY, PALETTE);

    // 3. Texto flotante tipo +1 / ★
    createFloatingSymbol(e.clientX, e.clientY);

    // 4. Pulso del cursor
    pulseCursor();
  });
}

/* ---------- Cursor personalizado con anillo neón ---------- */
function createNeonCursor() {
  if (document.getElementById("neonCursor")) return;

  const cursor = document.createElement("div");
  cursor.id = "neonCursor";
  cursor.className = "neon-cursor";
  document.body.appendChild(cursor);

  const dot = document.createElement("div");
  dot.id = "neonCursorDot";
  dot.className = "neon-cursor-dot";
  document.body.appendChild(dot);

  // Seguir el ratón
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
  });

  // Ocultar en móvil/táctil
  if (window.matchMedia("(hover: none)").matches) {
    cursor.style.display = "none";
    dot.style.display = "none";
  }
}

function pulseCursor() {
  const cursor = document.getElementById("neonCursor");
  if (!cursor) return;
  cursor.classList.add("pulse");
  setTimeout(() => cursor.classList.remove("pulse"), 300);
}

/* ---------- Ripple ring expansivo ---------- */
function createRipple(x, y) {
  const ripple = document.createElement("div");
  ripple.className = "click-ripple";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  // Color aleatorio de la paleta
  const colors = ["#dd5ed7", "#00f0ff", "#adf505"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  ripple.style.borderColor = color;
  ripple.style.boxShadow = `0 0 12px ${color}, 0 0 24px ${color}`;
  document.body.appendChild(ripple);

  // Segundo anillo (contraste)
  const ripple2 = document.createElement("div");
  ripple2.className = "click-ripple ripple-2";
  ripple2.style.left = x + "px";
  ripple2.style.top = y + "px";
  ripple2.style.borderColor = "#ffffff";
  ripple2.style.boxShadow = `0 0 10px #ffffff`;
  document.body.appendChild(ripple2);

  setTimeout(() => { ripple.remove(); ripple2.remove(); }, 700);
}

/* ---------- Partículas explosivas ---------- */
function createParticles(x, y, palette) {
  const count = 10;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "click-particle";

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const distance = 40 + Math.random() * 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    const size = 4 + Math.random() * 4;
    const color = palette[Math.floor(Math.random() * palette.length)];

    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.background = color;
    p.style.boxShadow = `0 0 8px ${color}, 0 0 14px ${color}`;
    p.style.setProperty("--dx", dx + "px");
    p.style.setProperty("--dy", dy + "px");

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 650);
  }
}

/* ---------- Símbolo flotante (+1, ★, ♥) ---------- */
function createFloatingSymbol(x, y) {
  const symbols = ["★", "+1", "♥", "✦", "♥"];
  const sym = symbols[Math.floor(Math.random() * symbols.length)];
  const colors = ["#dd5ed7", "#00f0ff", "#adf505"];

  const el = document.createElement("div");
  el.className = "click-symbol";
  el.textContent = sym;
  el.style.left = x + "px";
  el.style.top = y + "px";
  const color = colors[Math.floor(Math.random() * colors.length)];
  el.style.color = color;
  el.style.textShadow = `0 0 8px ${color}, 0 0 16px ${color}`;

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

/* ============================================================
   📧 ENVIAR MENSAJE POR GMAIL
   ============================================================ */
function enviarPorGmail(event) {
  event.preventDefault(); // Evita que el form recargue la página

  // ⚠️ CAMBIA ESTO por tu correo real de Gmail
  const destinatario = "selenekanagusico26@gmail.com";

  // Leer los valores del formulario
  const nombre  = document.getElementById("contactName").value.trim();
  const correo  = document.getElementById("contactEmail").value.trim();
  const mensaje = document.getElementById("contactMessage").value.trim();

  // Validación básica
  if (!nombre || !correo || !mensaje) {
    alert("⚠️ Por favor completa todos los campos antes de enviar.");
    return;
  }

  // Asunto del correo
  const asunto = `Contacto Portafolio - ${nombre}`;

  // Cuerpo del correo (con formato)
  const cuerpo =
    `Hola Selene,\n\n` +
    `${mensaje}\n\n` +
    `-----------------------------\n` +
    `📧 Correo de contacto: ${correo}\n` +
    `👤 Nombre: ${nombre}\n` +
    `🕐 Enviado desde: Portafolio Web\n`;

  // Construir la URL de Gmail (versión web)
  // Nota: usamos encodeURIComponent para que acentos, saltos de línea y
  //       caracteres especiales viajen correctamente en la URL.
  const gmailUrl =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent(destinatario) +
    "&su=" + encodeURIComponent(asunto) +
    "&body=" + encodeURIComponent(cuerpo);

  // Abrir Gmail en nueva pestaña
  window.open(gmailUrl, "_blank");

  // Feedback visual al usuario
  alert("✅ Se abrirá Gmail con tu mensaje prellenado. Solo pulsa 'Enviar'.");
}

/* ============================================================
   📄 ABRIR CV — ruta robusta para GitHub Pages
   ============================================================ */
function abrirCV() {
  // Detecta si estamos dentro de /html/ o en la raíz
  // Si la URL actual incluye '/html/', estamos en una subpágina.
  const enSubcarpeta = window.location.pathname.includes("/html/");

  // Si estamos en /html/AboutMe.html, la ruta correcta es '../pdf/...'
  // Si estamos en /index.html, la ruta correcta es './pdf/...'
  const rutaCV = enSubcarpeta
    ? "../pdf/CurriculumSelenepdf.pdf"
    : "./pdf/CurriculumSelenepdf.pdf";

  window.open(rutaCV, "_blank");
}
