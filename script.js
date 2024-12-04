document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const inputField = document.getElementById("input-field");
    const sendButton = document.getElementById("send-button");
    const themeToggle = document.getElementById("theme-toggle");
    const modal = document.getElementById("tic-tac-toe-modal");
    const closeModal = document.getElementById("close-modal");
    const boardContainer = document.getElementById("tic-tac-toe-board");

    // Function to append a message to the chat
    function appendMessage(content, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Display welcome message on page load
    appendMessage("Welcome to ChatRobo! Type 'help' for options.", "bot-message");

    // ... (other existing code)

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    sendButton.addEventListener("click", handleUserInput);

    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleUserInput();
    });
});
