document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const inputField = document.getElementById("input-field");
    const sendButton = document.getElementById("send-button");
    const chatHistory = document.querySelector(".chat-history");
    const themeToggle = document.getElementById("toggle-theme");
    const themeIcon = document.getElementById("theme-icon");

    const botReplies = {
        "hello": ["Hi there!", "Hello! 👋", "Hey! How can I assist you?"],
        "help": [
            "Here are some commands you can try:\n-> hello\n-> /joke\n-> /time\n-> /weather",
        ],
        "joke": [
            "Why don’t skeletons fight each other? They don’t have the guts. 😂",
            "What do you call fake spaghetti? An impasta! 🍝",
        ],
        "bye": "Goodbye! Have a great day! 👋",
    };

    // Sanitize input to prevent XSS
    function sanitizeInput(input) {
        const tempDiv = document.createElement("div");
        tempDiv.textContent = input;
        return tempDiv.innerHTML; // Escaped input
    }

    // Add message to chat history
    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = sanitizeInput(text);
        chatHistory.appendChild(messageDiv);

        // Auto-scroll to the bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Handle sending message
    sendButton.addEventListener("click", () => {
        const userMessage = inputField.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, "user");

        // Generate bot reply
        let reply = botReplies[userMessage.toLowerCase()] || "I didn't understand that.";
        if (Array.isArray(reply)) {
            reply = reply[Math.floor(Math.random() * reply.length)];
        }

        setTimeout(() => {
            addMessage(reply, "bot");
        }, 500);

        inputField.value = "";
    });

    // Toggle dark mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeIcon.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
    });
});
