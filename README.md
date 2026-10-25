# Para Mariangel — Un Regalo que se Abre con un QR

Una experiencia digital personalizada, minimalista, íntima y cinematográfica creada para celebrar el cumpleaños de Mariangel. Diseñada para entregarse mediante un código QR físico y optimizada prioritariamente para teléfonos móviles.

---

## 🌟 Características de la Experiencia

- **Etapa A (Bienvenida)**: Pantalla inmersiva en negro profundo (`#101010`) con sobre digital 3D interactivo, sello dorado de cera digital y botón ergonómico *"Abrir tu regalo"*.
- **Etapa B (La Carta)**: Papelería de alta gama en crema cálido (`#F5F0E7`), tipografía editorial serif, animación de aparición suave y firma personal.
- **Etapa C (Música Ambiental)**: Reproductor minimalista flotante con degradación elegante (si no hay música, se oculta discretamente sin errores ni mensajes molestos).
- **Etapa D (Sorpresa Final)**: Revelación cinematográfica con una frase especial y dedicatoria personal.
- **Accesibilidad y Rendimiento**: Soporte completo para `prefers-reduced-motion`, diseño responsive sin desplazamiento horizontal y carga rápida en navegadores móviles.
- **Seguridad**: Inyección segura mediante `textContent`, evitando vulnerabilidades XSS y preservando el diseño.

---

## 📁 Estructura del Proyecto

```
.
├── index.html                  # Estructura semántica de las 3 etapas y respaldo sin JS
├── styles.css                  # Sistema de diseño, paleta, sobre 3D, responsive y animaciones
├── script.js                   # Lógica de interacción, transiciones y reproductor de audio
├── config.js                   # Centralización de textos, nombres, firma y rutas (editable)
├── README.md                   # Esta guía
├── .gitignore                  # Exclusiones de control de versiones
├── assets/
│   ├── audio/
│   │   ├── README.md           # Guía para agregar tu propia música
│   │   └── musica.mp3          # Pista musical opcional
│   └── qr/
│       ├── tarjeta-imprimible.html # Plantilla lista para imprimir en papel o cartulina
│       ├── qr-mariangel.svg    # QR vectorial oficial (se genera con el script)
│       └── qr-mariangel.png    # QR de 1200px alta resolución para impresión
└── tools/
    └── generate_qr.js          # Generador automatizado del QR con la URL definitiva
```

---

## ✍️ Cómo Personalizar la Carta (`config.js`)

Todos los textos y parámetros están centralizados en `config.js`. No necesitas tocar HTML ni CSS:

1. Abre `config.js` en tu editor de código o bloc de notas.
2. Modifica el nombre del remitente:
   ```javascript
   senderName: "Tu Nombre o Apodo",
   ```
3. Si deseas ajustar algún párrafo de la carta, edita el arreglo `paragraphs`:
   ```javascript
   paragraphs: [
     "Tu primer párrafo...",
     "Tu segundo párrafo..."
   ]
   ```
4. Guarda el archivo. Los cambios se reflejarán inmediatamente al recargar la página.

---

## 🎵 Cómo Agregar o Cambiar la Música

1. Coloca tu archivo de música favorito en la carpeta `assets/audio/` con el nombre `musica.mp3`.
2. La página lo detectará automáticamente y activará el botón en la esquina superior derecha.
3. Si no deseas música, simplemente deja la carpeta sin archivo de audio o configura `enabled: false` en `config.js`. El reproductor permanecerá completamente oculto.

---

## 🚀 Guía de Publicación en GitHub Pages (Paso a Paso)

Para que el código QR funcione en cualquier teléfono del mundo, el proyecto debe publicarse en una dirección web pública. GitHub Pages te ofrece alojamiento gratuito y permanente.

