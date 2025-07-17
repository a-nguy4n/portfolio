
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
        if(changeLabel){
            changeLabel.textContent = tab_label;
        }

        // changing subtab names
        const subSections = document.querySelectorAll('.subtab-group .sub-tab');
        let sub_index = 0; 
        subSections.forEach((sub) =>{
            sub.textContent = subtab_arr[sub_index];
            sub_index++;
        });
     }
}

// function to handle main pages navigations 
export function routeToMainTab(tab_name){
    const tabData = tabKey[tab_name];

    if(tab_name && tabData){
        const {path} = tabData;

         localStorage.setItem('selectedMainTab', tab_name);

        // main page redirection
        if(window.location.pathname !== path){
            sessionStorage.setItem('navOverride', tab_name);
            window.location.href = path;
        } 
        else{
            updateMainTabUI(tab_name);
        }
    }
}

export function waitForUIElements(callback, retries = 10, delay = 50){
  const label = document.querySelector('.main-toggle span:first-child');
  const subTabs = document.querySelectorAll('.subtab-group .sub-tab');

  if(label && subTabs.length > 0) {
    callback(); 
  }
  else if (retries > 0){
    setTimeout(() => {
      waitForUIElements(callback, retries - 1, delay);
    }, delay);
  } 
  else{
    console.warn("Main UI elements not found in time.");
  }
}
