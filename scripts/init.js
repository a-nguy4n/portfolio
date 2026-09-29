import { loadMultipleComponents } from "/scripts/utils/component-loader.js";
import { blurEffectOnScroll, displayLocalTime } from "/scripts/utils/ui-effects.js";
import { watchThemeContent } from "/scripts/utils/theme-content.js";
import { initializeTheme } from "/scripts/utils/theme-manager.js";
import { initFidelityToggle } from "/assets/components/fidelity-toggle/fidelity-toggle.js";

initializeTheme();

async function init() {
    await loadMultipleComponents();

    watchThemeContent();
    initFidelityToggle();

    blurEffectOnScroll();
    displayLocalTime();
}

init();