### Paso 1: Crear el repositorio en GitHub
1. Inicia sesión en tu cuenta de [GitHub](https://github.com/).
2. Haz clic en **New repository** (o visita https://github.com/new).
3. En **Repository name**, escribe: `regalo-mariangel`.
4. Selecciona **Public** (necesario para GitHub Pages gratuito).
5. **No marques** las opciones de "Add a README file" ni "Add .gitignore" (ya los tenemos listos en este proyecto).
6. Haz clic en **Create repository**.

### Paso 2: Subir los archivos desde tu computadora
Abre una terminal en esta carpeta (`c:\Users\camiz\Downloads\CAMILO\LIO`) y ejecuta:

```bash
# 1. Inicializar git si aún no está inicializado
git init -b main

# 2. Agregar todos los archivos al control de versiones
git add .

# 3. Crear el primer commit
git commit -m "Experiencia digital de regalo para Mariangel"

# 4. Vincular con tu repositorio de GitHub (reemplaza TU_USUARIO por tu nombre de usuario)
git remote add origin https://github.com/TU_USUARIO/regalo-mariangel.git

# 5. Subir los archivos a la rama main
git push -u origin main
```

*(Si ya tienes un remoto configurado, solo ejecuta `git add .`, `git commit -m "Actualización"` y `git push`)*.

### Paso 3: Activar GitHub Pages
1. En la página de tu repositorio en GitHub, entra a la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, selecciona **Pages** (dentro de "Code and automation").
3. En la sección **Build and deployment > Source**, selecciona **Deploy from a branch**.
4. En **Branch**, selecciona `main` y en la carpeta elige `/ (root)`.
5. Haz clic en **Save** (Guardar).
6. Espera entre 1 y 2 minutos mientras GitHub compila el sitio.
7. Al recargar la sección de Pages, verás un mensaje verde con tu URL pública real, que tendrá este formato:
   `https://TU_USUARIO.github.io/regalo-mariangel/`

### Paso 4: Probar la página en vivo
Abre esa URL en tu navegador y comprueba que cargue correctamente la pantalla de bienvenida con el sobre digital.

---

## 📱 Generación y Verificación del Código QR Real

Una vez que tengas tu URL pública definitiva de GitHub Pages:

### Paso 1: Generar los archivos QR
En la terminal, ejecuta el siguiente comando reemplazando con tu URL real:

```bash
node tools/generate_qr.js "https://TU_USUARIO.github.io/regalo-mariangel/"
```

Esto generará automáticamente:
- `assets/qr/qr-mariangel.svg`: Imagen vectorial nítida a cualquier escala.
- `assets/qr/qr-mariangel.png`: Imagen de 1200 x 1200 píxeles a 300 DPI con margen blanco ideal para imprimir.

### Paso 2: Imprimir la Tarjeta Física de Regalo
1. Abre el archivo `assets/qr/tarjeta-imprimible.html` en tu navegador web.
2. Verás una tarjeta de regalo editorial con el marco dorado, el mensaje *"Para Mariangel"* y el código QR oficial en el centro.
3. Presiona `Ctrl + P` (o `Cmd + P` en Mac) para imprimir o guardar como PDF.
4. Puedes imprimirla en cartulina fina o papel fotográfico para entregarla en un sobre real o como postal.

### Paso 3: Verificación Obligatoria
Antes de entregar el regalo:
1. Toma un teléfono celular distinto al equipo de desarrollo (o desactiva el Wi-Fi para probar la red móvil).
2. Abre la aplicación de cámara estándar o el lector de QR.
3. Apunta al código QR generado en la pantalla o en la tarjeta impresa.
4. Comprueba que se abra de inmediato la URL de GitHub Pages, que la animación del sobre funcione con fluidez y que la carta sea perfectamente legible.

---

## 🔒 Privacidad y Consideraciones
- Ten presente que los repositorios públicos de GitHub son accesibles por internet. La URL no debe considerarse un secreto ni una clave privada.
- Mantén siempre una copia de respaldo de tu personalización.
