const messages = {
    "hello": ["Hi there!", "Hello! 👋", "Hey! How can I assist you?"],
    "help": [
        `Here are some commands you can try:
        - hello
        - joke (Get a random joke)
        - joke was not funny (Get another joke)
        - time (Check the current time)
        - weather (Get weather info)
        - tictactoe (Play Tic-Tac-Toe)
        - bye (End the chat)`
    ],
    "joke": [
        "Why don’t skeletons fight each other? They don’t have the guts. 😂",
        "What do you call fake spaghetti? An impasta! 🍝",
        "Why can't your nose be 12 inches long? Because then it would be a foot! 😂"
    ],
    "joke was not funny": [
        "Computer doctor ke paas kyun gaya? Kyunki usko virus ho gaya tha! 😂",
        "Bina daanton wala bhalu kya kehlata hai? Gummy Bear! 🤣"
    ],
    "time": () => `The current time is: ${new Date().toLocaleTimeString()}.`,
    "weather": () => "It's always sunny in ChatRobo world! ☀️",
    "tictactoe": "Starting Tic-Tac-Toe... Enjoy the game!",
    "bye": "Goodbye! Have a great day! 👋",
    "how are you": "I'm doing great, thank you for asking! 😄",
    "who made you": "I was made with HTML, CSS, and JavaScript by Some Human Existence."
};

// Toggle dark mode
document.getElementById("toggle-theme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".chat-container").classList.toggle("dark-mode");
    document.getElementById("theme-icon").innerText = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
});

// Handle user input and send message
document.getElementById("send-message").addEventListener("click", function() {
    const userInput = document.getElementById("user-message").value.trim();
    if (userInput === "") return;

    addMessage(userInput, 'user');
    document.getElementById("typing-indicator").style.display = "block"; // Show typing indicator

    // Simple command processing
    let response = "Sorry, I didn't understand that.";
    const lowerInput = userInput.toLowerCase();
    if (messages[lowerInput]) {
        if (Array.isArray(messages[lowerInput])) {
            const randomIndex = Math.floor(Math.random() * messages[lowerInput].length);
            response = messages[lowerInput][randomIndex];
        } else if (typeof messages[lowerInput] === 'function') {
            response = messages[lowerInput]();
        }
    }

    setTimeout(() => {
        addMessage(response, 'bot');
        document.getElementById("user-message").value = ''; // Clear input field
        document.getElementById("user-message").focus(); // Return focus to input field
        document.getElementById("typing-indicator").style.display = "none"; // Hide typing indicator
    }, 1000);

    scrollToBottom();
});

// Add message to chat history
function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    document.querySelector(".chat-history").appendChild(messageDiv);
}

// Scroll to the bottom of the chat history
function scrollToBottom() {
    const chatHistory = document.querySelector(".chat-history");
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Disable/enable send button based on input
document.getElementById("user-message").addEventListener("input", function() {
    const userInput = document.getElementById("user-message").value.trim();
    const sendButton = document.getElementById("send-message");
    sendButton.disabled = userInput === "";
});

// Focus on the input field when the page loads
document.getElementById("user-message").focus();
