function getBotReply(text, threadTitle) {
  const lowerText = text.toLowerCase();

  const workWithMeKeywords = ["collaboration", "project", "website", "portfolio", "design"];
  const opportunityKeywords = ["job", "internship", "recruiter", "role", "resume", "interview"];
  const teamKeywords = ["team", "build", "connect", "hello", "friendship", "collaboration"];

  switch (threadTitle) {
    case "Work With Me":
      if (workWithMeKeywords.some((keyword) => lowerText.includes(keyword))) {
        if (lowerText.includes("design")) return "I'd love to work on design! What are you envisioning?";
        if (lowerText.includes("project")) return "Sounds like an exciting project! Tell me more about what you have in mind.";
        if (lowerText.includes("website") || lowerText.includes("portfolio"))
          return "I'm always up for building something great! What are we creating?";
        if (lowerText.includes("collaboration"))
          return "Amazing! I'm excited to collaborate together. Let's map the next steps.";
      }
      return "Amazing! I'm excited to collaborate together. Let's map the next steps.";

    case "Your Next Opportunity":
      if (opportunityKeywords.some((keyword) => lowerText.includes(keyword))) {
        if (lowerText.includes("job") || lowerText.includes("role"))
          return "That sounds like an incredible opportunity! I'd love to learn more about the role.";
        if (lowerText.includes("internship"))
          return "I'm very interested in internship opportunities! When can we discuss further?";
        if (lowerText.includes("recruiter"))
          return "Great to connect! I'd be happy to share more about my background and experience.";
        if (lowerText.includes("resume") || lowerText.includes("interview"))
          return "I'm ready! What would you like to know about my experience?";
      }
      return "Thanks so much for thinking of me! I'd absolutely love to hear more about this opportunity.";

    case "Future Teammate":
      if (teamKeywords.some((keyword) => lowerText.includes(keyword))) {
        if (lowerText.includes("hello")) return "Hey! Great to meet you. What brings you here?";
        if (lowerText.includes("team"))
          return "I'd love to be part of a great team! Let's see what we can build together.";
        if (lowerText.includes("build") || lowerText.includes("project"))
          return "Building things with talented people is what gets me excited! Let's create something amazing.";
        if (lowerText.includes("connect"))
          return "I'm always open to connecting with fellow builders and creators!";
      }
      return "I'm interested! Let's connect and start building together.";

    default:
      return "Thanks for your message! I'd love to connect — I'll follow up soon.";
  }
}

function getContactLink(threadTitle, message) {
  const subject = `Portfolio Contact: ${threadTitle}`;
  const body = `Message from chat:\n\n${message}`;
  const mailtoLink = `mailto:1512alli@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return mailtoLink;
}

export function initContactChat() {
  const threads = document.querySelectorAll(".collab-thread");
  if (!threads.length) return;

  threads.forEach((thread) => {
    const composer = thread.querySelector(".chat-composer");
    const messages = thread.querySelector(".chat-messages");
    const threadTitle = thread.querySelector(".message-description h2")?.textContent?.trim() || "";

    if (!composer || !messages) return;

    composer.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(composer);
      const rawMessage = formData.get("message");
      const text = typeof rawMessage === "string" ? rawMessage.trim() : "";
      if (!text) return;

      const outgoing = document.createElement("p");
      outgoing.className = "chat-bubble outgoing";
      outgoing.textContent = text;
      messages.append(outgoing);

      composer.reset();

      window.setTimeout(() => {
        const reply = document.createElement("p");
        reply.className = "chat-bubble incoming";
        reply.textContent = getBotReply(text, threadTitle);
        messages.append(reply);

        const emailBubble = document.createElement("p");
        emailBubble.className = "chat-bubble incoming";
        const mailtoLink = getContactLink(threadTitle, text);
        emailBubble.innerHTML = `To make sure Allison receives this quickly, <a href="${mailtoLink}" class="chat-email-link">email Allison directly</a>.`;
        messages.append(emailBubble);
      }, 500);
    });
  });
}
