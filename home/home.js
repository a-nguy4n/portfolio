import { routeToMainTab } from "/assets/js/navigation-utils.js";

// Top Control Bar fetch 
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

// Tile Styling per Role or Profile + Tile Nav
const tileMap = {
  browser:{
    about: '/about-me/icons/about-overview.png',
    resume: '/assets/images/browser/browser-resume.png',
    projects: '/assets/images/browser/browser-projects.png',
    contact: '/assets/images/browser/browser-contact.png',
    extras: '/assets/images/browser/browser-extras.png',
    style_class: '.browserTile-style'
  },

  recruiter:{
    about: '/assets/images/recruiter/recruit-about.png',
    resume: '/assets/images/recruiter/recruit-resume.png',
    projects: '/assets/images/recruiter/recruit-projects.png',
    contact: '/assets/images/recruiter/recruit-contact.png',
    extras: '/assets/images/recruiter/recruit-extras.png',
    style_class: '.recruiterTile-style'
  },

  developer:{
    about: '/assets/images/developer/develop-about.png',
    resume: '/assets/images/developer/develop-resume.png',
    projects: '/assets/images/developer/develop-projects.png',
    contact: '/assets/images/developer/develop-contact.png',
    extras: '/assets/images/developer/develop-extras.png',
    style_class: '.developerTile-style'
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const shortcutTiles = document.querySelectorAll('.shortcut-tile');
    const currentProfile = localStorage.getItem('selectedRole');
    const shortcutOptions = document.querySelector('.shortcut-options');

    if (!currentProfile || !tileMap[currentProfile]) return;

    shortcutOptions.classList.remove('browserTile-style', 'recruiterTile-style', 'developerTile-style');
    shortcutOptions.classList.add(tileMap[currentProfile]['style_class'].slice(1)); 

    shortcutTiles.forEach(tile => {
      const tileImage = tile.querySelector('img');
      const navTarget = tile.getAttribute('data-target');
      
      if(tileImage && tileMap[currentProfile][navTarget]){
        tileImage.src = tileMap[currentProfile][navTarget];
      }

      tile.addEventListener('click', (e) => {
        if(navTarget){
            routeToMainTab(navTarget);
        }
      });
    });
});

