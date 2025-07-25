import { renderResults, triggerModal} from "/assets/js/renderResults-utils.js";
import { subTabFilter } from "/assets/js/subtabFilter-utils.js";
import { waitForUIElements, updateMainTabUI } from "/assets/js/navigation-utils.js";

const resumePage_data = [
    // {
    //     href: "",
    //     iconType: "image",
    //     iconValue: "/assets/images/default/home-resume.png",
    //     iconBgColor: "transparent",
    //     iconImgSize: "90%",
    //     iconImgMargin: "",
    //     title: "Resume: Styled",
    //     path: " www.path1/pathEx2/path3.com",
    //     subtitle: "Formatted for Aesthetic and Clarity",
    //     description: `A resume layout that combines clear information with a thoughtful 
    //                   use of design and formatting.`,
    //     tags: "Last Updated: July 2025",
    //     thumbnailImage: "",
    //     thumbnailWidth: "",
    //     thumbnailMargin: "",
    //     subTabs: ['']
    // },

    {
        href: "https://docs.google.com/document/d/1GT12OHIFvVNmR8oivXxNba1AACKdDL9G-8mjQYvvqoI/edit?tab=t.0",
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
        path: "/resume/subpages/education/modal-education.html",
        subtitle: "Degree & Relevant Coursework",
        description: `An overview of my degree, specialization, and relevant coursework.`,
        tags: "Click to view details ",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Education'],
        modalWindow: true,
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
        tags: "Click to view details ",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Experience'],
        modalWindow: true,
    },

    {
        href: "/projects/index.html",
        iconType: "image",
        iconValue: "/assets/images/default/home-projects.png",
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
        path: "/resume/subpages/skills/modal-skills.html",
        subtitle: "Tools, Technologies, and Strengths",
        description: `An overview of the tools, skills, and strengths I bring to my work. `,
        tags: "Click to view details ",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Skills'],
        modalWindow: true,
    }
];

document.addEventListener("DOMContentLoaded", () => {
  const dropdown_tab = "resume";
  waitForUIElements(() => updateMainTabUI(dropdown_tab));

  requestAnimationFrame(() => { 
    renderResults(resumePage_data, "resumeResults-body", "resumeResults-count");
    console.log("Calling renderResults with data:", resumePage_data);

    triggerModal(resumePage_data, "resumeResults-body");

    setTimeout(() => { 
        subTabFilter(resumePage_data, "resumeResults-body", "resumeResults-count");
    },10);
  });
});
