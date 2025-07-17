import { renderResults } from "/assets/js/renderResults-utils.js";
import { subTabFilter } from "/assets/js/subtabFilter-utils.js";
import { updateMainTabUI } from "/assets/js/navigation-utils.js";

// const tabToSelect = localStorage.getItem("selectedMainTab");
// if(tabToSelect){
//   updateMainTabUI(tabToSelect);
//   localStorage.removeItem('selectedMainTab');
// }

const contactPage_data = [
    {
        href: "mailto:1512alli@gmail.com",
        iconType: "image",
        iconValue: "/contact/icons/gmail-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "100%",
        iconImgMargin: "0% 1% 0% 0%",
        title: "Email",
        path: "mailto:1512alli@gmail.com",
        subtitle: "Allison N. - Inbox is always open",
        description: "For ideas, work, or creative collaborations — send it my way →",
        tags: "",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Inquiries']
    },

    {
        href: "https://github.com/a-nguy4n",
        iconType: "image",
        iconValue: "/contact/icons/git-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "GitHub",
        path: "https://github.com/a-nguy4n",
        subtitle: "Code • Projects • Build",
        description: "Explore my projects, code experiments, and full-stack apps → ",
        tags: "🏷  Java   ·  Python   ·  React   ·  Full-Stack ",
        thumbnailImage: "/contact/icons/git-thumbnail.png",
        thumbnailWidth: "13vw",
        thumbnailMargin: "3% 15% 0% 0%",
        subTabs: ['']
    },

    {
        href: "https://www.linkedin.com/in/allison-nguyen-668598296/",
        iconType: "image",
        iconValue: "/contact/icons/link-icon.png",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "LinkedIn Profile",
        path: "https://www.linkedin.com/in/allison-nguyen-668598296/",
        subtitle: "Allison N. - Computer Engineering Student",
        description: `My LinkedIn Profile - Connect with me professionally <br>
                      Connections: 150+   ·  Open to work         `,
        tags: "🏷  Student  ·  Engineer ",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['']
    },

    {
        href: "portfolio/contactme/polls",
        iconType: "emoji",
        iconValue: "📊",
        iconBgColor: "#C3F0C9",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Visitor Polls",
        path: "portfolio/contactme/polls",
        subtitle: "Poll: Help shape what comes next . . .",
        description: `Jul 2025 · Quick polls on your experience, interests, and what you'd like to see next.`,
        tags: "📌 Click to vote ↓ • Suggest features • Guide future updates",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Polls']
    },

    {
        href: "portfolio/contactme/feedback",
        iconType: "emoji",
        iconValue: "💬",
        iconBgColor: "transparent",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Feedback",
        path: "portfolio/contactme/feedback",
        subtitle: "Leave Feedback – Help improve this site",
        description: `Jul 2025 · Let me know how the design, layout, or content worked for you. 
                      Every message helps shape what’s next.`,
        tags: " 📌 Click to rate the design ↓  •  Report bugs ",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Feedback']
    },

    {
        href: "portfolio/contactme/inquiry",
        iconType: "emoji",
        iconValue: "📮",
        iconBgColor: "#EEF5EF",
        iconImgSize: "",
        iconImgMargin: "",
        title: "Direct Inquiry",
        path: "portfolio/contactme/inquiry",
        subtitle: "Inquiries – Reach Out for Work or Collaboration",
        description: `Jul 2025 · I’m open to learning opportunities, collabs, and conversations.`,
        tags: "",
        thumbnailImage: "",
        thumbnailWidth: "",
        thumbnailMargin: "",
        subTabs: ['Inquiries']
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

    console.log("Calling renderResults with data:", contactPage_data);
    renderResults(contactPage_data, "contactResults-body", "contactResults-count");

    setTimeout(() => {
        subTabFilter(contactPage_data, "contactResults-body", "contactResults-count");
    }, 10);
  });
});



