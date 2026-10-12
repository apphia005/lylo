// LYLO — flavour page interactivity

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Stockist locator tab switcher ----------
     Dev note from spec: Active tab = solid bg + connected underline.
     Inactive tab = 50% opacity. Tapping swaps table view instantly. */
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

  /* ---------- Postcode / "Use my location" stub ----------
     No live geolocation backend yet — this just prevents a dead form
     and gives feedback so the button isn't a no-op. */
  const locatorSearch = document.querySelector('.locator-search');
  if (locatorSearch) {
    const btn = locatorSearch.querySelector('button[type="submit"]');
    const geoBtn = locatorSearch.querySelector('.use-location');
    const input = locatorSearch.querySelector('input');

    locatorSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input && input.value.trim()) {
        btn.textContent = 'Searching…';
        setTimeout(() => { btn.textContent = 'See My Location'; }, 1200);
      }
    });

    if (geoBtn && navigator.geolocation) {
      geoBtn.addEventListener('click', () => {
        geoBtn.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(
          () => { geoBtn.textContent = 'Location found'; setTimeout(() => geoBtn.textContent = 'Use My Location', 1500); },
          () => { geoBtn.textContent = 'Location unavailable'; setTimeout(() => geoBtn.textContent = 'Use My Location', 1500); }
        );
      });
    }
  }
});
const thumbs = document.querySelectorAll('.gallery-thumb');
const mainImage = document.querySelector('#main-product-image');

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {

    thumbs.forEach((item) => {
      item.classList.remove('active');
    });

    thumb.classList.add('active');

    const image = thumb.dataset.image;

    if (image === 'packshot') {
      mainImage.textContent = 'Hero product shot — Sea Salt';
    }

    if (image === 'lifestyle') {
      mainImage.textContent = 'Lifestyle image — Sea Salt';
    }

    if (image === 'texture') {
      mainImage.textContent = 'Texture image — Sea Salt';
    }

  });
});
