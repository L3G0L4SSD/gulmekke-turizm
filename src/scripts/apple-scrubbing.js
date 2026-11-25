import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAppleScrubbing() {
  const canvas = document.getElementById('scrubbing-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const section = document.getElementById('deneyim');
  const steps = document.querySelectorAll('.scrubbing-step');
  const progressFill = document.getElementById('scrub-progress-fill');

  const imageSources = [
    '/assets/images/kaaba_night.jpg',
    '/assets/images/kiswah_gold.jpg',
    '/assets/images/luxury_suite.jpg',
    '/assets/images/vip_transfer.jpg',
    '/assets/images/medina_nabawi.jpg',
  ];

  const images = [];
  let loadedCount = 0;

  imageSources.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === imageSources.length) {
        setupCanvasSize();
        drawFrame(0, 0); // initial render
      }
    };
    images[idx] = img;
  });

  function setupCanvasSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', () => {
    setupCanvasSize();
    if (images[0] && images[0].complete) {
      drawFrame(currentProgress, currentSubProgress);
    }
  });

  let currentProgress = 0;
  let currentSubProgress = 0;

  function drawFrame(overallProgress, subProgress = 0) {
    if (images.length === 0 || !images[0].complete) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    const totalSegments = images.length - 1;
    const scaledProg = overallProgress * totalSegments;
    const fromIndex = Math.min(Math.floor(scaledProg), totalSegments);
    const toIndex = Math.min(fromIndex + 1, totalSegments);
    const blendAlpha = scaledProg - fromIndex;

    const img1 = images[fromIndex];
    const img2 = images[toIndex];

    // Helper to draw image cover
    function drawCover(img, scale = 1, alpha = 1) {
      if (!img || !img.complete) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      const imgAspect = img.width / img.height;
      const screenAspect = w / h;
      let drawW, drawH, drawX, drawY;

      if (screenAspect > imgAspect) {
        drawW = w * scale;
        drawH = (w / imgAspect) * scale;
      } else {
        drawH = h * scale;
        drawW = (h * imgAspect) * scale;
      }

      drawX = (w - drawW) / 2;
      drawY = (h - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    }

    // Gentle zoom-in effect during each milestone (Apple technique)
    const zoom1 = 1.0 + blendAlpha * 0.05;
    const zoom2 = 1.05 - (1 - blendAlpha) * 0.05;

    drawCover(img1, zoom1, 1 - blendAlpha);
    if (blendAlpha > 0 && fromIndex !== toIndex) {
      drawCover(img2, zoom2, blendAlpha);
    }
  }

  // ScrollTrigger Setup
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.6,
    onUpdate: (self) => {
      currentProgress = self.progress;

      // Update progress bar
      if (progressFill) {
        progressFill.style.width = `${Math.min(self.progress * 100, 100)}%`;
      }

      // Draw canvas
      drawFrame(self.progress);

      // Active step text logic
      const totalSteps = steps.length;
      const activeIdx = Math.min(
        Math.floor(self.progress * totalSteps),
        totalSteps - 1
      );

      steps.forEach((step, idx) => {
        if (idx === activeIdx) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    },
  });
}
