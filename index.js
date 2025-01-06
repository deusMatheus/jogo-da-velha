let numberOfPlays = 9;
let buttons = [];
let play = ''
let playerName1 = '';
let playerName2 = '';

for (i = 1; i<=9; i++){
    buttons.push(document.getElementById('button'+i));
}

let buttonsPlay = buttons;

document.getElementById('player1').value = '';
document.getElementById('player2').value = '';

document.getElementById('startGame').addEventListener('click', function(){
    playerName1 = document.getElementById('player1').value;
    playerName2 = document.getElementById('player2').value;
//    console.log(playerName1, playerName2);
    if(playerName1 == '' || playerName2 == '') {
        alert('Campo de nome vazio!');
    } else {
        document.getElementById('startGame').disabled = true;
        document.getElementById('startGame').style.display = 'none';
        document.getElementById('player1').disabled = true;
        document.getElementById('player2').disabled = true;
        startGame();
    }
});

document.querySelectorAll('.buttonPlay').forEach(function(pressedButton){
    pressedButton.addEventListener('click', function(){
        play = pressedButton.dataset.value;
        if(playerOfTheTime(playerName1, playerName2) == 1){
            buttonsPlay[play] = 'x';
            document.getElementById('button' + play).innerText = 'X';
            disableButton(play, 1);
        } else {
            buttonsPlay[play] = 'o'
            document.getElementById('button' + play).innerText = 'O';
            disableButton(play, 2);
        }
//        console.log(buttonsPlay);
    numberOfPlays -= 1;
    if(winnerTest() == '1'){
        console.log('Jogador 1 venceu');
        disableAll('1');
        enableReplay()
    } else if(winnerTest() == '2'){
        console.log('Jogador 2 venceu');
        disableAll('2');
        enableReplay()
    } else if(winnerTest() == 'draw'){
        console.log('Empate.');
        disableAll('0');
        enableReplay()
    }
    });
});

function winnerTest() {
    if ((buttonsPlay[0] == 'o' && buttonsPlay[1] == 'o' && buttonsPlay[2] == 'o') ||
        (buttonsPlay[3] == 'o' && buttonsPlay[4] == 'o' && buttonsPlay[5] == 'o') ||
        (buttonsPlay[6] == 'o' && buttonsPlay[7] == 'o' && buttonsPlay[8] == 'o') ||
        (buttonsPlay[0] == 'o' && buttonsPlay[3] == 'o' && buttonsPlay[6] == 'o') ||
        (buttonsPlay[1] == 'o' && buttonsPlay[4] == 'o' && buttonsPlay[7] == 'o') ||
        (buttonsPlay[0] == 'o' && buttonsPlay[4] == 'o' && buttonsPlay[8] == 'o') ||
        (buttonsPlay[2] == 'o' && buttonsPlay[4] == 'o' && buttonsPlay[6] == 'o')) {
            return '1';
    } else if ((buttonsPlay[0] == 'x' && buttonsPlay[1] == 'x' && buttonsPlay[2] == 'x') ||
        (buttonsPlay[3] == 'x' && buttonsPlay[4] == 'x' && buttonsPlay[5] == 'x') ||
        (buttonsPlay[6] == 'x' && buttonsPlay[7] == 'x' && buttonsPlay[8] == 'x') ||
        (buttonsPlay[0] == 'x' && buttonsPlay[3] == 'x' && buttonsPlay[6] == 'x') ||
        (buttonsPlay[1] == 'x' && buttonsPlay[4] == 'x' && buttonsPlay[7] == 'x') ||
        (buttonsPlay[0] == 'x' && buttonsPlay[4] == 'x' && buttonsPlay[8] == 'x') ||
        (buttonsPlay[2] == 'x' && buttonsPlay[4] == 'x' && buttonsPlay[6] == 'x')) {
            return '2';
    } else if(numberOfPlays == 0) {
            return 'draw';
    } else {
            return false;
    }
}

function disableButton (index, player) {
    document.getElementById('button'+index).classList.add('player' + player + 'Game');
    document.getElementById('button'+index).disabled = true;
}

function disableAll (winner) {
    document.querySelectorAll('.buttonPlay').forEach(function(disableButtonAll){
        disableButtonAll.disabled = true;
    })
    let texto = '';
    if(winner == '1'){
        let audio = new Audio('victory_song.mp3');
        audio.play()    
        texto = 'Parabéns! O jogador ' + playerName1 + ' venceu!';
    } else if(winner == '2'){
        let audio = new Audio('victory_song.mp3');
        audio.play()
        texto = 'Parabéns! O jogador ' + playerName2 + ' venceu!';
    } else {
        let audio = new Audio('draw.mp3');
        audio.play()
        texto = 'Vish, deu velha! :S';
    }
    document.getElementById('playerMoment').innerText = texto;
    enableReplay()
}

// Criar a parte do botão  com JS
function enableReplay() {
    document.getElementById('replayButton').style.display = 'inline-block';
    document.getElementById('replayButton').disabled = false
}

document.getElementById('replayButton').addEventListener('click', function(){
    numberOfPlays = 9
    for(i = 0; i < numberOfPlays; i++){
        buttonsPlay[i] = ''
        buttons[i] = ''        
    }
    document.querySelectorAll('.buttonPlay').forEach(function(disableButtonAll){
        disableButtonAll.disabled = false;
        disableButtonAll.innerHTML = '';
        disableButtonAll.classList.remove('player1Game')
        disableButtonAll.classList.remove('player2Game')
        disableButtonAll.classList.add('buttonPlay');

    })
    document.getElementById('replayButton').disabled = true;
    document.getElementById('replayButton').style.display = 'none';
//    document.getElementById('player1').disabled = true;
//    document.getElementById('player2').disabled = true;
    startGame();
})

//function replayPressed() {
//}

function player1(jogada){
    buttonsPlay[jogada] = 'x';
    disable (jogada, 1);
}

function player2(jogada){
    buttonsPlay[jogada] = 'x';
    disable (jogada, 2);
}

function startGame() {

    document.getElementById('buttonGrid').classList.remove('buttonPlayGridInitial')
    document.getElementById('buttonGrid').classList.add('buttonPlayGrid');
    playerOfTheTime(playerName1, playerName2);
    document.getElementById('playerMoment').innerText = 'O jogador da vez é ' + playerName2;

}

function playerOfTheTime (playerName1, playerName2){
    if(numberOfPlays % 2 == 0){
        document.getElementById('playerMoment').innerText = 'O jogador da vez é ' + playerName2;
        return 2;
    } else {
        document.getElementById('playerMoment').innerText = 'O jogador da vez é ' + playerName1;
        return 1;
    }
}
