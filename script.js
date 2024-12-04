document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const inputField = document.getElementById("input-field");
    const sendButton = document.getElementById("send-button");
    const themeToggle = document.getElementById("theme-toggle");
    const modal = document.getElementById("tic-tac-toe-modal");
    const closeModal = document.getElementById("close-modal");
    const boardContainer = document.getElementById("tic-tac-toe-board");

    const botReplies = {
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
    };

    const defaultReply = "I didn't understand that. Type 'help' for suggestions.";

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

        if (userMessage.toLowerCase() === "/tictactoe") {
            showTicTacToe();
        } else {
            setTimeout(() => appendMessage(botReply, "bot-message"), 1000); // Simulate typing delay
        }
    }

    function showTicTacToe() {
        modal.style.display = "block";
        generateTicTacToeBoard();
    }

    function generateTicTacToeBoard() {
        boardContainer.innerHTML = ""; // Clear previous board
        const board = Array(9).fill(null);
        let currentPlayer = "X";

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (let combo of winningCombinations) {
                const [a, b, c] = combo;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a];
                }
            }
            return board.includes(null) ? null : "Draw";
        }

        function handleCellClick(event) {
            const cellIndex = event.target.dataset.index;
            if (!board[cellIndex]) {
                board[cellIndex] = currentPlayer;
                event.target.textContent = currentPlayer;
                const winner = checkWinner();
                if (winner) {
                    setTimeout(() => alert(winner === "Draw" ? "It's a draw!" : `${winner} wins!`), 100);
                    generateTicTacToeBoard(); // Reset the board
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.className = "tic-tac-toe-cell";
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick);
            boardContainer.appendChild(cell);
        }
    }

    sendButton.addEventListener("click", handleUserInput);
    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") handleUserInput();
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    appendMessage("Welcome to ChatRobo! Type 'help' for options.", "bot-message");
});
