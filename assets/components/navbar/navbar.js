function navbarFunc(){
  const toggleMainSection = document.querySelector('.main-toggle');
  const mainMenu = document.querySelector('.main-menu');
  const mainTabs = document.querySelectorAll('.main-menu .main-tab');
  const subSections = document.querySelectorAll('.subtab-group .sub-tab');

  toggleMainSection.addEventListener('click', () =>{
    mainMenu.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!document.querySelector('.main-nav').contains(e.target)){
      mainMenu.classList.remove('show');
    }
  });

  mainTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabLabel = tab.getAttribute('data-target');
      const changeLabel = toggleMainSection.querySelector('.main-toggle span:first-child');
      localStorage.setItem('selectedMainTab', tabLabel);

      const aboutSubTabs = ['All', 'Favorites', 'Now', 'Fun Facts', '', ''];
      const resumeSubTabs = ['All', 'Education', 'Experience', 'Projects', 'Skills', 'Download CV'];
      const projectSubTabs = ['All', 'Web Apps', 'Games', 'In Progress', 'GitHub Repos', ''];
      const contactSubTabs = ['All', 'Polls', 'Feedback', 'Inquiries', '', ''];
      const extraSubTabs = ['All', 'Case Studies', 'Process', 'Archived', '', ''];

      const tabToLabelMap = { 
        about: 'About Me',
        resume: 'Resume',
        projects: 'Projects',
        contact: 'Contact Me',
        extras: 'Extras'
      };

      const tabToSubtabMap = {
        about: aboutSubTabs,
        resume: resumeSubTabs,
        projects: projectSubTabs,
        contact: contactSubTabs,
        extras: extraSubTabs
      }; 
     
      if(changeLabel){
        changeLabel.textContent = tabToLabelMap[tabLabel] || tabLabel;
      }
      
      let subIndex = 0; 
      subSections.forEach((sub) =>{
        sub.textContent = tabToSubtabMap[tabLabel][subIndex];
        subIndex++;
      });

      mainMenu.classList.remove('show');

      const mainTabPaths = {
        about: '/about-me/index.html',
        resume: '/resume/index.html',
        projects: '/projects/index.html',
        contact: '/contact/index.html',
        extras: '/extras/index.html'
      }

      const redirectPath = mainTabPaths[tabLabel];
      if(redirectPath && window.location.pathname !== redirectPath){
        setTimeout(() => {
          window.location.href = redirectPath;
        }, 5);
      }
    });
  });
  
  // Main Tab Navigation & Selection Behavior 
  let tabToSelect = null;

  if(sessionStorage.getItem('navOverride')){
    tabToSelect = sessionStorage.getItem('navOverride');
  } 
  else if(localStorage.getItem('selectedMainTab')){
    tabToSelect = localStorage.getItem('selectedMainTab');
  }

  if(tabToSelect && document.querySelector('.main-nav')){
    const matchedMainTab = Array.from(mainTabs).find(
      tab => tab.getAttribute('data-target') === tabToSelect
    );
  
    if(matchedMainTab){
      matchedMainTab.click();
    }
    sessionStorage.removeItem('navOverride');
  }  
  console.log("Navbar function initialized");

};

window.navbarFunc = navbarFunc;


