var userScore = 0;
var computerScore = 0;

function showMessage(message) {
    var messageElement = document.createElement('p');
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
}

var gameInterval;

document.getElementById("startGame").addEventListener("click", function () {
    showMessage("게임을 시작합니다!");
    gameInterval = setInterval(function() {
        playGame('가위'); // 예시로 '가위'를 사용하였습니다. 실제로는 사용자의 입력을 받아야 합니다.
    }, 1000); // 1초마다 playGame 함수를 실행합니다.
});

// document.getElementById("startGame").addEventListener("click", function () {
//     showMessage("게임을 시작합니다!");
// });

// document.getElementById("stopGame").addEventListener("click", function () {
//     showMessage("게임을 종료합니다!");
// });

function playGame(userChoice) {
    var choices = ['가위', '바위', '보'];
    var computerChoice = choices[Math.floor(Math.random() * 3)];

    showMessage("당신: " + userChoice + " vs 컴퓨터: " + computerChoice);

    if (userChoice === computerChoice) {
        showMessage("무승부!");
    } else if (
        (userChoice === '가위' && computerChoice === '보') ||
        (userChoice === '바위' && computerChoice === '가위') ||
        (userChoice === '보' && computerChoice === '바위')
    ) {
        showMessage("승리!");
        userScore++;
    } else {
        showMessage("패배!");
        computerScore++;
    }

    updateScore();
}

function updateScore() {
    document.getElementById("userScore").innerText = "사용자 점수: " + userScore;
    document.getElementById("computerScore").innerText = "컴퓨터 점수: " + computerScore;
}

document.getElementById("scissors").addEventListener("click", function () {
    playGame('가위');
});

document.getElementById("rock").addEventListener("click", function () {
    playGame('바위');
});

document.getElementById("paper").addEventListener("click", function () {
    playGame('보');
});

document.getElementById("stopGame").addEventListener("click", function () {
    showMessage("게임을 종료합니다!");
    clearInterval(gameInterval); // 게임을 중지합니다.
});