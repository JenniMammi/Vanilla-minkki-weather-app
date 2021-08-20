function displayCurrentTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature-now");
  let cityElement = document.querySelector("#city-searched");
  let descElement = document.querySelector("#weather-description");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "02e63bbc86dac944d774fba2018e7b56";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tel Aviv&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayCurrentTemperature);
