function GetChain(ID, src) {
  const chain_check_text = 'CH' + ID;
  var chain = '';
  $.ajax({
    type: 'GET',
    url: src,
    dataType: "text",
    async: false,
  })
    .done(function (textall) {
      textall = textall.split('\n');
      for (const textdata of textall) {
        const check_text = textdata.slice(4, 12);
        if (check_text == chain_check_text) {
          let j = textdata.indexOf("CHAIN", 15) + 5;
          while (!(textdata[j - 1] == '>' && $.isNumeric(textdata[j])) && j < textdata.length) {
            j++;
          }
          while (textdata[j] != '<' && j < textdata.length) {
            chain += textdata[j];
            j++;
          }
          break;
        }
      }
    });
  return chain;
}

function CalcTolerance(chain, gametype) {
  if (gametype === 0) { // SDVX
    return Math.floor(chain / 50);
  } else if (gametype === 1) { // CHUNITHM
    let res = [];
    let t = Math.floor((2500 * chain) / 510000 * 10) / 10; // ATTACK
    res.push(t.toFixed(1));
    t = Math.floor((1000 * chain) / 510000 * 10) / 10; // ATTACK
    res.push(t.toFixed(1));
    t = Math.floor(chain / 100);
    res.push(t);
    return res;
  }
}

function UpdateRowHead(tbodyElement, gametype) {
  console.log(tbodyElement);
  if (gametype === 0) {
    tbodyElement.insertAdjacentHTML('afterbegin', '<tr><td></td><td></td><td></td><td style="text-align:right;"><div class="f3">※最新でない恐れあり</div></td></tr>');
    tbodyElement.insertAdjacentHTML('afterbegin', '<tr><td></td><td></td><td></td><td style="text-align:right;"><div class="f1">S許容ニア数</div></td></tr>');
  } else if (gametype === 1) {
    tbodyElement.insertAdjacentHTML(
      'afterbegin',
      '<tr><td></td><td><td style="text-align:right;"><div class="f2">SSS<br>(A)</div></td>'
      + '<td style = "text-align:right;"><div class="f2">SSS+<br>(A)</div></td>'
      + '<td style = "text-align:right;"><div class="f2">99AJ<br>(J)</div></td>'
    );
  }
}

function UpdateRow(sortElement, gametype) {
  const scriptElement = sortElement.previousSibling;
  const src = scriptElement.getAttribute('src');
  const ID = sortElement.innerHTML.slice(4, 4 + 6);
  const chain = parseInt(GetChain(ID, src));
  console.log(chain);
  const trElement = sortElement.parentElement.parentElement;

  if (isNaN(chain)) return;
  if (gametype === 0) {
    trElement.insertAdjacentHTML('afterend', '<td style="text-align:right;"><div class="f1">' + CalcTolerance(chain, gametype) + '</div></td>');
  } else if (gametype === 1) {
    const result = CalcTolerance(chain, gametype);
    console.log(result);
    trElement.insertAdjacentHTML(
      'afterend',
      '<td style="text-align:right;"><div class="f2">' + result[0] + '</div></td>'
      + '<td style="text-align:right;"><div class="f2">' + result[1] + '</div></td>'
      + '<td style="text-align:right;"><div class="f2">' + result[2] + '</div></td>'
    );
  }
}

function UpdateTable() {
  const url = location.href;
  let gametype = 0;
  const regex_chuni = new RegExp('^https://sdvx.in/chunithm');
  const regex_ongeki = new RegExp('^https://sdvx.in/ongeki');
  const regex_prsk = new RegExp('^https://sdvx.in/prsk');
  const regex_ymst = new RegExp('^https://sdvx.in/ymst');
  if (regex_chuni.test(url)) gametype = 1;
  else if (regex_ongeki.test(url)) gametype = 2;
  else if (regex_prsk.test(url)) gametype = 3;
  else if (regex_ymst.test(url)) gametype = 4;

  if (document.getElementById('extended') !== null) return;

  const scriptElements = document.documentElement.getElementsByTagName('script');
  console.log(scriptElements)
  const regex_SORT = new RegExp('^SORT[0-9]');
  let headAdded = false;
  for (let scriptElement of scriptElements) {
    if (regex_SORT.test(scriptElement.innerText)) {
      UpdateRow(scriptElement, gametype);
      if (!headAdded) {
        UpdateRowHead(
          scriptElement.parentElement.parentElement.parentElement,
          gametype);
        headAdded = true;
      }
    }
  }

  document.getElementsByTagName('head')[0].setAttribute('id', 'extended');
}

/*
    const html_idx = [[1, 9], [4, 2]];
    const start_index = [2, 2];
    const html0 = document.getElementsByTagName('center')[0].getElementsByClassName('c')[html_idx[0][gametype]].getElementsByClassName('tbg')[0];
    if (gametype == 0) {
      html0.getElementsByTagName('tbody')[0].insertAdjacentHTML('afterbegin', '<tr><td></td><td></td><td></td><td style="text-align:right;"><div class="f3">※最新でない恐れあり</div></td></tr>');
      html0.getElementsByTagName('tbody')[0].insertAdjacentHTML('afterbegin', '<tr><td></td><td></td><td></td><td style="text-align:right;"><div class="f1">S許容ニア数</div></td></tr>');
    } else {
      html0.getElementsByTagName('tbody')[0].insertAdjacentHTML(
        'afterbegin',
        '<tr><td></td><td><td style="text-align:right;"><div class="f2">SSS<br>(A)</div></td>'
        + '<td style = "text-align:right;"><div class="f2">SSS+<br>(A)</div></td>'
        + '<td style = "text-align:right;"><div class="f2">99AJ<br>(J)</div></td>'
      );
    }
    const html = html0.getElementsByTagName('tr');
    for (let i = start_index[gametype]; i < html.length; i++) {
      const td = html[i].getElementsByTagName('td');
      if (td.length <= 1) continue;
      const script_data = td[0].getElementsByTagName('script');
      const src = script_data[0].getAttribute('src');
      const ID = script_data[1].innerHTML.slice(4, 4 + 6);
      const chain = parseInt(GetChain(ID, src));
      if (isNaN(chain)) continue;
      if (gametype == 0) {
        td[html_idx[1][gametype]].insertAdjacentHTML('afterend', '<td style="text-align:right;"><div class="f1">' + CalcTolerance(chain, gametype) + '</div></td>');
      } else {
        const result = CalcTolerance(chain, gametype);
        td[html_idx[1][gametype]].insertAdjacentHTML(
          'afterend',
          '<td style="text-align:right;"><div class="f2">' + result[0] + '</div></td>'
          + '<td style="text-align:right;"><div class="f2">' + result[1] + '</div></td>'
          + '<td style="text-align:right;"><div class="f2">' + result[2] + '</div></td>'
        );
      }
    }
    document.getElementsByTagName('head')[0].setAttribute('id', 'extended');  */