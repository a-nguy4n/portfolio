const COMPONENTS = [
    {
        name: "search-bar",
        javascript: "/assets/components/searchbar/searchbar.js",
        css: "/assets/components/searchbar/searchbar.css",
    },

    {
      name: "logo-button",
      javascript: "/assets/components/logo/logo.js",
      css: "/assets/components/logo/logo.css",
    },

    {
      name: "primary-navbar",
      javascript: "/assets/components/navbar/navbar.js",
      css: "/assets/components/navbar/navbar.css",
    },

    {
      name: "theme-toggle",
      javascript: "/assets/components/theme-toggle/theme-toggle.js",
      css: "/assets/components/theme-toggle/theme-toggle.css",
    }
];

const loadStyle = new Set();

function hasComponentTag(name){
    return document.querySelector(name) !== null;
}

/**
 * -- NOT IN USE -- 
 * @name injectStyle
 * @description 
 * Dynamically injects a CSS file into the document head if it hasn't been loaded yet.
 * @param {*} href 
 */
function injectStyle(href){
    if(!href){
        return "Style Not Found";
    }

    if(loadStyle.has(href) || document.querySelector(`link[href="${href}"]`)){
        return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    document.head.appendChild(link);
    loadStyle.add(href);
}

/**
 * @name loadOneComponent
 * @description
 * Dynamically loads a single component's JavaScript file.
 * @param {*} def - The component definition object containing the JavaScript file path.
 */
async function loadOneComponent(def){
    await import(def.javascript);
}

/**
 * @name loadMultipleComponents
 * @description
 * Dynamically loads multiple components based on the COMPONENTS array.
 * It checks if the component's tag is present in the document and loads its JavaScript.
 * @returns {Promise<void>}
 */
export async function loadMultipleComponents(){
    for(let i = 0; i < COMPONENTS.length; i++){
        if (hasComponentTag(COMPONENTS[i].name)){
            await loadOneComponent(COMPONENTS[i]);
        }
    }
}
