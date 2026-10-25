/**
 * ====================================================================
 * LÓGICA PRINCIPAL: PARA MARIANGEL
 * Manejo de navegación, renderizado seguro, animaciones y audio.
 * ====================================================================
 */

(function () {
  'use strict';

  // Configuración predeterminada segura por si config.js no cargara
  const DEFAULT_CONFIG = {
    recipientName: "Mariangel",
    senderName: "[ NOMBRE DEL REMITENTE ]",
    welcome: {
      title: "Para Mariangel",
      subtitle: "Hoy es un día especial. Y quería que tuvieras algo más que un mensaje.",
      openButtonText: "Abrir tu regalo",
    },
    letter: {
      header: "Feliz cumpleaños, Mariangel.",
      paragraphs: [
        "Hoy quiero desearte algo más que un feliz cumpleaños. Quiero desearte días que te hagan sonreír de verdad, tranquilidad para los momentos difíciles, motivos para sentirte orgullosa de ti y personas que sepan valorar la persona que eres.",
        "A veces, un regalo no necesita ser grande para tener significado. A veces basta con detenerse un momento, pensar en alguien y dedicarle unas palabras que nazcan de verdad.",
        "Por eso preparé esto para ti. Para recordarte que tu cumpleaños merece celebrarse y que, en medio de tantas cosas, siempre vale la pena hacer espacio para los detalles que tienen intención.",
        "Espero que este nuevo año de tu vida te acerque a aquello que deseas, te regale momentos bonitos y te dé muchas razones para seguir adelante con ilusión.",
        "Feliz cumpleaños, Mariangel. Espero que hoy recibas mucho cariño y que guardes este pequeño detalle como un recuerdo bonito de tu día."
      ],
      signatureGreeting: "Con cariño,",
      signatureSender: "[ NOMBRE DEL REMITENTE ]",
      surpriseButtonText: "Hay algo más para ti",
    },
    finalSurprise: {
      quote: "Que la vida te sorprenda con cosas tan bonitas como las que todavía te quedan por descubrir.",
      recipient: "Mariangel",
      wish: "Feliz cumpleaños.",
      backButtonText: "Volver a la carta"
    },
    audio: {
      enabled: true,
      src: "./assets/audio/musica.mp3",
      ariaLabelPlay: "Reproducir música ambiental",
      ariaLabelPause: "Pausar música ambiental"
    },
    optionalDate: ""
  };

  const config = window.APP_CONFIG || DEFAULT_CONFIG;

  // Detección de preferencia de reducción de movimiento
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Referencias al DOM
  const elements = {
    body: document.body,
    screens: {
      welcome: document.getElementById('screen-welcome'),
      letter: document.getElementById('screen-letter'),
      surprise: document.getElementById('screen-surprise')
    },
    envelope: document.getElementById('envelope'),
    openBtn: document.getElementById('open-envelope-btn'),
    surpriseBtn: document.getElementById('surprise-btn'),
    backToLetterBtn: document.getElementById('back-to-letter-btn'),
    audioContainer: document.getElementById('audio-container'),
    audioToggleBtn: document.getElementById('audio-toggle-btn'),
    audioElement: document.getElementById('ambient-audio'),
    letterBody: document.getElementById('letter-body')
  };

  /**
   * 1. RENDERIZADO SEGURO DE TEXTOS
   * Usamos 'textContent' exclusivamente para evitar cualquier vulnerabilidad de inyección
   */
  function populateContent() {
    // Bienvenida
    setText('welcome-title', config.welcome?.title || `Para ${config.recipientName}`);
    setText('welcome-subtitle', config.welcome?.subtitle);
    setText('open-btn-text', config.welcome?.openButtonText || "Abrir tu regalo");

    // Fecha opcional
    const dateEl = document.getElementById('letter-date');
    if (dateEl) {
      if (config.optionalDate && config.optionalDate.trim() !== "") {
        dateEl.textContent = config.optionalDate.trim();
        dateEl.style.display = "block";
      } else {
        dateEl.style.display = "none";
      }
    }

    // Encabezado de la carta
    setText('letter-heading', config.letter?.header || `Feliz cumpleaños, ${config.recipientName}.`);

    // Párrafos de la carta (creación segura de elementos DOM)
    if (elements.letterBody && Array.isArray(config.letter?.paragraphs)) {
      elements.letterBody.innerHTML = '';
      config.letter.paragraphs.forEach((text) => {
        const p = document.createElement('p');
        p.className = 'letter-paragraph';
        p.textContent = text;
        elements.letterBody.appendChild(p);
      });
    }

    // Firma
    setText('signature-greeting', config.letter?.signatureGreeting || "Con cariño,");
    const sender = config.senderName && config.senderName !== "[ NOMBRE DEL REMITENTE ]"
      ? config.senderName
      : (config.letter?.signatureSender || "[ NOMBRE DEL REMITENTE ]");
    setText('signature-name', sender);

    // Botón a la sorpresa
    setText('surprise-btn-text', config.letter?.surpriseButtonText || "Hay algo más para ti");

    // Mensaje Final Sorpresa
    const quote = config.finalSurprise?.quote || "Que la vida te sorprenda con cosas tan bonitas como las que todavía te quedan por descubrir.";
    setText('surprise-quote-text', `“${quote}”`);
    setText('surprise-recipient', config.finalSurprise?.recipient || config.recipientName);
    setText('surprise-wish', config.finalSurprise?.wish || "Feliz cumpleaños.");
    setText('back-btn-text', config.finalSurprise?.backButtonText || "Volver a la carta");
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && typeof text === 'string') {
      el.textContent = text;
    }
  }

  /**
   * 2. GESTOR DE PANTALLAS Y TRANSICIONES
   */
  function switchScreen(fromScreen, toScreen, onAfterSwitch) {
    if (!fromScreen || !toScreen) return;

    // Desactivar pantalla anterior
    fromScreen.classList.add('fade-out');
    fromScreen.setAttribute('aria-hidden', 'true');

    const transitionDelay = prefersReducedMotion ? 10 : 500;

    setTimeout(() => {
      fromScreen.classList.remove('active', 'fade-out');
      
      // Activar nueva pantalla
      toScreen.classList.add('active');
      toScreen.removeAttribute('aria-hidden');

      // Control del tema del body para adaptar el reproductor de audio
      if (toScreen === elements.screens.letter) {
        elements.body.classList.add('on-letter-screen');
      } else {
        elements.body.classList.remove('on-letter-screen');
      }

      // Desplazamiento al inicio
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

      if (typeof onAfterSwitch === 'function') {
        onAfterSwitch();
      }
    }, transitionDelay);
  }

  /**
   * 3. APERTURA CINEMATOGRÁFICA DEL SOBRE (ETAPA A -> B)
   */
  function handleOpenEnvelope() {
    if (!elements.envelope || !elements.openBtn) return;

    // Evitar clics múltiples
    elements.openBtn.disabled = true;
    elements.openBtn.style.pointerEvents = 'none';

    // Iniciar animación del sobre
    elements.envelope.classList.add('is-opening');

    const openDelay = prefersReducedMotion ? 50 : 850;

    setTimeout(() => {
      switchScreen(elements.screens.welcome, elements.screens.letter, () => {
        animateLetterParagraphs();
      });
    }, openDelay);
  }

  /**
   * Revelación escalonada y suave de los párrafos de la carta
   */
  function animateLetterParagraphs() {
    const paragraphs = document.querySelectorAll('.letter-paragraph');
    if (!paragraphs.length) return;

    if (prefersReducedMotion) {
      paragraphs.forEach((p) => p.classList.add('is-visible'));
      return;
    }

    paragraphs.forEach((p, index) => {
      setTimeout(() => {
        p.classList.add('is-visible');
      }, 150 + index * 220);
    });
  }

  /**
   * 4. TRANSICIÓN A LA SORPRESA FINAL (ETAPA B -> D)
   */
  function handleShowSurprise() {
    switchScreen(elements.screens.letter, elements.screens.surprise);
  }

  /**
   * 5. REGRESO A LA CARTA (ETAPA D -> B)
   */
  function handleBackToLetter() {
    switchScreen(elements.screens.surprise, elements.screens.letter, () => {
      // Garantizar que todos los párrafos ya se muestren
      document.querySelectorAll('.letter-paragraph').forEach((p) => {
        p.classList.add('is-visible');
      });
    });
  }

  /**
   * 6. REPRODUCTOR DE AUDIO AMBIENTAL (ETAPA C)
   * Degradación elegante: solo se muestra si el archivo existe y es accesible
   */
  function initAudioPlayer() {
    const audioConf = config.audio;
    if (!audioConf || !audioConf.enabled || !audioConf.src) {
      return; // Permanece oculto discretamente
    }

    const audio = elements.audioElement;
    const container = elements.audioContainer;
    const btn = elements.audioToggleBtn;

    if (!audio || !container || !btn) return;

    // Asignar ruta de audio
    audio.src = audioConf.src;

    // Comprobar disponibilidad de forma silenciosa
    // Intentamos cargar metadatos de forma no intrusiva
    let audioValid = false;

    const handleCanPlay = () => {
      if (!audioValid) {
        audioValid = true;
        container.removeAttribute('hidden');
      }
    };

    const handleError = () => {
      // Si el archivo no existe o falla, ocultar silenciosamente sin interrumpir
      container.setAttribute('hidden', '');
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };

    audio.addEventListener('canplay', handleCanPlay, { once: true });
    audio.addEventListener('error', handleError, { once: true });

    // Alternar reproducción / pausa
    btn.addEventListener('click', () => {
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              btn.classList.add('is-playing');
              btn.setAttribute('aria-label', audioConf.ariaLabelPause || "Pausar música ambiental");
            })
            .catch(() => {
              // Políticas de reproducción automática del navegador
              btn.classList.remove('is-playing');
            });
        }
      } else {
        audio.pause();
        btn.classList.remove('is-playing');
        btn.setAttribute('aria-label', audioConf.ariaLabelPlay || "Reproducir música ambiental");
      }
    });

    // Si la pista termina o se interrumpe
    audio.addEventListener('ended', () => {
      btn.classList.remove('is-playing');
    });
    audio.addEventListener('pause', () => {
      btn.classList.remove('is-playing');
    });
  }

  /**
   * INICIALIZACIÓN
   */
  function init() {
    populateContent();

    // Eventos de botones
    if (elements.openBtn) {
      elements.openBtn.addEventListener('click', handleOpenEnvelope);
    }
    if (elements.surpriseBtn) {
      elements.surpriseBtn.addEventListener('click', handleShowSurprise);
    }
    if (elements.backToLetterBtn) {
      elements.backToLetterBtn.addEventListener('click', handleBackToLetter);
    }

    // Inicializar reproductor
    initAudioPlayer();

    // Revelar interfaz lista
    elements.body.classList.remove('is-loading');
    elements.body.classList.add('is-ready');
  }

  // Ejecutar al estar listo el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
