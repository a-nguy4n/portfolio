// Profile Role Render
document.addEventListener('topbar:loaded', () => {
  console.log("topbar:loaded event received");

  const role = localStorage.getItem('selectedRole') || 'default';
  const profileButton = document.getElementById('profile-button');
  const profileImg = profileButton?.querySelector('img');
  const profileCircle = document.querySelector('.icon-circle');
  const roleLabel = document.querySelector('.role-label');
  const profileWindow = document.querySelector('.profile-window');
  const roleName = document.getElementById('role-name');
  const switches = document.querySelectorAll('.profile-switch');

  if(!profileButton || !profileImg || !profileCircle || !roleLabel || !profileWindow || !roleName){
    console.warn('[TopBar] Some required elements are missing. TopBar not fully initialized.');
    return;
  }

  const roleStyles = {
    default:{
      borderColor: '#A5DED2',
      img: '/home/images/home-profile.png',
      size: '1.5vw',
      bgColor: '#A5DED2',
      label: 'Default',
    },

    browser:{
      borderColor: '#F6EC83',
      img: '/assets/images/index/index-browse.png',
      size: '1.4vw',
      bgColor: '#F6EC83',
      label: 'Browser'
    },

    recruiter:{
      borderColor: '#B7DEFC',
      img: '/assets/images/index/index-recruit.png',
      size: '1.4vw',
      bgColor: '#B7DEFC',
      label: 'Recruiter'
    },

    developer:{
      borderColor: '#FACDEE',
      img: '/assets/images/index/index-develop.png',
      size: '2.25vw',
      bgColor: '#FACDEE',
      label: 'Developer',
    }
  };

  function applyRoleStyles(role){
    const { borderColor, img, size, bgColor, label } = roleStyles[role];
    if (profileButton){
      profileButton.style.borderColor = borderColor;
    }

    if (profileImg){
      profileImg.src = img;
      profileImg.style.width = size;
    }

    profileCircle.style.backgroundColor = bgColor;
    profileWindow.style.borderColor = bgColor;

    if(roleLabel){
      roleLabel.textContent = label;
      if(roleLabel.innerHTML === 'Default'){
        roleName.textContent = 'User';
      }
      else{
        roleName.textContent = label;
      }
      switches.forEach((s)=>{
        if(s.textContent === roleLabel.innerHTML){
          s.style.display = 'none';
        }
        else{
          s.style.display = 'inline-block'
        }
      });
    }

  }
  applyRoleStyles(role);

  // drop down to switch profiles
  profileButton.addEventListener('click', (e) =>{
    e.stopPropagation(); 
    profileWindow.classList.toggle('show');
  });
  
  document.addEventListener('click', (e) => {
    if (!profileWindow.contains(e.target) && !profileButton.contains(e.target)) {
      profileWindow.classList.remove('show');
    }
  });

  document.querySelectorAll('.profile-switch').forEach(span => {
    span.addEventListener('click', () => {
      const selectedProfile = span.dataset.role;
      localStorage.setItem('selectedRole', selectedProfile);
      applyRoleStyles(selectedProfile);
      profileWindow.classList.remove('show');
      window.location.reload();
    });
  });
});


