import { RESULT_KEY } from "/assets/global/constants.js";


/**
 * Function: updateSearchBarText
 * Purpose: updates placeholder text of searchbar depending on page type
 * @param {*} pageType 
 * @returns {void}
 */
export function updateSearchBarText(pageType){
    const searchInput = document.querySelector('.search-input');
    if(pageType === 'regular'){
        searchInput.placeholder = 'Start with a search and explore my work!';
    }
    return;
}


/**
 * Function: resultQueryDisplay
 * Purpose: displays the clicked search option text in the content body results header
 * @param section_type - type of clicked section from either search bar, shortcuts, or end-page suggestions
 * @param {*} loaded_section - section clicked on and to have info displayed
 *                          - takes in the return objects from the function loadSection in section.js
 *                          - loaded_section.dataset is returned value from function loadSection
 * @return {void} updates the innerText of the span with id 'result-query'
 */
export function resultQueryDisplay(section_type, loaded_section){
    const resultCount = document.getElementById('result-count');
    const querySpan = document.getElementById('result-query');
    
    if(!resultCount && !querySpan){
        return;
    }

    const savedLabel = localStorage.getItem(RESULT_KEY) || 'Search Query';

    // handling number of results 
    if(section_type === 'custom'){
        resultCount.innerText = '1';
    }
    
    if(section_type === 'formatted'){
        if(loaded_section.dataset && Array.isArray(loaded_section.dataset)){
            resultCount.innerText = loaded_section.dataset.length;
        }
    }

    querySpan.innerText = savedLabel;

    return;
}

/**
 * Function: buildSearchCard 
 * Purpose: translates each dataset element into a search card and puts them into an array to be injected
 * @param {*} dataset - from a section's .js file if section is of type "formatted"
 * @returns cardArray - an array of the formatted search cards from the SECTION_DATASET
 */
function buildSearchCard(dataset){

    const cardArray = [];

    dataset.forEach((result, index) => {
        // creating the "a tag" shell
        const searchCardShell = document.createElement('a');
        searchCardShell.className = 'resultContent-layout';
        searchCardShell.href = result.href;
        searchCardShell.target = '_blank';

        // create first child: div for the icon 
        const icon = document.createElement('div');
        icon.className = "result-icon";
        icon.style.backgroundColor = result.iconBgColor || "rgb(207, 207, 207)";

        if(result.iconType === 'emoji'){ 
            icon.textContent = result.iconValue; 
        }
        else if(result.iconType === 'image'){
            const icon_image = document.createElement('img');
            icon_image.src = result.iconValue;
            icon_image.alt = `Icon ${index}`;
            icon.appendChild(icon_image);
        }

        // create third child: section to hold info 
        const result_information = document.createElement('section');
        const title = document.createElement('h2');
        const subtitle = document.createElement('h3');
        const description = document.createElement('p');
        const tags = document.createElement('span');

        result_information.className = "result-info"
        description.className = "result-description";
        tags.className = "result-tags";

        title.textContent = result.title || `Item ${index}`;
        subtitle.textContent = result.subtitle;
        description.textContent = result.description;
        tags.textContent = result.tags; 

        result_information.append(title, subtitle, description, tags);

        // create fourth child: img for thumbnail
        let thumbnail = null;
        if(result.thumbnailImage){ 
            thumbnail = document.createElement('img');
            thumbnail.className = "thumbnail";
            thumbnail.src = result.thumbnailImage; 
            thumbnail.alt = `Thumbnail for ${result.title}`;
            thumbnail.style.width = result.thumbnailWidth;
            thumbnail.style.margin = result.thumbnailMargin;
        }
        
        // create fifth child: span for external symbol 
        const external_symbol = document.createElement('span');
        external_symbol.className = "external-symbol";
        external_symbol.innerHTML = '&#x2197;';

        // building the search card 
        searchCardShell.appendChild(icon);
        searchCardShell.appendChild(result_information);
        if(thumbnail){
            searchCardShell.appendChild(thumbnail);
        }
        searchCardShell.appendChild(external_symbol);

        cardArray.push(searchCardShell);
    });

    return cardArray;
}

/**
 * Function: endPageSuggestion
 * Purpose: At the end of each "section page" there is a end-page suggestion
 *          tag that recommends which pages to search up or explore next 
 * @param {*} section_name 
 * @param {*} section_type 
 */
export function endPageSuggestion(section_name, section_type){
    const recommendationOne = document.querySelector("#recommendationOne");
    const recommendationTwo = document.querySelector("#recommendationTwo");
    
    if(!recommendationOne && !recommendationTwo){
        return;
    }

    if(section_type === 'custom'){
        const endPage_caption = document.querySelector('.end-page');
        endPage_caption.style.margin = "0 8% 0 0";
    }

    if(section_name === 'about' || 'resume' ||  'contact' || 'extras'){
        recommendationOne.dataset.section = "projects";
        recommendationOne.innerText = "Projects";
        recommendationTwo.dataset.section = "resume";
        recommendationTwo.innerText = "Resume";
    }

    if(section_name === 'resume'){
        recommendationTwo.dataset.section = "contact";
        recommendationTwo.innerText = "Contact Me";
    }

    if(section_name === 'projects'){
        recommendationOne.dataset.section = "resume";
        recommendationOne.innerText = "Resume";
        recommendationTwo.dataset.section = "about"
        recommendationTwo.innerText = "About Me";
    }

    if(section_name === 'contact'){
        recommendationTwo.dataset.section = "extras"
        recommendationTwo.innerText = "Extras";
    }

    return;
}

/**
 * Function: clearMainContent
 * Purpose: clears or removes all child nodes inside the class .main-content
 * @returns {void}
 */
function clearMainContent(){
    const main_content = document.querySelector('.main-content');
    if(!main_content) return;

    main_content.textContent = '';
}

/**
 * Function: injectContent
 * Purpose: clears the main_content innherHtml 
 *          then injects content inside the <div> called main-content based on data type
 * @param {*} section_type { 'formatted' | 'custom' }
 * @param {*} payload for dataset for 'formatted', or html string for 'custom'
 * @returns {void}
 */
export function injectContent(section_type, payload){
    clearMainContent();

    const main_content = document.querySelector('.main-content');
    if(!main_content) return;

    if(section_type === "formatted" && Array.isArray(payload)){
        const search_cards = buildSearchCard(payload);
    
        while(main_content.firstChild){
            main_content.removeChild(main_content.firstChild);
        }

        for(let i = 0; i < search_cards.length; i++){
            const card = search_cards[i];
            main_content.appendChild(card);
        }
    }

    if(section_type === "custom" && typeof payload === 'string'){
        main_content.innerHTML = payload; // Inject the HTML snippet
    }
}


