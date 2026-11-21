const hands = {
  rock: "グー",
  scissors: "チョキ",
  paper: "パー",
};

let streak = 0;

const resultElement = document.getElementById("result");
const streakElement = document.getElementById("streak");
const highScoreElement = document.getElementById("high-score");
const resetButton = document.getElementById("reset-game");
const choiceButtons = document.querySelectorAll("[data-choice]");

function updateHighScore() {
  const best = getHighScore("janken");
  highScoreElement.textContent = best === null ? "まだ記録なし" : best + "連勝";
}

function chooseHand(playerChoice) {
  const choices = Object.keys(hands);
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  let outcome;
  if (playerChoice === computerChoice) {
    outcome = "draw";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    outcome = "win";
  } else {
    outcome = "lose";
  }

  if (outcome === "win") {
    streak += 1;
    const isNewRecord = saveScore("janken", streak);
    streakElement.textContent = streak;
    updateHighScore();
    resultElement.textContent =
      "あなた：" + hands[playerChoice] + " / コンピューター：" +
      hands[computerChoice] + " → 勝ち！" +
      (isNewRecord ? " ハイスコア更新！" : "");
  } else if (outcome === "draw") {
    resultElement.textContent =
      "あなた：" + hands[playerChoice] + " / コンピューター：" +
      hands[computerChoice] + " → あいこ！";
  } else {
    resultElement.textContent =
      "あなた：" + hands[playerChoice] + " / コンピューター：" +
      hands[computerChoice] + " → 負け！";
    streak = 0;
    streakElement.textContent = streak;
  }
}

choiceButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    chooseHand(button.dataset.choice);
  });
});

resetButton.addEventListener("click", function () {
  streak = 0;
  streakElement.textContent = "0";
  resultElement.textContent = "勝負しよう！";
});

updateHighScore();
