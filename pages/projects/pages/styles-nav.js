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

        const activeLink = navigationLinks.find(
            (link) => link.hash === `#${sectionId}`,
        );

        activeLink?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        });
    };

    const header = navigationBar.closest(".project-site-header");
    let activeSectionId;
    let scrollFrame;

    const updateActiveSection = () => {
        const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
        const passedSections = sections.filter(
            (section) => section.getBoundingClientRect().top <= headerBottom + 16,
        );
        const currentSection = passedSections.at(-1) ?? sections[0];

        if (currentSection.id !== activeSectionId) {
            activeSectionId = currentSection.id;
            setActiveLink(activeSectionId);
        }
    };

    const handleScroll = () => {
        if (scrollFrame) {
            return;
        }

        scrollFrame = requestAnimationFrame(() => {
            scrollFrame = undefined;
            updateActiveSection();
        });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => setActiveLink(link.hash.slice(1)));
    });

    const initialSection = window.location.hash.slice(1);
    if (initialSection) {
        activeSectionId = initialSection;
        setActiveLink(initialSection);
    }
});