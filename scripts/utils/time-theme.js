export const TIME_THEME_CHANGE_EVENT = "portfolio:time-theme-change";
const PORTFOLIO_THEME_STORAGE_KEY = "portfolio-theme";

export function getStoredVisualTheme(){
    try{
        const savedTheme = localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY);
        return savedTheme || null;
    }
    catch{
        return null;
    }
}

export function hasStoredTheme(){
    return Boolean(getStoredVisualTheme());
}

export function applyStoredTheme(){
    const savedTheme = getStoredVisualTheme();
    if(!savedTheme) return false;

    document.documentElement.dataset.theme = savedTheme;
    return true;
}

function normalizeMinutes(minutesSinceMidnight = 0){
    const total = Number(minutesSinceMidnight);
    if(!Number.isFinite(total)) return 0;

    return ((Math.round(total) % 1440) + 1440) % 1440;
}

export function getMinutesSinceMidnight(date = new Date()){
    return date.getHours() * 60 + date.getMinutes();
}

export function minutesToDate(minutesSinceMidnight){
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setMinutes(normalizeMinutes(minutesSinceMidnight));
    return date;
}

export function formatMinutesAsTime(minutesSinceMidnight){
    const totalMinutes = normalizeMinutes(minutesSinceMidnight);
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const meridiem = hours24 >= 12 ? "PM" : "AM";

    let hours12 = hours24 % 12;
    if(hours12 === 0) hours12 = 12;

    return `${hours12}:${String(minutes).padStart(2, "0")} ${meridiem}`;
}

export function getStoredThemeMinutes(){
    const raw = document.documentElement.getAttribute("data-theme-minutes");
    if(raw == null) return null;

    const minutes = Number(raw);
    return Number.isFinite(minutes) ? normalizeMinutes(minutes) : null;
}

export function getStoredThemeMode(){
    return document.documentElement.getAttribute("data-theme-mode") || null;
}

export function getThemeForMinutes(minutesSinceMidnight){
    const totalMinutes = normalizeMinutes(minutesSinceMidnight);
    const between = (start, end) =>
        totalMinutes >= start && totalMinutes <= end;

    if(between(330, 450)){
        return "dawn";
    }

    if(between(451, 1020)){
        return "day";
    }

    if(between(1021, 1140)){
        return "sunset";
    }

    return "night";
}

/**
 * Purpose: Get the current color theme based on the time of day.
 * @param {Date} date - The date object to get the theme for.
 * @returns {string} - The name of the theme.
 */
export function getThemeForCurrentTime(date = new Date()){
    return getThemeForMinutes(getMinutesSinceMidnight(date));
}

export function applyThemeForMinutes(minutesSinceMidnight, options = {}){
    const minutes = normalizeMinutes(minutesSinceMidnight);
    const theme = getThemeForMinutes(minutes);
    const mode = options.mode === "manual" ? "manual" : "auto";

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-theme-minutes", String(minutes));
    document.documentElement.setAttribute("data-theme-mode", mode);

    if(mode === "manual"){
        try{
            localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, theme);
        }
        catch{
        }
    }

    if(options.emit !== false){
        document.dispatchEvent(new CustomEvent(TIME_THEME_CHANGE_EVENT, {
            detail: {
                theme,
                minutes,
                mode,
                source: options.source ?? null,
            }
        }));
    }

    return { theme, minutes, mode };
}

export function applyThemeForCurrentTime(options = {}){
    return applyThemeForMinutes(getMinutesSinceMidnight(new Date()), {
        ...options, mode: options.mode ?? "auto",
    });
}


