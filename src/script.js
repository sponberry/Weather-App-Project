function showData(response) {
  let city = response.data.name;
  let displayedCity = document.querySelector(".city");
  displayedCity.innerHTML = city;

  let humidity = response.data.main.humidity;
  let displayedHumidity = document.querySelector("#weather-humidity");
  displayedHumidity.innerHTML = `${humidity}%`;

  let wind = response.data.wind.speed;
  let displayedWind = document.querySelector("#wind-speed");
  displayedWind.innerHTML = `${wind} mph`;

  let summary = response.data.weather[0].description;
  let displayedDescription = document.querySelector("#weather-summary");
  displayedDescription.innerHTML = summary;
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let displayedTemp = document.querySelector("#current-temp");
  displayedTemp.innerHTML = `${temp}°`;
}

function searchForCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  let currentCity = searchBox.value.toLowerCase();
  let apiKey = "d022a7cace86a431e5ba6e5fd2caf5df";
  let urlRoot = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `q=${currentCity}&units=metric&appid=${apiKey}`;
  axios.get(urlRoot + apiUrl).then(showData);
  axios.get(urlRoot + apiUrl).then(showTemp);
}

function switchUnit(event) {
  event.preventDefault();
  let displayedCity = document.querySelector(".city");
  let currentCity = displayedCity.innerHTML.toLowerCase();
  let apiKey = "d022a7cace86a431e5ba6e5fd2caf5df";
  let units = "";
  if (event.target.innerHTML === "°C ") {
    units = "metric";
  } else {
    units = "imperial";
  }

  let urlRoot = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `q=${currentCity}&units=${units}&appid=${apiKey}`;
  axios.get(urlRoot + apiUrl).then(showTemp);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "d022a7cace86a431e5ba6e5fd2caf5df";
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

  let urlRoot = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  console.log(urlRoot + apiUrl);
  axios.get(urlRoot + apiUrl).then(showData);
}

function makeRequest(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

//click search to search and display entered city data
let form = document.querySelector("#weather-form");
form.addEventListener("submit", searchForCity);

//click Current Location to show weather based on GPS coords
let locationButton = document.querySelector("#current-loc");
locationButton.addEventListener("click", makeRequest);

//display current day and time
let dayTime = document.querySelector(".date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = now.getDay();
let minutes = now.getMinutes();
let hours = now.getHours();
//checks if minutes will be 2 digits, adds a zero
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

let time = hours + ":" + minutes;
dayTime.innerHTML = `${days[today]} ${time}`;

//switch value from celsisus to farenheit and back
let celsiusTemp = "19°";
let farenheitTemp = "66°";
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", switchUnit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", switchUnit);
