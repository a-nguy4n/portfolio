import { preventCurrentPageNavigation } from "/scripts/utils/navigation-utils.js";

const NAV_ITEMS = [
	{ href: "/pages/home/home.html", label: "HOME", className: "home" },
	{ href: "/pages/resume/resume.html", label: "RESUME", className: "resume" },
	{ href: "/pages/projects/projects.html", label: "MY PROJECTS", className: "projects" },
	{ href: "/pages/about-me/about-me.html", label: "ABOUT ME", className: "about" },
	{ href: "/pages/contact-me/contact-me.html", label: "CONTACT ME", className: "contact" },
	{ href: "/pages/progress/progress.html", label: "MORE TO DISCOVER", className: "extras" },
];

function getCurrentPath(){
	try {
		return window.location.pathname;
	} catch (error) {
		return "";
	}
}

function renderNavbar(){
	const currentPath = getCurrentPath();

	return `
		<nav class="pill-nav" aria-label="Quick links">
			<ul class="pill-grid">
				${NAV_ITEMS.map(({ href, label, className }) => {
					const isCurrent = href !== "#" && currentPath === href;
					return `
						<li class="pill-item ${className}">
							<a
								href="${href}"
								class="pill-button"
								${isCurrent ? 'aria-current="page"' : ""}
							>
								${label}
							</a>
						</li>
					`;
				}).join("")}
			</ul>
		</nav>
	`;
}

export class NavbarComponent extends HTMLElement{
	connectedCallback() {
		if (!this.dataset.rendered) {
			this.innerHTML = renderNavbar();
			this.dataset.rendered = "true";

            preventCurrentPageNavigation(this);
		}
	}
}

customElements.define("navbar-component", NavbarComponent);
