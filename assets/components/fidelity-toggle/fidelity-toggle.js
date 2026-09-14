const FIDELITY = ["low", "mid", "high"];
const FIDELITY_KEY = "fidelity";

function getFidelity() {
    try {
        const currentFidelity = sessionStorage.getItem(FIDELITY_KEY);

        if(FIDELITY.includes(currentFidelity)){
            return currentFidelity;
        }
        else{
            return "high";
        }
    }
    catch {
        return "high";
    }
}

function setFidelity(fidelity) {
    if(FIDELITY.includes(fidelity)){
        sessionStorage.setItem(FIDELITY_KEY, fidelity);
        document.documentElement.dataset.fidelity = fidelity;
    }
    return fidelity;
}

export function initFidelityToggle() {
    const toggle = document.querySelector(".fidelity-toggle");

    if (!toggle) return;

    const details = toggle.querySelector("details");
    const summary = toggle.querySelector("summary");
    const options = toggle.querySelectorAll(".dropdown-menu button");

    const currentFidelity = getFidelity();

    document.documentElement.dataset.fidelity = currentFidelity;

    const selectedOption = toggle.querySelector(`[data-fidelity="${currentFidelity}"]`);

    if (selectedOption) {
        summary.textContent = `Viewing: ${selectedOption.textContent.trim()}`;
    }

    options.forEach((option) => {
        option.addEventListener("click", () => {

            // "low", "mid", or "high"
            const fidelity = option.dataset.fidelity;

            // Setting fidelity value
            setFidelity(fidelity)

            // Update "Viewing: ..."
            summary.textContent = `Viewing: ${option.textContent.trim()}`;

            // Close dropdown
            details.removeAttribute("open");

            console.log(`Fidelity set to: ${fidelity}`);
        });
    });
}



