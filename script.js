document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const inputField = document.getElementById("input-field");
    const sendButton = document.getElementById("send-button");

    const botReplies = {
        "hello": "Hi there! How can I assist you?",
        "how are you?": "I'm just a bot, but I'm here to help you!",
        "what is your name?": "I'm your friendly chatbot.",
        "bye": "Goodbye! Have a great day!",
        "who made you?": "I was made with love by some clever humans!",
        "help": `Here are some things you can ask me:
-> hello
-> how are you?
-> what is your name?
-> who made you?
-> bye`
    };

    const defaultReply = "I didn't understand that. Please type 'help' for supported responses.";

    // Add a message to the chat container
    function appendMessage(content, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the bottom
    }

    // Show welcome message
    function showWelcomeMessage() {
        const welcomeMessage = "Welcome to CHATROBO! How may I assist you? Type 'help' for some general questions.";
        appendMessage(welcomeMessage, "bot-message");
    }

    // Process user input
    function handleUserInput() {
        const userMessage = inputField.value.trim();
        if (!userMessage) return; // Prevent empty messages

        appendMessage(userMessage, "user-message"); // Display user message
        inputField.value = ""; // Clear input field

        const botReply = botReplies[userMessage.toLowerCase()] || defaultReply;
        appendMessage(botReply, "bot-message");
    }

    // Event listeners for input and button
    sendButton.addEventListener("click", handleUserInput);
    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") handleUserInput();
    });

    // Clear placeholder on focus
    inputField.addEventListener("focus", () => inputField.placeholder = "");
    inputField.addEventListener("blur", () => inputField.placeholder = "Type your message...");

    showWelcomeMessage(); // Initial bot message
});
