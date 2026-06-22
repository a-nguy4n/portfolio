const params = new URLSearchParams(window.location.search);

const targetProgress = Number(params.get("progress")) || 60;
const totalBlocks = 40;

let current = 0;

const progressText = document.querySelector(".ascii-progress-text");

function updateBar() {
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