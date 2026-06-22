// List of Data Attributes + Values 

export const DATA_ATTRIBUTES = {

    // "data-cloud": {
    //     purpose: "holds the name of the cloud SVG asset",
    // },

     "data-email": {
        purpose: "holds the email address",
        value: "email"
    },

    // "data-name": {
    //     purpose: "holds the name of the SVG asset",
    // },
  
    "data-page": {
        purpose: "Identify what type of page is currently loaded",
        values: ["about-me", "contact-me", "extras", "home", "projects", "resume", "splash-page"]
    }, 

    "data-src": {
        purpose: "holds direct URL to SVG asset",
        values: ["path to svg clouds", "path to svg icons"]
    },

    "data-svg": {
        purpose: " acts like a flag to identify SVG elements",
    },

    "data-theme":{
        purpose: "holds the name of the current color theme",
        values: ["dawn", "day", "sunset", "night"]
    }
}
