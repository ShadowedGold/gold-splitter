var party = 6;
var currencyArr = ["gold", "silver", "copper", "electrum", "platinum"];
var cbArr = ["pP", "gP", "sP", "cP"];

currencyArr.forEach(cur => {
  window[cur] = 0;
});

function splitGold() {
  let totalCopper = (gold*100) +
                    (silver*10) +
                    copper +
                    (electrum*50) +
                    (platinum*1000);

  let dividedCopper = Math.sign(totalCopper)*Math.floor(Math.abs(totalCopper)/party);
  let mvpCopper = dividedCopper + Math.sign(totalCopper)*(Math.abs(totalCopper)%party);

  return [dividedCopper, mvpCopper];
}

function createLabel(name, parentEl) {
  let label = document.createElement('div');
  label.innerHTML = name[0].toUpperCase() + name.substring(1);
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
      // calcBtn
      let calcBtn = document.createElement('button');
      calcBtn.innerHTML = inputName;
      calcBtn.classList.add("calcBtn");
      calcBtn.onclick = () => {
        currencyArr.forEach(cur => {
          window[cur] = parseFloat(document.getElementById(cur).value);
        });

        party = parseInt(document.getElementById("party").value);

        results.innerHTML = formatResults(splitGold());
      }
      inputHolder.appendChild(calcBtn);
      break;
    case "cb":
      // label
      createLabel(inputName, inputHolder);

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
  let curArr = ["pp", "gp", "sp", "cp"];
  
  function splitNumIntoArray(amount) {
    return String(Math.abs(amount)).split(/(\d*(?=\d{3}))?(\d?(?=\d{2}))?(\d?(?=\d{1}))?(\d?$)?/).filter(Boolean).map((num)=>{
      return Math.sign(amount)*Number(num);
    });
  }

  function getResultStr(copperArr) {
    let str = "";

    copperArr.forEach((digit, i) => {
      if (digit != 0) {
        if (str.slice(-1) == "p") str += " , ";
        let start = curArr.length - copperArr.length;
        str += "<span>"+digit+"</span>"+curArr[start+i];
      }
    });

    return str;
  }

  return "<span class=\"label\">Each party member gets</span>"+
         "<span class=\"result\">"+getResultStr(splitNumIntoArray(dividedCurs[0]))+"</span>"+
         ((dividedCurs[0] != dividedCurs[1])?
         "<br>"+
         "<span class=\"label\">MVP instead gets</span>"+
         "<span class=\"result\">"+getResultStr(splitNumIntoArray(dividedCurs[1]))+"</span>":
         "");
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

/*
let cbHolder = document.createElement('div');
cbHolder.classList.add("cbHolder");
cbArr.forEach(cb => {
  createInput(cb, cbHolder, "cb");
});
partyHolder.appendChild(cbHolder);
*/

createInput("Split", partyHolder, "button");
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