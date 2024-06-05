const words = ['PENTAGRAMA', 'RITMO', 'TONO', 'NOTA', 'ARMONIA', 'ESCALA', 'COMPAS', 'CLAVE'];
const boardSize = 12;
const board = document.getElementById('board');
const wordListElement = document.getElementById('wordList');
const restartButton = document.getElementById('restart');
const messageElement = document.getElementById('message');

let selectedCells = [];
let foundWords = [];

function createBoard() {
    const boardArray = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
    words.forEach(word => placeWord(word, boardArray));
    fillEmptySpaces(boardArray);
    renderBoard(boardArray);
    renderWordList();
}

function placeWord(word, boardArray) {
    const directions = ['horizontal', 'vertical', 'diagonal'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const length = word.length;

    let placed = false;
    while (!placed) {
        let row = Math.floor(Math.random() * boardSize);
        let col = Math.floor(Math.random() * boardSize);

        if (canPlaceWord(word, boardArray, row, col, direction)) {
            for (let i = 0; i < length; i++) {
                switch (direction) {
                    case 'horizontal':
                        boardArray[row][col + i] = word[i];
                        break;
                    case 'vertical':
                        boardArray[row + i][col] = word[i];
                        break;
                    case 'diagonal':
                        boardArray[row + i][col + i] = word[i];
                        break;
                }
            }
            placed = true;
        }
    }
}

function canPlaceWord(word, boardArray, row, col, direction) {
    const length = word.length;

    if (direction === 'horizontal' && col + length > boardSize) return false;
    if (direction === 'vertical' && row + length > boardSize) return false;
    if (direction === 'diagonal' && (row + length > boardSize || col + length > boardSize)) return false;

    for (let i = 0; i < length; i++) {
        switch (direction) {
            case 'horizontal':
                if (boardArray[row][col + i] && boardArray[row][col + i] !== word[i]) return false;
                break;
            case 'vertical':
                if (boardArray[row + i][col] && boardArray[row + i][col] !== word[i]) return false;
                break;
            case 'diagonal':
                if (boardArray[row + i][col + i] && boardArray[row + i][col + i] !== word[i]) return false;
                break;
        }
    }

    return true;
}

function fillEmptySpaces(boardArray) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (boardArray[i][j] === '') {
                boardArray[i][j] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }
}

function renderBoard(boardArray) {
    board.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            cell.textContent = boardArray[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => selectCell(cell));
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function renderWordList() {
    wordListElement.innerHTML = '';
    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        li.dataset.word = word;
        wordListElement.appendChild(li);
    });
}

function selectCell(cell) {
    if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
        selectedCells = selectedCells.filter(c => c !== cell);
    } else {
        cell.classList.add('selected');
        selectedCells.push(cell);
    }

    if (selectedCells.length > 1) {
        checkSelectedCells();
    }
}

function checkSelectedCells() {
    const selectedText = selectedCells.map(cell => cell.textContent).join('');
    const selectedTextReversed = selectedCells.map(cell => cell.textContent).reverse().join('');

    if (words.includes(selectedText) || words.includes(selectedTextReversed)) {
        selectedCells.forEach(cell => cell.classList.add('found'));
        foundWords.push(selectedText);
        const wordElement = document.querySelector(`li[data-word="${selectedText}"], li[data-word="${selectedTextReversed}"]`);
        if (wordElement) {
            wordElement.classList.add('found');
        }
        selectedCells = [];
        checkWinCondition();
    } else {
        setTimeout(() => {
            selectedCells.forEach(cell => cell.classList.remove('selected'));
            selectedCells = [];
        }, 500);
    }
}

function checkWinCondition() {
    if (foundWords.length === words.length) {
        messageElement.textContent = '¡Felicidades, ganaste!';
    }
}

function resetGame() {
    selectedCells = [];
    foundWords = [];
    messageElement.textContent = '';
    createBoard();
}

restartButton.addEventListener('click', resetGame);

window.onload = createBoard;


function selectCell(cell) {
    if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
        selectedCells = selectedCells.filter(c => c !== cell);
    } else {
        cell.classList.add('selected');
        selectedCells.push(cell);
    }

    // Después de seleccionar una celda, verificamos si hay una palabra seleccionada
    checkSelectedWord();
}

function checkSelectedWord() {
    const selectedText = selectedCells.map(cell => cell.textContent).join('');

    // Buscamos si la palabra seleccionada coincide con alguna de las palabras en la lista
    const foundWord = words.find(word => word === selectedText);

    if (foundWord) {
        // Si encontramos una coincidencia, marcamos las celdas como encontradas y actualizamos la lista
        selectedCells.forEach(cell => {
            cell.classList.add('found');
            const wordElement = document.querySelector(`li[data-word="${foundWord}"]`);
            if (wordElement) {
                wordElement.classList.add('found');
            }
        });

        // Limpiamos la selección
        selectedCells = [];

        // Verificamos si se han encontrado todas las palabras
        checkWinCondition();
    }
}

// Agregamos esta nueva función para verificar la condición de victoria
function checkWinCondition() {
    const foundWordCount = document.querySelectorAll('.found').length;
    if (foundWordCount === words.length) {
        messageElement.textContent = '¡Felicidades, ganaste!';
    }
}