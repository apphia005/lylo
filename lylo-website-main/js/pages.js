// LYLO — shared interactivity for FAQ / Where to Buy / Contact / Trade Portal pages

document.addEventListener('DOMContentLoaded', () => {


  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* ---------- Generic locator tab switcher (Where to Buy page) ---------- */
  const tabs = document.querySelectorAll('.locator-tabs button');
  const panels = document.querySelectorAll('.stockist-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => { p.hidden = true; });
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.panel);
      if (target) target.hidden = false;
    });
  });

  /* ---------- "Use My Location" stub ---------- */
  document.querySelectorAll('.use-location').forEach((geoBtn) => {
    geoBtn.addEventListener('click', () => {
      const original = geoBtn.textContent;
      if (navigator.geolocation) {
        geoBtn.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(
          () => { geoBtn.textContent = 'Location found'; setTimeout(() => geoBtn.textContent = original, 1500); },
          () => { geoBtn.textContent = 'Location unavailable'; setTimeout(() => geoBtn.textContent = original, 1500); }
        );
      }
    });
  });

  /* ---------- Contact / generic form validation ----------
     Excludes .trade-form — that one already has its own dedicated
     handler in main.js (shared with the homepage's trade section). */
  document.querySelectorAll('form[novalidate]:not(.trade-form)').forEach((form) => {
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.field').classList.contains('invalid')) validateField(field);
      });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      requiredFields.forEach((field) => { if (!validateField(field)) allValid = false; });
      if (allValid) {
        form.hidden = true;
        const success = form.parentElement.querySelector('.form-success');
        if (success) success.hidden = false;
      } else {
        const firstInvalid = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  });

  function validateField(field) {
    const wrapper = field.closest('.field');
    const value = field.value.trim();
    let valid = value.length > 0;
    if (valid && field.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    wrapper.classList.toggle('invalid', !valid);
    return valid;
  }
  /* ---------- Product Feedback & Support accordion ---------- */

document.querySelectorAll('.faq-support-item').forEach((item) => {
  const heading = item.querySelector('h3');

  if (!heading) return;

  heading.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-support-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

  /* ---------- Newsletter form (footer, shared) ---------- */
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
document.querySelectorAll(".wtb-mobile-trigger").forEach((trigger) => {

  trigger.addEventListener("click", () => {

    const currentItem = trigger.closest(".wtb-mobile-item");
    const currentPanel = currentItem.querySelector(".wtb-mobile-panel");

    const wasOpen = currentItem.classList.contains("open");

    document.querySelectorAll(".wtb-mobile-item").forEach((item) => {

      item.classList.remove("open");

      const button = item.querySelector(".wtb-mobile-trigger");
      const panel = item.querySelector(".wtb-mobile-panel");
      const icon = item.querySelector(".wtb-mobile-icon");

      button.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      icon.textContent = "+";
    });

    if (!wasOpen) {
      currentItem.classList.add("open");

      trigger.setAttribute("aria-expanded", "true");
      currentPanel.hidden = false;

      trigger.querySelector(".wtb-mobile-icon").textContent = "×";
    }

  });

});
