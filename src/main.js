import { COMPANY_CONFIG } from './data/companyConfig.js';
import { initSmoothScroll } from './scripts/lenis-scroll.js';
import { initTawafVideo } from './scripts/tawaf-video.js';
import { initJourneySlider } from './scripts/journey-slider.js';
import { initMagneticInteractions } from './scripts/magnetic-interactions.js';
import { initAmbientAudio } from './scripts/ambient-audio.js';
import { initTripBuilder } from './scripts/trip-builder.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scrolling
  initSmoothScroll();

  // 2. Tavaf Video Hero (YouTube IFrame API — Gerçek Tavaf Görüntüleri)
  initTawafVideo();

  // 3. Kutsal Yolculuk Yatay İnteraktif Slider (Swiper.js)
  initJourneySlider();

  // 4. Dennis Snellenberg Magnetic Cursor & Physics
  initMagneticInteractions();

  // 5. Ambient Meditative Soundscape (Web Audio API)
  initAmbientAudio();

  // 6. Bespoke Trip Builder Form
  initTripBuilder();

  // 7. Render Dynamic Data from companyConfig.js
  renderDynamicCompanyData();

  // 8. Setup Accordion
  setupGuideAccordion();

  // 9. Sticky Header Blur Effect
  setupHeaderScroll();

  // 10. Reveal Animations (GSAP ScrollTrigger)
  setupRevealAnimations();

  // 11. Sinematik Hero Açılış Animasyonu (Ekometal Tarzı GSAP Timeline)
  initHeroEntranceTimeline();

  // 12. Apple-Grade Mobile Drawer Navigation & Sticky Action Bar
  initMobileNav();

  // 13. Google Analytics / Tag Manager Dönüşüm Takibi (WhatsApp, Arama, Teklif)
  initAnalyticsTracking();
});

/**
 * Render all company details, packages, services, credentials, and room types
 */
