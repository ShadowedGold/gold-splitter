var party = 6;
var currencyArr = ["gold", "silver", "copper", "electrum", "platinum"];

currencyArr.forEach(cur => {
  window[cur] = 0;
});

function splitGold() {
  let totalGold = gold +
                  (silver/10) +
                  (copper/100) +
                  (electrum/2) +
                  (platinum*10);
  
  let dividedGold = Math.sign(totalGold)*Math.floor(Math.abs(totalGold)/party);
  let remainingGold = Math.sign(totalGold)*(Math.abs(totalGold)%party);
  let dividedSilver = Math.sign(totalGold)*Math.floor(Math.abs(remainingGold*10)/party);
  let remainingSilver = Math.sign(totalGold)*(Math.abs(remainingGold*10)%party);
  let dividedCopper = Math.sign(totalGold)*Math.floor(Math.abs(remainingSilver*10)/party);
  let remainingCopper = Math.sign(totalGold)*(Math.abs(remainingSilver*10)%party);

  return [dividedGold, dividedSilver, dividedCopper, remainingCopper];
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
  let mainStr = dividedCurs[0]+"g, "+dividedCurs[1]+"s, ";
  return "<span>Each party member gets: "+mainStr+dividedCurs[2]+"c</span>"+
         ((dividedCurs[3]!=0)?"<span>MVP instead gets: "+mainStr+(dividedCurs[2]+dividedCurs[3])+"c</span>":"");
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
inner.appendChild(partyHolder);

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
partyHolder.appendChild(calcBtn);

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