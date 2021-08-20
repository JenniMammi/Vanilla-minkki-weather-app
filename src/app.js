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
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature-now");
  let cityElement = document.querySelector("#city-searched");
  let descElement = document.querySelector("#weather-description");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayElement = document.querySelector("#day");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dayElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "02e63bbc86dac944d774fba2018e7b56";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayCurrentTemperature);
