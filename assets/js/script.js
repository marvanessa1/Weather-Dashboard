var userCityInput = document.querySelector("#userCityInput");
var cityNameEl = document.querySelector("#cityName");
var citySearchButton = document.querySelector("#citySeachButton");
var citySearchHistory = document.querySelector("#citySeachHistory");
var cityForecast = document.querySelector("#cityForecast");
var fiveDayForecast = document.querySelector("#fiveDayForecast");
var cityHistory = [];
var flexboxDisplay = "display:flex; justify-content: space-between";
var cardBackground = "background-image: linear-gradient(#001133, #001a4d); color: white; ";

var apiKey = "cc874990616c1e1cfc8aa38e558fbd96" + "&units=imperial";

function geoData() {
    var cityName = document.getElementById('cityName');

    var geoUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameEl.value + "&appid=" + apiKey

    fetch(geoUrl) 
        .then(function(response){
            if (response.ok) {
                response.json().then(function(data){
                    cityWeatherData = data;

                    var latitude = cityWeatherData.coord.lat;
                    var longtitude =cityWeatherData.coord.lon;
                    console.log(latitude, longtitude)
                    getCityWeatherData(latitude, longtitude);
                })
            } else {
                alert("Error:" + response.statusText);
            }
        })
       .catch(function(error){
           alert("Did not get a respnse");
       });
};

function getCityWeatherData(latitude, longtitude){
  var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longtitude + "&exclude=alerts,minutely,hourly&appid=" +apiKey

  fetch(oneCallUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        renderCityForecast(data);
        renderFiveDayForecast(data);
    })
    
    var uviIndexColor = " "

    var renderCityForecast = function (cityData){
        forecast = `<div class="p-1 m-1 border border-dark rounded">
        <h3>${cityNameEl.value + " (" + moment.unix(cityData.current.dt).format("MM/DD/YYYY")})</h3>
        <p>${"Temp: " + cityData.current.temp + "°F"}</p>
        <p>${"Wind: " + cityData.current.wind_speed+ " MPH"}</p>
        <p>${"Humidity: " + cityData.current.humidity + "%"}</p>
        <p class = "bg-${uviIndexColor}">${"UV Index: " + cityData.current.uvi}</p>
        </div>`

        cityForecast.innerHTML = forecast
        
        console.log(cityNameEl.value);
        console.log(moment.unix(cityData.current.dt).format("MM/DD/YYYY"));
        console.log("Current Temperature: " + cityData.current.temp + "°F");  
        console.log("Current Windspeed: " + cityData.current.wind_speed + "MPH");  
        console.log("Current Humidity: " + cityData.current.humidity + "%");  
        console.log("Current UVI Index: " + cityData.current.uvi);  
        
        if (cityData.current.uvi <=2){
            uviIndexColor = "#008000"
        } else if (cityData.current.uvi <=5){
            uviIndexColor = "warning"
        }else if (cityData.current.uvi <=7){
            uviIndexColor = "#ffa500"
        } else if (cityData.current.uvi <=10){
            uviIndexColor = "danger"
        } else if (cityData.current.uvi >10){
            uviIndexColor = "#800080"
        }
        cityNameEl.value = " ";
    };

    var renderFiveDayForecast = function (cityData) {
        var weekForecast = `
        <h3 class = "text-dark">5-Day Forecast:</h3>

        <div style = "${flexboxDisplay}">

            <div class = "p-1 m-1" style = "${cardBackground}">
                <h5>${moment.unix(cityData.daily[1].dt).format("MM/DD/YYYY")}</h5>
                <p>${"Temp: " + cityData.daily[1].temp.day + "°F"}</p>
                <p>${"Wind: " + cityData.daily[1].wind_speed+ " MPH"}</p>
                <p>${"Humidity: " + cityData.daily[1].humidity + "%"}</p>
                <p class = "bg-${uviIndexColor}">${"UV Index: " + cityData.daily[1].uvi}</p>
            </div>

            <div class = "p-1 m-1" style = "${cardBackground}">
                <h5>${moment.unix(cityData.daily[2].dt).format("MM/DD/YYYY")}</h5>
                <p>${"Temp: " + cityData.daily[2].temp.day + "°F"}</p>
                <p>${"Wind: " + cityData.daily[2].wind_speed+ " MPH"}</p>
                <p>${"Humidity: " + cityData.daily[2].humidity + "%"}</p>
                <p class = "bg-${uviIndexColor}">${"UV Index: " + cityData.daily[2].uvi}</p>
            </div>

            <div class = "p-1 m-1" style = "${cardBackground}">
                <h5>${moment.unix(cityData.daily[3].dt).format("MM/DD/YYYY")}</h5>
                <p>${"Temp: " + cityData.daily[3].temp.day + "°F"}</p>
                <p>${"Wind: " + cityData.daily[3].wind_speed+ " MPH"}</p>
                <p>${"Humidity: " + cityData.daily[3].humidity + "%"}</p>
                <p class = "bg-${uviIndexColor}">${"UV Index: " + cityData.daily[3].uvi}</p>
            </div>

            <div class = "p-1 m-1" style = "${cardBackground}">
                <h5>${moment.unix(cityData.daily[4].dt).format("MM/DD/YYYY")}</h5>
                <p>${"Temp: " + cityData.daily[4].temp.day + "°F"}</p>
                <p>${"Wind: " + cityData.daily[4].wind_speed+ " MPH"}</p>
                <p>${"Humidity: " + cityData.daily[4].humidity + "%"}</p>
                <p class = "bg-${uviIndexColor}">${"UV Index: " + cityData.daily[1].uvi}</p>
            </div>

            <div class = "p-1 m-1" style = "${cardBackground}">
                <h5>${moment.unix(cityData.daily[5].dt).format("MM/DD/YYYY")}</h5>
                <p>${"Temp: " + cityData.daily[5].temp.day + "°F"}</p>
                <p>${"Wind: " + cityData.daily[5].wind_speed+ " MPH"}</p>
                <p>${"Humidity: " + cityData.daily[5].humidity + "%"}</p>
                <p class = "bg-${uviIndexColor}">${"UV Index: " + cityData.daily[5].uvi}</p>
            </div>
        
        </div>
        `

        fiveDayForecast.innerHTML = weekForecast
    }

}

