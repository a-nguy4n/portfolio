import { SECTION_KEY } from "/assets/global/constants.js";

/**
 * Function: pageType()
 * Purpose: gets the value from data-type called data-page
 */
export function pageType(){
    const get_pageType = document.body.dataset.page_type;
    return get_pageType;
}


/**
 * Function: setSection(root, attributeName)
 * Purpose: sets the section name in local storage based on data-section attribute
 *          for landing: initially for redirect to home with information display 
 *          for home: displays specific information when a different section is chosen
 * 
 */
export function setSection(root, attributeName){
    var rootListener; 
     if(root && typeof root.addEventListener === "function"){
        rootListener = root;    // for customs                
    }
    else{
        rootListener = document;
    }

    var dataAttribute = "data-section";
    if(typeof attributeName === 'string' && attributeName.length > 0){
        dataAttribute = attributeName;
    }

    function onClick(event){
        var clickedNode = event.target;  // the exact DOM node that was clicked
        var targetElement = null;  

         while(clickedNode && (clickedNode !== rootListener) && clickedNode.nodeType === 1){
            if(clickedNode.hasAttribute && clickedNode.hasAttribute(dataAttribute)){
                targetElement = clickedNode;
                break;

            }
            clickedNode = clickedNode.parentNode; 
        }
        
        if(!targetElement) return;

        // reading attribute value & normalizing it
        var sectionName = targetElement.getAttribute(dataAttribute); 
        if(sectionName && sectionName.trim().length > 0){
            var sectionValue = sectionName.trim();
        }

        localStorage.setItem(SECTION_KEY, sectionValue);

        // redirection if from landing -> home through page type
        if(pageType() === "landing"){
            window.location.href = "assets/pages/home/home.html";
        }
    }

    rootListener.addEventListener("click", onClick, false);
    
    // return function detach(){ 
    //     rootListener.removeEventListener("click", onClick, false); 
    // };
}


/**
 * Function: getSectionName()
 * Purpose: gets the current section value,
 *          to be used for other functions
 */
export function getSectionName(){
    const currentSection = localStorage.getItem(SECTION_KEY);
    return currentSection;
}

