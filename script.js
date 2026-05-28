/* ============================================================
   script.js — Para Miley, de Jae 💗
   ============================================================ */

/* ══════════════════════════════════════════════════════════
   ✏️ PERSONALIZACIÓN — CAMBIA ESTOS VALORES
══════════════════════════════════════════════════════════ */

// Fecha de inicio de la relación (formato: año, mes-1, día)
// Ejemplo: new Date(2024, 6, 15) = 15 de julio 2024
// MES: 0=enero 1=feb 2=mar 3=abr 4=may 5=jun 6=jul 7=ago 8=sep 9=oct 10=nov 11=dic
const START_DATE = new Date(2024, 8, 1); // ✏️ CAMBIA AQUÍ la fecha real

// Canción de fondo (pon "cancion.mp3" si tienes el archivo en la misma carpeta)
const SONG_SRC = "cancion.mp3"; // ✏️ CAMBIA a "cancion.mp3" cuando tengas el archivo

// Fotos de la galería (pon las rutas de tus fotos)
// Ejemplo: ["fotos/foto1.jpg", "fotos/foto2.jpg", ...]
// Si no tienes fotos aún, déjalo vacío []
const GALLERY_IMAGES = [
   "fotos/foto1.jpeg",   // ✏️ DESCOMENTA Y CAMBIA con tus fotos reales
   "fotos/foto2.jpeg",
   "fotos/foto3.jpeg",
   "fotos/foto4.jpeg",
];

// Texto de la carta (puedes escribir varios párrafos)
// Usa \n\n para separar párrafos
const CARTA_TEXT = `Miley, no sé cuántas veces he empezado a escribir esto y lo he borrado porque las palabras nunca parecen suficientes para lo que siento.

Cometí un error que no debí cometer. Un error que te fallé, que fallé a nuestra confianza, y que sé que dolió más de lo que yo puedo imaginar. Y lo peor es que tú, que ya has pasado por tanto, que ya has sufrido por hombres que no te supieron valorar — merecías que yo fuera diferente. Merecías que yo fuera mejor.

Eres la persona más sensible, más tierna y más fuerte que conozco al mismo tiempo. Eres mi niña, mi princesa, mi miel. Y lo que más me duele no es el error en sí — es haberte hecho daño a ti, precisamente a ti que das tanto amor.

No vengo a pedirte que olvides. Solo vengo a decirte que lo entiendo, que lo siento con todo lo que soy, y que si me das una oportunidad más, vas a ver que este Jae aprendió. Que soy capaz de ser el hombre que mereces.

Pero si decides que ya no, también lo entiendo. Y te deseo lo mejor del mundo, porque te lo mereces absolutamente todo.`;
// ✏️ CAMBIA o expande este texto con tus palabras más personales


