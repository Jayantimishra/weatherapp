const apiKey = "b6fda5bca07b4437b5f154445252104";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    city = city.trim();

    if (!city) {
        document.querySelector(".error").innerHTML = "Please enter a city name.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const response = await fetch(apiUrl + city);

    if (response.status == 404) {
        document.querySelector(".error").innerHTML = "City not found.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else if (response.status == 400) {
        document.querySelector(".error").innerHTML = "Bad request. Please check the city name.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

        if (data.current.condition.text.includes("Cloud")) {
            weatherIcon.src = "images/clouds.png";
        } else if (data.current.condition.text.includes("Clear")) {
            weatherIcon.src = "images/clear.png";
        } else if (data.current.condition.text.includes("Rain")) {
            weatherIcon.src = "images/rain.png";
        } else if (data.current.condition.text.includes("Drizzle")) {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.current.condition.text.includes("Mist")) {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchbtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

checkWeather("London");
