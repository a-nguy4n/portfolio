
document.addEventListener("DOMContentLoaded", () => {
    const widget = document.getElementById("aboutMe-widget");
    const images = widget.querySelectorAll(".about-image");
    let current = 0;
    let interval = null;
  
    const showImage = index => {
      images.forEach((img, i) => {
        img.style.opacity = i === index ? "1" : "0";
      });
    };
  
    const startCycling = () => {
      showImage(current);
      interval = setInterval(() => {
        current = (current + 1) % images.length;
        showImage(current);
      }, 600); 
    };
  
    const stopCycling = () => {
      clearInterval(interval);
    };
  
    widget.addEventListener("mouseenter", startCycling);
    widget.addEventListener("mouseleave", stopCycling);
  });
  