# Música Ambiental para la Carta de Mariangel

Esta carpeta está destinada a la pista musical de fondo para la experiencia web.

## Instrucciones de uso

1. **Nombre de archivo recomendado**:
   Guarda tu canción con el nombre:
   `musica.mp3`
   directamente en esta carpeta (`assets/audio/musica.mp3`).

2. **Formatos compatibles**:
   - `.mp3` (recomendado para máxima compatibilidad móvil y menor peso)
   - `.m4a` / `.aac`
   - `.wav`

3. **Comportamiento automático**:
   - **Si no colocas ningún archivo de audio**: El reproductor se ocultará de forma completamente limpia y silenciosa en la página. No habrá iconos rotos, alertas ni mensajes molestos.
   - **Cuando agregues el archivo**: La página lo detectará automáticamente y mostrará el botón flotante discreto en la esquina superior con controles de reproducir/pausar y animación de ondas doradas.

4. **Recomendaciones de audio**:
   - Elige una melodía suave, instrumental o acústica (piano, guitarra acústica o ambient sutil).
   - Volumen equilibrado: la música acompaña la lectura, no compite con ella.
   - Duración ideal: entre 1 y 4 minutos en bucle continuo (`loop`).
   - Peso recomendado: menos de 5 MB para carga inmediata en conexiones celulares móviles.

5. **Cambiar la ruta en la configuración**:
   Si prefieres usar otro nombre de archivo (por ejemplo `assets/audio/cancion-especial.mp3`), solo cámbialo en la línea correspondiente de `config.js`:
   ```javascript
   audio: {
     enabled: true,
     src: "./assets/audio/cancion-especial.mp3",
     ...
   }
   ```
