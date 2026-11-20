// score.js : ハイスコアの保存・取得（担当：E）
// ブラウザの localStorage に保存するので、サーバーなしで動きます。
//
// 【使い方】各ゲームのHTMLで、自分のJSより「前」に読み込むこと。
//   <script src="score.js"></script>
//   <script src="janken.js"></script>
//
// 【使える関数】
//   saveScore("janken", 5)    スコアを保存。ハイスコア更新なら true、更新なしなら false
//   getHighScore("janken")    ハイスコアを返す。まだ記録がなければ null
//   resetScore("janken")      そのゲームの記録を消す（テスト用）
//
// 【ゲーム名（第1引数）】 "janken" / "number" / "reflex"

// ゲームごとの「良いスコアの向き」
//   "high" = 大きいほど良い（例：じゃんけんの連勝数）
//   "low"  = 小さいほど良い（例：数当ての回数、反応時間ms）
const SCORE_RULES = {
  janken: "high",
  number: "low",
  reflex: "low",
};

const SCORE_STORAGE_KEY = "minigameScores";

// 保存されている全ゲームのスコアを読み込む
function loadAllScores() {
  try {
    const text = localStorage.getItem(SCORE_STORAGE_KEY);
    return text ? JSON.parse(text) : {};
  } catch (e) {
    console.error("スコアの読み込みに失敗しました", e);
    return {};
  }
}

// 全ゲームのスコアを書き込む
function writeAllScores(scores) {
  try {
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
    return true;
  } catch (e) {
    console.error("スコアの保存に失敗しました", e);
    return false;
  }
}

// ハイスコアを取り出す（記録がなければ null）
function getHighScore(game) {
  const scores = loadAllScores();
  return game in scores ? scores[game] : null;
}

// スコアを保存する。ハイスコア更新なら true を返す
function saveScore(game, score) {
  if (typeof score !== "number" || Number.isNaN(score)) {
    console.error("saveScore: スコアは数字で渡してください", score);
    return false;
  }

  const scores = loadAllScores();
  const best = scores[game];
  const lowerIsBetter = SCORE_RULES[game] === "low";

  const isNewRecord =
    best === undefined || (lowerIsBetter ? score < best : score > best);

  if (isNewRecord) {
    scores[game] = score;
    writeAllScores(scores);
  }
  return isNewRecord;
}

// そのゲームの記録を消す（テスト用）
function resetScore(game) {
  const scores = loadAllScores();
  delete scores[game];
  writeAllScores(scores);
}