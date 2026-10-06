const navigationBars = document.querySelectorAll(".project-specific-nav");

navigationBars.forEach((navigationBar) => {
    const navigationLinks = [...navigationBar.querySelectorAll("a[href^='#']")];
    const sections = navigationLinks
        .map((link) => document.querySelector(link.hash))
        .filter(Boolean);

    if (!navigationLinks.length || !sections.length) {
        return;
    }

    const setActiveLink = (sectionId) => {
        navigationLinks.forEach((link) => {
            link.classList.toggle("is-active", link.hash === `#${sectionId}`);
        });
    };

    const header = navigationBar.closest(".project-site-header");
    const headerHeight = header?.offsetHeight ?? 0;
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visibleSections[0]) {
                setActiveLink(visibleSections[0].target.id);
            }
        },
        {
            rootMargin: `-${headerHeight}px 0px -55%`,
            threshold: 0,
        },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => setActiveLink(link.hash.slice(1)));
    });

    const initialSection = window.location.hash.slice(1);
    if (initialSection) {
        setActiveLink(initialSection);
    }
});