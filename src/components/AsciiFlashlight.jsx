import { useState, useEffect, useRef, useCallback } from 'react';

// ADD OR REMOVE IMAGES HERE
// Each entry can be a local path in public/ (e.g., "/ascii-images/my-photo.jpg")
// A random image is picked on each page load.
const IMAGES = [
  "/ascii-images/yosemite.jpg",
  "/ascii-images/mountain-sunrise.jpg",
  "/ascii-images/snowy-mountains.jpg",
  "/ascii-images/foggy-forest.jpg",
  "/ascii-images/ocean-sunset.jpg",
];

// Floyd-Steinberg dithering — converts image to black & white dots
function ditherImage(canvas, ctx, img) {
  const w = canvas.width;
  const h = canvas.height;
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const gray = new Float32Array(w * h);
  for (let i = 0; i < gray.length; i++) {
    const idx = i * 4;
    gray[i] = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const old = gray[i];
      const val = old < 128 ? 0 : 255;
      gray[i] = val;
      const err = old - val;

      if (x + 1 < w)         gray[i + 1]     += err * 7 / 16;
      if (y + 1 < h && x > 0) gray[i + w - 1] += err * 3 / 16;
      if (y + 1 < h)          gray[i + w]     += err * 5 / 16;
      if (y + 1 < h && x + 1 < w) gray[i + w + 1] += err * 1 / 16;
    }
  }

  // Dark pixels become a muted color that blends with the dark background
  // instead of bright gray that looks like a flashlight
  for (let i = 0; i < gray.length; i++) {
    const idx = i * 4;
    if (gray[i] > 128) {
      data[idx] = 0;
      data[idx + 1] = 0;
      data[idx + 2] = 0;
      data[idx + 3] = 0;
    } else {
      data[idx] = 100;
      data[idx + 1] = 100;
      data[idx + 2] = 100;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

const AsciiFlashlight = ({ radius = 200, lightMode = false }) => {
  const [dataUrl, setDataUrl] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [isMobile, setIsMobile] = useState(false);
  const [contentRect, setContentRect] = useState(null);
  const canvasRef = useRef(document.createElement('canvas'));

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track content container bounds
  useEffect(() => {
    if (isMobile) return;
    const update = () => {
      const el = document.querySelector('[data-content]');
      if (el) {
        const rect = el.getBoundingClientRect();
        setContentRect({ left: rect.left, right: rect.right });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const img = new Image();
    img.crossOrigin = 'anonymous';

    const generate = () => {
      try {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ditherImage(canvas, ctx, img);
        setDataUrl(canvas.toDataURL('image/png'));
      } catch (e) {
        console.warn('AsciiFlashlight: dither failed', e);
      }
    };

    img.onload = generate;
    img.onerror = () => console.warn('AsciiFlashlight: failed to load image');
    img.src = IMAGES[Math.floor(Math.random() * IMAGES.length)];

    const handleResize = () => {
      if (img.complete && img.naturalWidth > 0) generate();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, handleMouseMove]);

  if (isMobile || !dataUrl) return null;

  const { x, y } = mousePos;
  const r = radius;

  // Fade out as cursor approaches content area
  const fadeZone = 150; // px — distance over which effect fades to 0
  let distanceFactor = 1;
  if (contentRect) {
    if (x >= contentRect.left && x <= contentRect.right) {
      distanceFactor = 0;
    } else {
      const dist = x < contentRect.left
        ? contentRect.left - x
        : x - contentRect.right;
      distanceFactor = Math.min(1, dist / fadeZone);
    }
  }

  const baseOpacity = lightMode ? 0.6 : 0.7;
  const finalOpacity = baseOpacity * distanceFactor;

  if (finalOpacity <= 0.01) return null;

  const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, transparent 70%)`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundImage: `url(${dataUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: finalOpacity,
        filter: lightMode ? 'brightness(0.2)' : 'none',
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
};

export default AsciiFlashlight;
