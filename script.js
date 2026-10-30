const time = document.querySelector(".time");
const control = document.querySelector(".control");
const resetBtn = document.querySelector(".reset");
const workOpt = document.querySelector("#work-opt");
const setOpt = document.querySelector("#set-opt");
const set = document.querySelector(".set");
const mode = document.querySelector(".mode-text");

control.addEventListener("click", togglePause);
resetBtn.addEventListener("click", reset);

let running = false;
let finish = false;
let onBreak = false;
let breakTime = 0;
let workTime = 0;
let longBreak = 0;
let totalSets = 0;
let currentSet = 1;
let totalTime = 0;
let timeRemain = 0;
let timer = null;

function timeSettings() {
  const workVal = parseInt(workOpt.value);
  const setVal = parseInt(setOpt.value);
  running = false;
  finish = false;
  breakTime = (workVal / 5) * 60;
  workTime = workVal * 60;
  longBreak = (workVal - 15) * 60;
  totalSets = setVal;
  currentSet = 1;
  totalTime = workTime;
  timeRemain = totalTime;
  timer = null;
}

function reset() {
  pause();
  timeSettings();
  updateDisplay();
}

function togglePause() {
  if (running === true) {
    pause();
  } else {
    start();
  }
}

function updateDisplay() {
  /*Woah this format is fast*/
  const modeTxt = onBreak
    ? currentSet < totalSets
      ? "tired"
      : "not tired"
    : "GET BACK TO THE GRIND";
  const mins = Math.floor(timeRemain / 60)
    .toString()
    .padStart(2, "0");
  /*Adds a 0 if mins is a one digit number*/
  const secs = (timeRemain % 60).toString().padStart(2, "0");
  time.innerText = `${mins}:${secs}`;
  mode.innerText = modeTxt;
  set.innerText = `${currentSet}/${totalSets}`;
}

function updateTimer() {
  if (timeRemain > 0) {
    timeRemain--;
    updateDisplay();
  }
}

document.getElementById("toggle-config").addEventListener("click", () => {
  const config = document.getElementById("drop-cnt");
  if (config.style.display === "none") {
    config.style.display = "flex";
  } else {
    config.style.display = "none";
  }
});

function start() {
  running = true;
  control.innerText = "pause";
  updateDisplay();
  timer = setInterval(updateTimer, 1000);
}

function pause() {
  running = false;
  control.innerText = "start";
  clearInterval(timer);
}

timeSettings();
start();
