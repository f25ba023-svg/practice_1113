const area = document.getElementById("game-area");
const roundText = document.getElementById("round");
const timeText = document.getElementById("time");
const averageText = document.getElementById("average");
const bestText = document.getElementById("best-score");

const TOTAL_ROUNDS = 5;
let state = "idle";
let round = 0;
let times = [];
let readyAt = 0;
let waitTimer = null;
let nextTimer = null;

function showBest() {
  const best = getHighScore("reflex");
  bestText.textContent = best === null ? "なし" : `${Math.round(best)} ms`;
}

function setRoundText() {
  roundText.textContent = `${round} / ${TOTAL_ROUNDS}`;
}

function setResult(message, className) {
  area.className = className;
  area.textContent = message;
}

function startGame() {
  clearTimeout(waitTimer);
  clearTimeout(nextTimer);
  round = 0;
  times = [];
  timeText.textContent = "- ms";
  averageText.textContent = "- ms";
  setRoundText();
  startRound();
}

function startRound() {
  state = "waiting";
  round += 1;
  setRoundText();
  setResult("まて……", "waiting");

  const delay = 1500 + Math.random() * 2500;
  waitTimer = setTimeout(() => {
    state = "ready";
    readyAt = performance.now();
    setResult("今だ！クリック！", "ready");
  }, delay);
}

function retryRound() {
  state = "waiting";
  setResult("まて……", "waiting");

  const delay = 1500 + Math.random() * 2500;
  waitTimer = setTimeout(() => {
    state = "ready";
    readyAt = performance.now();
    setResult("今だ！クリック！", "ready");
  }, delay);
}

function finishRound(reactionTime) {
  times.push(reactionTime);
  const average = times.reduce((sum, value) => sum + value, 0) / times.length;

  timeText.textContent = `${Math.round(reactionTime)} ms`;
  averageText.textContent = `${Math.round(average)} ms`;
  state = "result";
  setResult(`${Math.round(reactionTime)} ms！\n次へ`, "result");

  if (round >= TOTAL_ROUNDS) {
    finishGame(average);
  } else {
    nextTimer = setTimeout(startRound, 900);
  }
}

function finishGame(average) {
  clearTimeout(waitTimer);
  state = "finished";
  const roundedAverage = Math.round(average);
  const isNewRecord = saveScore("reflex", roundedAverage);

  showBest();
  setResult(
    `平均 ${roundedAverage} ms！\n${isNewRecord ? "ハイスコア更新！" : "もう一度！"}`,
    "result"
  );
}

function handleAreaClick() {
  if (state === "idle" || state === "finished") {
    startGame();
    return;
  }

  if (state === "waiting") {
    clearTimeout(waitTimer);
    state = "result";
    setResult("フライング！もう一度まつ", "waiting");
    nextTimer = setTimeout(retryRound, 1100);
    return;
  }

  if (state === "ready") {
    const reactionTime = performance.now() - readyAt;
    finishRound(reactionTime);
  }
}

area.addEventListener("click", handleAreaClick);
showBest();
