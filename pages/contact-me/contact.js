const contactLayout = document.querySelector(".contact-layout");
const contactMessages = document.querySelectorAll(".contact-message");

const composePanel = document.querySelector(".contact-compose");
const composeSubject = document.querySelector("#compose-subject");
const composeMessage = document.querySelector("#compose-message");
const closeCompose = document.querySelector("#close-compose");

const contactForm = document.querySelector(".compose-form");
const sendButton = document.querySelector(".compose-send");

contactMessages.forEach((message) => {
    message.addEventListener("click", () => {

        contactMessages.forEach((item) => {
            item.classList.remove("is-active");
        });

        message.classList.add("is-active");

        composeSubject.value = message.dataset.subject;
        composeMessage.value = message.dataset.message;

        contactLayout.classList.add("is-compose-open");
        composePanel.setAttribute("aria-hidden", "false");
    });
});

function closeComposePanel() {
    contactLayout.classList.remove("is-compose-open");

    composePanel.setAttribute("aria-hidden", "true");

    contactMessages.forEach((item) => {
        item.classList.remove("is-active");
    });
}


closeCompose.addEventListener("click", () => {
    closeComposePanel();
});

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Message failed to send.");
        }

        contactForm.reset();

        closeComposePanel();

        sendButton.textContent = "Send";
        sendButton.disabled = false;

    } catch (error) {
        console.error("Form error:", error);

        sendButton.textContent = "Try Again";
        sendButton.disabled = false;
    }
});