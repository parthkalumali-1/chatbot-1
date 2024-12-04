const responses = {
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
    "how are you": "I'm just a bot, but I'm here to help you! 😊",
    "who made you": "I was made with HTML, CSS, and JavaScript by Some Human Existence."
};

// Function to handle the sending of messages
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value;
    if (message.trim() === "") return;

    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);
    input.value = "";

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;

    // Respond based on the user's input
    const response = getResponse(message);
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    botMessage.textContent = response;
    chatBox.appendChild(botMessage);

    // Scroll to the bottom of the chat again after bot response
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get a response
function getResponse(message) {
    const lowerCaseMessage = message.toLowerCase().trim();
    if (responses[lowerCaseMessage]) {
        return Array.isArray(responses[lowerCaseMessage]) ? responses[lowerCaseMessage][Math.floor(Math.random() * responses[lowerCaseMessage].length)] : responses[lowerCaseMessage];
    } else if (lowerCaseMessage.startsWith('/')) {
        return "I am sorry, I didn't understand that command.";
    } else {
        return "I'm not sure how to respond to that.";
    }
}

// Initialize the chatbot with a welcome message
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const welcomeMessage = document.createElement('div');
    welcomeMessage.classList.add('message', 'bot');
    welcomeMessage.textContent = 'Welcome to ChatRobo! Type "help" for options.';
    chatBox.appendChild(welcomeMessage);
});

// Toggle dark mode
document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Event listener for the send message button
document.getElementById('send-message').addEventListener('click', sendMessage);

// Event listener for pressing Enter to send a message
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
