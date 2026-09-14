function setupResumeOverviewToggle() {
    const resumeOverview = document.querySelector(".resume-overview");
    const resumeToggle = document.querySelector("#resumeOverviewToggle");
    const toggleText = document.querySelector(".resume-overview__toggle-text");

    resumeToggle.addEventListener("click", function () {
        resumeOverview.classList.toggle("is-expanded");

        const isExpanded = resumeOverview.classList.contains("is-expanded");

        resumeToggle.setAttribute("aria-expanded", isExpanded);

        if (isExpanded === true) {
            toggleText.textContent = "Show Less";
        } else {
            toggleText.textContent = "Show More";
        }
    });
}

setupResumeOverviewToggle();