import { COMPANY_CONFIG } from '../data/companyConfig.js';
import { getLenis } from './lenis-scroll.js';

export function initTripBuilder() {
  const form = document.getElementById('bespoke-builder-form');
  const chipOptions = document.querySelectorAll('.chip-option');
  const openButtons = [
    document.getElementById('open-trip-builder-btn'),
    document.getElementById('hero-custom-trip-btn'),
  ];

  // Chip options toggle
  chipOptions.forEach((chip) => {
    chip.addEventListener('click', () => {
      chipOptions.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Scroll to builder section smoothly
  openButtons.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('tasarla');
      const lenis = getLenis();
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -40, duration: 1.2 });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Handle Form Submission -> WhatsApp (0532 430 82 44)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedPackage = form.querySelector('input[name="builder-package"]:checked')?.value || 'Ramazan-ı Şerif Umresi';
      const roomType = form.querySelector('#room-type-select')?.value || '4 Kişilik Oda';
      const travelers = form.querySelector('#traveler-count')?.value || '2 Kişi';
      
      const selectedAddons = [];
      form.querySelectorAll('input[name="addons"]:checked').forEach((cb) => {
        selectedAddons.push(cb.value);
      });

      const fullname = form.querySelector('#client-name')?.value.trim() || 'Değerli Misafir';
      const phone = form.querySelector('#client-phone')?.value.trim() || '';

      const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Standart Bilgilendirme';

      // WhatsApp format message for Gül Mekke Turizm
      const rawMsg = `Selamünaleyküm Gül Mekke Mükerrem Turizm yetkilisi,
Ben *${fullname}* (${phone}).

Web siteniz üzerinden Hac / Umre bilgi ve taksit talebim:
• *Tercih Edilen Tur:* ${selectedPackage}
• *Oda Konaklama Tipi:* ${roomType}
• *Misafir Sayısı:* ${travelers}
• *Ödeme & Talepler:* ${addonsText}

Güncel kafile hareket tarihleri, oda başı fiyatlandırma ve taksit imkanları hakkında bilgi alabilir miyim? Hayırlı çalışmalar.`;

      const cleanPhone = COMPANY_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');
      const encodedMsg = encodeURIComponent(rawMsg);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMsg}`;

      window.open(whatsappUrl, '_blank');
    });
  }
}
