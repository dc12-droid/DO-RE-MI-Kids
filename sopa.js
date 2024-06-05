const noteContainers = document.querySelectorAll('.note-container');
const startBtn = document.getElementById('start-btn');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

let currentNote = null;
let score = 0;
let gameStarted = false;
let intervalId = null;

function startGame() {
    gameStarted = true;
    score = 0;
    scoreElement.textContent = score;
    messageElement.textContent = '';
    showRandomNote();
    startBtn.disabled = true;
    intervalId = setInterval(showRandomNote, 3000);
}

function showRandomNote() {
    const randomIndex = Math.floor(Math.random() * noteContainers.length);
    currentNote = noteContainers[randomIndex].querySelector('.note').textContent;
    noteContainers.forEach((container, index) => {
        container.classList.toggle('active', index === randomIndex);
    });
}

function checkNote(note) {
    if (gameStarted && note === currentNote) {
        score++;
        scoreElement.textContent = score;
        if (score === 5) {
            gameStarted = false;
            clearInterval(intervalId);
            messageElement.textContent = '¡Felicitaciones! Has acertado 5 notas.';
            startBtn.disabled = false;
        } else {
            showRandomNote();
        }
    }
}

noteContainers.forEach(container => {
    container.addEventListener('click', () => {
        checkNote(container.querySelector('.note').textContent);
    });
});

startBtn.addEventListener('click', startGame);

window.addEventListener('keydown', (event) => {
    switch (event.key.toUpperCase()) {
        case 'C':
            checkNote('DO');
            break;
        case 'D':
            checkNote('RE');
            break;
        case 'E':
            checkNote('MI');
            break;
        case 'F':
            checkNote('FA');
            break;
        case 'G':
            checkNote('SOL');
            break;
        case 'A':
            checkNote('LA');
            break;
        case 'B':
            checkNote('SI');
            break;
    }
});