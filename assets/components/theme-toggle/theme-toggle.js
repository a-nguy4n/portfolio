import { renderSVGAssets } from "/scripts/utils/svg-loader.js";
import {
  TIME_THEME_CHANGE_EVENT,
  applyThemeForMinutes,
  formatMinutesAsTime,
  hasStoredTheme,
  getMinutesSinceMidnight,
  getThemeForMinutes,
} from "/scripts/utils/time-theme.js";

const ICON_MAP = {
  dawn: "/assets/images/icons/for-components/sunrise-icon.svg",
  day: "/assets/images/icons/for-components/sun-icon.svg",
  sunset: "/assets/images/icons/for-components/sunset-icon.svg",
  night: "/assets/images/icons/for-components/moon-icon.svg",
};

const THEME_ORDER = ["dawn", "day", "sunset", "night"];

const THEME_MINUTES = {
  dawn: 360,
  day: 720,
  sunset: 1080,
  night: 1260,
};

function formatDateLabel(){
  const now = new Date();
  const weekday = now.toLocaleDateString("en-US", { weekday: "short" });
  const month = now.toLocaleDateString("en-US", { month: "short" });
  const day = now.getDate();

  return `${weekday} · ${month} ${day}`;
}

// Keeps any number inside the 0–1439 minute range.
function normalizeMinutes(minutes){
  const total = Number(minutes);
  if(!Number.isFinite(total)) return 0;

  return ((Math.round(total) % 1440) + 1440) % 1440;
}

// Opens/closes the popup safely.
function setupTimeChipPopover(timeChip, timePop){
  if(!timeChip || !timePop) return;

  timePop.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    closePopover(timeChip, timePop);
  });
}

function togglePopover(timeChip, timePop){
  const isOpen = timePop.classList.toggle("is-open");

  timeChip.setAttribute("aria-expanded", String(isOpen));
  timePop.setAttribute("aria-hidden", String(!isOpen));
}

function openPopover(timeChip, timePop){
  timePop.classList.add("is-open");
  timeChip.setAttribute("aria-expanded", "true");
  timePop.setAttribute("aria-hidden", "false");
}

function closePopover(timeChip, timePop){
  timePop.classList.remove("is-open");
  timeChip.setAttribute("aria-expanded", "false");
  timePop.setAttribute("aria-hidden", "true");
}

// Gets the theme currently applied to the page.
function getCurrentTheme(){
  return document.documentElement.dataset.theme || getThemeForMinutes(getMinutesSinceMidnight());
}

// Gets the next theme in your manual toggle cycle.
function getNextThemeMinutes(){
  const currentTheme = getCurrentTheme();
  const currentIndex = THEME_ORDER.indexOf(currentTheme);
  const safeIndex = currentIndex === -1 ? 1 : currentIndex;
  const nextTheme = THEME_ORDER[(safeIndex + 1) % THEME_ORDER.length];

  return THEME_MINUTES[nextTheme];
}

function cacheTimeChipElements(root){
  return {
    timeRows: Array.from(root.querySelectorAll(".time-row")),
  };
}

const USER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const ALLISON_TIME_ZONE = "America/Los_Angeles";

// Gets current minutes for a specific timezone.
function getMinutesForTimeZone(timeZone){
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  let hour = 0;
  let minute = 0;

  for(const part of parts){
    if(part.type === "hour") hour = Number(part.value);
    if(part.type === "minute") minute = Number(part.value);
  }

  if(hour === 24) hour = 0;

  return hour * 60 + minute;
}

// Updates the circular slider ring position.
function updateTimeRowRing(sideEl, minutes){
  if(!sideEl) return;

  const progress = sideEl.querySelector(".ring-progress, .progress");
  const knob = sideEl.querySelector(".ring-knob, .knob");

  if(!progress || !knob) return;

  const cx = 60;
  const cy = 60;
  const r = 46;
  const CIRC = 2 * Math.PI * r;
  const safeMinutes = normalizeMinutes(minutes);
  const t = safeMinutes / 1440;
  const angle = t * 2 * Math.PI - Math.PI / 2;

  progress.style.strokeDasharray = String(CIRC);
  progress.style.strokeDashoffset = String(CIRC * (1 - t));

  knob.setAttribute("cx", String(cx + r * Math.cos(angle)));
  knob.setAttribute("cy", String(cy + r * Math.sin(angle)));
}

