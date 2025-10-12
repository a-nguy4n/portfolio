import { SECTION_REGISTRY, RESULT_KEY } from "/assets/global/constants.js";
import { pageType, getSectionName } from "/assets/utils/state-utils.js";
import { updateSearchBarText, resultQueryDisplay, 
        endPageSuggestion, injectContent } from "/assets/utils/render-utils.js";


const sectionCacheMap = new Map();     // memory map of section_name 

export async function loadSectionContent(sectionName){
  
  if(sectionCacheMap.has(sectionName)){
    return sectionCacheMap.get(sectionName);
  }

  // getting the appropriate configuration from registry
  const section = SECTION_REGISTRY[sectionName];
  if(!section){
    throw new Error(`No section entry for ${sectionName}`);
  }

  // Reading and loading file based on the section's type 
  let result;
  if(section.type === 'formatted'){
    result = await readFormatted(section);
  }
  else if(section.type === 'custom'){
    result = await readCustom(section);
  }
  else{
    throw new Error(`Cannot load based on section type`);
  }

  // caching & return
  sectionCacheMap.set(sectionName, result);
  return result;
};


/**
 * Function: readFormatted
 * Purpose: helper to loadSection
 *          - reads the module of section that is type 'formatted'
 *          - module contains an array that is read from section's js file
 * @param {*} section 
 *          - from SECTION_REGISTRY 
 * @returns section type and the array 'dataset'
 */
async function readFormatted(section){
  const module = await import(section.module);
  let dataset;

  if(section.exportKey && (section.exportKey in module)) {
    dataset = module[section.exportKey];
  }
  else{
    console.warn(`Cannot find the exported module. Export key is ${section.exportKey}`);
    dataset = [];
  }

  return{ type: 'formatted', dataset }
}


/**
 * Function: readCustom
 * Purpose: helper to loadSection 
 *          - reads the files of section that is type 'custom' 
 * @param {*} section
 *          - from SECTION_REGISTRY
 * @returns section type and its html partial
 */
async function readCustom(section){
  if(!section.html){
    throw new Error('Missing "html" path for section with type: custom');
  }

  // getting the html 
  const result = await fetch(section.html, { cache: 'no-cache' });
  if (!result.ok){
    throw new Error(`Failed to fetch ${section.html}: ${res.status}`);
  }

  const html = await result.text();

  // attaching the CSS file 
  addSectionCSS(section);

  return{ type: 'custom', html};
};


function addSectionCSS(section){
  if(section.css && !document.querySelector(`link[rel="stylesheet"][href="${section.css}"]`)){
    const css_link = document.createElement('link');
    css_link.rel = 'stylesheet';
    css_link.href = section.css;
    css_link.setAttribute('data-section-css', 'true');
    document.head.appendChild(css_link);
  }
}

function removeSectionCSS(){
  document.querySelectorAll('link[data-section-css]').forEach(link => {
    link.remove();
  });
}

/**
 * Function sectionContentHandler()
 * Purpose: handles displaying the current section content
 *          based on the "clicked" or "selected" data-section attribute
 * @returns {void}
 */
export function sectionContentHandler(root = document) {

  async function render(sectionName){
    const loaded = await loadSectionContent(sectionName);
    const curr_pageType = pageType();
    const registryEntry = SECTION_REGISTRY[sectionName];
    let payload = null;

    removeSectionCSS();
    if(loaded.type === "custom"){
      payload = loaded.html;
      addSectionCSS(registryEntry);
    }
    else if(loaded.type === "formatted"){
      payload = loaded.dataset;
    }

    updateSearchBarText(curr_pageType);
    resultQueryDisplay(loaded.type, loaded);
    injectContent(loaded.type, payload);
    endPageSuggestion(sectionName, loaded.type);
    
  }

  // initial render from saved section (landing -> home)
  const initial = getSectionName();
  if(initial && SECTION_REGISTRY[initial]) {
    render(initial).catch(err => console.error(err));
  }

  // allow swapping content on home page
  root.addEventListener("click", (e) => {
    const el = e.target.closest("[data-section]");
    if (!el || !root.contains(el)) return;
    e.preventDefault();

    const sectionName = el.getAttribute("data-section")?.trim();
    if (!sectionName || !SECTION_REGISTRY[sectionName]) return;

    const labelNode = el.classList.contains("result-string") ? el : el.querySelector(".result-string");
    const label = (labelNode?.textContent || el.textContent || sectionName).trim();
    localStorage.setItem(RESULT_KEY, label);

    render(sectionName, label).catch(err => console.error(err));
  });
}




