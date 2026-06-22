export async function blurEffectOnScroll(){
    const topRow = document.querySelector(".top-row");

    window.addEventListener("scroll", () => {
        if(window.scrollY > 15){
            topRow.classList.add("scrolled");
        }
        else{
            topRow.classList.remove("scrolled");
        }
    });
}
