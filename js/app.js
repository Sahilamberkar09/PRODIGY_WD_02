const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const lapsList = document.querySelector(".laps");
const lapClearButton = document.querySelector(".lap-clear-button");

let isPlay = false;
let minCounter = 0;
let min;
let secCounter = 0;
let sec;
let centiCounter = 0;
let centiSec;
let lapCount = 0;

const toggleButton = () => {
  lapButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");
  if (lapsList.children.length > 0) {
    lapClearButton.classList.remove("hidden");
  }
};

const play = () => {
  if (!isPlay) {
    playButton.innerHTML = "Pause";
    min = setInterval(() => {
      minute.innerText = `${++minCounter} :`;
    }, 60 * 1000);
    sec = setInterval(() => {
      if (secCounter === 60) {
        secCounter = 0;
      }
      second.innerText = `${++secCounter} :`;
    }, 1000);
    centiSec = setInterval(() => {
      if (centiCounter === 100) {
        centiCounter = 0;
      }
      centiSecond.innerText = `${++centiCounter}`;
    }, 10);
    isPlay = true;
  } else {
    playButton.innerHTML = "Play";
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSec);
    isPlay = false;
  }
  toggleButton();
};

const reset = () => {
  if (isPlay) play(); // Pause if the stopwatch is running
  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  lapClearButton.classList.add("hidden");
  minCounter = 0;
  secCounter = 0;
  centiCounter = 0;
  minute.innerText = "0 : ";
  second.innerText = "0 : ";
  centiSecond.innerText = "0";
  lapsList.innerHTML = ''; // Clear laps list
  lapCount = 0;
};

const addLap = () => {
  lapCount++;
  const lapItem = document.createElement("li");
  lapItem.classList.add("lap-item");
  lapItem.innerHTML = `
    <span class="number">#${lapCount}</span>
    <span class="time-stamp">${minute.innerText}${second.innerText}${centiSecond.innerText}</span>
  `;
  lapsList.appendChild(lapItem);
  lapClearButton.classList.remove("hidden");
};

const clearLaps = () => {
  lapsList.innerHTML = ''; // Clear all lap items
  lapCount = 0;
  lapClearButton.classList.add("hidden");
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", addLap);
lapClearButton.addEventListener("click", clearLaps);
