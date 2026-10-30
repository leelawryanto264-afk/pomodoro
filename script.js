const time = document.querySelector(".time");
const control = document.querySelector(".control");
const resetBtn = document.querySelector(".reset");
control.addEventListener("click", togglePause);
resetBtn.addEventListener("click", reset);

let timeRemain = 0;
let timer = null;
let running = false;

function timeSettings() {
  timeRemain = 60 * 25;
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
  const mins = Math.floor(timeRemain / 60)
    .toString()
    .padStart(2, "0");
  /*Adds a 0 if mins is a one digit number*/
  const secs = (timeRemain % 60).toString().padStart(2, "0");
  time.innerText = `${mins}:${secs}`;
}

function updateTimer() {
  if (timeRemain > 0) {
    timeRemain--;
    updateDisplay();
  }
}

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
