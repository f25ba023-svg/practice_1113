# じゃんけん・ミニゲーム集 ✊✌️✋

## 概要
（あとで書く）

## 担当表

| 担当 | 役割 | 担当者 |
|------|------|--------|
| A | メニュー画面 | 004 |
| B | じゃんけん | 043 |
| C | 数当てゲーム | 013 |
| D | 反射神経ゲーム（色が変わったらクリック） | 053 |
| E | デザインとハイスコアの保存 | 023 |

## ファイルについて

ミニゲーム担当（B・C・D）は、それぞれ自分のhtmlとjsのファイルを担当してください。
AとEは全体に関わるので、後ほど話し合います。
以下のファイル名でファイルを作ってください。お願いします。

```
├── index.html     ← A：メニュー画面
├── janken.html    ← B：じゃんけん
├── janken.js
├── number.html    ← C：数当てゲーム
├── number.js
├── reflex.html    ← D：反射神経ゲーム
├── reflex.js
├── style.css      ← E：デザイン（全体）
└── score.js       ← E：ハイスコアの保存
```

## 実行方法
（あとで書く。例：index.html をブラウザで開く）



# score.js の使い方
    HTMLで自分のJSより前に <script src="score.js"></script> を読み込んでください。
    ゲーム終了時に saveScore("ゲーム名", スコア) を呼ぶと保存されます（ハイスコア更新なら true が返ります）。
    ハイスコアの表示は getHighScore("ゲーム名") です。
    ゲーム名は janken / number / reflex でやってください。

自分のJSより先にいれるやつ！
```
<script src="score.js"></script>
<script src="janken.js"></script>

```

ゲーム終わりに入れるやつ
```
// ゲーム終了時
const isNew = saveScore("janken", 5);   // 5連勝を保存
if (isNew) {
  alert("ハイスコア更新！");
}

// 画面にハイスコアを表示したいとき
const best = getHighScore("janken");    // 記録がなければ null

```