const COMPONENTS = [
    {
      name: "search-bar",
      javascript: "/assets/components/searchbar/searchbar.js",
      css: "/assets/components/searchbar/searchbar.css",
    },

    {
      name: "sidebar-component",
      javascript: "/assets/components/sidebar/sidebar-component.js",
      css: "/assets/components/sidebar/sidebar.css",
    },

    {
      name: "logo-button",
      javascript: "/assets/components/logo/logo.js",
      css: "/assets/components/logo/logo.css",
    },

    {
      name: "navbar-component",
      javascript: "/assets/components/navbar/navbar.js",
      css: "/assets/components/navbar/navbar.css",
    },

    {
      name: "theme-toggle",
      javascript: "/assets/components/theme-toggle/theme-toggle-component.js",
      css: "/assets/components/theme-toggle/theme-toggle.css",
    }
];

const loadStyle = new Set();

function injectStyle(href){
    if(!href){
        return "Style Not Found";
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    document.head.appendChild(link);
    loadStyle.add(href);
}

async function loadOneComponent(def){
  injectStyle(def.css);
  await import(def.javascript);
}

export async function loadMultipleComponents(){
  for(let i = 0; i < COMPONENTS.length; i++) {
    await loadOneComponent(COMPONENTS[i]);
  }
}
