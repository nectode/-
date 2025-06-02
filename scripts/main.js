const mainBtn = document.querySelector('.scroll-up-btn-2');

// Функция для работы с модальным окном на мобильных устройствах
function handleMobileModal() {
  console.log('handleMobileModal вызвана');
  
  const modal = document.getElementById('mobileModal');
  const closeBtn = document.querySelector('.close-modal');
  
  // Проверяем, существуют ли необходимые элементы
  if (!modal || !closeBtn) {
    console.error('Не найдены необходимые элементы для модального окна');
    return;
  }
  
  console.log('Элементы модального окна найдены');
  
  function showModal() {
    console.log('Ширина экрана:', window.innerWidth);
    if (window.innerWidth <= 768) {
      console.log('Показываем модальное окно');
      modal.style.display = 'block';
    }
  }

  // Всегда показываем окно на мобильных устройствах
  if (window.innerWidth <= 768) {
    showModal();
  }

  // Закрытие модального окна при клике на крестик
  closeBtn.addEventListener('click', () => {
    console.log('Закрываем модальное окно');
    modal.style.display = 'none';
    localStorage.setItem('modalShown', 'true');
  });

  // Закрытие модального окна при клике вне его области
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      console.log('Закрываем модальное окно (клик вне области)');
      modal.style.display = 'none';
      localStorage.setItem('modalShown', 'true');
    }
  });

  // Проверяем размер экрана при изменении размера окна
  window.addEventListener('resize', () => {
    console.log('Изменение размера окна');
    if (window.innerWidth <= 768 && !localStorage.getItem('modalShown')) {
      showModal();
    }
  });
}

// Вызываем функцию при загрузке DOM
document.addEventListener('DOMContentLoaded', handleMobileModal);

// Вызываем функцию при полной загрузке страницы
window.addEventListener('load', handleMobileModal);

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const sections = document.querySelectorAll('.section');
  let currentSection = 0;
  let isScrolling = false;
  let isMobile = window.innerWidth <= 768;

  function setupGradientTransitions() {
    const gradients = [
      'linear-gradient(32deg, #94128C 5.05%, #4EACE5 95.25%)', 
      'linear-gradient(215deg, #8E23AD 15.14%, #4BA7D8 92.02%)',
      'linear-gradient(66deg, #A336C2 8.24%, #66BBE8 99.93%)',
      'linear-gradient(120deg, #7F1FAD 12.24%, #3F8ECF 95.93%)',
      'linear-gradient(180deg, #8A24B5 5.14%, #52A1DA 90.02%)',
      'linear-gradient(290deg, #9D37B6 10.24%, #5AB2DF 97.93%)'
    ];
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          gsap.to('body', {
            background: gradients[index % gradients.length],
            duration: 1.2,
            ease: 'power2.inOut'
          });
        },
        onEnterBack: () => {
          gsap.to('body', {
            background: gradients[index % gradients.length],
            duration: 1.2,
            ease: 'power2.inOut'
          });
        }
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to('body', {
            background: gradients[(index + 1) % gradients.length],
            duration: 1.5,
            ease: 'power1.inOut'
          });
        },
        onEnterBack: () => {
          gsap.to('body', {
            background: gradients[(index + 2) % gradients.length],
            duration: 1.5,
            ease: 'power1.inOut'
          });
        }
      });
    });
  }

  setupGradientTransitions();

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentSection = index;
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  if (!isMobile) {
    window.addEventListener('wheel', (event) => {
      if (isScrolling) return;

      if (event.deltaY > 0) {
        if (currentSection < sections.length - 1) {
          scrollToSection(currentSection + 1);
        }
      } else if (event.deltaY < 0) {
        if (currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    });
  }

  if (isMobile) {
    const scrollUpBtn = document.querySelector('.scroll-up-btn-2');
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight) {
        scrollUpBtn.classList.remove('hidden');
      } else {
        scrollUpBtn.classList.add('hidden');
      }
    });

    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  document.querySelectorAll(".section").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50, filter: "blur(15px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
          markers: false
        }
      }
    );
  });

  document.querySelectorAll('.scroll-to-top-button, .scroll-to-top').forEach(button => {
    button.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  });

  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
  });
});



