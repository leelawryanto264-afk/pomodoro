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
let workTime = 0;
let onBreak = false;
let normBreak = 0;
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
  workTime = workVal * 60;
  onBreak = false;
  normBreak = (workVal / 5) * 60;
  longBreak = (workVal - 15) * 60;
  totalSets = setVal;
  currentSet = 1;
  totalTime = workTime;
  timeRemain = totalTime;
  timer = null;
}

function pause() {
  running = false;
  control.innerText = "start";
  clearInterval(timer);
}

function reset() {
  pause();
  timeSettings();
  updateDisplay();
}

function nextSet() {
  onBreak = !onBreak;
  if (!onBreak) currentSet++;
  if (currentSet <= totalSets) {
    if (onBreak) {
      totalTime = currentSet < totalSets ? normBreak : longBreak;
    } else {
      totalTime = workTime;
    }
    timeRemain = totalTime;
  } else {
    reset();
  }
}

function togglePause() {
  if (running === true) {
    pause();
  } else {
    start();
  }
}

function updateDisplay() {
  const modeTxt = onBreak
    ? currentSet < totalSets
      ? "REAST"
      : "REST (BUT lONGER)"
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

function finishSet() {
  nextSet();
  updateDisplay();
}

function updateTimer() {
  if (timeRemain > 0) {
    timeRemain--;
    updateDisplay();
  } else {
    finishSet();
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
  timer = setInterval(updateTimer, 10);
}

timeSettings();
start();
