import Swiper from 'swiper';
import { Navigation, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export function initJourneySlider() {
  const container = document.querySelector('.apple-highlights-swiper');
  if (!container) return;

  const milestoneTabs = document.querySelectorAll('.apple-tab');
  const pillDots = document.querySelectorAll('.pill-dot-item');
  const playToggleBtn = document.getElementById('journey-play-toggle');
  const iconPause = playToggleBtn?.querySelector('.icon-pause');
  const iconPlay = playToggleBtn?.querySelector('.icon-play');
  const prevBtn = document.querySelector('.apple-carousel-nav-btn.prev-btn');
  const nextBtn = document.querySelector('.apple-carousel-nav-btn.next-btn');

  let isPlaying = true;
  const AUTOPLAY_DELAY = 6000;

  const swiper = new Swiper(container, {
    modules: [Navigation, Autoplay, Keyboard],
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 24,
    speed: 750,
    loop: false,
    grabCursor: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    autoplay: {
      delay: AUTOPLAY_DELAY,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    on: {
      init: (s) => {
        updateUI(s.activeIndex);
      },
      slideChange: (s) => {
        updateUI(s.activeIndex);
      },
      autoplayTimeLeft: (s, time, progress) => {
        if (!isPlaying) return;
        const activeDot = pillDots[s.activeIndex];
        if (activeDot) {
          const fill = activeDot.querySelector('.pill-progress-fill');
          if (fill) {
            const pct = Math.min(100, Math.max(0, (1 - progress) * 100));
            fill.style.width = `${pct}%`;
          }
        }
      }
    }
  });

  function updateUI(activeIndex) {
    pillDots.forEach((dot, idx) => {
      const fill = dot.querySelector('.pill-progress-fill');
      if (idx === activeIndex) {
        dot.classList.add('active');
        if (fill) fill.style.width = '0%';
      } else {
        dot.classList.remove('active');
        if (fill) {
          fill.style.width = idx < activeIndex ? '100%' : '0%';
        }
      }
    });

    milestoneTabs.forEach((tab, idx) => {
      if (idx === activeIndex) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  // Milestone tabs click
  milestoneTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const slideIndex = parseInt(tab.getAttribute('data-slide-to'), 10);
      if (!isNaN(slideIndex)) {
        swiper.slideTo(slideIndex);
      }
    });
  });

  // Pill dots click
  pillDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(slideIndex)) {
        swiper.slideTo(slideIndex);
      }
    });
  });

  // Play / Pause toggle
  if (playToggleBtn) {
    playToggleBtn.addEventListener('click', () => {
      if (isPlaying) {
        swiper.autoplay.stop();
        isPlaying = false;
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'block';
      } else {
        swiper.autoplay.start();
        isPlaying = true;
        if (iconPause) iconPause.style.display = 'block';
        if (iconPlay) iconPlay.style.display = 'none';
      }
    });
  }
}
