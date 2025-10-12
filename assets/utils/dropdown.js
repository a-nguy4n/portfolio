


// /**
//  * Function: dropdown_Behavior
//  * Purpose: general function for a regular dropdown menu
//  *          for now used for: search bar 
//  */

export function dropdown_Behavior() {
  document.addEventListener("click", function (event){

    const isMenuItem = event.target.closest(
      '.dropdown-menu [role="menuitem"], .dropdown-menu .dropdown-item, .dropdown-menu a, .dropdown-menu button, .dropdown-menu li'
    );

    if(isMenuItem){
      // defer close so router/navigation/callbacks can run
      setTimeout(() => closeDropdown(), 0);
      return;
    }

    // clicking outside any dropdown -> close all
    const dropdown = event.target.closest(".dropdown");
    if(!dropdown) {
      closeDropdown(); 
      return;
    }

    // toggle when clicking the designated toggle element
    const menu = dropdown.querySelector(".dropdown-menu");
    if (!menu) return;

    const clickedToggle = event.target.closest(".dropdown-toggle, .searchbar-text");
    if (!clickedToggle) return;

    const willOpen = !menu.classList.contains("open");
    closeDropdown(); 
    
    if (willOpen){
      menu.classList.add("open");
    }
  }, false);
}


/**
 * Function: closeDropdown
 * Purpose: closes dropdown on the page
 *          to be used when clicking outside of a dropdown
 *          * Helper for dropdown_Behavior()
 */
function closeDropdown(exception){
  document.querySelectorAll(".dropdown-menu.open").forEach(menu => {
    if (menu !== exception) menu.classList.remove("open");
  });
}
