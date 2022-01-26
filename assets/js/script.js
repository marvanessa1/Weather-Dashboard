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

    var geoUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName.value + "&appid=" + apiKey

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
    })
}

