const cloud = document.querySelector("#skills .skill-cloud");
const pills = document.querySelectorAll("#skills .skill-pill");

cloud.addEventListener("mousemove", (e) => {
    pills.forEach((pill) => {
        const rect = pill.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = centerX - e.clientX;
        const dy = centerY - e.clientY;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 120;

        if (distance < radius && distance !== 0) {
            const force = (radius - distance) / radius;

            const moveX = (dx / distance) * force * 40;
            const moveY = (dy / distance) * force * 40;

            pill.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            pill.style.transform = "translate(0, 0)";
        }
    });
});

cloud.addEventListener("mouseleave", () => {
    pills.forEach((pill) => {
        pill.style.transform = "translate(0, 0)";
    });
});