function renderDynamicCompanyData() {
  const cleanPhone = COMPANY_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');
  const defaultWhatsAppUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(COMPANY_CONFIG.contact.whatsappMessage)}`;

  // Header & Footer WhatsApp links
  const headerWa = document.getElementById('header-whatsapp-btn');
  if (headerWa) headerWa.href = defaultWhatsAppUrl;
  const heroWa = document.getElementById('hero-whatsapp-btn');
  if (heroWa) heroWa.href = defaultWhatsAppUrl;
  const drawerWa = document.getElementById('mobile-drawer-wa');
  if (drawerWa) drawerWa.href = defaultWhatsAppUrl;
  const barWa = document.getElementById('mobile-bar-wa');
  if (barWa) barWa.href = defaultWhatsAppUrl;

  // Render Room Types Section (#room-types-container)
  const roomTypesContainer = document.getElementById('room-types-container');
  if (roomTypesContainer) {
    const roomIcons = [
      `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
      `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    ];

    roomTypesContainer.innerHTML = COMPANY_CONFIG.roomTypes.map((room, idx) => `
      <div class="room-card">
        <span class="room-badge">${room.badge}</span>
        <div class="room-icon-box">${roomIcons[idx] || roomIcons[0]}</div>
        <h3 class="room-title">${room.title}</h3>
        <p class="room-desc">${room.desc}</p>
        <div class="room-footer">
          <span class="room-tag">Broşür Fiyatı: <strong>${room.priceTag}</strong>'dan</span>
          <a href="#tasarla" class="btn-glass btn-small" data-magnetic>Taksit Planla</a>
        </div>
      </div>
    `).join('');
  }

  // Render Services
  const servicesContainer = document.getElementById('services-container');
  if (servicesContainer) {
    const serviceIcons = [
      `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
      `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
      `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    ];

    servicesContainer.innerHTML = COMPANY_CONFIG.services.map((s, idx) => `
      <div class="service-card">
        <div class="service-icon">${serviceIcons[idx] || serviceIcons[0]}</div>
        <h3 class="service-title">${s.title}</h3>
        <p class="service-desc">${s.desc}</p>
      </div>
    `).join('');
  }

  // Render Packages (Apple "Explore the lineup" Tasarımında)
  const packagesContainer = document.getElementById('packages-container');
  if (packagesContainer) {
    packagesContainer.innerHTML = COMPANY_CONFIG.packages.map((pkg) => {
      return `
        <div class="lineup-card">
          <!-- 1. Apple-Style Tinted Visual Box -->
          <div class="lineup-visual-box" style="background: ${pkg.bgTint};">
            <img src="${pkg.image}" alt="${pkg.name}" class="lineup-visual-img" loading="lazy">
            <span class="lineup-region-tag">${pkg.region}</span>
          </div>

          <!-- 2. Apple Dot Swatches Tarzı Oda Seçenekleri -->
          <div class="lineup-room-swatches">
            <span class="room-chip quad" title="4 Kişilik Oda">4'lü: <strong>${pkg.roomPricing.quad}</strong></span>
            <span class="room-chip triple" title="3 Kişilik Oda">3'lü: <strong>${pkg.roomPricing.triple}</strong></span>
            <span class="room-chip double" title="2 Kişilik Oda">2'li: <strong>${pkg.roomPricing.double}</strong></span>
          </div>

          <!-- 3. Apple Orange Badge -->
          <span class="lineup-badge">${pkg.badge}</span>

          <!-- 4. Model / Program Title -->
          <h3 class="lineup-name">${pkg.name}</h3>

          <!-- 5. 1-Sentence Caption -->
          <p class="lineup-caption">${pkg.caption}</p>

          <!-- 6. Apple Price Row -->
          <div class="lineup-price-row">
            <span class="price-start">${pkg.startingPrice}'dan</span>
            <span class="price-sub">başlayan fiyatlarla veya taksitle</span>
          </div>

          <!-- 7. Apple Action Buttons (Pill Button + Text Link) -->
          <div class="lineup-cta-row">
            <a href="https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(`Selamünaleyküm Gül Mekke Turizm, broşürünüzdeki *${pkg.name} (${pkg.region})* programının ${pkg.roomPricing.quad} başlayan fiyatları ve taksit seçenekleri hakkında bilgi almak istiyorum.`)}" target="_blank" rel="noopener noreferrer" class="btn-apple-pill btn-wa-green" data-magnetic>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.25 7.42C9.09 7.42 8.84 7.48 8.62 7.72C8.4 7.96 7.78 8.54 7.78 9.73C7.78 10.92 8.65 12.07 8.77 12.23C8.89 12.39 10.45 14.94 12.92 15.93C14.77 16.67 15.24 16.55 15.74 16.48C16.44 16.38 17.38 15.82 17.62 15.15C17.86 14.48 17.86 13.9 17.79 13.78C17.72 13.66 17.54 13.59 17.27 13.45C17 13.31 15.68 12.66 15.43 12.57C15.18 12.48 15.01 12.44 14.83 12.71C14.65 12.98 14.13 13.59 13.98 13.76C13.82 13.93 13.67 13.95 13.4 13.81C13.13 13.68 12.27 13.4 11.24 12.48C10.44 11.76 9.9 10.88 9.74 10.61C9.59 10.34 9.72 10.19 9.86 10.05C9.98 9.93 10.13 9.73 10.27 9.57C10.41 9.41 10.46 9.29 10.55 9.11C10.64 8.93 10.59 8.78 10.53 8.65C10.46 8.53 9.94 7.24 9.72 6.72C9.51 6.22 9.29 6.28 9.14 6.28L8.64 6.27C8.42 6.27 8.06 6.35 7.78 6.65"/>
              </svg>
              <span>WhatsApp İle Al</span>
            </a>
            <a href="#tasarla" class="lineup-text-link">
              <span>Teklif İste</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
}

/**
 * Accordion interactive toggle for spiritual guide
 */
function setupGuideAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Sticky header glassmorphism on scroll
 */
function setupHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * GSAP ScrollTrigger Entrance Animations
 */
function setupRevealAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  revealElements.forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Sinematik Hero Açılış Animasyonu (Ekometal Tarzı GSAP Timeline)
 */
function initHeroEntranceTimeline() {
  // Her şey ilk karede %100 görünür (LCP ve anlık okunurluk için opacity: 0 kullanılmaz)
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-cinematic-bg',
    { scale: 1.04 },
    { scale: 1.0, duration: 1.4, ease: 'power2.out' },
    0
  );

  tl.fromTo(['.hero-line-calligraphy', '.hero-line-gold', '.hero-subtext'],
    { y: 14 },
    { y: 0, duration: 0.65, stagger: 0.08, clearProps: 'transform' },
    0
  );
}

/**
 * 12. Apple-Grade Mobile Drawer Navigation
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const closeBtn = document.getElementById('mobile-nav-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop?.classList.add('active');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop?.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/**
 * 13. Google Analytics & Google Tag Manager Dönüşüm Takibi
 */
function initAnalyticsTracking() {
  const trackEvent = (eventName, params = {}) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  };

  // Tüm WhatsApp tıklamalarını takip et
  document.addEventListener('click', (e) => {
    const waLink = e.target.closest('a[href*="whatsapp.com"], a[href*="wa.me"]');
    if (waLink) {
      const locationId = waLink.id || waLink.closest('section')?.id || 'footer_or_bar';
      trackEvent('whatsapp_click', {
        event_category: 'conversion',
        event_label: locationId
      });
    }

    // Tüm Telefon Arama (tel:) tıklamalarını takip et
    const telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) {
      trackEvent('phone_call_click', {
        event_category: 'conversion',
        event_label: telLink.getAttribute('href')
      });
    }
  });

  // Teklif Formu (Trip Builder) gönderimlerini takip et
  const tripForm = document.getElementById('trip-builder-form');
  if (tripForm) {
    tripForm.addEventListener('submit', () => {
      const selectedPkg = tripForm.querySelector('input[name="package"]:checked')?.value || 'Genel';
      trackEvent('generate_lead', {
        event_category: 'conversion',
        event_label: selectedPkg
      });
    });
  }
}
