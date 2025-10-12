
// Custom Tag Name: search-bar
// turning the search bar html into a custom HTML tag 
class SearchBar extends HTMLElement{
    connectedCallback(){
      
        // building searchbar shell 
        const shell = document.createElement('div');
        shell.className = "searchbar-body dropdown";
        shell.innerHTML = `
            <div class="searchbar-text">
                <img src="/assets/images/general/search-fig.png" alt="Search Icon">
                <input class="search-input" id="search-input" type="text" 
                placeholder="Hello, My name is Allison Nguyen! I am a computer engineer & aspiring product designer!">
            </div>

            <div class="search-dropdown dropdown-menu"> 
                <a class="search-option" data-section="about">
                    <span class="suggestion-text result-string"> about me: wondering who made this? </span>
                    <span class="indicator-arrow"> → </span>
                </a>
                <a class="search-option"  data-section="resume">
                    <span class="suggestion-text result-string"> check out the resume </span>
                    <span class="indicator-arrow"> → </span>
                </a>
                <a class="search-option" data-section="projects">
                    <span class="suggestion-text result-string"> project gallery </span>
                    <span class="indicator-arrow"> → </span>
                </a>
                <a class="search-option" data-section="contact">
                    <span class="suggestion-text result-string"> interested? let's connect 🤝 </span>
                    <span class="indicator-arrow"> → </span>
                </a>
                <a class="search-option" data-section="extras">
                    <span class="suggestion-text result-string"> discover what didn’t fit anywhere else </span>
                    <span class="indicator-arrow"> → </span>
                </a>
            </div>
        `;

        this.innerHTML = '';
        this.appendChild(shell);
    }
}

customElements.define('search-bar', SearchBar);