// Hides Allison's row when user is in the same timezone.
function updateTimePopupTimezoneState(widget){
  const userTimeRow = widget.querySelector("#user-time");
  const anTimeRow = widget.querySelector("#an-time");
  const userLabel = userTimeRow?.querySelector(".time-loc");
  const isSameTimezone = USER_TIME_ZONE === ALLISON_TIME_ZONE;

  if(userLabel){
    userLabel.textContent = isSameTimezone
      ? "Your Time + Allison's Time"
      : "Your Time";
  }

  if(anTimeRow){
    anTimeRow.hidden = isSameTimezone;
  }
}

function getPhraseForTheme(theme){
  const phrases = {
    dawn: "First Light",
    day: "Peak Productivity",
    sunset: "Golden Hour",
    night: "After Hours",
  };

  return phrases[theme] || phrases.day;
}

function getMessageForTheme(theme){
  const messages = {
    dawn: "A fresh start to see my work!",
    day: "Take five and look around!",
    sunset: "Best light for creative work!",
    night: "Late night browsing? See my work!",
  };

  return messages[theme] || messages.day;
}

// Gets the live clock time for either row.
function getSideMinutes(sideId){
  if(sideId === "user-time"){
    return USER_TIME_ZONE ? getMinutesForTimeZone(USER_TIME_ZONE) : getMinutesSinceMidnight();
  }

  if(sideId === "an-time"){
    return getMinutesForTimeZone(ALLISON_TIME_ZONE);
  }

  return getMinutesSinceMidnight();
}

// Forces SVG icon replacement when the theme changes.
function setIconSource(iconEl, theme){
  if(!iconEl) return;

  const iconSrc = ICON_MAP[theme] || ICON_MAP.day;

  iconEl.setAttribute("data-src", iconSrc);
  iconEl.replaceChildren();
}

// Updates one popup time row.
function updateTimeSideDisplay(sideEl, minutes, formatFn){
  if(!sideEl) return;

  let clockEl = null;
  let dateEl = null;
  let phraseEl = null;
  let messageEl = null;
  let iconEl = null;

  if(sideEl.id === "user-time"){
    clockEl = sideEl.querySelector("#time-clock-user");
    dateEl = sideEl.querySelector("#time-date-user");
    phraseEl = sideEl.querySelector("#time-phrase-user");
    messageEl = sideEl.querySelector("#time-message-user");
    iconEl = sideEl.querySelector(".circle-icon");
  }

  if(sideEl.id === "an-time"){
    clockEl = sideEl.querySelector("#time-clock-an");
    dateEl = sideEl.querySelector("#time-date-an");
    phraseEl = sideEl.querySelector("#time-phrase-an");
    iconEl = sideEl.querySelector(".circle-icon");
  }

  const theme = getThemeForMinutes(minutes);

  if(clockEl) clockEl.textContent = formatFn(minutes);
  if(dateEl) dateEl.textContent = formatDateLabel();
  if(phraseEl) phraseEl.textContent = getPhraseForTheme(theme);
  if(messageEl) messageEl.textContent = getMessageForTheme(theme);

  setIconSource(iconEl, theme);
  updateTimeRowRing(sideEl, minutes);
}

// Updates popup rows using live real times.
function updateAllTimeSideDisplays(widget){
  const sides = Array.from(widget.querySelectorAll(".time-row"));

  for(const side of sides){
    const sideMinutes = getSideMinutes(side.id);
    updateTimeSideDisplay(side, sideMinutes, formatMinutesAsTime);
  }
}

function setActiveSide(widget, activeSide){
  const sides = Array.from(widget.querySelectorAll(".time-row"));

  for(const side of sides){
    const isActive = side === activeSide;
    side.classList.toggle("time-active", isActive);
    side.setAttribute("aria-pressed", String(isActive));
  }
}

