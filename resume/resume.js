import { renderResults } from "/assets/js/renderResults-utils.js";
import { subTabFilter } from "/assets/js/subtabFilter-utils.js";
import { waitForUIElements, updateMainTabUI } from "/assets/js/navigation-utils.js";

const resumePage_data = [
    {
        href: "",
        iconType: "image",
        iconValue: "/assets/images/default/home-resume.png",
        iconBgColor: "transparent",
        iconImgSize: "90%",
        iconImgMargin: "",
        title: "Resume: Styled",
        path: " www.path1/pathEx2/path3.com",
        subtitle: "Formatted for Aesthetic and Clarity",
        description: `A resume layout that combines clear information with a thoughtful 
                      use of design and formatting.`,
        tags: "Last Updated: July 2025",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['']
    },

    {
        href: "",
        iconType: "image",
        iconValue: "/resume/icons/tradResume-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "90%",
        iconImgMargin: "",
        title: "Resume: Traditional Format",
        path: "www.path1/pathEx2/path3.com",
        subtitle: "Clean and Conventional Presentation",
        description: `Structured for quick review, making key details easy to find at a glance.`,
        tags: "Last Updated: July 2025  ",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['']
    },

    {
        href: "",
        iconType: "emoji",
        iconValue: "🎓",
        iconBgColor: "#C5DAEA",
        iconImgSize: "1.4vw",
        iconImgMargin: "",
        title: "Academic Background",
        path: "www.path1/pathEx2/path3.com",
        subtitle: "Degree & Relevant Coursework",
        description: `An overview of my degree, specialization, and relevant coursework.`,
        tags: "🔽 Expand to view details ",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Education']
    },

    {
        href: "",
        iconType: "emoji",
        iconValue: "💼",
        iconBgColor: "#CEE7AE",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Practical Experience",
        path: "www.path1/pathEx2/path3.com",
        subtitle: "Putting Skills to Work",
        description: `Roles where I combined technical expertise, clear communication, and 
                      leadership to contribute across various responsibilities.`,
        tags: "🔽 Expand to view details",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Experience']
    },

    {
        href: "/projects/index.html",
        iconType: "image",
        iconValue: "/home/images/home-projects.png",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Projects",
        path: "/projects/index.html",
        subtitle: "Code, Design, and Everything in Between",
        description: `A collection of projects that demonstrate my creativity and technical skill sets. 
                    They range from independent builds to collaborative work, each showing a thoughtful
                    approach to design and problem-solving.`,
        tags: "",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Projects']
    },

    {
        href: "",
        iconType: "emoji",
        iconValue: "🛠️",
        iconBgColor: "transparent",
        iconImgSize: "1.5vw",
        iconImgMargin: "",
        title: "Skill Set",
        path: "www.path1/pathEx2/path3.com",
        subtitle: "Tools, Technologies, and Strengths",
        description: `An overview of the tools, skills, and strengths I bring to my work. `,
        tags: "🔽 Expand to view details",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Skills']
    }
];

document.addEventListener("DOMContentLoaded", () => {
  const dropdown_tab = "resume";
  waitForUIElements(() => updateMainTabUI(dropdown_tab));

  requestAnimationFrame(() => { 
    renderResults(resumePage_data, "resumeResults-body", "resumeResults-count");
    console.log("Calling renderResults with data:", resumePage_data);
    setTimeout(() => { 
        subTabFilter(resumePage_data, "resumeResults-body", "resumeResults-count");
    },10);
  });
});
