const FADE_DURATION_MS = 800;
const HOME_PATH = "/pages/home/home.html";

function redirectToHome(){
  document.body.classList.add("fade-out");

  window.setTimeout(() => {
    window.location.href = HOME_PATH;
  }, FADE_DURATION_MS);
}

export function initSplashRedirect()
{
  const searchText = document.getElementById("typewriter-search");
  if (!searchText) return;

  searchText.addEventListener("animationend", (event) => {
    if (event.animationName !== "typing") return;
    redirectToHome();
  });
}