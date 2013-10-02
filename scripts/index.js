
var startButtonFR = document.querySelector("#start-button-fr");
var startButtonEN = document.querySelector("#start-button-en");
var wordQuestion = document.querySelector("#word-question");
var wordInput = document.querySelector("#word-input");
var gameOver = document.querySelector("#game-over");
var gameOverMessage = document.querySelector("#game-over-message");
var replayButton = document.querySelector("#replay-button");
var scoreMessage = document.querySelector("#score-message");
var errorMessage = document.querySelector("#error-message");
var successMessage = document.querySelector("#success-message");
var timeMessage = document.querySelector("#time-message");
var missMessage = document.querySelector("#miss-message");
var currentWord = [];
var total = words.length;
var current = 1;
var errors = 0;
var FIRST = 0;
var SECOND = 1;
var currentTime = 0;
var inGame = false;
var maxDist = 0.15;
var missDist = 0.30;

setInterval(function () {
  if (inGame) {
    ++currentTime;
    timeMessage.innerHTML = ~~(currentTime / 60) + ":" + ~~(currentTime % 60);
  }
}, 1000);

function showGameOver() {
  inGame = false;
  var messages = [
    "Perfect, awesome!",
    "Great :p",
    "Not too bad :/",
    "I must work harder...",
    "Seriously?!",
    "You desapoint me so mush -_-"
  ];
  gameOver.style.display = "block";
  wordQuestion.style.display = "none";
  wordInput.style.display = "none";
  errorMessage.style.display = "none";
  successMessage.style.display = "none";
  var percent = errors / total;
  if (percent === 0)
    gameOverMessage.innerHTML = messages[0];
  else if (percent < 0.1)
    gameOverMessage.innerHTML = messages[1];
  else if (percent < 0.2)
    gameOverMessage.innerHTML = messages[2];
  else if (percent < 0.4)
    gameOverMessage.innerHTML = messages[3];
  else if (percent < 0.7)
    gameOverMessage.innerHTML = messages[4];
  else
    gameOverMessage.innerHTML = messages[5];
}

replayButton.addEventListener("click", function () {
  window.location.reload();
});

function nextQuestion() {
  scoreMessage.innerHTML = errors + " errors on " + total;
  if (words.length === 0)
    return showGameOver();
  currentWord = words.splice(
    ~~(Math.random() * words.length - 1), 1
  )[0];
  wordQuestion.innerHTML = current + ". " + currentWord[FIRST];
  ++current;
}

function startGame() {
  startButtonFR.style.display = "none";
  startButtonEN.style.display = "none";
  wordQuestion.style.display = "block";
  wordInput.style.display = "block";
  inGame = true;
  nextQuestion();
}

function answerQuestion() {
  var first = wordInput.value.toLowerCase();
  var second = currentWord[SECOND].toLowerCase();
  var Dist = distanceSift3(cleanDeter(first), cleanDeter(second))/second.length;

  if (Dist < maxDist) {
    missMessage.style.display = "none";
    errorMessage.style.display = "none";
    successMessage.style.display = "block";
  } else  if (Dist < missDist) {
    missMessage.innerHTML = currentWord[SECOND];
    missMessage.style.display = "block";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
  } else {
    errorMessage.innerHTML = currentWord[SECOND];
    errorMessage.style.display = "block";
    missMessage.style.display = "none";
    successMessage.style.display = "none";
    errors++;
  }
  wordInput.value = "";
  nextQuestion();
}

startButtonFR.addEventListener("click", startGame);
startButtonEN.addEventListener("click", function () {
  FIRST = 1;
  SECOND = 0;
  startGame();
});

wordInput.addEventListener("change", answerQuestion);