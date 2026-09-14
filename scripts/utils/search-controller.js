import { searchPortfolio } from "/scripts/utils/pagefind-search.js";
import {
    renderSearchMessage,
    renderSearchResults
} from "/scripts/utils/search-renderer.js";


let searchDebounceTimer = null;
let searchRequestId = 0;

function getSearchResultsContainer() {
    const page = document.querySelector("main.page-container");

    if (page === null) {
        return null;
    }

    let container = page.querySelector(".search-results");

    if (container === null) {
        container = document.createElement("section");

        container.className = "search-results";
        container.setAttribute("aria-live", "polite");
        container.setAttribute("aria-busy", "false");

        page.append(container);
    }

    return container;
}

function setSearchResultsState(container, state, content) {
    container.dataset.state = state;

    if (state === "loading") {
        container.setAttribute("aria-busy", "true");
    }
    else {
        container.setAttribute("aria-busy", "false");
    }

    container.replaceChildren();

    if (content !== null && content !== undefined) {
        container.append(content);
    }
}


export function clearSearchResults() {
    searchRequestId++;

    document.body.classList.remove("is-searching");

    const container = document.querySelector(".search-results");

    if (container === null) {
        return;
    }

    container.replaceChildren();
    container.removeAttribute("data-state");
    container.setAttribute("aria-busy", "false");
}


async function runSearch(query) {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
        clearSearchResults();
        return;
    }

    const container = getSearchResultsContainer();

    if (container === null) {
        return;
    }

    document.body.classList.add("is-searching");

    searchRequestId++;

    const currentRequestId = searchRequestId;

    setSearchResultsState(
        container,
        "loading",
        renderSearchMessage("Searching...")
    );

    try {
        const results = await searchPortfolio(trimmedQuery);

        if (currentRequestId !== searchRequestId) {
            return;
        }

        if (results.length === 0) {
            setSearchResultsState(
                container,
                "empty",
                renderSearchResults(results, trimmedQuery)
            );

            return;
        }

        setSearchResultsState(
            container,
            "results",
            renderSearchResults(results, trimmedQuery)
        );
    }
    catch (error) {
        if (currentRequestId !== searchRequestId) {
            return;
        }

        console.error("Search failed:", error);

        setSearchResultsState(
            container,
            "error",
            renderSearchMessage(
                "Search is unavailable right now."
            )
        );
    }
}

export function handleSearchQuery(query) {
    window.clearTimeout(searchDebounceTimer);

    if (query.trim().length === 0) {
        clearSearchResults();
        return;
    }

    searchDebounceTimer = window.setTimeout(() => {
        runSearch(query);
    }, 200);
}