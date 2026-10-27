# 📘 README.md — Portafolio Selene Kanagusico

Aquí tienes un `README.md` completo y profesional, en formato Markdown, listo para pegar en la raíz de tu proyecto (o subir a GitHub).

---

```markdown
# 🌸 Portafolio Personal — Selene Kanagusico

> Portafolio web con estética **synthwave / cyberpunk 80s** 🎮🌆
> Desarrollado con HTML5, CSS3, Bootstrap 5 y JavaScript vanilla.

![Status](https://img.shields.io/badge/status-en%20desarrollo-dd5ed7?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

---

## 📖 Descripción

Portafolio personal de **Selene Kanagusico López**, desarrolladora **Java Full Stack Jr.**, donde presento mis proyectos, habilidades técnicas, experiencia y datos de contacto.

El sitio está diseñado con una **estética retro-futurista de los 80s (synthwave)**, con:
- 🌈 Paleta neón: rosa `#dd5ed7`, cyan `#00f0ff` y verde lima `#adf505`
- 🎵 Reproductor de música ambiental synthwave persistente entre páginas
- 🖱️ Efectos visuales al hacer clic (ripples, partículas, cursor neón)
- 📱 Diseño totalmente responsive con Bootstrap 5

---

## ✨ Características principales

### 🎨 Diseño y UI
- **Navbar** con logo "SK" y menú hamburguesa responsive.
- **Hero section** con foto, botones de acción (Descargar CV, GitHub, LinkedIn).
- **Banners animados** con scroll infinito (marquee) estilo retro.
- **Cards de proyectos** con Bootstrap.
- **Formulario de contacto** con estilo terminal/consola.
- **Fondos animados** con GIFs synthwave (vaporwave sunset, paisajes retro).

### 🎵 Reproductor Synthwave (persistente)
- Play / Pause con icono dinámico.
- Ecualizador animado (5 barras) que reacciona a la reproducción.
- Slider de volumen con estilo neón.
- **Persiste entre páginas** gracias a `sessionStorage`:
  - Guarda la posición del track (`currentTime`).
  - Guarda si estaba sonando o pausado.
  - Guarda el volumen seleccionado.
- Manejo de **autoplay bloqueado**: si el navegador lo impide, arranca al primer clic/tecla del usuario.

### 🖱️ Efectos interactivos 80s
- **Cursor personalizado**: anillo neón rosa + punto cyan central.
- **Ripple expansivo** al hacer clic (doble onda, una de color aleatorio + una blanca).
- **Explosión de partículas** neón (10 partículas por clic).
- **Símbolo flotante** (`★`, `♥`, `✦`, `+1`) que sube y se desvanece.
- Todos los colores **coordinados** con la paleta del portafolio.

### 📧 Formulario de contacto → Gmail
- Al enviar, valida los campos (nombre, correo, mensaje).
- Abre **Gmail web** en una pestaña nueva con:
  - Destinatario prellenado
  - Asunto: `Contacto Portafolio - {nombre}`
  - Cuerpo formateado con el mensaje + datos del remitente
- El usuario solo pulsa **"Enviar"** en Gmail.

---

## 🗂️ Estructura del proyecto

```
portafolio-selene/
│
├── index.html                  # Página de inicio
├── README.md                   # Este archivo
│
├── 📁 html/
│   ├── AboutMe.html            # Sobre mí / Educación / Experiencia
│   ├── Projects.html           # Proyectos (cards)
│   ├── Contac.html             # Formulario de contacto
│   ├── menu.html               # Componente reutilizable: Navbar
│   ├── footer.html             # Componente reutilizable: Footer
│   ├── banner.html             # Componente reutilizable: Banner marquee
│   └── dots.html               # Componente reutilizable: Dots de ventana
│
├── 📁 css/
│   └── styles.css              # Todos los estilos del sitio
│
├── 📁 JS/
│   └── main.js                 # Lógica: carga de componentes, player, efectos, form
│
├── 📁 IMG/                     # Imágenes, logos, GIFs y screenshots
│   ├── photo.jpg
│   ├── tech (1).png
│   ├── educationtext.png
│   ├── Experience.png
│   ├── skills (1).png
│   ├── english.png
│   ├── Loop.png
│   ├── Kanu.png
│   ├── portafolio.png
│   ├── KanaVet.png
│   ├── vaporwave-sunset.gif
│   ├── fondo.gif
│   ├── paisaje.gif
│   ├── supa.gif
│   ├── hamburguesa.png
│   ├── tel (1).png
│   ├── email.png
│   └── point.png
│
├── 📁 audio/
│   └── synthwave.mp3           # ⚠️ Agregar manualmente (ver sección "Instalación")
│
└── 📁 pdf/
    └── CurriculumSelenepdf.pdf # CV descargable
```

---

## 🚀 Instalación y uso

