/**
 * 4K SANCTUARY CONTROLLER (MEKKE & MEDİNE)
 * - Saf, ultra net 4K görseller aktif.
 * - Mekke (Kâbe) ve Medine (Mescid-i Nebevi) arası yumuşak sinematik geçiş kontrolü.
 * - 7 saniyede bir otomatik manevi slayt geçişi ve canlı ilerleme çubuğu.
 */

export function initTawafVideo() {
  setupSanctuarySwitcher();
}

function setupSanctuarySwitcher() {
  const btnKaaba = document.getElementById('btn-sanctuary-kaaba');
  const btnMedina = document.getElementById('btn-sanctuary-medina');
  const layerKaaba = document.getElementById('layer-kaaba');
  const layerMedina = document.getElementById('layer-medina');

  if (!btnKaaba || !btnMedina || !layerKaaba || !layerMedina) return;

  const SLIDE_DURATION = 7000; // 7 saniyede bir geçiş
  let current = 'kaaba';
  let timer = null;

  function setSanctuary(target, isUserClick = false) {
    current = target;

    // Animasyon durumunu sıfırla
    btnKaaba.classList.remove('active', 'animating');
    btnMedina.classList.remove('active', 'animating');

    // CSS animasyonunun baştan başlaması için reflow tetikle
    void btnKaaba.offsetWidth;
    void btnMedina.offsetWidth;

    if (target === 'kaaba') {
      btnKaaba.classList.add('active', 'animating');
      layerKaaba.classList.add('active');
      layerMedina.classList.remove('active');
    } else {
      btnMedina.classList.add('active', 'animating');
      layerMedina.classList.add('active');
      layerKaaba.classList.remove('active');
    }

    resetTimer();
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      const next = current === 'kaaba' ? 'medina' : 'kaaba';
      setSanctuary(next, false);
    }, SLIDE_DURATION);
  }

  btnKaaba.addEventListener('click', () => setSanctuary('kaaba', true));
  btnMedina.addEventListener('click', () => setSanctuary('medina', true));

  // İlk açılışta Kâbe ile başla ve otomatik döngüyü kur
  setSanctuary('kaaba', false);
}
