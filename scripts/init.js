import { loadMultipleComponents } from "/scripts/utils/component-loader.js";
import { blurEffectOnScroll, displayLocalTime } from "/scripts/utils/ui-effects.js";
import { watchThemeContent } from "/scripts/utils/theme-content.js";
import { initializeTheme } from "/scripts/utils/theme-manager.js";
import { initFidelityToggle } from "/assets/components/fidelity-toggle/fidelity-toggle.js";

initializeTheme();

async function revealHeader() {
    const components = [
        "logo-button",
        "primary-navbar",
        "search-bar",
        "theme-toggle"
    ];

    await Promise.all(
        components.map(component =>
            customElements.whenDefined(component)
        )
    );

    const header = document.querySelector(".site-header");

    if (!header) return;

    header.classList.add("is-ready");
}

document.addEventListener("DOMContentLoaded", async () => {
    
    await loadMultipleComponents();

    await displayLocalTime();
    await revealHeader();
    await blurEffectOnScroll();

    watchThemeContent();
    initFidelityToggle();
});
