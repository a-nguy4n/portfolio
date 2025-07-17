import { renderResults } from "/assets/js/renderResults-utils.js";
import { subTabFilter } from "/assets/js/subtabFilter-utils.js";
import { updateMainTabUI } from "/assets/js/navigation-utils.js";

const projects_data = [
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
        subTabs: ['Web Apps']
    },

    {
        href: "",
        iconType: "emoji",
        iconValue: "☔️",
        iconBgColor: "#F0D4FF",
        iconImgSize: "1.5vw",
        iconImgMargin: "",
        title: "Weather Wardrobe",
        path: "/placeholder/Pathway",
        subtitle: "Smart Weather Wardrobe Assistant",
        description: `Weather Wardrobe pairs real-time weather data with personalized outfit recommendations. 
                    The app uses a weather API to generate suggestions based on location, temperature, and 
                    conditions, helping users plan their wardrobe accordingly.`,
        tags: "🏷️ Teamwork  ·  IoT ·  Full-Stack  · Weather API ",
        thumbnailImage: "/projects/thumbnails/weatherWardrobe-thumbnail.png",
        thumbnailWidth: "10vw",
        thumbnailMargin: "3% 0% 0% 3%",
        subTabs: ['Web Apps']
    },

    {
        href: "",
        iconType: "emoji",
        iconValue: "🐾",
        iconBgColor: "#FFB429",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Puppy Pong",
        path: "/placeholder/Pathway",
        subtitle: "Click to Play",
        description: `Puppy Pong is a browser-based game that reimagines the classic Pong experience. 
                    Built with JavaScript and DOM manipulation, it focuses on interactivity, responsive 
                    controls, and clean gameplay.`,
        tags: "️ 🏷️  Game  · Frontend  · Interactive UI      ",
        thumbnailImage: "/projects/thumbnails/puppyPong-thumbnail.png",
        thumbnailWidth: "",
        thumbnailMargin: "3% 0% 0% 2%",
        subTabs: ['Games','In Progress']
    },

    {
        href: "",
        iconType: "image",
        iconValue: "/projects/icons/socal-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "SoCal Social",
        path: "/placeholder/Pathway",
        subtitle: "Local event discovery platform for students",
        description: `A community-based app concept for discovering and sharing campus events. 
                    Includes login, event creation, filters by interest, and dynamic content rendering.`,
        tags: "🏷️  Full-Stack · React · Teamwork",
        thumbnailImage: "/projects/thumbnails/socal-thumbnail.png",
        thumbnailWidth: "13vw",
        thumbnailMargin: "3% 0% 0% 1%",
        subTabs: ['Web Apps']
    },

    {
        href: "https://github.com/a-nguy4n/dermiDew",
        iconType: "image",
        iconValue: "/contact/icons/git-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Git Repo: DermiDew ",
        path: "https://github.com/a-nguy4n/dermiDew",
        subtitle: "Codebase for a skincare tracking web app",
        description: `A GitHub repository containing the code and components for DermiDew, a skincare 
                    routine tracker with editable routines, user goals, and login streak logic.`,
        tags: "",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['GitHub Repos']
    },

    {
        href: "https://github.com/a-nguy4n/weatherWardrobe",
        iconType: "image",
        iconValue: "/contact/icons/git-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Git Repo: Weather Wardrobe ",
        path: "https://github.com/a-nguy4n/weatherWardrobe",
        subtitle: "Code repository for a weather-based outfit suggestion app",
        description: `GitHub repo for Weather Wardrobe, which pulls live weather data and recommends 
                    daily outfits. Built with an API integration, dynamic rendering, and user input handling.`,
        tags: "",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['GitHub Repos']
    },

    {
        href: "https://github.com/harry-lons/SoCalSocial",
        iconType: "image",
        iconValue: "/contact/icons/git-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Git Repo: SoCal Social",
        path: "https://github.com/harry-lons/SoCalSocial",
        subtitle: "Full-stack project repository for a local event and social platform",
        description: `This repo houses the source code for SoCal Social. Includes frontend and backend code, 
                    user authentication, and event filtering features.`,
        tags: "",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['GitHub Repos']
    }
];

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    const tabToSelect = localStorage.getItem("selectedMainTab");
    if(tabToSelect){
      updateMainTabUI(tabToSelect);
      localStorage.removeItem("selectedMainTab");
    }

   console.log("Calling renderResults with data:", projects_data);
   renderResults(projects_data, "projectResults-body", "projectResults-count");

    setTimeout(() => {
        subTabFilter(projects_data, "projectResults-body", "projectResults-count");
    }, 10);
  });
});
