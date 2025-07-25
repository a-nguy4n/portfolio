import { navbarFunc } from '/assets/components/navbar/navbar.js';

// need to wait for element to appear before logic runs 
function waitForSelector(selector, callback, maxRetries = 10, delay = 50) {
  const attempt = () => {
    const element = document.querySelector(selector);
    if(element){
      callback(); // running callback when element is founded 
    } 
    else if(maxRetries > 0){
      setTimeout(() => waitForSelector(selector, callback, maxRetries - 1, delay), delay);
    } 
    else{
      console.warn(`Element "${selector}" not found after retries.`);
    }
  };
  attempt();
}

/**
 * @param {string} selector - CSS selector for target container
 * @param {string} htmlPath - Path to the HTML component to inject
 * @param {string|null} jsPath - Optional path to a JS module to import
 * @param {string|null} initFunction - Optional function to call from imported JS module
 * @param {string|null} customEvent - Optional custom event to dispatch after load
 * @param {string|null} cssPath - Optional path to a CSS file to inject
 */
// inserts component into given container 
async function loadComponent(selector, htmlPath, jsPath = null, initFunction = null, 
                             customEvent = null, cssPath = null){

  const res = await fetch(htmlPath);            
  const html = await res.text();                 
  const targets = document.querySelectorAll(selector);  

  if(targets.length > 0){
    targets.forEach(target => target.innerHTML = html);

    // adding css if exists 
    if(cssPath){
      const fullHref = new URL(cssPath, location.origin).href;
      if(!document.querySelector(`link[href="${fullHref}"]`)){
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssPath;
        document.head.appendChild(link);
      }
    }

    // loading module + function call if exists 
    if(jsPath && initFunction){
      const module = await import(jsPath);
      if (module[initFunction]){
        module[initFunction](); 
      }
    }

    if(customEvent){
      document.dispatchEvent(new CustomEvent(customEvent));
    }
  }
}

loadComponent(
  '.header-logoContainer',
  '/assets/components/header-logo/header-logo.html',
  '',
  '',
  '',
  '/assets/components/header-logo/header-logo.css',
);

loadComponent(
  '.searchBar-container',
  '/assets/components/searchbar/searchBar.html',
  '/assets/components/searchbar/searchBar.js',
  'searchBarInit',
  'searchbar:loaded',
  '/assets/components/searchbar/searchBar.css'
);

// for pages that have nav bar 
const navbarTarget = document.querySelector('.navBar-container');
if (navbarTarget){
  fetch('/assets/components/navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
      navbarTarget.innerHTML = html;
      return loadNavbarParts();  
    });

  document.addEventListener('topbar:loaded', () => {
    waitForSelector('.main-toggle', () => {
      requestAnimationFrame(() => {
        navbarFunc();
        document.dispatchEvent(new CustomEvent("navbar:ready"));
      });
    });
  });
}

//helper to load navbar and its dependent components
function loadNavbarParts(){
  return Promise.all([
    loadComponent(
      '.top-controlBar',
      '/assets/components/topcontrol-bar/topBar.html',
      '/assets/components/topcontrol-bar/topBar.js',
      'topBarCreate',
      'topbar:loaded',
      '/assets/components/topcontrol-bar/topBar.css'
    ),

    loadComponent(
      '.header-logoContainer',
      '/assets/components/header-logo/header-logo.html',
      '',
      '',
      '',
      '/assets/components/header-logo/header-logo.css',
    ),

    loadComponent(
      '.searchBar-container',
      '/assets/components/searchbar/searchBar.html',
      '/assets/components/searchbar/searchBar.js',
      'searchBarInit',
      'searchbar:loaded',
      '/assets/components/searchbar/searchBar.css'
    )
  ]);
}
