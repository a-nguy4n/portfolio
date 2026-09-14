/**
 * @name preventCurrentPageNavigation
 * @description
 * Prevents navigation to the current page when clicking on links within the specified container.
 * @param {HTMLElement} container - The container element to search for links. Defaults to the entire document.
 */
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