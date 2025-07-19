
// loading content into the modal
export function openModalContent(result_item){
  addModalStyle();

  let modal = document.getElementById("mainModal");
  if(!modal){
      modal = document.createElement("div");
      modal.id = "mainModal";
      modal.classList.add("modal-window");
      document.body.appendChild(modal);
      
      console.warn("Modal container #mainModal not found in DOM");
      return;
  }

  modal.innerHTML = "";

  fetch(result_item.path)
  .then((res) => res.text())
  .then((html) => {
    modal.innerHTML = html;
    modal.style.display = "flex";

    const closeBtn = modal.querySelector(".modal-close");
    if(closeBtn){
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    window.onclick = function (event){
      if(event.target === modal){
        modal.style.display = "none";
      }
    };
  })
  .catch(() => {
    modal.innerHTML = "<div class='modal-content'><p>Failed to load modal content.</p></div>";
    modal.style.display = "block";
  });
}

// helper to load css 
function addModalStyle(){
  const modalCSS = "/assets/components/modal-window/modal.css";
  if (!document.querySelector(`link[href="${modalCSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = modalCSS;
    document.head.appendChild(link);
  }
}