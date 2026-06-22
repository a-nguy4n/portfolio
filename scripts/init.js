import { applyStoredTheme, applyThemeForCurrentTime } from "/scripts/utils/time-theme.js";
import { loadMultipleComponents } from "/scripts/utils/component-loader.js";
import { renderSVGAssets } from "/scripts/utils/svg-loader.js";
import { blurEffectOnScroll } from "/scripts/utils/scroll-blur-effect.js";
import { initSplashRedirect } from "/pages/splash/splash.js";
import { initContactChat } from "/pages/contact-me/contact-me.js";

document.addEventListener("DOMContentLoaded", async () => {
    const hasSavedTheme = applyStoredTheme();
    if(!hasSavedTheme){
        applyThemeForCurrentTime();
    }

    const isSplashPage = document.body.dataset.page === "splash-page";
    if(isSplashPage){
        initSplashRedirect();
    }

    const isContactPage = document.body.dataset.page === "contact-me";
    if (isContactPage) {
        initContactChat();
    }

    await loadMultipleComponents();
    await renderSVGAssets();
    await blurEffectOnScroll();

});

