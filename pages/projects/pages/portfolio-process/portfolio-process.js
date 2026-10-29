
function initInspirationCarousel() {
    const carousel = document.querySelector(".inspiration-collage");
    if (!carousel || carousel.dataset.initialized) return;

    const items = [...carousel.querySelectorAll(".inspiration-item")];
    const prev = carousel.querySelector(".inspiration-prev");
    const next = carousel.querySelector(".inspiration-next");

    if (items.length !== 4 || !prev || !next) return;

    carousel.dataset.initialized = "true";

    let activeIndex = 0;
    let pointerStart = null;
    let suppressClick = false;

    const positions = ["front", "right", "back", "left"];
    const swipeThreshold = 45;

    // Update the position of each collage
    function updateCarousel() {
        items.forEach((item, index) => {
            const relative =
                (index - activeIndex + items.length) % items.length;

            item.dataset.position = positions[relative];

            const img = item.querySelector("img");
            if (img) {
                img.setAttribute("aria-pressed", String(relative === 0));
            }
        });
    }

    // Navigate to a specific collage
    function goTo(index) {
        activeIndex = (index + items.length) % items.length;
        updateCarousel();
    }

    // Click individual collages
    items.forEach((item, index) => {
        const img = item.querySelector("img");
        const title = item.querySelector("h3")?.textContent.trim();

        if (!img) return;

        img.draggable = false;
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", `View ${title || "collage"}`);

        img.addEventListener("click", () => {
            if (suppressClick) return;
            goTo(index);
        });

        img.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goTo(index);
            }
        });
    });

    // Arrow navigation
    prev.addEventListener("click", () => goTo(activeIndex - 1));
    next.addEventListener("click", () => goTo(activeIndex + 1));

    // ---------------------------------
    // Trackpad horizontal swipe
    // ---------------------------------

    let trackpadDelta = 0;
    let trackpadTimer = null;
    let trackpadLocked = false;

    carousel.addEventListener("wheel", event => {
        // Allow vertical page scrolling
        if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

        // Avoid intercepting browser zoom gestures
        if (event.ctrlKey) return;

        event.preventDefault();

        // Prevent repeated rotations during one gesture
        if (trackpadLocked) return;

        // Normalize wheel units to pixels
        const multiplier =
            event.deltaMode === 1 ? 16 :
                event.deltaMode === 2 ? carousel.clientWidth : 1;

        trackpadDelta += event.deltaX * multiplier;

        if (Math.abs(trackpadDelta) >= swipeThreshold) {
            goTo(activeIndex + (trackpadDelta > 0 ? 1 : -1));

            trackpadDelta = 0;
            trackpadLocked = true;

            clearTimeout(trackpadTimer);
            trackpadTimer = setTimeout(() => {
                trackpadLocked = false;
            }, 500);
        }
    }, { passive: false });

    // ---------------------------------
    // Touchscreen swipe + mouse drag
    // ---------------------------------

    carousel.addEventListener("pointerdown", event => {
        if (event.target.closest("button, figcaption")) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;

        pointerStart = {
            x: event.clientX,
            y: event.clientY,
            id: event.pointerId
        };

        carousel.classList.add("is-dragging");

        // Keep tracking mouse movement outside the carousel
        if (event.pointerType === "mouse") {
            carousel.setPointerCapture(event.pointerId);
        }
    });

    carousel.addEventListener("pointerup", event => {
        if (!pointerStart || event.pointerId !== pointerStart.id) return;

        const deltaX = event.clientX - pointerStart.x;
        const deltaY = event.clientY - pointerStart.y;

        pointerStart = null;
        carousel.classList.remove("is-dragging");

        // Rotate only on a deliberate horizontal gesture
        if (
            Math.abs(deltaX) > swipeThreshold &&
            Math.abs(deltaX) > Math.abs(deltaY)
        ) {
            suppressClick = true;

            if (deltaX < 0) {
                goTo(activeIndex + 1); // Swipe left
            } else {
                goTo(activeIndex - 1); // Swipe right
            }

            // Prevent click after dragging
            setTimeout(() => {
                suppressClick = false;
            }, 150);
        }
    });

    // Reset interrupted gestures
    carousel.addEventListener("pointercancel", () => {
        pointerStart = null;
        carousel.classList.remove("is-dragging");
    });

    updateCarousel();
}

initInspirationCarousel();
