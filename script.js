document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const inputField = document.getElementById("input-field");
    const sendButton = document.getElementById("send-button");
    const themeToggle = document.getElementById("toggle-theme"); // Correct selector

    // ... (rest of your JavaScript code) ... 

    // Toggle theme
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    // ... (rest of your JavaScript code) ... 
});
