export function preventCurrentPageNavigation(container = document){
    const links = container.querySelectorAll("a[href]");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetPath = new URL(link.href, window.location.origin).pathname;

            if(targetPath === window.location.pathname){
                e.preventDefault();
            }
        });
    });
}