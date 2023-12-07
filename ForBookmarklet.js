(function () {
  'use strict';
  let jquery = document.createElement('script');
  jquery.setAttribute('src', 'https://code.jquery.com/jquery-1.12.4.min.js');
  document.head.appendChild(jquery);

  let script = document.createElement('script');
  script.setAttribute('src', 'https://sto9.github.io/Score-Tolerance/function.js');
  script.setAttribute('type', 'text/javascript');
  script.addEventListener('load', function () {
    UpdateTable();
  });
  document.head.appendChild(script);
})();
