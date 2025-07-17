import { routeToMainTab } from "/assets/js/navigation-utils.js";

// Nav Main Tabs for Tiles 
document.addEventListener('DOMContentLoaded', () => {
    const shortcutTiles = document.querySelectorAll('.shortcut-tile');
  
    shortcutTiles.forEach(tile => {
      tile.addEventListener('click', (e) => {
        const navTarget = tile.getAttribute('data-target');
        if(navTarget){
            routeToMainTab(navTarget);
        }
      });
    });
});
  