let pagefindInstance = null;

async function loadPagefind(){
    if(!pagefindInstance){
        pagefindInstance = await import("/pagefind/pagefind.js");
    }

    return pagefindInstance;
}

export async function searchPortfolio(query){
    const pagefind = await loadPagefind();

    if (!query.trim()) return [];

    const search = await pagefind.search(query);

    const results = await Promise.all(
        search.results.map(result => result.data())
    );

    return results;
}