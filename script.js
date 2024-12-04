const messages = {
    "hello": ["Hi there!", "Hello! 👋", "Hey! How can I assist you?"],
    "help": [
        `Here are some commands you can try:
        - hello
        - /joke (Get a random joke)
        - /joke was not funny (Get another joke)
        - /time (Check the current time)
        - /weather (Get weather info)
        - /tictactoe (Play Tic-Tac-Toe)
        - /bye (End the chat)`
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
    document.getElementById("theme-icon").innerText = document.body.classList.contains("dark-mode") ? "🌙" : "🌞";
});

// Send message
document.getElementById("send-message").addEventListener("click", function() {
    const userMessage = document.getElementById("user-message").value;
    if (userMessage.trim() === "") return;

    // Display user's message
    displayMessage(userMessage, "user");

    // Process and reply
    let response = processMessage(userMessage);
    displayMessage(response, "bot");

    // Clear input
    document.getElementById("user-message").value = "";
});

// Display messages
function displayMessage(message, sender) {
    const chatHistory = document.getElementById("chat-history");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerText = message;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to the latest message
}

// Process the user's message and respond
function processMessage(message) {
    let response = "I didn't understand that. Type 'help' for suggestions.";

    // Convert message to lowercase for easy matching
    const messageLower = message.toLowerCase().trim();

    // Check for command matches
    if (messages[messageLower]) {
        const randomIndex =

