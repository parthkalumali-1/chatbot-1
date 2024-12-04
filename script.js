document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const inputField = document.getElementById("input-field");
    const sendButton = document.getElementById("send-button");

    const botReplies = {
        "hello": ["Hi there!", "Hello! 👋", "Hey! How can I assist you?"],
        "help": [
            "Here are some commands you can try:\n-> hello\n-> /joke\n-> /time\n-> /weather",
            "Need help? Here's what I can do:\n- Tell jokes (/joke)\n- Show the time (/time)\n- how are you?\n- what is your name?\n- bye\n- who made you?",
        ],
        "joke": [
            "Why don’t skeletons fight each other? They don’t have the guts. 😂",
            "What do you call fake spaghetti? An impasta! 🍝",
            "What do you call cheese that isn’t yours? Nacho cheese! ",
            "Why can't your nose be 12 inches long? Because then it would be a foot! ",
            "Why can’t you trust an atom? Because they make up everything! ",

        "joke was not funny": [
            "Computer doctor ke paas kyun gaya?, Kyunki usko virus ho gaya tha!😂
            "Bina daanton wala bhalu kya kehlata hai?, Gummy Bear 🤣
        ],
        "time": () => `The current time is: ${new Date().toLocaleTimeString()}.`,
        "weather": () => "It's always sunny in ChatRobo world! ☀️",
        "how are you?": "I'm just a bot 🤖, but I'm here to help you!🤝",
        "what is your name?": "I'm your friendly chatbot 🫂.",
        "bye": "Goodbye! Have a great day! 👋",
        "who made you?": "I was made with HTML,CSS and JavaScript 🧑‍💻 by some human gang .",
    };

    const defaultReply = "I didn't understand that. Type 'help' for suggestions.";

    // Toggle theme
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    function appendMessage(content, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function handleUserInput() {
        const userMessage = inputField.value.trim();
        if (!userMessage) return;

        appendMessage(userMessage, "user-message");
        inputField.value = "";

        let botReply = botReplies[userMessage.toLowerCase()];
        if (Array.isArray(botReply)) {
            botReply = botReply[Math.floor(Math.random() * botReply.length)];
        } else if (typeof botReply === "function") {
            botReply = botReply();
        } else {
            botReply = botReply || defaultReply;
        }

        setTimeout(() => appendMessage(botReply, "bot-message"), 1000); // Simulate typing delay
    }

    sendButton.addEventListener("click", handleUserInput);
    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") handleUserInput();
    });

    appendMessage("Welcome to ChatRobo! Type 'help' for options.", "bot-message");
});
