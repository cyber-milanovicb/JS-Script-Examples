/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameActive, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameActive) {
        // 1. RANDOM NUMBER
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        // 2. DISPLAY THE RESULT
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-2').style.display = 'block';
        document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
        document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';
        console.log(dice1, dice2);
        // 3. UPDATE THE ROUND SCORE IF THE ROLLED NUMBER WAS NOT A 1
        if (dice1 !== 1 || dice2 !== 1) {
            // ADD SCORE
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // NEXT PLAYER
            nextPlayer();
        }
        // WHEN THE PLAYER ROLLS TWO 6'S IN A ROW -> NEXT PLAYER
        // if (dice === 6 && prevDice === 6) {
        //     // PLAYER LOOSES SCORE
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = 0;
        //     nextPlayer();
        // } else if (dice !== 1) {
        //     // ADD SCORE
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } else {
        //     // NEXT PLAYER
        //     nextPlayer();
        // }
        // prevDice = dice;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameActive) {
        // ADD CURRENT SCORE TO GLOBAL SCORE
        scores[activePlayer] += roundScore;

        // UPDATE THE UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // SET THE FINAL SCORE VALUE
        let input = document.querySelector('.final-score').value;
        let finalScore;
        // UNDEFINED, 0, NULL, "" ARE COERCED TO FALSE - SO IF THE VALUE IS NOT SET ITS = FALSE
        if (input) {
            finalScore = input;
        } else {
            finalScore = 100;
        }

        // CHECK IF PLAYER WON THE GAME
        if (scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameActive = false;
        } else {
            // NEXT PLAYER
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
    // NEXT PLAYER
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameActive = true;

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}