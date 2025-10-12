import { pageType, setSection, getSectionName } from "/assets/utils/state-utils.js";
import { dropdown_Behavior } from "/assets/utils/dropdown.js";
import { sectionContentHandler } from "/assets/utils/section.js";


window.addEventListener("DOMContentLoaded", function(){

  // First set and get core data attributes: page type & section selected
  
  pageType();
  setSection();
  getSectionName();

  dropdown_Behavior();

  // initial render for the section sent from landing
  sectionContentHandler();

}, false);


