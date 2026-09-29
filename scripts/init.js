import { loadMultipleComponents } from "/scripts/utils/component-loader.js";
import { blurEffectOnScroll, displayLocalTime} from "/scripts/utils/ui-effects.js";
import { watchThemeContent } from "/scripts/utils/theme-content.js";
import { initializeTheme } from "/scripts/utils/theme-manager.js";
import { initFidelityToggle } from "/assets/components/fidelity-toggle/fidelity-toggle.js";

initializeTheme();

document.addEventListener("DOMContentLoaded", async () => {
    await loadMultipleComponents();

    watchThemeContent();
    initFidelityToggle();
    
    await blurEffectOnScroll();
    await displayLocalTime();
});

