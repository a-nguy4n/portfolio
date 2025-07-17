import { navbarFunc } from '/assets/components/navbar/navbar.js';

// Top Control Bar
fetch('/assets/components/topcontrol-bar/topBar.html')
  .then(res => res.text())
  .then(html => {
    const targets = document.querySelectorAll('.top-controlBar');
    if(targets.length > 0){
      targets.forEach(target => {
        target.innerHTML = html;
        document.dispatchEvent(new CustomEvent('topbar:loaded'));
      });
    }
  });

// Header Logo
fetch('/assets/components/header-logo/header-logo.html')
  .then(res => res.text())
  .then(html => {
    const targets = document.querySelectorAll('.header-logoContainer');
    if(targets.length > 0){
      targets.forEach(target => {
        target.innerHTML = html;
      });
    }
  });

// Search Bar
fetch('/assets/components/searchbar/searchBar.html')
  .then(res => res.text())
  .then(html => {
    const targets = document.querySelectorAll('.searchBar-container');
    if(targets.length > 0){
      targets.forEach(target => {
        target.innerHTML = html;
      });
      document.dispatchEvent(new CustomEvent("searchbar:loaded"));
    }
  }); 


// Loading NavBar + dependent components 
const navbarTarget = document.querySelector('.navBar-container');

if(navbarTarget){
  fetch('/assets/components/navbar/navbar.html')
    .then(res => res.text())
    
    .then(html => {
      navbarTarget.innerHTML = html;
      return loadNavbarParts();
    })
    
    .then(() => {
      requestAnimationFrame(() => {
        if(typeof navbarFunc === 'function') {
          navbarFunc();
          document.dispatchEvent(new CustomEvent("navbar:ready"));
        }
      });
    });
}

// Loading navbar parts (topbar, logo, search)
function loadNavbarParts(){
  const fetches = [];

  fetches.push(
    fetch('/assets/components/topcontrol-bar/topBar.html')
      .then(res => res.text())
      .then(html => {
        const targets = document.querySelectorAll('.top-controlBar');
        if(targets.length > 0){
          targets.forEach(target => {
            target.innerHTML = html;
            document.dispatchEvent(new CustomEvent('topbar:loaded'));
          });
        }
      })
  );

  fetches.push(
    fetch('/assets/components/header-logo/header-logo.html')
      .then(res => res.text())
      .then(html => {
        const targets = document.querySelectorAll('.header-logoContainer');
        if(targets.length > 0){
          targets.forEach(target => {
            target.innerHTML = html;
          });
        }
      })
  );

  fetches.push(
    fetch('/assets/components/searchbar/searchBar.html')
      .then(res => res.text())
      .then(html => {
        const targets = document.querySelectorAll('.searchBar-container');
        if(targets.length > 0){
          targets.forEach(target => {
          target.innerHTML = html;
      });
      document.dispatchEvent(new CustomEvent("searchbar:loaded"));
    }
      })
  )
  return Promise.all(fetches); 
}
