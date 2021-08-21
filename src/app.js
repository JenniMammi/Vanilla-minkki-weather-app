function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayCurrentTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-now");
  let cityElement = document.querySelector("#city-searched");
  let descElement = document.querySelector("#weather-description");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayElement = document.querySelector("#day");
  let iconElement = document.querySelector("#weather-icon");
  let dogFace = document.querySelector("#dogface-icon");

  if (response.data.main.temp > 20) {
    dogFace.setAttribute("src", "images/hotdog.png");
  } else if (response.data.main.temp > 10) {
    dogFace.setAttribute("src", "images/warmdog.png");
  } else {
    dogFace.setAttribute("src", "images/colddog.png");
  }

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dayElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "02e63bbc86dac944d774fba2018e7b56";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-now");
  let celsius = celsiusTemp;
  temperatureElement.innerHTML = Math.round(celsius);
}

let celsiusTemp = null;

let form = document.querySelector("#searchform");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("Tel Aviv");
