document.addEventListener("DOMContentLoaded", () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    let targetColor = "";
    let score = 0;
    let round = 1;
    const maxRounds = 5;

    const instructionsModal = document.getElementById("instructionsModal");
    const startGameButton = document.getElementById("startGameButton");
    const colorBox = document.getElementById("colorBox");
    const colorOptionsContainer = document.getElementById("colorOptions");
    const gameStatus = document.getElementById("gameStatus");
    const scoreDisplay = document.getElementById("score");
    const roundDisplay = document.getElementById("round");
    const newGameButton = document.getElementById("newGameButton");

    function showInstructions() {
        instructionsModal.style.display = "flex";
    }

    function startGame() {
        instructionsModal.style.display = "none";
        round = 1;
        score = 0;
        updateScoreAndRound();
        generateNewColor();
        renderColorOptions();
        gameStatus.textContent = "Guess the correct color!";
        gameStatus.style.color = "black";
    }

    function updateScoreAndRound() {
        scoreDisplay.textContent = score;
        roundDisplay.textContent = round;
    }

    function generateNewColor() {
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        colorBox.style.backgroundColor = "#ccc";
    }

    function renderColorOptions() {
        colorOptionsContainer.innerHTML = "";
        const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
        shuffledColors.forEach(color => {
            const button = document.createElement("button");
            button.style.backgroundColor = color;
            button.dataset.testid = "colorOption";
            button.onclick = () => checkGuess(color, button);
            colorOptionsContainer.appendChild(button);
        });
    }

    function checkGuess(selectedColor, button) {
        if (selectedColor === targetColor) {
            gameStatus.textContent = "Correct!";
            gameStatus.style.color = "green";
            score++;
        } else {
            gameStatus.textContent = `Wrong! The correct color was ${targetColor}`;
            gameStatus.style.color = "red";
            colorBox.style.backgroundColor = targetColor;
        }

        updateScoreAndRound();

        if (round < maxRounds) {
            round++;
            setTimeout(() => {
                generateNewColor();
                renderColorOptions();
                gameStatus.textContent = "Guess the correct color!";
                gameStatus.style.color = "black";
                colorBox.style.backgroundColor = "#ccc";
            }, 1500);
        } else {
            setTimeout(() => endGame(), 2000);
        }
    }

    function endGame() {
        gameStatus.textContent = `Game Over! Your final score is ${score}/5`;
        gameStatus.style.color = "blue";
    }

    function resetGame() {
        showInstructions();
    }

    newGameButton.addEventListener("click", resetGame);
    startGameButton.addEventListener("click", startGame);

    showInstructions();
});
