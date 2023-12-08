// ==UserScript==
// @name         Score-Tolerance
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  SDVX, CHUNITHM, オンゲキの譜面保管所で許容を表示します。
// @description  （譜面保管所のデータを使用しているので、SDVXのデータは最新でない可能性があります）
// @author       null
// @include      /https:\/\/sdvx.in\/sort\/sort_[0-9].*/
// @include      /https:\/\/sdvx.in\/chunithm\/sort\/[0-9].*/
// @include      /https:\/\/sdvx.in\/ongeki\/sort\/[0-9].*/
// @icon         
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

const scripts =
  ['https://code.jquery.com/jquery-1.12.4.min.js',
    'https://sto9.github.io/Score-Tolerance/function.js'];

let si = 0;

function appendScript() {
  if (si >= scripts.length) return;
  let script = document.createElement('script');
  script.setAttribute('src', scripts[si]);
  document.head.appendChild(script);
  script.onload = appendScript;
  if (si === 1) {
    script.addEventListener('load', function () {
      UpdateTable();
    });
  }
  si++;
};

(function () {
  window.onload = appendScript;
})();
