let pagefindPromise = null;

async function getPagefind() {
    if (!pagefindPromise) {
        pagefindPromise = import("/pagefind/pagefind.js").catch((error) => {
            pagefindPromise = null;
            throw error;
        });
    }

    return pagefindPromise;
}

function normalizeSubResult(subResult) {
    return {
        title: subResult.title || "",
        url: subResult.url || "",
        excerpt: subResult.excerpt || "",
    };
}

function normalizeResult(resultData) {
    return {
        title: resultData.meta?.title || "Untitled page",
        url: resultData.url || "#",
        excerpt: resultData.excerpt || "",
        subResults: (resultData.sub_results || []).map(normalizeSubResult),
    };
}

export async function searchPortfolio(query) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return [];

    try {
        const pagefind = await getPagefind();
        const search = await pagefind.search(trimmedQuery);
        const resultData = await Promise.all(
            search.results.map(async (result) => {
                const data = await result.data();

                console.log("PAGEFIND RESULT:", data);

                return data;
            })
        );

        return resultData.map(normalizeResult);
    } catch (error) {
        console.error("Portfolio search failed:", error);
        throw error;
    }
}