### 1. Clonar / descargar el proyecto

```bash
git clone https://github.com/SeleneKn/Portafolio.git
cd Portafolio
```

O simplemente descarga el ZIP y descomprímelo.

### 2. Agregar el archivo de audio

El reproductor busca el archivo `./audio/synthwave.mp3`, pero **no está incluido** en el repo por derechos de autor.

**Opción A — Descargar un MP3 libre de regalías:**

1. Ve a [Pixabay Music](https://pixabay.com/music/) y busca "synthwave" o "retrowave".
2. Descarga un track (gratis, sin registro).
3. Renómbralo a `synthwave.mp3`.
4. Colócalo dentro de la carpeta `audio/`.

**Opción B — Usar otra ruta:**

Edita en `JS/main.js` la línea:

```javascript
<source src="./audio/synthwave.mp3" type="audio/mpeg">
```

Y cambia la ruta por la de tu archivo.

### 3. Abrir el proyecto

El proyecto **requiere un servidor local** porque usa `fetch()` para cargar los componentes HTML (menú, footer, banner). Si abres `index.html` directo con `file://`, los componentes no cargarán.

**Opciones para levantarlo:**

| Herramienta | Comando |
|-------------|---------|
| **VS Code** (Live Server) | Click derecho en `index.html` → "Open with Live Server" |
| **Python 3** | `python -m http.server 8000` |
| **Node.js** | `npx serve` |
| **PHP** | `php -S localhost:8000` |

Luego abre 👉 `http://localhost:8000`

---

## 🛠️ Tecnologías utilizadas

| Categoría | Tecnología |
|-----------|------------|
| **Estructura** | HTML5 semántico |
| **Estilos** | CSS3 (Grid, Flexbox, animaciones, custom properties) |
| **Framework UI** | [Bootstrap 5.3](https://getbootstrap.com/) |
| **Iconos** | [Bootstrap Icons 1.11](https://icons.getbootstrap.com/) |
| **Lógica** | JavaScript ES6+ (Vanilla) |
| **Persistencia** | `sessionStorage` (estado de la música) |
| **Fuente** | [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) (monospace retro) |
| **Backend (proyectos)** | Java + Spring Boot + MySQL (en proyectos vinculados) |

---

## 🎮 Secciones del sitio

### 🏠 Inicio (`index.html`)
- Hero con foto y presentación.
- Badge "OPEN TO WORK".
- Botones: Descargar CV, GitHub, LinkedIn.
- Banners animados con tech stack.
- Reproductor synthwave flotante.

### 👩‍💻 Acerca de mí (`html/AboutMe.html`)
- Resumen personal en formato "terminal".
- Datos: base, focus, modo de trabajo.
- Educación (popover con cursos).
- Experiencia profesional.
- Habilidades técnicas + nivel de inglés.

### 💼 Proyectos (`html/Projects.html`)
Cards con 4 proyectos:

| Proyecto | Descripción | Tecnologías |
|----------|-------------|-------------|
| **Loop** | Red social para desarrolladores | Java, Spring Boot, MySQL, Bootstrap |
| **Kanu Sport** | Landing page hackatón (ropa artesanal) | HTML5, CSS3, Bootstrap 5, JS |
| **Portafolio** | Este mismo sitio | HTML5, CSS3, Bootstrap 5, JS |
| **KanaVet** | Landing + Panel clínico veterinario | Java, Spring Boot, MySQL |

### 📬 Contacto (`html/Contac.html`)
- Formulario con estilo terminal.
- Datos directos: teléfono, email, ubicación.
- Estado: "Actualmente disponible".
- Envío vía Gmail prellenado.

---

## 🎨 Paleta de colores

| Color | Hex | Uso |
|-------|-----|-----|
| 🟣 Rosa neón | `#dd5ed7` | Acentos principales, bordes, logo |
| 🔵 Cyan neón | `#00f0ff` | Bordes, banners, textos destacados |
| 🟢 Verde lima | `#adf505` | Badges "OPEN TO WORK", acentos |
| 🟡 Amarillo | `#f1f505` | Banner secundario |
| 🟪 Morado oscuro | `#6a24a8` | Sombras de botones |
| ⚫ Negro fondo | `#090314` | Fondo base del sitio |
| ⚪ Blanco | `#ffffff` | Texto principal |

---

## 📱 Responsive

El sitio se adapta a:

- 📱 **Móviles** (< 576px): menú hamburguesa, cards en 1 columna, reproductor compacto.
- 📱 **Tablets** (576–992px): grillas de 2 columnas.
- 💻 **Desktop** (> 992px): layout completo de 2 columnas.

---

## 🔧 Configuración personalizable

### Cambiar el correo destinatario del formulario

En `JS/main.js`, dentro de `enviarPorGmail()`:

```javascript
const destinatario = "selenekanagusico26@gmail.com";
```

Cámbialo por el correo al que quieras que lleguen los mensajes.

### Cambiar el correo visible en la página

En `html/Contac.html`, busca:

```html
<p>selenekanagusico26@outlook.com</p>
```

### Cambiar el CV descargable

Reemplaza `pdf/CurriculumSelenepdf.pdf` por tu nuevo archivo con el mismo nombre, o actualiza la ruta en:

- `html/menu.html` (botón CV DIRECT)
- `index.html` (botón Download CV)

### Cambiar la foto de perfil

Reemplaza `IMG/photo.jpg` por tu nueva imagen.

---

## 🐛 Problemas conocidos y soluciones

### ❌ "No se cargan el menú / footer / banner"

**Causa:** Estás abriendo `index.html` con `file://`.
**Solución:** Usa un servidor local (Live Server, Python, Node).

### ❌ "La música no suena"

**Causa 1:** Falta el archivo `audio/synthwave.mp3`.
**Solución:** Descárgalo y colócalo en la carpeta `audio/`.

**Causa 2:** El navegador bloquea el autoplay.
**Solución:** Haz clic en cualquier parte de la página una vez — el player arrancará solo.

### ❌ "Al cambiar de página la música se reinicia"

**Causa:** Es el comportamiento normal de HTML multi-página.
**Solución:** El `main.js` ya usa `sessionStorage` para **reanudar** desde donde iba. Hay un micro-corte de ~200ms entre páginas (inevitable sin iframe/SPA).

### ❌ "El formulario no envía"

**Causa:** Los campos deben estar llenos.
**Solución:** Completa nombre, correo y mensaje. Se abrirá Gmail con el mensaje prellenado.

---

## 🧪 Testing rápido

| Test | Cómo verificar |
|------|----------------|
| ✅ Componentes cargan | El menú y footer aparecen en todas las páginas |
| ✅ Música persiste | Cambia de página → la música sigue |
| ✅ Volumen persiste | Ajusta volumen → cambia de página → se mantiene |
| ✅ Efectos de clic | Haz clic → ver ripple + partículas + símbolo |
| ✅ Formulario | Llena los 3 campos → click enviar → abre Gmail |
| ✅ Responsive | Redimensiona a móvil → menú hamburguesa funciona |

---

## 🗺️ Roadmap / Mejoras futuras

- [ ] Migrar a SPA (React / Vue) para música sin cortes.
- [ ] Envío de correo vía **EmailJS** o **Formspree** (sin abrir Gmail).
- [ ] Modo claro/oscuro.
- [ ] Agregar más proyectos al portafolio.
- [ ] Internacionalización (ES / EN).
- [ ] PWA (funcionar offline).
- [ ] Animaciones con GSAP o Framer Motion.

---

## 👩‍💻 Autora

**Selene Kanagusico López**
- 🐙 GitHub: [@SeleneKn](https://github.com/SeleneKn)
- 💼 LinkedIn: [selene-kanagusico-developer](https://www.linkedin.com/in/selene-kanagusico-developer/)
- 📧 Email: selenekanagusico26@outlook.com
- 📍 Ubicación: México City, MX

---

## 📄 Licencia

Este proyecto es de **uso personal y educativo**.
Los recursos gráficos (imágenes, GIFs) pertenecen a sus respectivos autores.
El código puede ser reutilizado con atribución.

---

## 🙏 Créditos y agradecimientos

- **Bootstrap** por el framework UI.
- **Bootstrap Icons** por los iconos.
- **Google Fonts** por la fuente *Share Tech Mono*.
- **Pixabay Music** por el audio libre de regalías (a agregar).
- **Comunidad de desarrolladores** por la inspiración synthwave. 💜

---

## 💬 Contacto

¿Te gustó el proyecto? ¿Quieres colaborar? ¿Tienes una oferta de trabajo?

📩 **Escríbeme desde el formulario de contacto** o directo a:
**selenekanagusico26@outlook.com**

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

Hecho con 💜 y mucho ☕ por **Selene Kanagusico**

</div>
```

---

## ✅ Cómo usarlo

1. Copia todo el bloque de arriba.
2. Crea un archivo llamado **`README.md`** en la **raíz** de tu proyecto (junto a `index.html`).
3. Pégalo y guarda.
4. Si lo subes a GitHub, se renderizará automáticamente en la página principal del repo.

---

### 💡 Bonus — tips rápidos

- Los **badges** de shields.io se actualizan solos.
- La sección **Testing rápido** es muy útil para verificar cambios futuros.
- La **tabla de proyectos** se actualiza fácil si agregas nuevos.
- Si agregas un `LICENSE` real (MIT, GPL, etc.), cámbialo en la sección de licencia.

¿Quieres que también te haga un **`LICENSE`** (MIT), un **`CHANGELOG.md`** o un **`.gitignore`** para complementar el repo? 🚀