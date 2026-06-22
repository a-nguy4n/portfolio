import { searchPortfolio } from "/scripts/utils/pagefind-init.js";

function renderSearchResults(results, query){
  const main = document.querySelector("main.result-layout");

  if(main === null){
    return;
  }

  const resultCards = results.map((result) => {
    let title = "Untitled Page";

    if(result.meta !== undefined && result.meta !== null){
      if(result.meta.title){
        title = result.meta.title;
      }
      else if(result.meta.image_alt){
        title = result.meta.image_alt;
      }
    }

    const excerpt = result.excerpt || "No preview content available.";

    return `
      <a class="result-row" href="${result.url}">
        <section class="result-description">
          <h2> ${title} </h2>

          <p class="result-caption"> ${excerpt} </p>
        </section>

        <span
          data-svg
          data-src="/assets/images/icons/open-link-icon.svg"
          class="open-link-icon">
        </span>
      </a>
    `;
  }).join("");

  main.innerHTML = `
    <h3 class="results-count">
      ${results.length} Results found for "<i>${query}</i>"
    </h3>

    <section class="search-results-wrapper">
      ${
        results.length ? resultCards
          : `
            <section class="result-row empty-search">
              <section class="result-description">
                <h2> No Results Found </h2>

                <h3> Try a different keyword </h3>

                <p class="result-caption"> No pages matched "${query}". </p>
              </section>
            </section>
          `
      }
    </section>
  `;
}

export class SearchBar extends HTMLElement{
  connectedCallback(){
    const shell = document.createElement("div");
    shell.className = "searchbar-body";

    shell.innerHTML = `
      <button class="search-overlay-trigger" id="search-overlay-trigger" aria-label="Open Search">
          <img src="/assets/images/icons/magnifying-glass.png" alt="Search Icon">
      </button>

      <section class="explore-layer" id="explore-layer" aria-hidden="true">
          <button class="explore-layer-close" id="explore-close" type="button" aria-label="Close search overlay">
              ×
          </button>

          <search class="explore-layer-search" aria-label="Search portfolio">
              <img class="explore-layer-icon" src="/assets/images/icons/magnifying-glass.png" alt="" aria-hidden="true">

              <input
                  class="explore-layer-input regular"
                  type="text"
                  placeholder="Let's find something interesting ..."
                  autocomplete="off"
              >
          </search>

          <svg class="explore-layer-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
              <path d="
                        M0,0
                        C60,40 120,40 180,0
                        C240,40 300,40 360,0
                        C420,40 480,40 540,0
                        C600,40 660,40 720,0
                        C780,40 840,40 900,0
                        C960,40 1020,40 1080,0
                        C1140,40 1200,40 1260,0
                        C1320,40 1380,40 1440,0
                        L1440,0
                        L0,0
                        Z
                      ">
              </path>
          </svg>
      </section>
    `;

    this.replaceChildren(shell);

    this.searchTrigger = this.querySelector(".search-overlay-trigger");
    this.exploreLayer = this.querySelector(".explore-layer");
    this.closeButton = this.querySelector(".explore-layer-close");
    this.searchInput = this.querySelector(".explore-layer-input");

    this.openExploreLayer = () => {
        if(this.exploreLayer === null) {
          return;
        }

        this.exploreLayer.classList.add("is-open");
        this.exploreLayer.setAttribute("aria-hidden", "false");

        setTimeout(() => {
          if(this.searchInput !== null){
            this.searchInput.focus();
          }
        }, 200);
    };

    this.closeExploreLayer = () => {
        if(this.exploreLayer === null){
          return;
        }

        this.exploreLayer.classList.remove("is-open");
        this.exploreLayer.setAttribute("aria-hidden", "true");
    };

    this.onKeyDown = (event) => {
      if(event.key === "Escape"){
        this.closeExploreLayer();
      }
    };

    this.onSearchInputKeyDown = (event) => {
      if(event.key === "Enter"){
        this.closeExploreLayer();
      }
    };

    this.onSearchInput = async (e) => {
      const query = e.target.value.trim();

      if(query.length === 0){
        return;
      }

      const results = await searchPortfolio(query);
      renderSearchResults(results, query);
    };

    if(this.searchTrigger !== null){
      this.searchTrigger.addEventListener("click", this.openExploreLayer);
    }

    if(this.closeButton !== null){
      this.closeButton.addEventListener("click", this.closeExploreLayer);
    }

    document.addEventListener("keydown", this.onKeyDown);

    if(this.searchInput !== null){
      this.searchInput.addEventListener("input", this.onSearchInput);
      this.searchInput.addEventListener("keydown", this.onSearchInputKeyDown);
    }
  }

  disconnectedCallback(){
    if(this.searchTrigger !== null){
      this.searchTrigger.removeEventListener("click", this.openExploreLayer);
    }

    if(this.closeButton !== null){
      this.closeButton.removeEventListener("click", this.closeExploreLayer);
    }

    if(this.searchInput !== null){
      this.searchInput.removeEventListener("input", this.onSearchInput);
      this.searchInput.removeEventListener("keydown", this.onSearchInputKeyDown);
    }

    document.removeEventListener("keydown", this.onKeyDown);
  }
}

customElements.define("search-bar", SearchBar);