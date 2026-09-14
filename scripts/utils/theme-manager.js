export const THEMES = ["dawn", "day", "sunset", "night"];

const MANUAL_THEME_STORAGE_KEY = "portfolio-manual-theme";
const THEME_BOUNDARIES = [
    { hour: 5, theme: "dawn" },
    { hour: 8, theme: "day" },
    { hour: 17, theme: "sunset" },
    { hour: 20, theme: "night" },
];

let automaticThemeTimeout;

export function isValidTheme(theme) {
    return THEMES.includes(theme);
}

export function getThemeForCurrentTime(date = new Date()) {
    const minutes = date.getHours() * 60 + date.getMinutes();

    if (minutes >= 5 * 60 && minutes < 8 * 60) return "dawn";
    if (minutes >= 8 * 60 && minutes < 17 * 60) return "day";
    if (minutes >= 17 * 60 && minutes < 20 * 60) return "sunset";

    return "night";
}

export function applyTheme(theme) {
    if (!isValidTheme(theme)) return false;

    document.documentElement.dataset.theme = theme;
    return true;
}

export function getStoredManualTheme() {
    try {
        const storedTheme = sessionStorage.getItem(MANUAL_THEME_STORAGE_KEY);
        return isValidTheme(storedTheme) ? storedTheme : null;
    } 
    catch {
        return null;
    }
}

export function hasManualOverride() {
    return getStoredManualTheme() !== null;
}

export function setManualTheme(theme) {
    if (!isValidTheme(theme)) return false;

    window.clearTimeout(automaticThemeTimeout);

    try {
        sessionStorage.setItem(MANUAL_THEME_STORAGE_KEY, theme);
    } 
    catch {
        return false;
    }

    return applyTheme(theme);
}

export function clearManualTheme() {
    try {
        sessionStorage.removeItem(MANUAL_THEME_STORAGE_KEY);
    } 
    catch {
    }

    applyTheme(getThemeForCurrentTime());
    scheduleNextThemeBoundary();
}

function getNextThemeBoundary(date = new Date()) {
    const nextBoundary = new Date(date);
    const currentMinutes = date.getHours() * 60 + date.getMinutes();

    const boundary = THEME_BOUNDARIES.find(({ hour }) => hour * 60 > currentMinutes);

    if (boundary) {
        nextBoundary.setHours(boundary.hour, 0, 0, 0);
    } 
    else {
        const firstBoundary = THEME_BOUNDARIES[0];
        nextBoundary.setDate(nextBoundary.getDate() + 1);
        nextBoundary.setHours(firstBoundary.hour, 0, 0, 0);
    }

    return nextBoundary;
}

export function scheduleNextThemeBoundary() {
    window.clearTimeout(automaticThemeTimeout);

    if (hasManualOverride()) return;

    const delay = getNextThemeBoundary().getTime() - Date.now();

    automaticThemeTimeout = window.setTimeout(() => {
        if (hasManualOverride()) return;

        applyTheme(getThemeForCurrentTime());
        scheduleNextThemeBoundary();
    }, Math.max(delay, 0));
}

export function initializeTheme() {
    const storedTheme = getStoredManualTheme();

    if(storedTheme) {
        applyTheme(storedTheme);
        return;
    }

    applyTheme(getThemeForCurrentTime());
    scheduleNextThemeBoundary();
}
