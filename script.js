const searchInput = document.querySelector("input");
const form = document.querySelector("form");
const mainDiv = document.querySelector(".container");
const infoDiv = document.querySelector(".info");
const weatherDiv = document.querySelector(".weather");
const locationDiv = document.querySelector(".location");
const temperatureDiv = document.querySelector(".temperature");
const feelsLikeDiv = document.querySelector(".feels-like");
const conditionDiv = document.querySelector(".condition");
const windDiv = document.querySelector(".wind");
const humidityDiv = document.querySelector(".humidity");

displayWeather("Saint-Petersburg");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = searchInput.value;
  displayWeather(city);
});

async function displayWeather(city) {
  const key = "7d70ae20b9114cf9b5c193402230305";
  const searchURL = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
  try {
    const response = await fetch(searchURL, { mode: "cors" });
    const weather = await response.json();

    const area = weather.location.name;
    const country = weather.location.country;
    const temperature = weather.current.temp_c;
    const feelsLike = weather.current.feelslike_c;
    const condition = weather.current.condition.text;
    const windDirection = weather.current.wind_dir;
    const windSpeed = weather.current.wind_kph;
    const windSpeedMpS = Math.floor(parseInt(windSpeed) / 3.6);
    const humidity = weather.current.humidity;

    infoDiv.style.display = "none";
    weatherDiv.style.display = "block";

    locationDiv.textContent = `${area}, ${country}`;
    temperatureDiv.textContent = `${Math.floor(temperature)} °C`;
    feelsLikeDiv.textContent = `Feels like: ${Math.floor(feelsLike)} °C`;
    conditionDiv.textContent = condition;
    windDiv.textContent = `Wind: ${windDirection}, ${windSpeedMpS} m/s`;
    humidityDiv.textContent = `Humidity: ${humidity}%`;
  } catch (err) {
    infoDiv.style.display = "block";
    weatherDiv.style.display = "none";
  }
}
