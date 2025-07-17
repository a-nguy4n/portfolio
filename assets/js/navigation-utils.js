
// centralized config for page paths, tabs, subtabs 
const tabKey = {
    "about": {
        path: "/about-me/index.html",
        tab_label : "About Me",
        subtab_arr : ['All', 'Favorites', 'Now', 'Fun Facts', '', '']
    },

    "resume":{
        path: "/resume/index.html",
        tab_label: "Resume",
        subtab_arr: ['All', 'Education', 'Experience', 'Projects', 'Skills', 'Download CV']
    },

    "projects":{
        path: "/projects/index.html",
        tab_label: "Projects",
        subtab_arr: ['All', 'Web Apps', 'Games', 'In Progress', 'GitHub Repos', '']
    },

    "contact":{
        path: "/contact/index.html",
        tab_label: "Contact Me",
        subtab_arr: ['All', 'Polls', 'Feedback', 'Inquiries', '', '']
    },

    "extras":{
        path: "/extras/index.html",
        tab_label: "Extras",
        subtab_arr: ['All', 'Case Studies', 'Process', 'Archived', '', '']
    }
}

export function updateMainTabUI(tab_name){
     const tabData = tabKey[tab_name];
     if(tab_name && tabData){
        const {tab_label, subtab_arr} = tabData;

        // changing dropdown label 
        const changeLabel = document.querySelector('.main-toggle span:first-child');
        changeLabel.textContent = tab_label; 

        // changing subtab names
        const subSections = document.querySelectorAll('.subtab-group .sub-tab');
        let sub_index = 0; 
        subSections.forEach((sub) =>{
            sub.textContent = subtab_arr[sub_index];
            sub_index++;
        });
     }
}

// function to handle main page navigations 
export function routeToMainTab(tab_name){
    const tabData = tabKey[tab_name];

    if(tab_name && tabData){
        const {path} = tabData;

         localStorage.setItem('selectedMainTab', tab_name);

        // main page redirection
        if(window.location.pathname === path){
            updateMainTabUI(tab_name);
        }
        else{
            setTimeout(() => {
                window.location.href = path;
            }, 15);
        }
    }
}