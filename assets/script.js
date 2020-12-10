 const cityInput = document.getElementById('city-input');
 const searchButton = document.getElementById('search-city');
 const pastCity = document.getElementById('past-city');
 const searchResults = document.getElementById('search-results');
 const todayTemp = document.getElementById('today-temp');
 const todayHumidity = document.getElementById('today-humidity');
 const todayWindspeed = document.getElementById('today-windspeed');
 const todayUVI = document.getElementById('today-uvi');

let city;

function displayCurrentWeather() {

    let city = cityInput.value.trim();

    //Geocode location using Google Places API
    let placeQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyDCYsLhQIm_iTzg5ZMsg8sR329hEsFE2oE";

    $.ajax({
        url: placeQueryURL,
        method: "GET"
      }).then(function(response) {
    
        console.log(response);

        //variable to store the lat and lon of the searched city
        let lat = response.results[0].geometry.location.lat;
        let lng = response.results[0].geometry.location.lng;

        console.log(lat);
        console.log(lng);

        let weatherQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely,hourly&units=imperial&lang=en&appid=0a0e18cfc10038e9c1b25028eac7bb5c"; 

        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        }).then(function(weatherResponse) {

            console.log(weatherResponse);
            
            const d = new Date();
            const today = d.toDateString();

            const todayIconSrc = "http://openweathermap.org/img/wn/" + weatherResponse.current.weather[0].icon + "@2x.png";
            const todayIconAlt = weatherResponse.current.weather[0].main;

            searchResults.innerHTML = city + ' ' + today;
            $("#today-icon").attr("src", todayIconSrc);
            $("#today-icon").attr("alt", todayIconAlt);
            todayTemp.innerHTML = "Temp: " + weatherResponse.current.temp + " F";
            todayHumidity.innerHTML = "Humidity: " + weatherResponse.current.humidity;
            todayWindspeed.innerHTML = "Wind Speed: " + weatherResponse.current.wind_speed + " mph";
            todayUVI.innerHTML = "UVI: " + weatherResponse.current.uvi;
        })
    });
}

function fiveDayForecast() {
    //ajax for 5 day forcast
    //for each to create a card and display data for city input
}



function pastCities() {
    const button = document.createElement('button');
    button.innerText = cityInput.value.trim();
    button.classList.add('list-group-item');
    button.onclick = function() {displayCurrentWeather()};
    pastCity.appendChild(button);
}

        
searchButton.addEventListener('click', displayCurrentWeather);
searchButton.addEventListener('click', pastCities);

