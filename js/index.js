var party = 6;
var currencyArr = ["gold", "silver", "copper", "electrum", "platinum"];
var cbArr = ["platinum", "gold", "silver", "copper"];

currencyArr.forEach(cur => {
  window[cur] = 0;
});

cbArr.forEach((cb, i) => {
  cbArr[i] = {name: cb, checked: true, shorthand: cb[0]+"p"};
});

function splitGold() {
  let totalCopper = (gold*100) +
                    (silver*10) +
                    copper +
                    (electrum*50) +
                    (platinum*1000);

  let factor = 1;
  [...cbArr].reverse().some((cb, i) => {
    if (!cb.checked) {
      factor = Math.pow(10, i+1);
      return false;
    }
    return true;
  });

  let dividedCopper = Math.sign(totalCopper)*(Math.floor(Math.abs(totalCopper)/(party*factor))*factor);
  let mvpCopper = dividedCopper + Math.sign(totalCopper)*(Math.abs(totalCopper)%(party*factor));

  return [dividedCopper, mvpCopper];
}

function dungeonSplitter() {
  let pileContents = [];
  let bagContents = [];

  currencyArr.forEach(currency => {
    if (window[currency] != 0) {
      let amount = window[currency];
      let sh = currency[0]+"p";

      // equal piles
      if ((Math.floor(Math.abs(amount)/party)) != 0)
      pileContents.push({shorthand: sh, amount: Math.sign(amount)*(Math.floor(Math.abs(amount)/party))});
      
      // into the bag
      if ((Math.abs(amount)%party) != 0)
      bagContents.push({shorthand: sh, amount: Math.sign(amount)*(Math.abs(amount)%party)});
    }
  });

  return [pileContents, bagContents];
}

function createLabel(name, parentEl, type) {
  let label = document.createElement('div');
  label.innerHTML = (type != "cb") ? name[0].toUpperCase() + name.substring(1) : name.toUpperCase();
  label.classList.add("label");
  parentEl.appendChild(label);
}

function createInput(inputName, parentEl, type) {
  // inputHolder
  let inputHolder = document.createElement('div');
  inputHolder.classList.add("inputHolder");

  switch (type) {
    case "field":
      // label
      createLabel(inputName, inputHolder);

      // field
      let field = document.createElement('INPUT');
      field.defaultValue = window[inputName];
      field.type = "number";
      field.classList.add("field");
      field.id = inputName;
      field.onblur = () => {
        if (field.value == '') {
          if (field.id == "party") field.value = 2;
          else field.value = 0;
        }
      }
      inputHolder.appendChild(field);
      break;
    case "button":
      // btn
      let btn = document.createElement('button');
      btn.innerText = "Split in\n"+inputName;
      btn.classList.add("btn");
      btn.onclick = () => {
        currencyArr.forEach(cur => {
          window[cur] = parseFloat(document.getElementById(cur).value);
        });

        party = parseInt(document.getElementById("party").value);

        results.innerHTML = window["splitIn"+inputName]();
      }
      inputHolder.appendChild(btn);
      break;
    case "cb":
      // label
      createLabel(inputName, inputHolder, "cb");

      // cb
      let cb = document.createElement('INPUT');
      cb.type = "checkbox";
      cb.checked = true;
      cb.classList.add("cb");
      cb.id = inputName;
      inputHolder.appendChild(cb);
      break;
  }
  
  parentEl.appendChild(inputHolder);
}

