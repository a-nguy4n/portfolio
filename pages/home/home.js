import { setManualTheme } from "/scripts/utils/theme-manager.js";

const heroVisual = document.querySelector(".hero-card__visual-placeholder");
const heroSun = document.querySelector("#hero-sun");

const themeSunProgress = {
    dawn: 0.15,
    day: 0.40,
    sunset: 0.75,
    night: 0.65,
};

let isDraggingSun = false;
let preserveDraggedSunPosition = false;

function getThemeForSunProgress(progress) {
    if (progress < 0.25) return "dawn";
    if (progress < 0.6) return "day";
    if (progress < 0.75) return "sunset";
    return "night";
}

function setSunPosition(progress) {
    const sunX = 5 + progress * 90;
    const arc = Math.sin(progress * Math.PI);
    const sunY = 72 - arc * 58;

    heroSun.style.left = `${sunX}%`;
    heroSun.style.top = `${sunY}%`;
}

function moveSun(event) {
    if (!isDraggingSun) return;

    const rect = heroVisual.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    let progress = mouseX / rect.width;
    progress = Math.max(0, Math.min(1, progress));

    setSunPosition(progress);

    const nextTheme = getThemeForSunProgress(progress);
    if (nextTheme !== document.documentElement.dataset.theme) {
        const themeChanged = setManualTheme(nextTheme);
        preserveDraggedSunPosition = themeChanged;
    }
}

heroSun.addEventListener("pointerdown", (event) => {
    isDraggingSun = true;
    heroSun.setPointerCapture(event.pointerId);
    event.preventDefault();
});

heroSun.addEventListener("pointermove", moveSun);

function stopDraggingSun(event) {
    if (!isDraggingSun) return;

    isDraggingSun = false;
    if (heroSun.hasPointerCapture(event.pointerId)) {
        heroSun.releasePointerCapture(event.pointerId);
    }
}

heroSun.addEventListener("pointerup", stopDraggingSun);
heroSun.addEventListener("pointercancel", stopDraggingSun);

const themeObserver = new MutationObserver(() => {
    if (preserveDraggedSunPosition) {
        preserveDraggedSunPosition = false;
        return;
    }

    const theme = document.documentElement.dataset.theme || "day";
    setSunPosition(themeSunProgress[theme] ?? themeSunProgress.day);
});

themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
});

const currentTheme = document.documentElement.dataset.theme || "day"; setSunPosition(themeSunProgress[currentTheme] ?? themeSunProgress.day);
