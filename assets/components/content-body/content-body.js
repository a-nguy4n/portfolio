
// Custom Tag Name: content-body
// turning the content body html into a custom HTML tag 
class ContentBody extends HTMLElement{
    connectedCallback(){
        // building content body shell
        const shell = document.createElement('div');
        shell.className = "content-body";
        shell.innerHTML = `
            <div class="results-container">
                <h1> 
                    <span id="result-count">  </span>
                    Results found for 
                    "<span id="result-query"> Search Query </span> "
                </h1>
            </div>

            <div class="main-content"> </div>

            <div class="end-page">
                <span>--- End of Results ---</span> <br>
                <span>Not sure what to search next?</span> <br>
                <span> Check out my 
                    <a data-section="projects" class="result-string" id="recommendationOne"> Projects </a>
                or reach out to me at 
                    <a data-section="contact" class="result-string" id="recommendationTwo"> Contact Me </a>
                </span>
            </div>
        `;
        this.innerHTML = '';
        this.appendChild(shell);
    }
}

customElements.define('content-body', ContentBody);

