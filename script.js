
        document.addEventListener('DOMContentLoaded', () => {
            const memoryGame = document.getElementById('memoryGame');
            const movesDisplay = document.getElementById('moves');
            const restartBtn = document.getElementById('restartBtn');
            let cards = [];
            let flippedCards = [];
            let moves = 0;
            let lockBoard = false;
            const emojis = ['🍎', '🍌', '🍇🥝', '🍓', '🍊', '🍋', '🍒', '🥥'];

            function initGame() {
                cards = [];
                flippedCards = [];
                moves = 0;
                movesDisplay.textContent = moves;
                memoryGame.innerHTML = '';
                lockBoard = false;
                
                const deck = [...emojis, ...emojis];
                shuffleArray(deck);
                
                deck.forEach((emoji, index) => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.dataset.emoji = emoji;
                    
                    card.innerHTML = `
                        <div class="card-inner">
                            <div class="card-front"></div>
                            <div class="card-back">${emoji}</div>
                        </div>
                    `;
                    
                    card.addEventListener('click', flipCard);
                    memoryGame.appendChild(card);
                    cards.push(card);
                });
            }

            function flipCard() {
                if (lockBoard || this === flippedCards[0] || this.classList.contains('flipped')) return;
                
                this.classList.add('flipped');
                flippedCards.push(this);
                
                if (flippedCards.length === 2) {
                    lockBoard = true;
                    moves++;
                    movesDisplay.textContent = moves;
                    
                    checkForMatch();
                }
            }

            function checkForMatch() {
                const isMatch = flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji;
                
                isMatch ? disableCards() : unflipCards();
            }

            function disableCards() {
                flippedCards[0].removeEventListener('click', flipCard);
                flippedCards[1].removeEventListener('click', flipCard);
                
                if (cards.every(card => card.classList.contains('flipped'))) {
                    document.querySelectorAll('.card').forEach(card => {
                        card.classList.add('victory');
                    });
                }
                
                resetFlip();
            }

            function unflipCards() {
                setTimeout(() => {
                    flippedCards[0].classList.remove('flipped');
                    flippedCards[1].classList.remove('flipped');
                    resetFlip();
                }, 1000);
            }

            function resetFlip() {
                lockBoard = false;
                flippedCards = [];
            }

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            restartBtn.addEventListener('click', initGame);
            initGame();
        });