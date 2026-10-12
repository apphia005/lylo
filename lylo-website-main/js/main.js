// LYLO — homepage interactivity

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    const navItems = Array.from(navLinks.querySelectorAll('a'));
    const setActiveNav = (activeItem, currentType = 'page') => {
      navItems.forEach((item) => {
        const isActive = item === activeItem;
        item.classList.toggle('active', isActive);
        item.classList.remove('active-nav');
        if (isActive) item.setAttribute('aria-current', currentType);
        else item.removeAttribute('aria-current');
      });
    };

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'index.html') {
      const collectionLink = navItems.find((item) => {
        const target = new URL(item.href, window.location.href);
        return target.hash === '#collection' && target.pathname === window.location.pathname;
      });
      const collectionSection = document.querySelector('#collection');

      if (window.location.hash === '#collection') setActiveNav(collectionLink, 'location');
      else setActiveNav(null);

      if (collectionLink && collectionSection && 'IntersectionObserver' in window) {
        const collectionObserver = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) setActiveNav(collectionLink, 'location');
          else if (collectionLink.classList.contains('active')) setActiveNav(null);
        }, { rootMargin: '-30% 0px -30% 0px' });
        collectionObserver.observe(collectionSection);
      }
    } else {
      const currentPageItem = navItems.find((item) => {
        const target = new URL(item.href, window.location.href);
        return target.pathname === window.location.pathname && !target.hash;
      });
      setActiveNav(currentPageItem || null);
    }

    navLinks.addEventListener('click', (event) => {
      const clickedItem = event.target.closest('a');
      if (clickedItem && navLinks.contains(clickedItem)) {
        setActiveNav(clickedItem, clickedItem.hash ? 'location' : 'page');
      }
    });
  }

  /* ---------- "Explore Flavour" buttons ----------
     These are plain links to the standalone flavour pages
     (flavour-sea-salt.html etc.) — no JS needed, the href does the work. */

  /* ---------- Trade form validation ----------
     Dev note from spec: active state -> border shifts to Ember Charge.
     Required: Name, Surname, Work Email, Company Name. */
  const tradeForm = document.querySelector('.trade-form');
  if (tradeForm) {
    const requiredFields = tradeForm.querySelectorAll('[required]');

    requiredFields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.field').classList.contains('invalid')) {
          validateField(field);
        }
      });
    });

    tradeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      requiredFields.forEach((field) => {
        if (!validateField(field)) allValid = false;
      });
      if (allValid) {
        tradeForm.hidden = true;
        const success = document.querySelector('.trade-success');
        if (success) success.hidden = false;
      } else {
        const firstInvalid = tradeForm.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  function validateField(field) {
    const wrapper = field.closest('.field');
    const value = field.value.trim();
    let valid = value.length > 0;
    if (valid && field.type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    wrapper.classList.toggle('invalid', !valid);
    return valid;
  }

  /* ---------- Newsletter form (footer) ---------- */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const btn = newsletterForm.querySelector('button');
      if (input && input.checkValidity()) {
        btn.textContent = 'Subscribed';
        input.value = '';
        setTimeout(() => { btn.textContent = 'Subscribe'; }, 3000);
      } else if (input) {
        input.reportValidity();
      }
    });
  }
});
const flavourGrid = document.querySelector(".flavour-grid");
const flavourCards = document.querySelectorAll(".flavour-card");

if (flavourGrid && flavourCards.length) {
  function updateActiveFlavour() {
    const gridRect = flavourGrid.getBoundingClientRect();
    const gridCenter = gridRect.left + gridRect.width / 2;

    let closestCard = flavourCards[0];
    let closestDistance = Infinity;

    flavourCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(gridCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    flavourCards.forEach((card) => {
      card.classList.toggle("is-active", card === closestCard);
    });
  }

  flavourGrid.addEventListener("scroll", updateActiveFlavour, {
    passive: true,
  });

  window.addEventListener("resize", updateActiveFlavour);

  updateActiveFlavour();
}
