/**
 * ====================================================================
 * CONFIGURACIÓN CENTRALIZADA: PARA MARIANGEL
 * ====================================================================
 * Edita este archivo para personalizar todos los textos, nombres,
 * la firma y la ruta de la música sin tocar el código HTML ni CSS.
 *
 * NOTA: Todos los textos se insertan en la página de forma segura
 * mediante 'textContent' para proteger el diseño y evitar errores.
 */

window.APP_CONFIG = Object.freeze({
  // Identidad y Nombres
  recipientName: "Mariangel",
  senderName: "[ NOMBRE DEL REMITENTE ]", // Reemplaza con tu nombre o apodo

  // Pantalla de Bienvenida (Etapa A)
  welcome: {
    title: "Para Mariangel",
    subtitle: "Hoy es un día especial. Y quería que tuvieras algo más que un mensaje.",
    openButtonText: "Abrir tu regalo",
  },

  // La Carta (Etapa B)
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
    signatureSender: "[ NOMBRE DEL REMITENTE ]", // Si lo dejas igual a senderName, se actualizará automáticamente
    surpriseButtonText: "Hay algo más para ti",
  },

  // Mensaje Final Sorpresa (Etapa D)
  finalSurprise: {
    quote: "Que la vida te sorprenda con cosas tan bonitas como las que todavía te quedan por descubrir.",
    recipient: "Mariangel",
    wish: "Feliz cumpleaños.",
    backButtonText: "Volver a la carta"
  },

  // Configuración de Audio (Etapa C)
  // Coloca un archivo MP3 en 'assets/audio/musica.mp3'.
  // Si el archivo no existe, el reproductor se ocultará discretamente sin errores.
  audio: {
    enabled: true,
    src: "./assets/audio/musica.mp3",
    ariaLabelPlay: "Reproducir música ambiental",
    ariaLabelPause: "Pausar música ambiental"
  },

  // Fecha opcional para mostrar al pie de la carta (deja vacío si no deseas mostrar fecha)
  optionalDate: ""
});
