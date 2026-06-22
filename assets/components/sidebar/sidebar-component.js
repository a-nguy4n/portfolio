class SidebarComponent extends HTMLElement{
  getCurrentPageKey(){
    const datasetPage = document.body?.dataset?.page?.trim();
    if (datasetPage) return datasetPage;

    const pathname = window.location.pathname.replace(/\/+$/, "");
    const pathMap = {
      "/": "home",
      "": "home",
      "/index.html": "home",
      "/pages/about-me/about-me.html": "about-me",
      "/pages/resume/resume.html": "resume",
      "/pages/projects/projects.html": "projects",
      "/pages/contact-me/contact-me.html": "contact-me",
    };

    return pathMap[pathname] || null;
  }

  applyCurrentPageState(){
    const currentPage = this.getCurrentPageKey();
    const links = this.querySelectorAll(".nav-link");

    links.forEach((link) => {
      const isCurrent = currentPage && link.dataset.page === currentPage;

      link.classList.toggle("is-current", Boolean(isCurrent));

      if (isCurrent) {
        link.setAttribute("aria-current", "page");
        link.setAttribute("tabindex", "-1");
      }
      else {
        link.removeAttribute("aria-current");
        link.removeAttribute("tabindex");
      }
    });
  }
  
  connectedCallback(){
    
    if(this._mounted === true){
      return;
    }
    this._mounted = true;

    this.innerHTML = `
      <input class="sidebarToggle" id="sidebarMenuToggle" type="checkbox" aria-hidden="true" />

      <label class="sidebarMenuBtn" id="sidebarMenuBtn" for="sidebarMenuToggle" aria-label="Toggle menu">
        ☰
      </label>

      <label class="sidebarOverlay" id="sidebarOverlay" for="sidebarMenuToggle" aria-hidden="true"></label>

      <aside class="sidebarPanel" aria-label="Sidebar navigation">
        <nav class="sidebarNav">
          <section class="sidebarItem sidebarExpandable" data-page="home">
            <a class="sidebarMainLink nav-link" data-page="home" href="/index.html">
              Home
            </a>

            <span class="sidebarDropdownContent" aria-label="Home Details">
              <p> some sort of home details </p>
              <p> decription 1 </p>
              <p> more description </p>
            </span>
          </section>

  
          <a class="sidebarItem nav-link" data-page="about-me" href="/pages/about-me/about-me.html"> About Me </a>

          <aside class="sidebarItem sidebarExpandable" data-page="resume">
            <a class="sidebarMainLink nav-link" data-page="resume" href="/pages/resume/resume.html">
              Resume
            </a>

            <section class="resumeTerminalContent" aria-label="Resume Preview">
              <p class="terminalLine command">&gt; loading resume...</p>
              <p class="terminalLine">✓ education found</p>
              <p class="terminalLine">✓ skills indexed</p>
              <p class="terminalLine">✓ experience loaded</p>
              <p class="terminalLine finalLine">open Resume.pdf <span class="cursor">_</span></p>
            </section>
          </aside>

          <a class="sidebarItem nav-link" data-page="projects" href="/pages/projects/projects.html"> My Projects </a>

          <aside class="sidebarItem sidebarExpandable" data-page="contact-me">
            <a class="sidebarMainLink nav-link" data-page="contact-me" href="/pages/contact-me/contact-me.html">
              Contact Me
            </a>

            <section class="sidebarDropdownContent" aria-label="Contact Me Details">
              <span class="chatBubble leftBubble"> Allison + you </span>
              <span class="chatBubble rightBubble messageBubble"> Let’s chat! </span>
            </section>
          </aside>

          <a class="sidebarItem nav-link" data-page="discover" href="#"> More to Discover </a>
        </nav>
      </aside>
    `;

    this.applyCurrentPageState();
  }
}

customElements.define("sidebar-component", SidebarComponent);
