
const params = new URLSearchParams(window.location.search);
const targetProgress = Number(params.get("progress")) || 60;
const progressText = document.querySelector(".ascii-progress-text");

let current = 0;

function getTotalBlocks() {
    if (window.innerWidth <= 500) {
        return 15;
    }

    return 40;
}

function updateBar() {
    const totalBlocks = getTotalBlocks();

    const filled = Math.round((current / 100) * totalBlocks);
    const empty = totalBlocks - filled;

    progressText.textContent =
        `[${"█".repeat(filled)}${"░".repeat(empty)}] ${current}%`;

    if (current < targetProgress) {
        current++;
        setTimeout(updateBar, 25);
    }
}

updateBar();