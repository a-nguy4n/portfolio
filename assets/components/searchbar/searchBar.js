import { routeToMainTab } from "/assets/js/navigation-utils.js";
import { searchSuggestions } from "/assets/js/search-suggestions.js"

export function searchBarInit(){
  const search_bar = document.querySelector(".search-bar");
  const toggle_OptionsBody = document.querySelector(".close-options");
  console.log("searchbar:loaded event received");

  // changing searchbar's text to match query
  const storedQueryText = sessionStorage.getItem("searchQueryText");
  const searchBar_input = document.querySelector(".search-bar input");
  console.log("saved query is:", storedQueryText);
  if(storedQueryText){
    searchBar_input.value = storedQueryText;
    searchBar_input.classList.add("active-search");
  }

  searchSuggestions();

  // search bar dropdown suggestions on click 
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

  // routing each option to appropriate page based on attribute value 
  // capturing the search option's inner text to be used in renderResults-utils 
  const search_options = document.querySelectorAll(".search-option");
  if(search_options.length > 0){
    search_options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = option.getAttribute("data-target");
        const clicked_optionText = option.querySelector('a span:first-child').innerHTML;
        if(tab){
          routeToMainTab(tab);
          sessionStorage.setItem("searchQueryText", clicked_optionText);
        }
      });
    });
  }
}
    