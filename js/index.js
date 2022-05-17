var party = 6;
var currencyArr = ["gold", "silver", "copper", "electrum", "platinum"];

currencyArr.forEach(cur => {
  window[cur] = 0;
});

function splitGold() {
  let totalCopper = (gold*100) +
                    (silver*10) +
                    copper +
                    (electrum*50) +
                    (platinum*1000);

  let dividedPlatinum = Math.sign(totalCopper)*Math.floor(Math.abs(totalCopper/1000)/party);
  totalCopper -= dividedPlatinum*party*1000;
  let dividedGold = Math.sign(totalCopper)*Math.floor(Math.abs(totalCopper/100)/party);
  totalCopper -= dividedGold*party*100;
  let dividedSilver = Math.sign(totalCopper)*Math.floor(Math.abs(totalCopper/10)/party);
  totalCopper -= dividedSilver*party*10;
  let dividedCopper = Math.sign(totalCopper)*Math.floor(Math.abs(totalCopper)/party);
  totalCopper -= dividedCopper*party;

  return [dividedPlatinum, dividedGold, dividedSilver, dividedCopper, totalCopper];
}

function createInput(inputName, parentEl) {
  // inputHolder
  let inputHolder = document.createElement('div');
  inputHolder.classList.add("inputHolder");

  // label
  let label = document.createElement('div');
  label.innerHTML = inputName[0].toUpperCase() + inputName.substring(1);
  label.classList.add("label");
  inputHolder.appendChild(label);

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

  parentEl.appendChild(inputHolder);
}

function formatResults(dividedCurs) {
  let mainStr = "";
  let curArr = ["pp", "gp", "sp"];

  curArr.forEach((curInital, i) => {
    if (dividedCurs[i] != 0) {
      if (mainStr.slice(-1) == "p") mainStr += " , ";
      mainStr += "<span>"+dividedCurs[i]+"</span>"+curInital;
    }
  });

  let mvpStr = mainStr;
  if (dividedCurs[4] != 0) {
    if (mainStr.slice(-1) == "p") mvpStr += " , ";
    mvpStr += "<span>"+(dividedCurs[3]+dividedCurs[4])+"</span>cp";
  }

  if (dividedCurs[3] != 0) {
    if (mainStr.slice(-1) == "p") mainStr += " , ";
    mainStr += "<span>"+dividedCurs[3]+"</span>cp";
  }

  return "<span class=\"label\">Each party member gets</span>"+
         "<span class=\"result\">"+mainStr+"</span>"+
         ((dividedCurs[4]!=0)?
         "<br>"+
         "<span class=\"label\">MVP instead gets</span>"+
         "<span class=\"result\">"+mvpStr+"</span>":
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
  createInput(currency, currencyHolder);
});
inner.appendChild(currencyHolder);

// partyHolder
let partyHolder = document.createElement('div');
partyHolder.classList.add("partyHolder");
createInput("party", partyHolder);

// inputHolder
let inputHolder = document.createElement('div');
inputHolder.classList.add("inputHolder");

// calcBtn
let calcBtn = document.createElement('button');
calcBtn.innerHTML = "Split";
calcBtn.classList.add("calcBtn");
calcBtn.onclick = () => {
  currencyArr.forEach(cur => {
    window[cur] = parseFloat(document.getElementById(cur).value);
  });

  party = parseInt(document.getElementById("party").value);

  results.innerHTML = formatResults(splitGold());
}
inputHolder.appendChild(calcBtn);

partyHolder.appendChild(inputHolder);
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