import { UpdateTable } from './function.js';

(function () {
  'use strict';
  var script = document.createElement('script');
  script.setAttribute('src', 'https://code.jquery.com/jquery-1.12.4.min.js');
  // script.setAttribute('type', 'text/javascript');
  script.setAttribute('type', 'module');
  script.addEventListener('load', function () {
    UpdateTable();
  });
})();
