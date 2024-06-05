const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('playSound');
const restartButton = document.getElementById('restart');
const timerElement = document.getElementById('timer');

const a = document.getElementById('playSound');
const audio = document.getElementById('audio');



let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeLeft = 60;
let isGameStarted = false;

const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'];
const symbols = [...images, ...images];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = '';
    shuffle(symbols);
    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;

        const img = document.createElement('img');
        img.src = `images/${symbol}`;
        card.appendChild(img);

        const back = document.createElement('div');
        back.classList.add('back');
        card.appendChild(back);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (!isGameStarted || flippedCards.length === 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === symbols.length / 2) {
            clearInterval(timer);
            alert('¡Has ganado!');
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
    }
}

function startGame() {
    if (isGameStarted) return;

    isGameStarted = true;
    matchedPairs = 0;
    timeLeft = 60;
    timerElement.textContent = timeLeft;
    createBoard();
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert('¡Se acabó el tiempo!');
            isGameStarted = false;
        }
    }, 1000);
}

function restartGame() {
    clearInterval(timer);
    isGameStarted = false;
    timerElement.textContent = 60;
    flippedCards = [];
    matchedPairs = 0;
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
2

