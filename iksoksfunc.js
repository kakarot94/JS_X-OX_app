const playground = document.getElementsByClassName("playground")[0];
const btn = document.getElementById("newBtn");
let isFirstPlayer = true;

const virtualBoxes = setVirtualBoxes([[], [], []]);
const boxIndexes = [];
const boxIds = [];
let counter = 0;

onload = start();

function start() {
  playground.id = "playgroundGrid";
  playground.innerHTML = "";
  createBoxes();
}

function restart() {
  setVirtualBoxes(virtualBoxes);
  counter = 0;
  start();
}

function createBoxes() {
  let box = document.createElement("div");
  box.className = "box";
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      const att = document.createAttribute("boxIndex");
      const val = i * 10 + j;
      att.value = val;
      box.id = "box" + val;
      box.setAttributeNode(att.cloneNode());
      box.setAttribute("onclick", "clicked('" + box.id + "')");
      playground.appendChild(box.cloneNode());
    }
  }
}

function finalResult(winnerString) {
  playground.id = "playgroundFlex";
  playground.innerHTML = "";

  const winingText = document.createElement("span");
  winingText.textContent = winnerString;
  winingText.id = "winingText";
  playground.appendChild(winingText);
}

function clicked(boxId) {
  counter++;
  const box = document.getElementById(boxId);
  if (!isUsed(box)) {
    setToVirtual(box.attributes.boxindex.value);
    let lineOn;

    if (isFirstPlayer) {
      lineOn = document.createElement("span");
      lineOn.textContent = "X";
      lineOn.className = "xLine";
    } else {
      lineOn = document.createElement("div");
      lineOn.className = "oLine";
    }

    box.appendChild(lineOn);

    if (isEnd(box)) {
      let winner;
      if (isFirstPlayer) {
        winner = "First player wins!";
      } else {
        winner = "Second player wins!";
      }
      finalResult(winner);
    } else if (counter === 9) {
      finalResult("draw");
    }

    isFirstPlayer = !isFirstPlayer;
  }
}

function isUsed(box) {
  return box.childNodes.length === 0 ? false : true;
}

function setVirtualBoxes(boxList) {
  let counter = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boxList[i][j] = "";
    }
  }
  return boxList;
}

function setToVirtual(boxId) {
  const firstNum = (boxId % 10) - 1;
  const secNum = Math.round(boxId / 10) - 1;
  virtualBoxes[firstNum][secNum] = isFirstPlayer;
}

function isEnd(box) {
  const boxIndex = box.attributes.boxindex.value;
  const leftIndex = (boxIndex % 10) - 1;
  const rightIndex = Math.round(boxIndex / 10) - 1;

  if (columnCheck(rightIndex) === isFirstPlayer) return true;

  if (rowCheck(leftIndex) === isFirstPlayer) return true;

  if (leftIndex + rightIndex != 3) {
    if (ascentCheck() === isFirstPlayer) return true;

    if (descentCheck() === isFirstPlayer) return true;
  }

  return false;
}

function columnCheck(index) {
  for (let i = 0; i < 3; i++) {
    if (
      virtualBoxes[i][index] === "" ||
      virtualBoxes[i][index] === !isFirstPlayer
    ) {
      return !isFirstPlayer;
    }
  }
  return isFirstPlayer;
}

function rowCheck(index) {
  for (let i = 0; i < 3; i++) {
    if (
      virtualBoxes[index][i] === "" ||
      virtualBoxes[index][i] === !isFirstPlayer
    ) {
      return !isFirstPlayer;
    }
  }
  return isFirstPlayer;
}

function descentCheck() {
  for (let i = 0; i < 3; i++) {
    if (virtualBoxes[i][i] === "" || virtualBoxes[i][i] === !isFirstPlayer) {
      return !isFirstPlayer;
    }
  }
  return isFirstPlayer;
}

function ascentCheck() {
  for (let i = 0, j = 2; i < 3; i++, j--) {
    if (virtualBoxes[i][j] === "" || virtualBoxes[i][j] === !isFirstPlayer) {
      return !isFirstPlayer;
    }
  }
  return isFirstPlayer;
}
