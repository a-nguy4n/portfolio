
/**
 * @name blurEffectOnScroll
 * @description
 * Applies a blur effect to the site header when the user scrolls down the page.
 */
export function blurEffectOnScroll() {
    const siteHeader = document.querySelector(".site-header");

    if (!siteHeader) return;

    window.addEventListener("scroll", () => {
        siteHeader.classList.toggle("scrolled", window.scrollY > 15);
    });
}

export function displayLocalTime() {
    const timeLabel = document.querySelector(".time-label");

    if (!timeLabel) return;

    const updateTimeLabel = () => {
        const now = new Date();

        timeLabel.dateTime = now.toISOString();
        timeLabel.textContent = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    updateTimeLabel();
    window.setInterval(updateTimeLabel, 60 * 1000);
}


export function musicVolumeBar() {
    const widget = document.querySelector(".music-widget");
    const button = widget.querySelector(".play-button");

    button.addEventListener("click", () => {
        const playing = widget.dataset.musicState === "playing";

        widget.dataset.musicState = playing ? "paused" : "playing";

        button.setAttribute("aria-pressed", !playing);
    });

}
