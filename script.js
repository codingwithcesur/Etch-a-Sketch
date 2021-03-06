let container = document.querySelector(".grid-container");
let colors = document.querySelectorAll(".color");
const whiteBtn = document.querySelector(".white-btn");
const blackBtn = document.querySelector(".black-btn");
const resetBtn = document.querySelector(".reset-btn");
const rainbowBtn = document.querySelector(".rainbow-btn");
const gridSizeBtn = document.querySelector(".grid-size-btn");
let nodesToRemove = document.getElementsByClassName("grid");
let currentColor;
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

for (let i = 0; i < colors.length; i++) {
  colors[i].style.backgroundColor = colors[i].classList[1];

  colors[i].addEventListener("click", () => {
    removeActive();
    colors[i].classList.add("button-active");
    currentColor = colors[i].classList[1];
  });
}
function rainbow() {
  let o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + 1 + ")"
  );
}
function removeActive() {
  colors[0].classList.remove("button-active");
  colors[1].classList.remove("button-active");
  colors[2].classList.remove("button-active");
  colors[3].classList.remove("button-active");
  colors[4].classList.remove("button-active");
  colors[5].classList.remove("button-active");
  colors[6].classList.remove("button-active");
  colors[7].classList.remove("button-active");
  whiteBtn.classList.remove("button-active");
  blackBtn.classList.remove("button-active");
  rainbowBtn.classList.remove("button-active");
}
function generateInput() {
  let getInputSize = document.querySelector(".grid-size-input").value;
  let inputText = document.querySelector(".grid-size-input-text");
  if (getInputSize >= 2 && getInputSize <= 100) {
    if (nodesToRemove.length > getInputSize * 1) {
      for (let i = nodesToRemove.length - 1; i >= 0; i--) {
        let singleNode = nodesToRemove[i];
        // singleNode.classList.remove("grid");
        container.removeChild(singleNode);
      }
    }
    inputText.textContent = "";
    addDivs(getInputSize);
  } else {
    inputText.textContent = "Enter a number between 2 and 100";
    return (getInputSize = "error");
  }
}
function clearNodes() {
  for (let i = nodesToRemove.length - 1; i >= 0; i--) {
    let singleNode = nodesToRemove[i];
    singleNode.style.backgroundColor = "white";
  }
}
function addDivs(divNumber) {
  let divNeeded = divNumber * divNumber;
  let sizeCalc = `${650 / divNumber}`;
  for (let i = 0; i < divNeeded; i++) {
    let div = document.createElement("div");
    div.style.width = `${sizeCalc}px`;
    div.style.height = `${sizeCalc}px`;
    div.classList.add("grid");
    // div.addEventListener("mouseover", hover);
    div.addEventListener("mouseover", colorPicker);
    div.addEventListener("mousedown", colorPicker);
    container.appendChild(div);
  }
}

whiteBtn.addEventListener("click", () => {
  currentColor = "white";
  removeActive();
  whiteBtn.classList.add("button-active");
});
blackBtn.addEventListener("click", () => {
  currentColor = "black";
  removeActive();
  blackBtn.classList.add("button-active");
});
rainbowBtn.addEventListener("click", () => {
  currentColor = "rainbow";
  removeActive();
  rainbowBtn.classList.add("button-active");
});
resetBtn.addEventListener("click", clearNodes);
function colorPicker(event) {
  if (event.type === "mouseover" && !mouseDown) {
    return;
  } else if (currentColor === "rainbow") {
    event.target.style.backgroundColor = rainbow();
  } else {
    event.target.style.backgroundColor = currentColor;
  }
}
gridSizeBtn.addEventListener("click", generateInput);
