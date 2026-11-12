import * as THREE from 'three';

/**
 * High-fidelity architectural texture generators with caching for 3D materials.
 * Caches textures to prevent redundant canvas creation and GPU memory leaks.
 * Disables mipmap generation on procedural graphics for 33% memory savings.
 */

const textureCache = new Map<string, THREE.CanvasTexture>();

function setupCanvasTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

export function createEventWallTexture(): THREE.CanvasTexture {
  const cacheKey = 'event-wall-led-tower';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#0a0d14');
    grad.addColorStop(0.3, '#141d2e');
    grad.addColorStop(0.7, '#1f2a40');
    grad.addColorStop(1, '#080a0f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 1024);

    // Dynamic LED grid lines
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
    ctx.lineWidth = 2;
    for (let y = 50; y < 1000; y += 80) {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(482, y);
      ctx.stroke();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.fillText('CITY MALL', 256, 260);

    ctx.fillStyle = '#d4af37';
    ctx.font = '600 20px "Space Grotesk", sans-serif';
    ctx.fillText('LIVE EVENTS & CINEMA', 256, 320);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('NOW SHOWING IN 4K LASER', 256, 480);
    ctx.fillText('AUTUMN FASHION WEEK', 256, 520);
    ctx.fillText('GOURMET DINING FESTIVAL', 256, 560);
  }

  const texture = setupCanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createFashionEditorialTexture(brand: string, sub: string, accentColor = '#d4af37'): THREE.CanvasTexture {
  const cacheKey = `fashion-${brand}-${sub}-${accentColor}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#0f1319');
    grad.addColorStop(0.5, '#171c24');
    grad.addColorStop(1, '#0a0c10');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 904, 904);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(80, 80, 864, 864);

    ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
    ctx.beginPath();
    ctx.arc(512, 450, 260, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 54px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.fillText(brand, 512, 480);

    ctx.fillStyle = accentColor;
    ctx.font = '600 24px "Space Grotesk", sans-serif';
    ctx.fillText(sub.toUpperCase(), 512, 540);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '300 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('COLLECTION · EXCLUSIVE PREVIEW', 512, 850);
  }

  const texture = setupCanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createLuxuryWatchTexture(): THREE.CanvasTexture {
  const cacheKey = 'luxury-watch-dial';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#08090b';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(512, 512, 380, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const x1 = 512 + Math.cos(angle) * 350;
      const y1 = 512 + Math.sin(angle) * 350;
      const x2 = 512 + Math.cos(angle) * (i % 3 === 0 ? 300 : 330);
      const y2 = 512 + Math.sin(angle) * (i % 3 === 0 ? 300 : 330);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.fillText('CHRONO', 512, 380);

    ctx.fillStyle = '#d4af37';
    ctx.font = '500 18px "Space Grotesk", sans-serif';
    ctx.fillText('AUTOMATIC CHRONOMETER', 512, 420);
  }

  const texture = setupCanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createModernTechTexture(): THREE.CanvasTexture {
  const cacheKey = 'modern-tech-display';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 944, 944);

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let i = 80; i < 960; i += 60) {
      ctx.beginPath();
      ctx.moveTo(40, i);
      ctx.lineTo(984, i);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i, 40);
      ctx.lineTo(i, 984);
      ctx.stroke();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NEXA ONE', 512, 480);

    ctx.fillStyle = '#00f0ff';
    ctx.font = '500 24px "Space Grotesk", sans-serif';
    ctx.fillText('SPATIAL COMPUTING EXPERIENCE', 512, 540);
  }

  const texture = setupCanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createCityMallSignTexture(): THREE.CanvasTexture {
  const cacheKey = 'city-mall-main-marquee';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Architectural Dark Granite & Bronze Plate
    const grad = ctx.createLinearGradient(0, 0, 1024, 256);
    grad.addColorStop(0, '#0c0f14');
    grad.addColorStop(0.5, '#181e28');
    grad.addColorStop(1, '#0c0f14');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 256);

    // Subtle brushed horizontal texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let y = 0; y < 256; y += 4) {
      ctx.fillRect(0, y, 1024, 1);
    }

    // Outer Champagne Bronze Frame
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 1004, 236);

    // Inner Metallic Pin-Stripe
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 18, 988, 220);

    // Warm Ambient Backlight Halo behind letters
    const halo = ctx.createRadialGradient(512, 115, 20, 512, 115, 340);
    halo.addColorStop(0, 'rgba(255, 240, 200, 0.22)');
    halo.addColorStop(0.6, 'rgba(212, 175, 55, 0.08)');
    halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = halo;
    ctx.fillRect(20, 20, 984, 216);

    // Stylized "CM" Monogram Emblem
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 22px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦  EST. 2026  ✦', 512, 48);

    // Primary Brand Typography: "CITY MALL"
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 76px "Cinzel", serif';
    ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
    ctx.shadowBlur = 12;
    ctx.fillText('CITY MALL', 512, 130);
    ctx.shadowBlur = 0;

    // Subtitle Line
    ctx.fillStyle = '#d4af37';
    ctx.font = '600 20px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('SHOPPING • DINING • ENTERTAINMENT', 512, 188);

    // Bottom Accent Bar
    ctx.fillStyle = '#c5a059';
    ctx.fillRect(360, 205, 304, 3);
  }

  const texture = setupCanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createStoreSignTexture(
  storeName: string,
  category: string,
  primaryColor = '#ffffff',
  accentColor = '#d4af37',
  bgColor = '#0e1219'
): THREE.CanvasTexture {
  const cacheKey = `store-sign-${storeName}-${category}-${primaryColor}-${accentColor}-${bgColor}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Rich Storefront Signboard Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 512, 128);

    // Subtle horizontal brushed texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
    for (let y = 0; y < 128; y += 3) {
      ctx.fillRect(0, y, 512, 1);
    }

    // Outer architectural metal trim
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(6, 6, 500, 116);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, 492, 108);

    // Typography styling tailored to store style
    const isTechOrSport = /NEXA|KINETIX|STACKS/.test(storeName);
    const fontPrimary = isTechOrSport ? 'bold 36px "Space Grotesk", sans-serif' : 'bold 36px "Cinzel", serif';

    // Store Name with subtle illumination
    ctx.fillStyle = primaryColor;
    ctx.font = fontPrimary;
    ctx.textAlign = 'center';
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 8;
    ctx.fillText(storeName, 256, 62);
    ctx.shadowBlur = 0;

    // Category / Tagline
    ctx.fillStyle = accentColor;
    ctx.font = '600 13px "Space Grotesk", sans-serif';
    ctx.fillText(category.toUpperCase(), 256, 96);
  }

  const texture = setupCanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createCinemaMarqueeTexture(): THREE.CanvasTexture {
  const cacheKey = 'cinema-marquee';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#06080d';
    ctx.fillRect(0, 0, 1024, 256);

    // Marquee perimeter bulbs
    ctx.fillStyle = '#ffedd5';
    for (let x = 20; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.arc(x, 16, 6, 0, Math.PI * 2);
      ctx.arc(x, 240, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let y = 20; y < 240; y += 32) {
      ctx.beginPath();
      ctx.arc(16, y, 6, 0, Math.PI * 2);
      ctx.arc(1008, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glowing Neon Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 74px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#d4af37';
    ctx.shadowBlur = 18;
    ctx.fillText('CITY CINEMAS', 512, 126);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#d4af37';
    ctx.font = '600 22px "Space Grotesk", sans-serif';
    ctx.fillText('IMAX LASER • DOLBY ATMOS • VIP AUDITORIUMS', 512, 185);
  }

  const texture = setupCanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createMoviePosterTexture(
  title: string,
  genre: string,
  colorScheme: 'cosmos' | 'velocity' | 'echoes' | 'neon'
): THREE.CanvasTexture {
  const cacheKey = `movie-poster-${title}-${genre}-${colorScheme}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const bgGrad = ctx.createLinearGradient(0, 0, 512, 768);
    if (colorScheme === 'cosmos') {
      bgGrad.addColorStop(0, '#040714');
      bgGrad.addColorStop(0.5, '#101d3f');
      bgGrad.addColorStop(1, '#03050c');
    } else if (colorScheme === 'velocity') {
      bgGrad.addColorStop(0, '#1c0808');
      bgGrad.addColorStop(0.5, '#451212');
      bgGrad.addColorStop(1, '#0c0303');
    } else if (colorScheme === 'echoes') {
      bgGrad.addColorStop(0, '#0a1612');
      bgGrad.addColorStop(0.5, '#123026');
      bgGrad.addColorStop(1, '#050a08');
    } else {
      bgGrad.addColorStop(0, '#1a0826');
      bgGrad.addColorStop(0.5, '#3b1054');
      bgGrad.addColorStop(1, '#0d0414');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 768);

    // Poster framing
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 472, 728);

    // Graphic Artwork Circle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.arc(256, 300, 140, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 10;
    ctx.fillText(title, 256, 520);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#d4af37';
    ctx.font = '600 20px "Space Grotesk", sans-serif';
    ctx.fillText(genre.toUpperCase(), 256, 570);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('IN CITY CINEMAS 4K LASER', 256, 680);
  }

  const texture = setupCanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createLargeFormatTileTexture(isNight = false): THREE.CanvasTexture {
  const cacheKey = `large-tile-floor-${isNight}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = isNight ? '#0e1218' : '#f5f7fa';
    ctx.fillRect(0, 0, 1024, 1024);

    const tileSize = 256;
    for (let x = 0; x < 1024; x += tileSize) {
      for (let y = 0; y < 1024; y += tileSize) {
        const lumOffset = (Math.sin(x * 12.3 + y * 45.6) * 0.5 + 0.5) * 5;
        if (!isNight) {
          ctx.fillStyle = `rgb(${247 + lumOffset}, ${249 + lumOffset}, ${252 + lumOffset})`;
        } else {
          ctx.fillStyle = `rgb(${16 + lumOffset * 0.4}, ${19 + lumOffset * 0.4}, ${25 + lumOffset * 0.4})`;
        }
        ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

        // Subtle organic Calacatta marble veining
        ctx.strokeStyle = isNight ? 'rgba(255, 255, 255, 0.045)' : 'rgba(148, 163, 184, 0.15)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(x + 15, y + 30);
        ctx.bezierCurveTo(x + 90, y + 110, x + 150, y + 90, x + tileSize - 20, y + tileSize - 35);
        ctx.stroke();

        // Secondary subtle branch
        ctx.beginPath();
        ctx.moveTo(x + 90, y + 110);
        ctx.bezierCurveTo(x + 130, y + 150, x + 180, y + 160, x + tileSize - 50, y + tileSize - 15);
        ctx.stroke();

        // Grout line
        ctx.strokeStyle = isNight ? '#07090c' : '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, tileSize, tileSize);
      }
    }
  }

  const texture = setupCanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createPlazaPaverTexture(isNight = false): THREE.CanvasTexture {
  const cacheKey = `plaza-paver-${isNight}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = isNight ? '#12151c' : '#cbd5e1';
    ctx.fillRect(0, 0, 1024, 1024);

    const stepX = 256;
    const stepY = 128;
    for (let y = 0; y < 1024; y += stepY) {
      const rowOffset = (Math.floor(y / stepY) % 2) * 128;
      for (let x = -128; x < 1024; x += stepX) {
        const posX = x + rowOffset;
        const tone = (Math.sin(posX * 3.4 + y * 7.1) * 0.5 + 0.5) * 8;
        if (!isNight) {
          ctx.fillStyle = `rgb(${218 + tone}, ${224 + tone}, ${232 + tone})`;
        } else {
          ctx.fillStyle = `rgb(${18 + tone * 0.3}, ${22 + tone * 0.3}, ${28 + tone * 0.3})`;
        }
        ctx.fillRect(posX + 2, y + 2, stepX - 4, stepY - 4);

        ctx.strokeStyle = isNight ? '#0b0d12' : '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(posX, y, stepX, stepY);
      }
    }
  }

  const texture = setupCanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createStoneCladdingTexture(isNight = false): THREE.CanvasTexture {
  const cacheKey = `stone-cladding-${isNight}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = isNight ? '#0c0f15' : '#f1f5f9';
    ctx.fillRect(0, 0, 1024, 1024);

    const blockW = 512;
    const blockH = 256;
    for (let y = 0; y < 1024; y += blockH) {
      const rowOffset = (Math.floor(y / blockH) % 2) * 256;
      for (let x = -256; x < 1024; x += blockW) {
        const posX = x + rowOffset;
        ctx.fillStyle = isNight ? '#121620' : '#f8fafc';
        ctx.fillRect(posX + 3, y + 3, blockW - 6, blockH - 6);

        ctx.strokeStyle = isNight ? '#05070a' : '#cbd5e1';
        ctx.lineWidth = 3;
        ctx.strokeRect(posX, y, blockW, blockH);
      }
    }
  }

  const texture = setupCanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set(cacheKey, texture);
  return texture;
}
