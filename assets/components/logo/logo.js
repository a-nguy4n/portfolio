import { preventCurrentPageNavigation } from "/scripts/utils/navigation-utils.js";

export class LogoButton extends HTMLElement{
  connectedCallback(){
    const src = this.getAttribute("src") || "/assets/images/pics/logo.svg";
    const href = this.getAttribute("href") || "/pages/home/home.html";
    const label = this.getAttribute("label") || "Logo";

    this.innerHTML = `
      <a class="logo" href="${href}" aria-label="${label}" data-svg data-src="${src}"></a>
    `;

    preventCurrentPageNavigation(this);
  }
}

customElements.define("logo-button", LogoButton);