function formatResults(dividedCurs) {
  function splitNumIntoArray(amount) {
    return String(Math.abs(amount)).split(/(\d*(?=\d{3}))?(\d?(?=\d{2}))?(\d?(?=\d{1}))?(\d?$)?/).filter(Boolean).map((num)=>{
      return Math.sign(amount)*Number(num);
    });
  }

  function otherChecked(present) {
    let bigger = cbArr.some((cb, i) => {
      if (present > i && cb.checked) return true;
      else return false;
    });

    let smaller = cbArr.some((cb, i) => {
      if (present < i && cb.checked) return true;
      else return false;
    });

    if (!smaller && bigger) return true;
  }

  function getResultStr(copperArr, override) {
    let str = "";
    let holding = 0;
    let coinCount = 0;

    copperArr.forEach((digit, i) => {
      if (digit != 0 || holding != 0) {
        let cbIndex = cbArr.length - copperArr.length + i;
        if (cbArr[cbIndex].checked || (override && otherChecked(cbIndex)) || (cbIndex == cbArr.length-1)) {
          if (str.slice(-1) == "p") str += " , ";
          coinCount += (digit+holding);
          str += "<span>"+(digit+holding)+"</span>"+cbArr[cbIndex].shorthand;
          holding = 0;
        } else holding = (holding+digit)*10;
      }
    });

    if (coinCount != 0) str += "</span><span class=\"label\">Weight: "+(coinCount*0.02).toFixed(2)+" lb";

    return str;
  }

  return  "<div class=\"result\">"+
            "<span class=\"label\">Each party member gets</span>"+
            "<span class=\"amount\">"+getResultStr(splitNumIntoArray(dividedCurs[0]))+"</span>"+
          "</div>"+
          ((dividedCurs[0] != dividedCurs[1])?
          "<div class=\"result\">"+
            "<span class=\"label\">MVP instead gets</span>"+
            "<span class=\"amount\">"+getResultStr(splitNumIntoArray(dividedCurs[1]), true)+"</span>"+
          "</div>":
          "");
}

function formatDungeonResults(piles) {
  let pileStr = "";
  let bagStr = "";

  function getResultStr(pile) {
    let str = "";
    let coinCount = 0;

    pile.forEach((currency, i) => {
      if (str.slice(-1) == "p") str += " , ";
      coinCount += pile[i].amount;
      str += "<span>"+pile[i].amount+"</span>"+pile[i].shorthand;
    });

    if (coinCount != 0) str += "</span><span class=\"label\">Weight: "+(coinCount*0.02).toFixed(2)+" lb";

    return str;
  }

  return  "<div class=\"result\">"+
            "<span class=\"label\">Each party member gets</span>"+
            "<span class=\"amount\">"+getResultStr(piles[0])+"</span>"+
          "</div>"+
          ((piles[1].length >= 1)?
          "<div class=\"result\">"+
            "<span class=\"label\">The dungeon bag gets</span>"+
            "<span class=\"amount\">"+getResultStr(piles[1])+"</span>"+
          "</div>":
          "");

}

function splitInTown() {
  cbArr.forEach((cb, i) => {
    cbArr[i].checked = document.getElementById(cbArr[i].shorthand).checked;
  });

  return formatResults(splitGold());
}

function splitInDungeon() {
  return formatDungeonResults(dungeonSplitter());
}

/* -- major containers ------------------------------------------------ */

// outer
let outer = document.createElement('div');
outer.classList.add("outer");

// inner
let inner = document.createElement('div');
inner.classList.add("inner");

// currencyHolder
let currencyHolder = document.createElement('div');
currencyHolder.classList.add("currencyHolder");
currencyArr.forEach(currency => {
  createInput(currency, currencyHolder, "field");
});
inner.appendChild(currencyHolder);

// partyHolder
let partyHolder = document.createElement('div');
partyHolder.classList.add("partyHolder");
createInput("party", partyHolder, "field");

let cbHolder = document.createElement('div');
cbHolder.classList.add("cbHolder");
cbArr.forEach(cb => {
  createInput(cb.shorthand, cbHolder, "cb");
});
partyHolder.appendChild(cbHolder);

// btnHolder
let btnHolder = document.createElement('div');
btnHolder.classList.add("btnHolder");
createInput("Town",btnHolder, "button");
createInput("Dungeon", btnHolder, "button");
partyHolder.appendChild(btnHolder);

inner.appendChild(partyHolder);

// results
let results = document.createElement('div');
results.innerHTML = "";
results.classList.add("results");
inner.appendChild(results);

/* -- finishing ------------------------------------------------------- */

// close outer
outer.appendChild(inner);
document.body.appendChild(outer);