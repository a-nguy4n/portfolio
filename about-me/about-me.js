import { renderResults } from "/assets/js/renderResults-utils.js";
import { subTabFilter } from "/assets/js/subtabFilter-utils.js";
import { updateMainTabUI } from "/assets/js/navigation-utils.js";

const aboutMe_data = [
    {
        href: "/about-me/subpages/about-overview/about-overview.html",
        iconType: "image",
        iconValue: "/about-me/icons/about-overview.png",
        iconBgColor: "#E2F7F6",
        iconImgSize: "1.4vw",
        iconImgMargin: '6% 0% 0% 5%',
        title: "About Me Overview",
        path: "/about-me/subpages/about-overview/about-overview.html",
        subtitle: "Who I Am, in Brief",
        description: `Hello! My name is Allison Nguyen. I’m currently a student at the University of 
                      <br> California, San Diego, majoring in . . .`,

        tags: "",
        thumbnailImage: "/about-me/subpages/about-overview/imgs/overview-pageimg.png",
        thumbnailWidth: "10vw",
        thumbnailMargin: "3% 10% 0% 0%",
        subTabs: ['Favorites']
    },

    {
        href: "/path/placeholder",
        iconType: "image",
        iconValue: "/about-me/icons/dermidew-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "80%",
        iconImgMargin: "0% 0% 3% 3%",
        title: "Full-Stack Favorite",
        path: "/placeholder/for/path",
        subtitle: "DermiDew: A Skincare Analyzer",
        description: `Add later`,
        tags: "",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Favorites']
    },

    {
        href: "https://docs.google.com/document/d/1yh90RL95b9yvR4MNq7aH3V5zpYweksyTMWo0Ohz0sUA/edit?usp=sharing",
        iconType: "emoji",
        iconValue: "📓",
        iconBgColor: "#F2F2F2",
        iconImgSize: "",
        iconImgMargin: "10% 0% 0% 5%",
        title: "Design Journal",
        path: "https://docs.google.com/document/d/1yh9...",
        subtitle: "On the Design of Everyday Things",
        description: `A collection of weekly reflections from class discussions and design examples.
                      I explore design through trade-offs, signifiers, feedback, and mapping.`,
        tags: "",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['']
    }
];

// window.addEventListener("DOMContentLoaded", () => {
//     console.log("Calling renderResults with data:", aboutMe_data);
//     renderResults(aboutMe_data, "aboutResults-body", "aboutResults-count");
//     setTimeout(() => {
//         subTabFilter(aboutMe_data, "aboutResults-body", "aboutResults-count");  
//     },50);
// });


document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    const tabToSelect = localStorage.getItem("selectedMainTab");
    if(tabToSelect){
    document.addEventListener("navbar:ready", () => {
      updateMainTabUI(tabToSelect);
      localStorage.removeItem("selectedMainTab");
    });
  }

    console.log("Calling renderResults with data:", aboutMe_data);
    renderResults(aboutMe_data, "aboutResults-body", "aboutResults-count");

    setTimeout(() => {
      subTabFilter(aboutMe_data, "aboutResults-body", "aboutResults-count");
    }, 10);
  });
});
















