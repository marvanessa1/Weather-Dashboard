var userCityInput = document.querySelector("#userCityInput");
var cityNameEl = document.querySelector("#cityName");
var citySearchButton = document.querySelector("#citySeachButton");
var citySearchHistory = document.querySelector("#citySeachHistory");
var cityForecast = document.querySelector("#cityForecast");
var fiveDayForecast = document.querySelector("#fiveDayForecast");
var cityHistory = [];

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
        renderCityForecast(data)
    })
    
    var uviIndexColor = " "
    var renderCityForecast = function (cityData){
        forecast = `<div class="p-1 m-3 border border-dark rounded">
        <h3>${cityNameEl.value + " " + moment.unix(cityData.current.dt).format("MM/DD/YYYY")}</h3>
        <p>${"Temp: " + cityData.current.temp + "°F"}</p>
        <p>${"Wind: " + cityData.current.wind_speed+ " MPH"}</p>
        <p>${"Humidity: " + cityData.current.humidity + "%"}</p>
        <p class = "bg-${uviIndexColor}">${"UV Index: " + cityData.current.uvi}</p>
        </div>`
        
        console.log(cityNameEl.value);
        console.log(moment.unix(cityData.current.dt).format("MM/DD/YYYY"));
        console.log(cityData.current.temp);  
        console.log(cityData.current.wind_speed);  
        console.log(cityData.current.humidity);  
        console.log(cityData.current.uvi);  
        
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
        cityForecast.innerHTML = forecast
        cityNameEl.value = " ";
    }
}

