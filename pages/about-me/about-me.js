function initInfiniteCarousel() {
  const track = document.getElementById("about-carousel-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (!track || !prevBtn || !nextBtn) return;
  if (track.dataset.initialized === "true") return;
  track.dataset.initialized = "true";

  const baseCards = Array.from(track.querySelectorAll(".carousel-card"));
  if (baseCards.length < 2) return;

  const visibleCards = Math.min(3, baseCards.length);
  const headClones = baseCards.slice(-visibleCards).map((card) => {
    const clone = card.cloneNode(true);
    clone.dataset.clone = "true";
    clone.setAttribute("aria-hidden", "true");
    return clone;
  });

  const tailClones = baseCards.slice(0, visibleCards).map((card) => {
    const clone = card.cloneNode(true);
    clone.dataset.clone = "true";
    clone.setAttribute("aria-hidden", "true");
    return clone;
  });

  headClones.forEach((clone) => track.prepend(clone));
  tailClones.forEach((clone) => track.append(clone));

  let cardStep = 0;
  let cloneWidth = 0;
  let originalsWidth = 0;
  let startLeft = 0;
  let endLeft = 0;
  let isResetting = false;
  let isAnimating = false;
  let scrollEndTimer = null;

  const updateMetrics = () => {
    const firstCard = track.querySelector(".carousel-card");
    if (!firstCard) return;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");

    cardStep = firstCard.getBoundingClientRect().width + gap;
    cloneWidth = cardStep * visibleCards;
    originalsWidth = cardStep * baseCards.length;
    startLeft = cloneWidth;
    endLeft = cloneWidth + originalsWidth;
  };

  const jumpTo = (left) => {
    isResetting = true;
    track.style.scrollBehavior = "auto";
    track.scrollLeft = left;
    requestAnimationFrame(() => {
      track.style.scrollBehavior = "";
      isResetting = false;
    });
  };

  const resetIfOutOfRange = () => {
    if (!cardStep || isResetting) return;

    if (track.scrollLeft < startLeft - cardStep / 2) {
      jumpTo(track.scrollLeft + originalsWidth);
    } else if (track.scrollLeft >= endLeft - cardStep / 2) {
      jumpTo(track.scrollLeft - originalsWidth);
    }
  };

  const normalizeIndex = (index) => {
    if (!baseCards.length) return 0;
    return ((index % baseCards.length) + baseCards.length) % baseCards.length;
  };

  const currentLogicalIndex = () => {
    if (!cardStep) return 0;
    return normalizeIndex(Math.round((track.scrollLeft - startLeft) / cardStep));
  };

  const setStartPosition = (index = 0) => {
    if (!cardStep) return;
    jumpTo(startLeft + normalizeIndex(index) * cardStep);
  };

  updateMetrics();
  setStartPosition(0);

  const onScrollSettled = () => {
    resetIfOutOfRange();
  };

  if ("onscrollend" in window) {
    track.addEventListener("scrollend", onScrollSettled);
  } else {
    track.addEventListener("scroll", () => {
      if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(onScrollSettled, 90);
    });
  }

  window.addEventListener("resize", () => {
    const index = currentLogicalIndex();
    updateMetrics();
    setStartPosition(index);
  });

  const stepByOneCard = (direction) => {
    if (!cardStep || isAnimating) return;

    isAnimating = true;
    track.scrollBy({ left: cardStep * direction, behavior: "smooth" });
    window.setTimeout(() => {
      isAnimating = false;
      resetIfOutOfRange();
    }, 320);
  };

  prevBtn.addEventListener("click", () => {
    stepByOneCard(-1);
  });

  nextBtn.addEventListener("click", () => {
    stepByOneCard(1);
  });
}

function pillActivation() {
  const pills = Array.from(document.querySelectorAll(".about-pills .pill"));
  if (!pills.length) return;

  const setActivePill = (targetId) => {
    pills.forEach((pill) => {
      pill.classList.toggle("is-active", pill.dataset.target === targetId);
    });
  };

  const findTarget = (targetId) => {
    if (!targetId) return null;

    const direct = document.getElementById(targetId);
    if (direct) return direct;

    if (targetId === "hobbies-block") {
      return document.getElementById("bucket-block") || document.querySelector(".interest-items");
    }

    return null;
  };

  pills.forEach((pill) => {
    pill.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = pill.dataset.target;
      const targetElement = findTarget(targetId);

      if (!targetElement) return;

      setActivePill(targetId);

      if (targetElement.tagName === "DETAILS") {
        targetElement.open = true;
      }

      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initHobbiesAnimation(){
  const hobbies = [
    {
      caption: "Listening to music on walks!",
      frames: [
  ` ♪        ♫
    \\(^_^)/ 
     |   |
    / \\ / \\`,

  `   ♫      ♪
    \\(^o^)/ 
     |   |
    / \\ / \\`,

  ` ♪   ♫   ♪
    \\(^_^\\)
     |   |
    / \\ / \\`,

  ` ♫   ♪   ♫
    (/^_^)/ 
     |   |
    / \\ / \\`
        ]},

    { caption: "Taking fun photos of anything",
      frames: [
  `   [📷]
  (^_^)
  /| |\\
   / \\`,

  `   *[📷]*
  (o_o)
  /| |\\
   / \\`,

  `  ✨[📷]✨
  (^o^)
  /| |\\
   / \\`
          ]},

    { caption: "Trying new foods & drinks!",
      frames: [
  `   🍜
  (^_^)
  /| |\\
   / \\`,

  `  🍜
  (^o^)
  /|>|\\
   / \\`,

  `  🍜
  (⌒‿⌒)
  /| |\\
   / \\`
          ]},

      { caption: "Watching a fun romcom or shows",
        frames: [
      `┌───────┐
│  ◉ ◉  │
└───────┘

  (^_^)
 /|   |\\
   / \\`,

`┌───────┐
│ ▒▒▒▒▒ │
└───────┘

  (o_o)
 /|   |\\
   / \\`,

`┌───────┐
│ ◄►◄►◄ │
└───────┘

  (^o^)
 /|   |\\
   / \\`,

`┌───────┐
│ ▒▒▒▒▒ │
└───────┘

  (⌒‿⌒)
 /|   |\\
   / \\`
            
      ]}
    ];

    const frameEl = document.getElementById("hobby-frame");
    const captionEl = document.getElementById("hobby-caption");

    if (!frameEl || !captionEl) return;

    let hobbyIndex = 0;
    let frameIndex = 0;

    const animate = () => {
        const hobby = hobbies[hobbyIndex];

        frameEl.textContent = hobby.frames[frameIndex];
        captionEl.textContent = hobby.caption;

        frameIndex++;

        if (frameIndex >= hobby.frames.length) {
            frameIndex = 0;
            hobbyIndex = (hobbyIndex + 1) % hobbies.length;
        }
    };

    animate(); 
    setInterval(animate, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  pillActivation();
  initInfiniteCarousel();
  initHobbiesAnimation();
});




