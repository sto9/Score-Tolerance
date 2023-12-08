const scripts =
  ['https://code.jquery.com/jquery-1.12.4.min.js',
    'https://sto9.github.io/Score-Tolerance/function.js'];

let si = 0;

(function appendScript() {
  'use strict';

  let script = document.createElement('script');
  script.setAttribute('src', scripts[si]);
  document.head.appendChild(script);
  if (si === 0) {
    script.onload = appendScript;
    si++;
  } else if (si === 1) {
    script.addEventListener('load', function () {
      UpdateTable();
    });
  }
})();
