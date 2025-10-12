
export const SECTION_KEY = 'selectedSection';
export const RESULT_KEY = 'resultedString';


// defines how content is rendered in ContentBody
// "custom" = raw HTML, "formatted" = formatted JSON to HTML
export const SECTION_REGISTRY = {
    about: {
        type: "custom",
        html: "/assets/pages/sections/about/about.html",
        css: "/assets/pages/sections/about/about.css"
    },

    resume: {
        type: "custom",
        html: "/assets/pages/sections/resume/resume.html",
        css: "/assets/pages/sections/resume/resume.css",
    },

    projects: {
        type: "formatted",
        module: "/assets/pages/sections/projects/projects.js",
        exportKey: "projects_dataset",
    },

    contact: {
        type: "formatted",
        module: "/assets/pages/sections/contact-me/contact-me.js",
        exportKey: "contact_dataset",
    },

    extras: {
        type: "formatted",
        module: "/assets/pages/sections/extras/extras.js",
        exportKey: "extras_dataset"
    }
};

