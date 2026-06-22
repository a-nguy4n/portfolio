const svgCache = new Map();

/**
 * Purpose: Fetch + parse an SVG, cache the parsed <svg>, and return a clone.
 * @param {string} url
 * @returns {Promise<SVGElement>}
 */
async function loadInlineSVG(url){
  const cached = svgCache.get(url);
  if(cached) return cached.cloneNode(true);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load SVG: ${url} (${res.status})`);

  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const svg = doc.querySelector("svg");

  if (!svg) throw new Error(`No <svg> root found in: ${url}`);

  // Letting CSS control sizing
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  svgCache.set(url, svg);
  return svg.cloneNode(true);
}

/**
 * Purpose: Helper function that resolve a usable SVG URL from a data-src value.
 *
 * Supports:
 *  - "icons/moon-icon"        -> {basePath}/icons/moon-icon.svg
 *  - "icons/moon-icon.svg"    -> {basePath}/icons/moon-icon.svg
 *  - "/assets/.../moon.svg"   -> /assets/.../moon.svg
 *  - "https://.../moon.svg"   -> https://.../moon.svg
 *
 * @param {string} rawName
 * @param {string} basePath
 * @param {string} extension
 * @returns {string|null}
 */
function readSourcePath(rawName, basePath, extension){
    if(!rawName) return null;

    const name = String(rawName).trim();
    const isAbsolute = /^(https?:)?\//i.test(name);
    const hasSvgExt = name.toLowerCase().endsWith(".svg");

    let url;
    if(isAbsolute){
        url = name; // full path or protocol-relative
    }
    else if(hasSvgExt){
        url = `${basePath}/${name}`; // already has .svg
    } 
    else{
        url = `${basePath}/${name}${extension}`; // add .svg
    }

    // Normalize accidental double slashes (but keep https:// intact)
    return url.replace(/([^:]\/)\/+/g, "$1");
}

/**
 * Replace placeholders with inline SVG.
 *
 * Usage:
 *   <span data-svg data-src="icons/sun-icon"></span>
 *   -> loads /assets/images/icons/for-components/sun-icon.svg
 *
 * @param {Document|HTMLElement} domRoot
 * @param {object} options
 * @param {string} options.basePath      default "/assets/images"
 * @param {string} options.extension     default ".svg"
 * @param {string} options.selector      default "[data-svg][data-src]"
 * @param {boolean} options.clear        default true
 * @param {string} options.svgClass      default "inline-svg"
 * @param {boolean} options.skipIfFilled default true
 */
export async function renderSVGAssets(domRoot = document, options = {}){
    const root = domRoot ?? document;

    const basePath = options.basePath ?? "/assets/images";
    const extension = options.extension ?? ".svg";
    const selector = options.selector ?? "[data-svg][data-src]";
    const clear = options.clear !== false;
    const svgClass = options.svgClass ?? "inline-svg";
    const skipIfFilled = options.skipIfFilled !== false;

    const nodes = root.querySelectorAll(selector);

    for(const node of nodes){
        const pathSource = node.getAttribute("data-src");
        if(!pathSource) continue;
    
        // don't re-inject if already filled
        if(skipIfFilled && node.querySelector("svg")) continue;

    const url = readSourcePath(pathSource, basePath, extension);
    if (!url) continue;

    try{
        const svg = await loadInlineSVG(url);
        if (svgClass) svg.classList.add(svgClass);

        // copy container classes onto SVG (useful for styling)
        node.classList.forEach((c) => svg.classList.add(c));

        if (clear) node.innerHTML = "";
        node.appendChild(svg);
    }

    catch(err){
        console.warn("SVG failed to load:", url, err);
    }
  }
}