
var startButtonFR = document.querySelector("#start-button-fr");
var startButtonEN = document.querySelector("#start-button-en");
var wordQuestion = document.querySelector("#word-question");
var wordInput = document.querySelector("#word-input");
var gameOver = document.querySelector("#game-over");
var gameOverMessage = document.querySelector("#game-over-message");
var replayButton = document.querySelector("#replay-button");
var score = document.querySelector("#score");
var errorMessage = document.querySelector("#error-message");
var currentWord = [];
var total = words.length;
var current = 1;
var errors = 0;
var FIRST = 0;
var SECOND = 1;

function showGameOver() {
  gameOver.style.display = "block";
  wordQuestion.style.display = "none";
  wordInput.style.display = "none";
  errorMessage.style.display = "none";
}

replayButton.addEventListener("click", function () {
  window.location.reload();
});

function nextQuestion() {
  score.innerHTML = errors + " errors on " + total;
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
  nextQuestion();
}

function answerQuestion() {
  var first = wordInput.value.toLowerCase();
  var second = currentWord[SECOND].toLowerCase();
  if (first !== second) {
    errorMessage.innerHTML = currentWord[SECOND];
    errorMessage.style.display = "block";
    errors++;
  } else
    errorMessage.style.display = "none";
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