export const THEME_SLIDER_CONFIG = {
  behavior: {
    autoSync: true,
    autoSyncInterval: 60000,
  },
};

export function initThemeSlider(root, cfg){
  const scope = root ?? document;

  const widget = scope.matches && scope.matches(".theme-toggle-root")
    ? scope
    : scope.querySelector(".theme-toggle-root");

  if(!widget || widget.dataset.initialized === "true") return;

  widget.dataset.initialized = "true";

  const behavior = cfg && cfg.behavior ? cfg.behavior : {};

  const slider = widget.querySelector("#circleSlider, .circle-slider, .time-slider");
  const svg = widget.querySelector("svg.ring, .arc-slider");
  const progress = widget.querySelector(".ring-progress, .progress");
  const knob = widget.querySelector(".ring-knob, .knob");
  const timeLabelEl = widget.querySelector(".time-label");
  const chipElements = cacheTimeChipElements(widget);
  const centerIconEl = widget.querySelector(".circle-icon");
  const toggleIconEl = widget.querySelector(".time-icon");
  const timeChip = widget.querySelector(".time-chip");
  const timePop = widget.querySelector(".time-popup");

  if(!slider || !svg || !progress || !knob){
    console.error("Arc slider: missing required elements.");
    return;
  }

  const cx = 60;
  const cy = 60;
  const r = 46;
  const CIRC = 2 * Math.PI * r;
  const MINUTE_STEP = 1;
  const syncSource = widget;

  let raf = 0;
  let pendingX = 0;
  let pendingY = 0;
  let autoMode = !hasStoredTheme();
  let dragging = false;

  progress.style.strokeDasharray = String(CIRC);

  setupTimeChipPopover(timeChip, timePop);
  updateTimePopupTimezoneState(widget);

  // Updates only the small toggle UI.
  // IMPORTANT: the label always stays as the user's current real time.
  async function setToggleUIFromThemeMinutes(themeMinutes){
    const safeMinutes = normalizeMinutes(themeMinutes);
    const theme = getThemeForMinutes(safeMinutes);
    const t = safeMinutes / 1440;
    const angle = t * 2 * Math.PI - Math.PI / 2;

    knob.setAttribute("cx", String(cx + r * Math.cos(angle)));
    knob.setAttribute("cy", String(cy + r * Math.sin(angle)));
    progress.style.strokeDashoffset = String(CIRC * (1 - t));

    if(timeLabelEl){
      timeLabelEl.textContent = formatMinutesAsTime(getSideMinutes("user-time"));
    }

    setIconSource(centerIconEl, theme);
    setIconSource(toggleIconEl, theme);

    await renderSVGAssets(widget, { skipIfFilled: false });
  }

  // Applies a manual theme and prevents auto-sync from overriding the chosen icon/theme.
  async function applyManualTheme(minutes){
    autoMode = false;

    applyThemeForMinutes(minutes, {
      source: syncSource,
      mode: "manual",
    });

    await setToggleUIFromThemeMinutes(minutes);
    updateAllTimeSideDisplays(widget);
    await renderSVGAssets(widget, { skipIfFilled: false });
  }

  if(timeChip){
    timeChip.addEventListener("click", async (e) => {
      e.stopPropagation();

      const nextMinutes = getNextThemeMinutes();
      await applyManualTheme(nextMinutes);

      if(timePop){
        togglePopover(timeChip, timePop);
      }
    });
  }

  for(const side of chipElements.timeRows){
    side.addEventListener("click", async (e) => {
      e.stopPropagation();

      setActiveSide(widget, side);

      if(timeChip && timePop){
        openPopover(timeChip, timePop);
      }

      const sideMinutes = getSideMinutes(side.id);
      await applyManualTheme(sideMinutes);
    });
  }

  function pointerToT(clientX, clientY){
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    const ctm = svg.getScreenCTM();
    if(!ctm) return 0;

    const loc = pt.matrixTransform(ctm.inverse());
    const dx = loc.x - cx;
    const dy = loc.y - cy;

    let angle = Math.atan2(dy, dx);
    angle += Math.PI / 2;

    if(angle < 0) angle += 2 * Math.PI;

    return angle / (2 * Math.PI);
  }

  function tToMinutes(t){
    let total = t * 1440;
    total = Math.round(total / MINUTE_STEP) * MINUTE_STEP;

    if(total >= 1440) total = 0;
    if(total < 0) total = 0;

    return total;
  }

  async function updateFromDrag(t){
    const minutes = tToMinutes(t);
    await applyManualTheme(minutes);
  }

  function applyPointer(){
    raf = 0;
    updateFromDrag(pointerToT(pendingX, pendingY));
  }

  function onMove(e){
    e.preventDefault();

    if(!dragging) return;

    pendingX = e.clientX;
    pendingY = e.clientY;

    if(!raf){
      raf = requestAnimationFrame(applyPointer);
    }
  }

  function onDown(e){
    e.preventDefault();

    dragging = true;

    if(slider.setPointerCapture){
      slider.setPointerCapture(e.pointerId);
    }

    pendingX = e.clientX;
    pendingY = e.clientY;

    applyPointer();
  }

  function onUp(e){
    dragging = false;

    if(slider.releasePointerCapture){
      slider.releasePointerCapture(e.pointerId);
    }
  }

  // Auto mode updates the page theme based on real current time.
  // Manual mode keeps the selected theme, but still updates displayed real times.
  function syncToCurrentTime(){
    updateTimePopupTimezoneState(widget);
    updateAllTimeSideDisplays(widget);

    const userMinutes = getSideMinutes("user-time");

    if(timeLabelEl){
      timeLabelEl.textContent = formatMinutesAsTime(userMinutes);
    }

    if(!autoMode || hasStoredTheme()){
      renderSVGAssets(widget, { skipIfFilled: false });
      return;
    }

    applyThemeForMinutes(userMinutes, {
      source: syncSource,
      mode: "auto",
    });

    setToggleUIFromThemeMinutes(userMinutes);
  }

  const ENABLE_THEME_SLIDER = false;

  if(ENABLE_THEME_SLIDER){
    slider.addEventListener("pointerdown", onDown);
    slider.addEventListener("pointermove", onMove);
    slider.addEventListener("pointerup", onUp);
    slider.addEventListener("pointercancel", onUp);
    slider.addEventListener("lostpointercapture", onUp);
  }

  document.addEventListener(TIME_THEME_CHANGE_EVENT, function(event){
    const detail = event.detail ?? {};

    if(detail.source === syncSource) return;
    if(typeof detail.minutes !== "number") return;

    if(detail.mode === "manual"){
      autoMode = false;
    }
    else if(detail.mode === "auto" && !autoMode){
      return;
    }

    setToggleUIFromThemeMinutes(detail.minutes);
  });

  const initialTheme = getCurrentTheme();
  const initialMinutes = hasStoredTheme()
    ? THEME_MINUTES[initialTheme] ?? getSideMinutes("user-time")
    : getSideMinutes("user-time");

  if(behavior.autoSync !== false){
    if(autoMode){
      syncToCurrentTime();
    }
    else{
      setToggleUIFromThemeMinutes(initialMinutes);
      updateTimePopupTimezoneState(widget);
      updateAllTimeSideDisplays(widget);
      renderSVGAssets(widget, { skipIfFilled: false });
    }
  }

  if(chipElements.timeRows.length > 0){
    const initialActiveSide =
      chipElements.timeRows.find((side) =>
        side.classList.contains("time-active")
      ) ?? chipElements.timeRows[0];

    setActiveSide(widget, initialActiveSide);
  }

  updateAllTimeSideDisplays(widget);
  renderSVGAssets(widget, { skipIfFilled: false });

  if(behavior.autoSync !== false){
    const interval = typeof behavior.autoSyncInterval === "number"
      ? behavior.autoSyncInterval
      : 60000;

    setInterval(function(){
      syncToCurrentTime();
    }, interval);
  }
}