
const logoContent = document.querySelector('.header-logo');

const rotateElements = [ 
                        '<img src="/assets/images/headerLogo/logo-two.png" alt="Logo Header">',
                        '<img src="/assets/images/headerLogo/logo-three.png" alt="Logo Header">',
                        '<img src="/assets/images/headerLogo/logo-four.png" alt="Logo Header">',
                        '<img src="/assets/images/headerLogo/logo-one.png" alt="Logo Header">'
                        ];

let index = 0; 

setInterval(() => { 
    logoContent.innerHTML = rotateElements[index];
    index = (index + 1) % rotateElements.length; 

}, 1500);