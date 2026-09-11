/**
 * Generate 120 placeholder SVG frames for the Sony WH-1000XM6 scroll sequence.
 * Each frame has a #050505 background with subtle frame indicators.
 * No external dependencies needed — pure Node.js.
 *
 * Run: node scripts/generate-frames.js
 */

const fs = require('fs');
const path = require('path');

const TOTAL_FRAMES = 120;
const WIDTH = 1920;
const HEIGHT = 1080;
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'frames');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const progress = i / TOTAL_FRAMES;

  // Determine story phase
  let phase, phaseColor;
  if (progress <= 0.15) {
    phase = 'ASSEMBLED';
    phaseColor = '#00D6FF';
  } else if (progress <= 0.40) {
    phase = 'DISASSEMBLING';
    phaseColor = '#0050FF';
  } else if (progress <= 0.65) {
    phase = 'EXPLODED VIEW';
    phaseColor = '#0050FF';
  } else if (progress <= 0.85) {
    phase = 'REASSEMBLING';
    phaseColor = '#0050FF';
  } else {
    phase = 'ASSEMBLED';
    phaseColor = '#00D6FF';
  }

  const radius = 120 + Math.sin(progress * Math.PI * 2) * 30;
  const innerRadius = radius * 0.6;
  const barWidth = WIDTH * 0.3;
  const barX = (WIDTH - barWidth) / 2;
  const barY = HEIGHT - 60;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#050505"/>
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="25%">
      <stop offset="0%" stop-color="rgba(0,80,255,0.06)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="${radius}" fill="none" stroke="${phaseColor}" stroke-opacity="0.19" stroke-width="2"/>
  <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="${innerRadius}" fill="none" stroke="${phaseColor}" stroke-opacity="0.08" stroke-width="1"/>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2}" text-anchor="middle" dominant-baseline="central" fill="rgba(255,255,255,0.06)" font-family="system-ui, sans-serif" font-weight="bold" font-size="200">${i.toString().padStart(3, '0')}</text>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2 + 130}" text-anchor="middle" dominant-baseline="central" fill="${phaseColor}" fill-opacity="0.25" font-family="system-ui, sans-serif" font-weight="500" font-size="14">${phase}</text>
  <rect x="${barX}" y="${barY}" width="${barWidth}" height="2" fill="rgba(255,255,255,0.05)"/>
  <rect x="${barX}" y="${barY}" width="${barWidth * progress}" height="2" fill="${phaseColor}" fill-opacity="0.3"/>
</svg>`;

  const frameNum = i.toString().padStart(3, '0');
  const filename = `frame-${frameNum}.svg`;
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, svg);

  if (i % 30 === 0 || i === 1) {
    console.log(`Generated frame ${i}/${TOTAL_FRAMES} - ${phase}`);
  }
}

console.log(`\nDone! Generated ${TOTAL_FRAMES} placeholder SVG frames in ${OUTPUT_DIR}`);
console.log('\nIMPORTANT: The ScrollCanvas component expects .webp files.');
console.log('For development, the component will show a solid #050505 background for missing frames.');
console.log('For production, replace with real rendered WebP frames from your 3D pipeline.');