/* ══════════════════════════════════════════════════════════
   CANVAS DE ESTRELLAS
══════════════════════════════════════════════════════════ */
(function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');

  let W, H, stars = [], nebulae = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    const count = Math.floor((W * H) / 3500);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.2,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.4 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.7
          ? `hsl(${Math.random() * 60 + 290}, 80%, 85%)`   // rosa/lavanda
          : '#ffffff'
      });
    }
    // Nebulosas de fondo
    nebulae = [];
    for (let i = 0; i < 5; i++) {
      nebulae.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 200 + 120,
        hue: Math.random() > 0.5 ? 310 : 270,
        alpha: Math.random() * 0.04 + 0.02,
      });
    }
  }

  // Estrellas fugaces
  let shootingStars = [];
  function spawnShootingStar() {
    if (Math.random() > 0.3) return;
    shootingStars.push({
      x: Math.random() * W * 0.7,
      y: Math.random() * H * 0.4,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 5 + 4,
      angle: Math.PI / 6,
      alpha: 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Nebulosas
    nebulae.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, `hsla(${n.hue}, 70%, 60%, ${n.alpha})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Estrellas
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const alpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla').replace('#ffffff', `rgba(255,255,255,${alpha})`);
      if (s.color === '#ffffff') {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      } else {
        const match = s.color.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
        if (match) ctx.fillStyle = `hsla(${match[1]},${match[2]}%,${match[3]}%,${alpha})`;
      }
      ctx.fill();

      // Destello en estrellas más grandes
      if (s.r > 1.2) {
        ctx.beginPath();
        ctx.moveTo(s.x - s.r * 3, s.y);
        ctx.lineTo(s.x + s.r * 3, s.y);
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.r * 3);
        ctx.lineTo(s.x, s.y + s.r * 3);
        ctx.stroke();
      }
    });

    // Estrellas fugaces
    shootingStars = shootingStars.filter(ss => ss.alpha > 0);
    shootingStars.forEach(ss => {
      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
      const g = ctx.createLinearGradient(
        ss.x, ss.y,
        ss.x - Math.cos(ss.angle) * ss.len,
        ss.y - Math.sin(ss.angle) * ss.len
      );
      g.addColorStop(0, `rgba(249,198,208,${ss.alpha})`);
      g.addColorStop(1, 'transparent');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.alpha -= 0.018;
    });

    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();
  setInterval(spawnShootingStar, 2800);
  window.addEventListener('resize', () => { resize(); createStars(); });
})();


/* ══════════════════════════════════════════════════════════
   PÉTALOS FLOTANTES
══════════════════════════════════════════════════════════ */
(function initPetals() {
  const container = document.getElementById('petals-container');
  const SYMBOLS = ['🌸', '🌷', '✿', '❀', '🌺', '💮'];
  const COUNT = 18;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    p.style.left = `${Math.random() * 100}vw`;
    p.style.animationDuration = `${Math.random() * 12 + 10}s`;
    p.style.animationDelay = `${Math.random() * 20}s`;
    p.style.fontSize = `${Math.random() * 14 + 10}px`;
    container.appendChild(p);
  }
})();


/* ══════════════════════════════════════════════════════════
   CURSOR PERSONALIZADO
══════════════════════════════════════════════════════════ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Trail con lag suave
  function animTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  // Efecto en hover de botones
  document.querySelectorAll('button, .gallery-item, .timeline-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cursor.style.background = 'var(--lavender)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'var(--pink-soft)';
    });
  });
})();


/* ══════════════════════════════════════════════════════════
   CORAZONES EN EL INTRO
══════════════════════════════════════════════════════════ */
(function initIntroHearts() {
  const container = document.getElementById('intro-hearts');
  const SYMBOLS = ['💗', '💕', '✨', '🌸', '💖', '💓'];

  for (let i = 0; i < 22; i++) {
    const h = document.createElement('div');
    h.className = 'intro-heart';
    h.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    h.style.left = `${Math.random() * 100}%`;
    h.style.animationDuration = `${Math.random() * 5 + 4}s`;
    h.style.animationDelay = `${Math.random() * 8}s`;
    h.style.fontSize = `${Math.random() * 18 + 12}px`;
    container.appendChild(h);
  }
})();


/* ══════════════════════════════════════════════════════════
   SPARKLES AL CLICK
══════════════════════════════════════════════════════════ */
document.addEventListener('click', e => {
  const SPARKS = ['✨', '💗', '🌸', '💫', '⭐', '💕'];
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = SPARKS[Math.floor(Math.random() * SPARKS.length)];
    s.style.left = `${e.clientX + (Math.random() * 40 - 20)}px`;
    s.style.top  = `${e.clientY + (Math.random() * 40 - 20)}px`;
    s.style.animationDelay = `${Math.random() * 0.15}s`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }

  // Sonido de click suave
  try {
    const snd = document.getElementById('click-sound');
    if (snd) {
      snd.currentTime = 0;
      snd.volume = 0.25;
      snd.play().catch(() => {});
    }
  } catch(e) {}
});


/* ══════════════════════════════════════════════════════════
   ENTRADA A LA PÁGINA PRINCIPAL
══════════════════════════════════════════════════════════ */
window.enterPage = function() {
  const intro = document.getElementById('intro-screen');
  const main  = document.getElementById('main-page');

  intro.classList.add('fade-out');
  setTimeout(() => {
    intro.style.display = 'none';
    main.classList.remove('hidden');
    initScrollReveal();
    initTimer();
    loadGallery();
    startCartaWhenVisible();
    // Intentar música
    tryPlayMusic();
  }, 1200);
};

// Auto-avanzar intro después de 7 segundos si el usuario no hace click
setTimeout(() => {
  const intro = document.getElementById('intro-screen');
  if (intro && !intro.classList.contains('fade-out')) {
    enterPage();
  }
}, 7000);


/* ══════════════════════════════════════════════════════════
   MÚSICA DE FONDO
══════════════════════════════════════════════════════════ */
let musicPlaying = false;
const bgMusic = document.getElementById('bg-music');

// Asignar src de la canción si está configurada
if (SONG_SRC && bgMusic) {
  bgMusic.src = SONG_SRC;
}

function tryPlayMusic() {
  if (!SONG_SRC || !bgMusic) return;
  bgMusic.volume = 0.35;
  bgMusic.play()
    .then(() => { musicPlaying = true; updateMusicBtn(); })
    .catch(() => { /* Navegador bloqueó autoplay, el usuario puede activar */ });
}

window.toggleMusic = function() {
  if (!bgMusic) return;
  if (bgMusic.paused) {
    if (SONG_SRC) bgMusic.src = SONG_SRC;
    bgMusic.volume = 0.35;
    bgMusic.play().then(() => { musicPlaying = true; updateMusicBtn(); }).catch(() => {});
  } else {
    bgMusic.pause();
    musicPlaying = false;
    updateMusicBtn();
  }
};

function updateMusicBtn() {
  const icon = document.getElementById('music-icon');
  if (!icon) return;
  if (musicPlaying) {
    icon.textContent = '🎵';
    icon.classList.add('playing');
  } else {
    icon.textContent = '🎵';
    icon.classList.remove('playing');
  }
}


/* ══════════════════════════════════════════════════════════
   PLAYER "SPOTIFY"
══════════════════════════════════════════════════════════ */
let spotifyPlaying = false;
let spotifyInterval = null;
let spotifyProgress = 0;

window.toggleSpotify = function() {
  const btn    = document.getElementById('sp-play');
  const bar    = document.getElementById('spotify-progress');
  const vinyl  = document.getElementById('album-vinyl');

  spotifyPlaying = !spotifyPlaying;

  if (spotifyPlaying) {
    btn.textContent = '⏸';
    vinyl.classList.add('spinning');
    // Animar barra de progreso (simulada 3:45 = 225s)
    spotifyInterval = setInterval(() => {
      spotifyProgress = Math.min(spotifyProgress + 100 / 225, 100);
      bar.style.width = spotifyProgress + '%';
      if (spotifyProgress >= 100) {
        clearInterval(spotifyInterval);
        spotifyPlaying = false;
        btn.textContent = '▶';
        vinyl.classList.remove('spinning');
        spotifyProgress = 0;
      }
    }, 1000);
    // Activar música real si existe
    tryPlayMusic();
  } else {
    btn.textContent = '▶';
    vinyl.classList.remove('spinning');
    clearInterval(spotifyInterval);
    if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
      musicPlaying = false;
      updateMusicBtn();
    }
  }
};


/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}


/* ══════════════════════════════════════════════════════════
   CONTADOR DE TIEMPO
══════════════════════════════════════════════════════════ */
function initTimer() {
  function update() {
    const now   = new Date();
    const diff  = now - START_DATE;
    if (diff < 0) return; // Fecha en el futuro

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    const d = document.getElementById('t-days');
    const h = document.getElementById('t-hours');
    const m = document.getElementById('t-mins');
    const s = document.getElementById('t-secs');

    if (d) d.textContent = days;
    if (h) h.textContent = String(hours).padStart(2, '0');
    if (m) m.textContent = String(mins).padStart(2, '0');
    if (s) s.textContent = String(secs).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}


/* ══════════════════════════════════════════════════════════
   GALERÍA — CARGAR FOTOS
══════════════════════════════════════════════════════════ */
function loadGallery() {
  if (!GALLERY_IMAGES.length) return; // Sin fotos, mantener placeholders

  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, i) => {
    if (GALLERY_IMAGES[i]) {
      item.innerHTML = `<img src="${GALLERY_IMAGES[i]}" alt="Recuerdo ${i+1}" loading="lazy" />`;
    }
  });
}


/* ══════════════════════════════════════════════════════════
   CARTA — MÁQUINA DE ESCRIBIR
══════════════════════════════════════════════════════════ */
function startCartaWhenVisible() {
  const section = document.getElementById('carta');
  const textEl  = document.getElementById('carta-text');
  const firma   = document.getElementById('carta-firma');
  let started   = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      observer.disconnect();
      typewriterEffect(textEl, CARTA_TEXT, 22, () => {
        // Mostrar firma cuando termina
        setTimeout(() => {
          firma.style.display = 'block';
          firma.style.animation = 'heroReveal 1.2s ease forwards';
        }, 600);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(section);
}

function typewriterEffect(el, text, speed, onDone) {
  // Convertir saltos de línea en <br><br>
  const paragraphs = text.split('\n\n');
  let paraIndex = 0;
  let charIndex = 0;
  let currentText = '';

  // Cursor parpadeante
  const cursor = document.createElement('span');
  cursor.className = 'cursor-blink';
  el.innerHTML = '';
  el.appendChild(cursor);

  function typeParagraph() {
    if (paraIndex >= paragraphs.length) {
      cursor.remove();
      if (onDone) onDone();
      return;
    }

    const para = paragraphs[paraIndex];

    if (charIndex < para.length) {
      currentText += para[charIndex];
      // Reconstruir HTML con párrafos previos + texto actual + cursor
      let html = paragraphs.slice(0, paraIndex).map(p => `<span>${p}</span><br><br>`).join('');
      html += `<span>${currentText}</span>`;
      el.innerHTML = html;
      const newCursor = document.createElement('span');
      newCursor.className = 'cursor-blink';
      el.appendChild(newCursor);
      charIndex++;
      setTimeout(typeParagraph, speed + Math.random() * 20);
    } else {
      // Párrafo terminado, saltar al siguiente
      paraIndex++;
      charIndex = 0;
      currentText = '';
      setTimeout(typeParagraph, 350);
    }
  }

  typeParagraph();
}


/* ══════════════════════════════════════════════════════════
   RESPUESTAS FINALES
══════════════════════════════════════════════════════════ */
window.onYes = function() {
  const screen = document.getElementById('response-yes');
  screen.classList.remove('hidden');
  launchConfetti();
  // Música de fondo si no está sonando
  tryPlayMusic();
};

window.onNo = function() {
  const screen = document.getElementById('response-no');
  screen.classList.remove('hidden');
  launchFloatingHearts();
};

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#f9c6d0', '#c9b8e8', '#e8c87a', '#f0a0b8', '#a68fd6', '#ffffff'];

  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = `${Math.random() * 100}vw`;
    c.style.top  = '-20px';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width  = `${Math.random() * 10 + 5}px`;
    c.style.height = `${Math.random() * 10 + 5}px`;
    c.style.animationDuration = `${Math.random() * 2 + 2}s`;
    c.style.animationDelay   = `${Math.random() * 2}s`;
    c.style.borderRadius     = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4500);
  }
}

function launchFloatingHearts() {
  for (let i = 0; i < 30; i++) {
    const h = document.createElement('div');
    h.style.cssText = `
      position: fixed;
      font-size: ${Math.random() * 20 + 12}px;
      left: ${Math.random() * 100}vw;
      bottom: -30px;
      z-index: 600;
      pointer-events: none;
      animation: floatHeart ${Math.random() * 4 + 4}s ease-in forwards;
      animation-delay: ${Math.random() * 3}s;
    `;
    h.textContent = ['🌸', '💕', '✨', '🌷'][Math.floor(Math.random() * 4)];
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 9000);
  }
}


/* ══════════════════════════════════════════════════════════
   EASTER EGG — Escribir "miley" en el teclado
══════════════════════════════════════════════════════════ */
let easterKeyBuffer = '';
document.addEventListener('keydown', e => {
  easterKeyBuffer += e.key.toLowerCase();
  if (easterKeyBuffer.includes('miley')) {
    easterKeyBuffer = '';
    // Explosión de corazones en toda la pantalla
    for (let i = 0; i < 40; i++) {
      const h = document.createElement('div');
      h.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 30 + 14}px;
        left: ${Math.random() * 100}vw;
        bottom: -30px;
        z-index: 9999;
        pointer-events: none;
        animation: floatHeart ${Math.random() * 4 + 3}s ease-in forwards;
        animation-delay: ${Math.random() * 1}s;
      `;
      h.textContent = ['💗', '💕', '🌸', '💖', '✨'][Math.floor(Math.random() * 5)];
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 7000);
    }
  }
  if (easterKeyBuffer.length > 10) easterKeyBuffer = easterKeyBuffer.slice(-10);
});


/* ══════════════════════════════════════════════════════════
   TOUCH SUPPORT (móvil)
   Desactivar cursor personalizado en touch
══════════════════════════════════════════════════════════ */
window.addEventListener('touchstart', () => {
  document.getElementById('cursor').style.display = 'none';
  document.getElementById('cursor-trail').style.display = 'none';
}, { once: true });
