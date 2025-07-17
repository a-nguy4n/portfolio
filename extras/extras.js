import { renderResults } from "/assets/js/renderResults-utils.js";
import { subTabFilter } from "/assets/js/subtabFilter-utils.js";
import { updateMainTabUI, waitForUIElements } from "/assets/js/navigation-utils.js";

const extrasPage_data = [
    {
        href: "",
        iconType: "image",
        iconValue: "/about-me/icons/dermidew-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "DermiDew",
        path: "/placeholder/Pathway",
        subtitle: "Smart Skincare Face Analyzer",
        description: `DermiDew combines hardware and software to deliver personalized skincare insights. 
                    A smart mirror with an ESP32 camera captures facial images, which the app analyzes to 
                    assess skin condition and recommend products. Users can also track routines, 
                    product goals, and progress.`,
        tags: "🏷️ Teamwork  ·  IoT ·  Full-Stack  · API Integration",
        thumbnailImage: "/projects/thumbnails/dermidew-thumbnail.png",
        thumbnailWidth: "14vw",
        thumbnailMargin: "6% 9% 0% 0%",
        subTabs: ['']
    }
];

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
  const tabToSelect = localStorage.getItem("selectedMainTab");
  if(tabToSelect){
    document.addEventListener("navbar:ready", () => {
      updateMainTabUI(tabToSelect);
      localStorage.removeItem("selectedMainTab");
    });
  }

    console.log("Calling renderResults with data:", extrasPage_data);
    renderResults(extrasPage_data, "extraResults-body", "extraResults-count");

    setTimeout(() => {
        subTabFilter(extrasPage_data, "extraResults-body", "extraResults-count");
    }, 10);
  });
});

