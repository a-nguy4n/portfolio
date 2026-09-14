
export function footerCatchPhrase(theme = document.documentElement.dataset.theme || "day") {
  const catchPhrase = document.querySelector(".footer-catchphrase");

  if (!catchPhrase) return;

  const phrases = {
    dawn: "Something new on the horizon? Let’s make it happen →",
    day: "Head in the clouds? Let’s make it real →",
    sunset: "Chasing the horizon? Let’s see where it takes us →",
    night: "Reach for the stars! Start here →"
  };

  catchPhrase.textContent = phrases[theme] || phrases.day;
}

export function watchThemeContent() {
  const html = document.documentElement;

  footerCatchPhrase(html.dataset.theme || "day");

  const observer = new MutationObserver(() => {
    footerCatchPhrase(html.dataset.theme || "day");
  });

  observer.observe(html, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return observer;
}