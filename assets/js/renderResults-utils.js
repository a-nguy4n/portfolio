export function renderResults(dataArray, resultBodyId, resultCountId){
    const result_body = document.getElementById(resultBodyId);
    const number_results = document.getElementById(resultCountId);
    const search_query = document.querySelector('.search-query');

    if(!dataArray || !resultBodyId){
        console.warn("Missing required data or container");
        return;
    }

    // changing # of results per page 
    if(number_results){
        number_results.textContent = dataArray.length;
    }

    // shows what query was founded: 'results found for: <query>'
    const storedQueryText = sessionStorage.getItem("searchQueryText");
    let truncateText;
    if(storedQueryText){
        if(storedQueryText.length > 30){
            truncateText = storedQueryText.slice(0,28) + ". . .";
            search_query.innerHTML = truncateText;
        }
        else{
            search_query.innerHTML = storedQueryText;
        }
        sessionStorage.removeItem("searchQueryText");
    }

    // formats each result into layout 
    dataArray.forEach((result, index) => {
        const result_link = document.createElement('a');
        result_link.href = result.href || '#';
        result_link.className = 'result-layout';

        const result_icon = document.createElement('div');
        result_icon.className = 'result-icon';
        result_icon.style.backgroundColor = result.iconBgColor;
        result_icon.style.borderColor = result.iconBgColor;

        if(result.iconType === "emoji"){
            result_icon.textContent = result.iconValue;
        }
        else if(result.iconType === "image"){
            const result_iconImage = document.createElement('img');
            result_iconImage.src = result.iconValue;
            result_iconImage.alt = `Icon ${index}`;
            result_iconImage.style.width = result.iconImgSize;
            result_iconImage.style.margin= result.iconImgMargin;
            result_icon.appendChild(result_iconImage);
        }

        const result_section = document.createElement('section');
        result_section.className = 'result-textContent';
        result_section.innerHTML = `
            <h2 class="row-one result-title"> ${result.title}
                <span class="title-divider"> ~ </span>
                <span class="page-path"> ${result.path}</span>
            </h2>
            <p class="row-two"> ${result.subtitle}</p>
            <p class="row-four">${result.tags}</p>
        `;

        const descriptionResult = document.createElement('p');
        descriptionResult.className = 'row-three';
        descriptionResult.innerHTML = result.description;
        result_section.insertBefore(descriptionResult, result_section.querySelector('.row-four'));

        result_link.appendChild(result_icon);
        result_link.appendChild(result_section);

        if(result.thumbnailImage && result.thumbnailImage.trim().length > 0){
            const result_thumbnail = document.createElement('img');
            result_thumbnail.src = result.thumbnailImage;
            result_thumbnail.alt = `Thumbnail ${index}`;
            result_thumbnail.style.width = result.thumbnailWidth;
            result_thumbnail.style.margin = result.thumbnailMargin;
            result_link.appendChild(result_thumbnail);
        }
        result_body.appendChild(result_link);
    });
}
