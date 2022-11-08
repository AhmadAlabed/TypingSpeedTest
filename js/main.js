//////////////////////////////////////////////////////////////////
const startBtn = document.getElementById("start");
const cancelBtn = document.getElementById("cancel");
const okBtn = document.getElementById("ok");
const levelName = document.getElementById("level");
const levelTime = document.getElementById("second");
const word = document.getElementById("word");
const upcomingWords = document.getElementById("upcoming-words");
const timeLeft = document.getElementById("time");
const score = document.getElementById("score");
const scoreGet = document.querySelector("#score .get");
const scoreTotal = document.querySelector("#score .total");
const input = document.getElementById("input");
const finishMsg = document.querySelector(".finish");
const myModal = document.querySelector(".my-modal");
//////////////////////////////////////////////////////////////////
const words = ["What", "need", "actually", "Creativity"];
let wordsLength = words.length;
const levels = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
//////////////////////////////////////////////////////////////////
let selectedLevel = Object.keys(levels)[0];
let selectedTime = levels.Easy;
//////////////////////////////////////////////////////////////////
function initLevel() {
  levelName.innerText = " " + selectedLevel + " level,";
  levelTime.innerText = " [" + selectedTime + "] ";
  timeLeft.innerText = selectedTime;
  scoreTotal.innerText = words.length;
}
//////////////////////////////////////////////////////////////////
input.addEventListener("paste", function (e) {
  e.preventDefault();
});
//////////////////////////////////////////////////////////////////
startBtn.addEventListener("click", function () {
  if (this.innerText === "Start") {
    //this.style.cssText += "visibility: hidden;";
    this.innerText = "Reset";
    generateRandomWord();
    input.focus();
  } else {
    window.location.reload();
  }
});
//////////////////////////////////////////////////////////////////
function generateRandomWord() {
  let randomWord = words[parseInt(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  word.innerText = randomWord;
  upcomingWords.innerHTML = "";
  let upcomingWordsInner = "";
  for (let i = 0; i < words.length; i++) {
    upcomingWordsInner += `<div>${words[i]}</div>`;
  }
  upcomingWords.innerHTML = upcomingWordsInner;
  startGame();
}
//////////////////////////////////////////////////////////////////
function startGame() {
  timeLeft.innerText = selectedTime;
  if (words.length === wordsLength - 1) {
    timeLeft.innerText = selectedTime + 3;
  }
  let start = setInterval(() => {
    timeLeft.innerText--;
    if (timeLeft.innerText === "0") {
      clearInterval(start);
      if (
        word.innerText.toLocaleLowerCase() === input.value.toLocaleLowerCase()
      ) {
        input.value = "";
        scoreGet.innerText++;
        if (words.length > 0) {
          generateRandomWord();
        } else {
          finishMsg.style.color = "green";
          finishMsg.innerText = "You win!";
        }
      } else {
        finishMsg.style.color = "red";
        finishMsg.innerText = "Game Over";
      }
    }
  }, 1000);
}
//////////////////////////////////////////////////////////////////
cancelBtn.addEventListener("click", function () {
  myModal.style.display = "none";
  initLevel();
});
okBtn.addEventListener("click", function () {
  selectedLevel = document.querySelector(
    '.my-modal .radio input[name="radio"]:checked'
  ).value;
  selectedTime =
    levels[
      document.querySelector('.my-modal .radio input[name="radio"]:checked')
        .value
    ];
  myModal.style.display = "none";
  initLevel();
});
//////////////////////////////////////////////////////////////////
