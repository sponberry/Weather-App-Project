function checkWeatherCode(code) {
  if (code === 800) {
    return "sun";
  } else if (code === 771 || code === 781) {
    return "wind";
  } else if (code < 300) {
    return "bolt";
  } else if (code < 313) {
    return "cloud-rain";
  } else if (code < 600) {
    return "cloud-showers-heavy";
  } else if (code < 700) {
    return "snowflake";
  } else if (code < 800) {
    return "smog";
  } else if (code < 803) {
    return "cloud-sun";
  } else {
    return "cloud";
  }
}

function showData(response) {
  let city = response.data.name;
  let displayedCity = document.querySelector(".city");
  displayedCity.innerHTML = city;

  let humidity = response.data.main.humidity;
  let displayedHumidity = document.querySelector("#weather-humidity");
  displayedHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  let displayedWind = document.querySelector("#wind-speed");
  displayedWind.innerHTML = `Wind: ${wind} mph`;

  let summary = response.data.weather[0].description;
  let displayedDescription = document.querySelector("#weather-summary");
  displayedDescription.innerHTML = summary;

  let icon = response.data.weather[0].icon;
  let weatherImage = document.querySelector("#weather-img");
  weatherImage.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  let cloudCover = Number(response.data.clouds.all);
  let stargazeStatus = document.querySelector("#star-gazing");
  if (cloudCover === 0) {
    stargazeStatus.innerHTML = "Clear stargazing skies tonight";
  } else if (cloudCover < 10) {
    stargazeStatus.innerHTML = "Some sky visbility tonight";
  } else {
    stargazeStatus.innerHTML = "Cloud cover tonight";
  }
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let displayedTemp = document.querySelector("#current-temp");
  displayedTemp.innerHTML = `${temp}°`;
}

function showNextFiveDays(response) {
  //tomorrow
  let tomorrowTemp = Math.round(response.data.list[1].main.temp);
  let tomorrowIcon = checkWeatherCode(response.data.list[1].weather[0].id);
  let dayOneDisplay = document.querySelector("#day-one-temp");
  dayOneDisplay.innerHTML = `<i class="fas fa-${tomorrowIcon}"></i><br /> ${tomorrowTemp}°`;
  //day after tomorrow
  let dayTwoTemp = Math.round(response.data.list[2].main.temp);
  let dayTwoIcon = checkWeatherCode(response.data.list[2].weather[0].id);
  let dayTwoDisplay = document.querySelector("#day-two-temp");
  dayTwoDisplay.innerHTML = `<i class="fas fa-${dayTwoIcon}"></i><br /> ${dayTwoTemp}°`;
  //day three
  let dayThreeTemp = Math.round(response.data.list[3].main.temp);
  let dayThreeIcon = checkWeatherCode(response.data.list[3].weather[0].id);
  let dayThreeDisplay = document.querySelector("#day-three-temp");
  dayThreeDisplay.innerHTML = `<i class="fas fa-${dayThreeIcon}"></i><br /> ${dayThreeTemp}°`;
  //day four
  let dayFourTemp = Math.round(response.data.list[4].main.temp);
  let dayFourIcon = checkWeatherCode(response.data.list[4].weather[0].id);
  let dayFourDisplay = document.querySelector("#day-four-temp");
  dayFourDisplay.innerHTML = `<i class="fas fa-${dayFourIcon}"></i><br /> ${dayFourTemp}°`;
  //day five
  let dayFiveTemp = Math.round(response.data.list[5].main.temp);
  let dayFiveIcon = checkWeatherCode(response.data.list[5].weather[0].id);
  let dayFiveDisplay = document.querySelector("#day-five-temp");
  dayFiveDisplay.innerHTML = `<i class="fas fa-${dayFiveIcon}"></i><br /> ${dayFiveTemp}°`;
}

function updateWeek(parameters) {
  let urlRoot = "https://api.openweathermap.org/data/2.5/forecast?";
  axios.get(urlRoot + parameters).then(showNextFiveDays);
}

function searchForCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  let currentCity = searchBox.value.toLowerCase();
  searchBox.value = "";
  let apiKey = "d022a7cace86a431e5ba6e5fd2caf5df";
  let urlRoot = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `q=${currentCity}&units=metric&appid=${apiKey}`;
  axios.get(urlRoot + apiUrl).then(showData);
  axios.get(urlRoot + apiUrl).then(showTemp);
  updateWeek(apiUrl);
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

  let urlRoot = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(urlRoot + apiUrl).then(showData);
  axios.get(urlRoot + apiUrl).then(showTemp);
  updateWeek(apiUrl);
}

function makeRequest(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function loadCity(event) {
  let currentCity = "lisbon";
  let apiKey = "d022a7cace86a431e5ba6e5fd2caf5df";
  let urlRoot = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `q=${currentCity}&units=metric&appid=${apiKey}`;
  axios.get(urlRoot + apiUrl).then(showData);
  axios.get(urlRoot + apiUrl).then(showTemp);
  updateWeek(apiUrl);
}

//loads data on pageload
window.addEventListener("load", loadCity);

//click search to search and display entered city data
let form = document.querySelector("#weather-form");
form.addEventListener("submit", searchForCity);

//click Current Location to show weather based on GPS coords
let locationButton = document.querySelector("#current-loc");
locationButton.addEventListener("click", makeRequest);

//define all day and time HTML elements
let dayTime = document.querySelector(".date");
let tomorrow = document.querySelector("#day-one");
let dayTwo = document.querySelector("#day-two");
let dayThree = document.querySelector("#day-three");
let dayFour = document.querySelector("#day-four");
let dayFive = document.querySelector("#day-five");
//display current day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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

//displays next five days of the week based on today
dayTime.innerHTML = `${days[today]} ${time}`;
tomorrow.innerHTML = `${days[today + 1]}`;
dayTwo.innerHTML = `${days[today + 2]}`;
dayThree.innerHTML = `${days[today + 3]}`;
dayFour.innerHTML = `${days[today + 4]}`;
dayFive.innerHTML = `${days[today + 5]}`;

//switch value from celsisus to farenheit and back
let celsiusTemp = "19°";
let farenheitTemp = "66°";
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", switchUnit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", switchUnit);
