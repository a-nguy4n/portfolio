import { renderResults } from "/assets/js/renderResults-utils.js";

export function subTabFilter(currPageArray ,resultBodyId, resultCountId){
    const result_body = document.getElementById(resultBodyId);
    const number_results = document.getElementById(resultCountId);

    if (!result_body || !number_results){
        console.warn("Result body or count container not found.");
        return;
    }

    if (!Array.isArray(currPageArray)){
        console.warn("Expected an array of data, but got:", currPageArray);
        return;
    }
    
    const subTabs = document.querySelectorAll('.sub-tab');
    subTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            // tab visual activation
            subTabs.forEach((otherTab) => {
                otherTab.classList.remove("subtab-activated");
            });

            tab.classList.add("subtab-activated");

            // filtering functionality
            const selectedTab = tab.textContent.trim(); 
            const clearContainer = document.getElementById(resultBodyId);
            clearContainer.innerHTML = ""; 
            if(selectedTab === 'All'){
                renderResults(currPageArray, resultBodyId, resultCountId);
            }
            else{
                const filter_data = currPageArray.filter(item => item.subTabs.includes(selectedTab));
                renderResults(filter_data, resultBodyId, resultCountId);
            }
        })
        console.log("Sub-tab listeners attached to:", tab.textContent.trim());
    });

    const activate_AllTab = Array.from(subTabs).find(tab => tab.textContent.trim() === "All");
    if(activate_AllTab){
        activate_AllTab.classList.add("subtab-activated");
    }
}
