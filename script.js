document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const inputField = document.getElementById("input-field");
    const sendButton = document.getElementById("send-button");
    const themeToggle = document.getElementById("theme-toggle");

    // Function to append messages to the chat
    function appendMessage(content, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the latest message
    }

    // Display a welcome message when the page loads
    appendMessage("Welcome to ChatRobo! Type 'help' for options.", "bot-message");

    // Function to handle user input
    function handleUserInput() {
        const userMessage = inputField.value.trim();
        if (userMessage === "") return;

        // Append user message
        appendMessage(userMessage, "user-message");

        // Bot response logic
        let botResponse = "I didn't understand that. Type 'help' for suggestions.";
        if (userMessage.toLowerCase() === "help") {
            botResponse = "Here are some options:\n- 'joke' to hear a joke\n- 'joke was not funny' to give feedback\n- 'play game' for Tic-Tac-Toe!";
        } else if (userMessage.toLowerCase() === "joke") {
            botResponse = "Why don't skeletons fight each other? They don't have the guts! 😄";
        } else if (userMessage.toLowerCase() === "joke was not funny") {
            botResponse = "I'm sorry! I'll try to improve. 😊";
        } else if (userMessage.toLowerCase() === "play game") {
            botResponse = "Game coming soon!";
        }

        // Append bot response
        appendMessage(botResponse, "bot-message");

        // Clear input field
        inputField.value = "";
    }

    // Event listeners
    sendButton.addEventListener("click", handleUserInput);
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleUserInput();
    });

    // Theme toggle functionality
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
});
