document.addEventListener("DOMContentLoaded", () => {
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  if (!mobileQuery.matches) return;

  const flavourInfo = document.querySelector(".flavour-info");

  if (!flavourInfo) return;

  const blocks = [...flavourInfo.querySelectorAll(".fi-block")];

  const findBlock = (text) => {
    return blocks.find((block) => {
      const eyebrow = block.querySelector(".fi-eyebrow");

      return (
        eyebrow &&
        eyebrow.textContent.trim().toLowerCase().includes(text.toLowerCase())
      );
    });
  };

  const flavourBlock = findBlock("the flavour");
  const pairBlock = findBlock("pair it with");
  const nutritionBlock = findBlock("nutrition");
  const dietaryBlock = findBlock("dietary profile");

  const whyBlock = blocks.find((block) => {
    const eyebrow = block.querySelector(".fi-eyebrow");

    return (
      eyebrow &&
      eyebrow.textContent.trim().toLowerCase().startsWith("why")
    );
  });

  const findButton = document.querySelector(".fi-cta .find-btn");

if (findButton) {
  findButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    window.location.href = "where-to-buy.html";
  });
}

  /* =========================================================
     MERGE "PAIR IT WITH" INTO "TASTING NOTES"
     ========================================================= */

  if (flavourBlock && pairBlock) {
    const pairList = pairBlock.querySelector(".pair-list");

    if (pairList && !flavourBlock.querySelector(".mobile-pair-list")) {
      const clonedPairList = pairList.cloneNode(true);

      clonedPairList.classList.add("mobile-pair-list");

      flavourBlock.appendChild(clonedPairList);
    }

    pairBlock.classList.add("mobile-hide-block");
  }

  /* =========================================================
     CREATE THE FOUR MOBILE ACCORDIONS
     ========================================================= */

  const mobileSections = [
    {
      block: flavourBlock,
      title: "Tasting Notes and Pairings",
    },
    {
      block: nutritionBlock,
      title: "Nutritional Information",
    },
    {
      block: dietaryBlock,
      title: "Dietary Profile & Certifications",
    },
    {
      block: whyBlock,
      title: "Why This Flavour?",
    },
  ];

  mobileSections.forEach(({ block, title }) => {
    if (!block) return;

    block.classList.add("mobile-accordion-block");

    if (!block.querySelector(".mobile-accordion-title")) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "mobile-accordion-title";
      button.setAttribute("aria-expanded", "false");

      button.innerHTML = `
        <span>${title}</span>
        <span class="mobile-accordion-icon">+</span>
      `;

      block.prepend(button);

      button.addEventListener("click", () => {
        const isOpen = block.classList.contains("open");

        /* close all other mobile accordions */
        document
          .querySelectorAll(".mobile-accordion-block.open")
          .forEach((openBlock) => {
            openBlock.classList.remove("open");

            const openButton = openBlock.querySelector(
              ".mobile-accordion-title"
            );

            const openIcon = openBlock.querySelector(
              ".mobile-accordion-icon"
            );

            if (openButton) {
              openButton.setAttribute("aria-expanded", "false");
            }

            if (openIcon) {
              openIcon.textContent = "+";
            }
          });

        /* open clicked accordion */
        if (!isOpen) {
          block.classList.add("open");

          button.setAttribute("aria-expanded", "true");

          const icon = button.querySelector(
            ".mobile-accordion-icon"
          );

          if (icon) {
            icon.textContent = "×";
          }
        }
      });
    }
  });
});