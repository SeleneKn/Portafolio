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
});

//Popover
document.addEventListener("DOMContentLoaded", function () {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

/* ============================================================
   🎵 REPRODUCTOR SYNTHWAVE 80s (Persistente entre páginas)
   ============================================================ */
function initSynthwavePlayer() {
  // Si ya existe el reproductor en el DOM actual, no lo duplicamos
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

  // 1. Recuperar volumen guardado o usar el predeterminado
  const savedVolume = localStorage.getItem("synth_volume");
  if (savedVolume !== null) {
    volumeSlider.value = savedVolume;
  }
  audio.volume = parseFloat(volumeSlider.value);

  // 2. Recuperar el tiempo de reproducción anterior para que continúe exacto
  const savedTime = localStorage.getItem("synth_current_time");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // Guardar la posición actual de la música constantemente
  audio.addEventListener("timeupdate", () => {
    localStorage.setItem("synth_current_time", audio.currentTime);
  });

  // 3. Restaurar estado de reproducción (si sonaba antes de cambiar de página)
  const isPlaying = localStorage.getItem("synth_is_playing") === "true";

  if (isPlaying) {
    audio.play().then(() => {
      icon.classList.remove("bi-play-fill");
      icon.classList.add("bi-pause-fill");
      player.classList.add("is-playing");
    }).catch(() => {
      // Si el navegador bloquea el autoplay por políticas de seguridad
      player.classList.add("needs-click");
      localStorage.setItem("synth_is_playing", "false");
    });
  }

  // Primer clic en la página para desbloquear audio si el navegador lo bloqueó
  const activateOnInteraction = () => {
    if (audio.paused && localStorage.getItem("synth_is_playing") === "true") {
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

  // Botón play/pause manual
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      localStorage.setItem("synth_is_playing", "true");
      icon.classList.remove("bi-play-fill");
      icon.classList.add("bi-pause-fill");
      player.classList.add("is-playing");
    } else {
      audio.pause();
      localStorage.setItem("synth_is_playing", "false");
      icon.classList.remove("bi-pause-fill");
      icon.classList.add("bi-play-fill");
      player.classList.remove("is-playing");
    }
    player.classList.remove("needs-click");
  });

  // Control de volumen y guardado
  volumeSlider.addEventListener("input", (e) => {
    const valFloat = parseFloat(e.target.value);
    audio.volume = valFloat;
    localStorage.setItem("synth_volume", valFloat);

    // Gradiente visual del slider
    const valPer = valFloat * 100;
    e.target.style.background = `linear-gradient(to right, #dd5ed7 0%, #dd5ed7 ${valPer}%, rgba(255,255,255,0.15) ${valPer}%, rgba(255,255,255,0.15) 100%)`;
  });

  // Inicializar gradiente visual del volumen
  const initialValPer = volumeSlider.value * 100;
  volumeSlider.style.background = `linear-gradient(to right, #dd5ed7 0%, #dd5ed7 ${initialValPer}%, rgba(255,255,255,0.15) ${initialValPer}%, rgba(255,255,255,0.15) 100%)`;

  // Sincronizar estado si el audio cambia externamente
  audio.addEventListener("play", () => {
    localStorage.setItem("synth_is_playing", "true");
    icon.classList.remove("bi-play-fill");
    icon.classList.add("bi-pause-fill");
    player.classList.add("is-playing");
  });
  
  audio.addEventListener("pause", () => {
    localStorage.setItem("synth_is_playing", "false");
    icon.classList.remove("bi-pause-fill");
    icon.classList.add("bi-play-fill");
    player.classList.remove("is-playing");
  });
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