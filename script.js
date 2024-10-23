const animalImages = [
    '🐶', '🐱', '🐭', '🦊', '🐻', '🐯', '🐷', '🐸',
    '🐶', '🐱', '🐭', '🦊', '🐻', '🐯', '🐷', '🐸'
];

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    shuffle(animalImages);
    
    animalImages.forEach((animal, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;
        card.innerHTML = `
            <div class="front-face hidden">${animal}</div>
            <div class="back-face">?</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    this.querySelector('.front-face').classList.remove('hidden');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard.querySelector('.front-face').classList.add('hidden');
        secondCard.querySelector('.front-face').classList.add('hidden');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

createBoard();
