var userScore = 0;
var computerScore = 0;

function showMessage(message) {
    var messageElement = document.createElement('p');
    messageElement.innerText = "";
    messageElement.innerText = message;
}

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
