const time = document.querySelector(".time");
const day = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  setTimeout(showTime, 1000);
  time.textContent = currentTime;
  showDate();
  showGreeting();
}
showTime();

function showDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  day.textContent = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 18 && hours <= 24) {
    return "evening";
  } else if (hours <= 18 && hours >= 12) {
    return "afternoon";
  } else if (hours >= 6 && hours <= 12) {
    return "morning";
  } else if (hours <= 24 && hours <= 6) {
    return "night";
  }
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //console.log(Math.floor(Math.random() * (max - min + 1)) + min);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function setBg() {
  let timeOfDay = getTimeOfDay();
  let bgNum = getRandomNum(1, 20).toString().padStart(2, "0");
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

setBg();

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText;
}

// Local Storage
function setLocalStorage() {
  localStorage.setItem("name", name.value);
  localStorage.setItem("data", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("data")) {
    city.value = localStorage.getItem("data");
  }
}
window.addEventListener("load", getLocalStorage);
city.addEventListener("change", () => getWeather(city.value));

let randomNum;

function getSlideNext() {
  if (randomNum === 20) randomNum === 1;
  randomNum++;
  setBg();
}

function getSlidePrev() {
  if (randomNum === 1) randomNum === 20;
  randomNum--;
  setBg();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=79eded073c0de0123b3f79460fd869b7&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  //windSpeed.textContent = data.wind[0].speed;
}

getWeather();

async function getQuotes() {
  const text = document.querySelector(".quote");
  const author = document.querySelector(".author");
  const quotes = "/data/data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  text.textContent = data;

  console.log(data);
}
/*
function getQuotes() {
  const quotes = document.querySelector(".quotes");
  const quotes = "/data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  let pharaseNum = getRandomNum(0, Object.keys(data).length);
  author.innerHTML = data[pharaseNum].author;
  quote.innerHTML = " ${data[pharaseNum].text} ";
}
getQuotes();
*/
getQuotes();
