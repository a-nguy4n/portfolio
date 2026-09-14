export function renderResultCard(result) {
    const card = document.createElement("a");
    card.className = "result-row search-result-card";
    card.href = result.url;

    const description = document.createElement("section");
    description.className = "result-description";

    const title = document.createElement("h2");
    title.textContent = result.title;

    const excerpt = document.createElement("p");
    excerpt.className = "result-caption";

    if (result.excerpt) {
        excerpt.innerHTML = result.excerpt;
    }
    else {
        excerpt.textContent = "No preview available.";
    }

    description.append(title, excerpt);
    card.append(description);

    return card;
}


export function renderEmptySearch(query) {
    const emptyState = document.createElement("section");
    emptyState.className = "result-row empty-search";

    const description = document.createElement("section");
    description.className = "result-description";

    const title = document.createElement("h2");
    title.textContent = "No Results Found";

    const message = document.createElement("p");
    message.className = "result-caption";
    message.textContent = `No pages matched "${query}".`;

    description.append(title, message);
    emptyState.append(description);

    return emptyState;
}


export function renderSearchResults(results, query) {
    const fragment = document.createDocumentFragment();

    const resultCount = document.createElement("p");
    resultCount.className = "search-results__count";

    let resultWord = "results";

    if (results.length === 1) {
        resultWord = "result";
    }

    resultCount.textContent =
        `${results.length} ${resultWord} found for "${query}"`;

    fragment.append(resultCount);

    if (results.length === 0) {
        fragment.append(
            renderEmptySearch(query)
        );

        return fragment;
    }

    const resultsList = document.createElement("section");
    resultsList.className = "search-results__list";

    results.forEach((result) => {
        const card = renderResultCard(result);
        resultsList.append(card);
    });

    fragment.append(resultsList);

    return fragment;
}


export function renderSearchMessage(message) {
    const messageElement = document.createElement("p");
    messageElement.className = "search-results__message";
    messageElement.textContent = message;

    return messageElement;
}