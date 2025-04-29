const emojis = ['🍎','🍌','🍇','🍒','🍍','🥝','🍑','🍉'];
const cardsArray = [...emojis, ...emojis]; // 8 * 2 = 16 карт

cardsArray.sort(() => 0.5 - Math.random());

const grid = document.getElementById('grid');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
  cardsArray.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;
    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetBoard();
    }, 800);
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();
