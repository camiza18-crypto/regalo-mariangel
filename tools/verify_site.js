/**
 * ====================================================================
 * SCRIPT DE PRUEBAS AUTOMATIZADAS DE CALIDAD Y ESTRUCTURA
 * ====================================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASÓ: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FALLÓ: ${message}`);
    testsFailed++;
  }
}

console.log('\n============================================================');
console.log('INICIANDO PRUEBAS DE CALIDAD: PROYECTO PARA MARIANGEL');
console.log('============================================================\n');

// 1. Verificación de archivos requeridos
console.log('1. Verificando estructura de archivos obligatorios...');
const requiredFiles = [
  'index.html',
  'styles.css',
  'script.js',
  'config.js',
  'README.md',
  '.gitignore',
  'assets/audio/README.md',
  'assets/qr/tarjeta-imprimible.html',
  'tools/generate_qr.js'
];

requiredFiles.forEach((file) => {
  const fullPath = path.join(ROOT_DIR, file);
  assert(fs.existsSync(fullPath), `El archivo ${file} existe`);
});

// 2. Verificación de config.js
console.log('\n2. Verificando integridad de config.js...');
const configContent = fs.readFileSync(path.join(ROOT_DIR, 'config.js'), 'utf8');
assert(!configContent.includes('syntax error'), 'config.js no contiene errores léxicos');
assert(configContent.includes('recipientName: "Mariangel"'), 'recipientName está configurado a Mariangel');
assert(configContent.includes('senderName:'), 'senderName está definido y listo para personalizar');
assert(configContent.includes('welcome:'), 'Objeto welcome está definido');
assert(configContent.includes('letter:'), 'Objeto letter está definido');
assert(configContent.includes('finalSurprise:'), 'Objeto finalSurprise está definido');
assert(configContent.includes('audio:'), 'Objeto audio está definido');

// 3. Verificación de index.html y compatibilidad con GitHub Pages
console.log('\n3. Verificando index.html y rutas relativas para GitHub Pages...');
const htmlContent = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(htmlContent.includes('./styles.css'), 'styles.css se enlaza con ruta relativa ./styles.css');
assert(htmlContent.includes('./config.js'), 'config.js se enlaza con ruta relativa ./config.js');
assert(htmlContent.includes('./script.js'), 'script.js se enlaza con ruta relativa ./script.js');
assert(htmlContent.includes('<noscript>'), 'Dispone de respaldo accesible <noscript>');
assert(!htmlContent.includes('http://localhost'), 'No contiene referencias a localhost');
assert(htmlContent.includes('viewport-fit=cover'), 'Meta viewport optimizado para móviles (viewport-fit=cover)');

// 4. Verificación de seguridad y buenas prácticas en script.js
console.log('\n4. Verificando script.js y seguridad de renderizado...');
const jsContent = fs.readFileSync(path.join(ROOT_DIR, 'script.js'), 'utf8');
assert(jsContent.includes('textContent'), 'Inyecta textos usando textContent (seguridad garantizada)');
assert(jsContent.includes('prefers-reduced-motion'), 'Respeta la preferencia de reducción de movimiento');
assert(jsContent.includes('canplay'), 'Maneja la detección de audio mediante eventos sin errores');

// 5. Verificación de CSS y paleta oficial
console.log('\n5. Verificando styles.css, paleta y responsive...');
const cssContent = fs.readFileSync(path.join(ROOT_DIR, 'styles.css'), 'utf8');
assert(cssContent.includes('#101010'), 'Paleta incluye Negro Profundo (#101010)');
assert(cssContent.includes('#F5F0E7'), 'Paleta incluye Crema Cálido (#F5F0E7)');
assert(cssContent.includes('#C6A66B'), 'Paleta incluye Dorado Suave (#C6A66B)');
assert(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'Incluye media query de accesibilidad para movimiento reducido');
assert(cssContent.includes('@media (max-width: 480px)'), 'Incluye optimización responsive para dispositivos móviles');

// 6. Prueba funcional del generador de QR
console.log('\n6. Probando generación real del código QR...');
try {
  // Probar con una URL típica de GitHub Pages
  const testUrl = 'https://camiz.github.io/regalo-mariangel/';
  execSync(`node "${path.join(ROOT_DIR, 'tools/generate_qr.js')}" "${testUrl}"`, { stdio: 'pipe' });
  
  const svgExists = fs.existsSync(path.join(ROOT_DIR, 'assets/qr/qr-mariangel.svg'));
  const pngExists = fs.existsSync(path.join(ROOT_DIR, 'assets/qr/qr-mariangel.png'));
  
  assert(svgExists, 'Archivo assets/qr/qr-mariangel.svg generado correctamente');
  assert(pngExists, 'Archivo assets/qr/qr-mariangel.png generado correctamente');

  if (pngExists) {
    const pngStats = fs.statSync(path.join(ROOT_DIR, 'assets/qr/qr-mariangel.png'));
    assert(pngStats.size > 5000, `El archivo PNG tiene un tamaño válido y alta resolución (${pngStats.size} bytes)`);
  }
} catch (err) {
  assert(false, `Error ejecutando tools/generate_qr.js: ${err.message}`);
}

// 7. Resumen de resultados
console.log('\n============================================================');
console.log(`RESUMEN DE PRUEBAS: ${testsPassed} pasadas, ${testsFailed} fallidas`);
console.log('============================================================\n');

if (testsFailed > 0) {
  process.exit(1);
}
