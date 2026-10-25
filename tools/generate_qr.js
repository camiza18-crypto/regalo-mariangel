/**
 * ====================================================================
 * GENERADOR DE CÓDIGO QR DEFINITIVO PARA MARIANGEL
 * ====================================================================
 * Este script genera los archivos oficiales del código QR:
 * 1. assets/qr/qr-mariangel.svg (Vectorial infinito para diseño)
 * 2. assets/qr/qr-mariangel.png (Alta resolución 1200x1200 con margen para impresión)
 *
 * USO:
 *   node tools/generate_qr.js "https://<tu-usuario>.github.io/regalo-mariangel/"
 *
 * Si no se proporciona un argumento, solicitará la URL o usará el valor configurado.
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Obtener la URL del argumento de línea de comandos
const args = process.argv.slice(2);
let targetUrl = args[0];

if (!targetUrl) {
  console.log('------------------------------------------------------------');
  console.log('AVISO: No se proporcionó una URL como argumento.');
  console.log('Ejemplo de uso:');
  console.log('  node tools/generate_qr.js "https://<usuario>.github.io/regalo-mariangel/"');
  console.log('------------------------------------------------------------');
  process.exit(1);
}

// Validar que no sea localhost ni una dirección privada
if (targetUrl.includes('localhost') || targetUrl.includes('127.0.0.1') || targetUrl.startsWith('file://')) {
  console.error('ERROR OBLIGATORIO: El código QR no debe apuntar a localhost, 127.0.0.1 ni archivos locales.');
  console.error('Debe ser la URL pública real y definitiva de GitHub Pages.');
  process.exit(1);
}

const outputDir = path.resolve(__dirname, '../assets/qr');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const svgPath = path.join(outputDir, 'qr-mariangel.svg');
const pngPath = path.join(outputDir, 'qr-mariangel.png');

async function generateQRCodes() {
  try {
    console.log(`\nGenerando códigos QR para: ${targetUrl}\n`);

    // 1. Generar SVG Vectorial
    await QRCode.toFile(svgPath, targetUrl, {
      type: 'svg',
      errorCorrectionLevel: 'H', // Máximo nivel de redundancia y corrección de errores (30%)
      margin: 4,                 // Margen generoso exigido para impresión y lectura
      color: {
        dark: '#101010',         // Negro profundo de alto contraste
        light: '#FFFFFF'         // Blanco puro para óptimo reconocimiento de cámaras
      }
    });
    console.log(`✓ Archivo SVG creado: ${svgPath}`);

    // 2. Generar PNG de Alta Resolución (1200 x 1200 px)
    await QRCode.toFile(pngPath, targetUrl, {
      type: 'png',
      width: 1200,
      errorCorrectionLevel: 'H',
      margin: 4,
      color: {
        dark: '#101010',
        light: '#FFFFFF'
      }
    });
    console.log(`✓ Archivo PNG 1200px creado: ${pngPath}`);

    console.log('\n============================================================');
    console.log('¡Códigos QR generados con éxito!');
    console.log('Recuerda verificarlo escaneándolo con la cámara de tu teléfono.');
    console.log('============================================================\n');
  } catch (err) {
    console.error('Error al generar el código QR:', err);
    process.exit(1);
  }
}

generateQRCodes();
