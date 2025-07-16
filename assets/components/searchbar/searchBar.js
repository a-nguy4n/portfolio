
document.addEventListener("searchbar:loaded", () => {
    console.log("searchbar:loaded event received");
    const search_bar = document.querySelector(".search-bar");
    const toggle_OptionsBody = document.querySelector(".close-options");
  
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
});
  