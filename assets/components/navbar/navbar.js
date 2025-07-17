import { routeToMainTab } from "/assets/js/navigation-utils.js"; 

export function navbarFunc(){
  const toggleMainSection = document.querySelector('.main-toggle');
  const mainMenu = document.querySelector('.main-menu');
  const mainTabs = document.querySelectorAll('.main-menu .main-tab');

  toggleMainSection.addEventListener('click', () =>{
    mainMenu.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!document.querySelector('.main-nav').contains(e.target)){
      mainMenu.classList.remove('show');
    }
  });

  mainTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabLabel = tab.getAttribute('data-target');
      if(tabLabel){
        routeToMainTab(tabLabel);
      }
      mainMenu.classList.remove('show');
    });
  });
  
  // Navigation Main Tab Selection Logic
  let tabToSelect = null;

  if(sessionStorage.getItem('navOverride')){
    tabToSelect = sessionStorage.getItem('navOverride');
  } 
  else if(localStorage.getItem('selectedMainTab')){
    tabToSelect = localStorage.getItem('selectedMainTab');
  }

  if(tabToSelect){
      routeToMainTab(tabToSelect); 
  }
  console.log("Navbar function initialized");
};


