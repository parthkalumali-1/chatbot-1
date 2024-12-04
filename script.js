let ticTacToeState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameActive: false,
};

// Toggle Dark/Light Mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Send Message and Handle Input
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    addUserMessage(userInput);
    processMessage(userInput);
    document.getElementById("user-input").value = "";
}

// Add User Message
function addUserMessage(message) {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="message user">${message}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Add Bot Response
function addBotMessage(message) {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="message bot">${message}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Process Message
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
    "how are you": "I'm doing great, thank you! How about you? 😊",
    "who made you": "I was made with HTML, CSS, and JavaScript by Some Human Existence! 🤖"
};

// Process User Input and Respond
function processMessage(message) {
    message = message.toLowerCase().trim();

    if (message === "help") {
        addBotMessage(responses["help"].join("\n"));
    } else if (responses[message]) {
        addBotMessage(responses[message]);
    } else if (message === "tictactoe") {
        startTicTacToe();
    } else {
        addBotMessage("I didn't understand that. Type 'help' for suggestions.");
    }
}

// Tic-Tac-Toe Logic
function startTicTacToe() {
    ticTacToeState.board = ["", "", "", "", "", "", "", "", ""];
    ticTacToeState.currentPlayer = "X";
    ticTacToeState.gameActive = true;

    const container = document.getElementById("tic-tac-toe-container");
    container.innerHTML = `
        <div id="tic-tac-toe-board" class="tic-tac-toe-board">
            ${ticTacToeState.board.map((_, i) => `<div class="cell" data-index="${i}"></div>`).join("")}
        </div>
        <button id="close-tic-tac-toe">Close</button>
    `;

    document.querySelectorAll(".cell").forEach((cell) =>
        cell.addEventListener("click", handleCellClick)
    );
    document
        .getElementById("close-tic-tac-toe")
        .addEventListener("click", closeTicTacToe);
}

// Handle Cell Click
function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    if (!ticTacToeState.gameActive || ticTacToeState.board[index] !== "") return;

    ticTacToeState.board[index] = ticTacToeState.currentPlayer;
    event.target.textContent = ticTacToeState.currentPlayer;

    if (check
