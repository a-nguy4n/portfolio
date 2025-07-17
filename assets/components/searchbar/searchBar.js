import { routeToMainTab } from "/assets/js/navigation-utils.js";

document.addEventListener("searchbar:loaded", () => {
    const search_bar = document.querySelector(".search-bar");
    const toggle_OptionsBody = document.querySelector(".close-options");
    console.log("searchbar:loaded event received");
  
    if(search_bar && toggle_OptionsBody){
        search_bar.addEventListener("click", (e) => {
        toggle_OptionsBody.style.display = 'inline';
        e.stopPropagation(); 
      });
  
      document.addEventListener("click", (e) => {
        const clickedInsideSearch = search_bar.contains(e.target);
        const clickedInsideOptions = toggle_OptionsBody.contains(e.target);
  
        if(!clickedInsideSearch && !clickedInsideOptions){
            toggle_OptionsBody.style.display = 'none';
        }
      });
    }

    const search_options = document.querySelectorAll(".search-option");
    if(search_options.length > 0){
      search_options.forEach((option) => {
        option.addEventListener("click", (e) => {
          e.preventDefault();
          const tab = option.getAttribute("data-target");
          if(tab){
            routeToMainTab(tab);
          }
        });
      });
    }
});
  