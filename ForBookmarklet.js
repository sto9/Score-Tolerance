(function () {
  'use strict';
  var script = document.createElement('script');
  script.setAttribute('src', 'https://code.jquery.com/jquery-1.12.4.min.js');
  script.setAttribute('src', 'https://sto9.github.io/Score-Tolerance/function.js');
  script.setAttribute('type', 'text/javascript');
  script.addEventListener('load', function () {
    UpdateTable();
  });
})();
