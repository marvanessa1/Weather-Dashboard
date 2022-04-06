var userCityInput = document.querySelector("#userCityInput");
var cityNameEl = document.querySelector("#cityName");
var citySearchButton = document.querySelector("#citySeachButton");
var citySearchHistory = document.querySelector("#citySeachHistory");
var cityForecast = document.querySelector("#cityForecast");
var fiveDayForecast = document.querySelector("#fiveDayForecast");
var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
var cardBackground = "background-image: linear-gradient(#001133, #001a4d); color: white; ";
var forecastStyle = "display:flex, justify-content: space-between "
var apiKey = "cc874990616c1e1cfc8aa38e558fbd96" + "&units=imperial";

var formSubmit = function (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();
    if (cityName) {
        geoData(cityName);
        console.log(cityName)
        cityHistory.push(cityName)
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory))
    } else {
        alert("Please enter a valid city name");
    }
}


function geoData() {
    var cityName = document.getElementById('cityName');

    var geoUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameEl.value + "&appid=" + apiKey

    fetch(geoUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    cityWeatherData = data;

                    var latitude = cityWeatherData.coord.lat;
                    var longtitude = cityWeatherData.coord.lon;
                    console.log(latitude, longtitude)
                    getCityWeatherData(latitude, longtitude);
                })
            } else {
                alert("Error:" + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Did not get a respnse");
        });
};

function weatherConditionIcon(iconCode) {
    var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    return iconUrl;
}

function getCityWeatherData(latitude, longtitude) {
    var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longtitude + "&exclude=alerts,minutely,hourly&appid=" + apiKey

    fetch(oneCallUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            renderCityForecast(data);
            renderFiveDayForecast(data);
        })

    var uviIndexColor = " "

    var renderCityForecast = function (cityData) {

        var iconUrl = weatherConditionIcon(cityData.current.weather[0].icon);

        if (cityData.current.uvi <= 2) {
            uviIndexColor = "success"
        } else if (cityData.current.uvi <= 5) {
            uviIndexColor = "warning"
        } else if (cityData.current.uvi <= 7) {
            uviIndexColor = "#fd7e14"
        } else if (cityData.current.uvi <= 10) {
            uviIndexColor = "danger"
        } else if (cityData.current.uvi > 10) {
            uviIndexColor = "#6f42c1"
        }

        forecast = `<div class="p-1 m-1 border border-dark rounded">
            <h3 class = "p-1 m-1">${cityNameEl.value + " (" + moment.unix(cityData.current.dt).format("MM/DD/YYYY")}) <img src = '${iconUrl}' alt="${cityData.current.weather[0].description}"/></h3>
            <p class = "p-1 m-1">${"Temp: " + cityData.current.temp + "°F"}</p>
            <p class = "p-1 m-1">${"Wind: " + cityData.current.wind_speed + " MPH"}</p>
            <p class = "p-1 m-1">${"Humidity: " + cityData.current.humidity + "%"}</p>
            <p class = "p-1 m-1"> UV Index:  <span class="bg-${uviIndexColor} rounded p-2 m-2">${cityData.current.uvi}<span></p>
        </div>`

        cityForecast.innerHTML = forecast

        console.log(cityNameEl.value);
        console.log(moment.unix(cityData.current.dt).format("MM/DD/YYYY"));
        console.log("Current Temperature: " + cityData.current.temp + "°F");
        console.log("Current Windspeed: " + cityData.current.wind_speed + "MPH");
        console.log("Current Humidity: " + cityData.current.humidity + "%");
        console.log("Current UVI Index: " + cityData.current.uvi);
        console.log("Icon description: " + cityData.current.weather[0].description);

        cityNameEl.value = " ";
    };

    var renderFiveDayForecast = function (cityData) {
        var DailyForecastHTML = " ";

        for (i = 1; i < 6; i++) {
            var iconUrl = weatherConditionIcon(cityData.daily[i].weather[0].icon)


            DailyForecastHTML += `
                <div class = "p-1 m-1 d-flex flex-column" style = "${cardBackground}">
                    <h5 class = "p-1 m-1">${moment.unix(cityData.daily[i].dt).format("MM/DD/YYYY")}</h5>
                    <img src = '${iconUrl}' alt="${cityData.daily[i].weather[0].description}"/>
                    <p class = "p-1 m-1">${"Temp: " + cityData.daily[i].temp.day + "°F"}</p>
                    <p class = "p-1 m-1">${"Wind: " + cityData.daily[i].wind_speed + " MPH"}</p>
                    <p class = "p-1 m-1"> ${"Humidity: " + cityData.daily[i].humidity + "%"}</p>
                </div>
            ` ;
        }


        var weekForecast = `
        <div>
            <h3 style = "text-dark"> 5-Day Forecast:</h3>
            <div class = "d-flex flex-row justify-content-between">
                    ${DailyForecastHTML}      
            </div>   
        </div>
        `

        fiveDayForecast.innerHTML = weekForecast
    }

}

