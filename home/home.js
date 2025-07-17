import { routeToMainTab } from "/assets/js/navigation-utils.js";

// Top Control Bar
fetch('/assets/components/topcontrol-bar/topBar.html')
  .then(res => res.text())
  .then(html => {
    const targets = document.querySelectorAll('.top-controlBar');
    if(targets.length > 0){
      targets.forEach(target => {
        target.innerHTML = html;
      });

      import('/assets/components/topcontrol-bar/topBar.js')
      .then(module => {
        if(module.topBarCreate){
            module.topBarCreate(); 
            document.dispatchEvent(new CustomEvent('topbar:loaded')); 
        }
      })
      .catch(err => console.error("[TopBar] JS load error:", err));
    }
});

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


