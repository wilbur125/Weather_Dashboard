 const cityInput = document.getElementById('city-input');
 const searchButton = document.getElementById('search-city');
 const pastCity = document.getElementById('past-city');
 const searchResults = document.getElementById('search-results');
 const todayTemp = document.getElementById('today-temp');
 const todayHumidity = document.getElementById('today-humidity');
 const todayWindspeed = document.getElementById('today-windspeed');
 const todayUVI = document.getElementById('today-uvi');
 const fiveDayRow = document.getElementById('five-day');

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
    let city = cityInput.value.trim();

    let fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&lang=en&appid=0a0e18cfc10038e9c1b25028eac7bb5c";

    $.ajax({
        url: fiveDayQuery,
        method: "GET"
    }).then(function(weatherFive) {
        console.log("five",weatherFive);

        //created new array of objects to store api data for 5 day forcast at noon
        let fiveDayResults = [
            {
                date: weatherFive.list[7].dt_txt,
                src: "http://openweathermap.org/img/wn/" + weatherFive.list[7].weather[0].icon + "@2x.png",
                alt: weatherFive.list[7].weather[0].description,
                temp: weatherFive.list[7].main.temp,
                humidity: weatherFive.list[7].main.humidity     
            },
            {
                date: weatherFive.list[15].dt_txt,
                src: "http://openweathermap.org/img/wn/" + weatherFive.list[15].weather[0].icon + "@2x.png",
                alt: weatherFive.list[15].description,
                temp: weatherFive.list[15].main.temp,
                humidity: weatherFive.list[15].main.humidity  
            },
            {
                date: weatherFive.list[23].dt_txt,
                src: "http://openweathermap.org/img/wn/" + weatherFive.list[23].weather[0].icon + "@2x.png",
                alt: weatherFive.list[23].description,
                temp: weatherFive.list[23].main.temp,
                humidity: weatherFive.list[23].main.humidity  
            },
            {
                date: weatherFive.list[31].dt_txt,
                src: "http://openweathermap.org/img/wn/" + weatherFive.list[31].weather[0].icon + "@2x.png",
                alt: weatherFive.list[31].description,
                temp: weatherFive.list[31].main.temp,
                humidity: weatherFive.list[31].main.humidity  
            },
            {
                date: weatherFive.list[39].dt_txt,
                src: "http://openweathermap.org/img/wn/" + weatherFive.list[39].weather[0].icon + "@2x.png",
                alt: weatherFive.list[39].description,
                temp: weatherFive.list[39].main.temp,
                humidity: weatherFive.list[39].main.humidity  
            }
        ];

        console.log('wut', fiveDayResults);

        for (i = 0; i < fiveDayResults.length; i++) {
            const fiveCol = document.createElement('div');
            fiveCol.classList.add('col-sm-2');
            fiveDayRow.appendChild(fiveCol);

            const fiveCard = document.createElement('div');
            fiveCard.classList.add('card');
            fiveCol.appendChild(fiveCard);
            
            const fiveCardBody = document.createElement('div');
            fiveCardBody.classList.add('card-body');
            fiveCard.appendChild(fiveCardBody);

            const fiveHeading = document.createElement('h7');
            fiveHeading.innerText = fiveDayResults[i].date;
            fiveCardBody.appendChild(fiveHeading);
            
            const fiveIcon = document.createElement('img');
            const attSRC = document.createAttribute('src');
            attSRC.value = fiveDayResults[i].src;
            fiveIcon.setAttributeNode(attSRC);
            const attALT = document.createAttribute('alt');
            attALT.value = fiveDayResults[i].alt;
            fiveIcon.setAttributeNode(attALT);
            fiveCardBody.appendChild(fiveIcon);
            
            const fiveTemp = document.createElement('div');
            fiveTemp.innerText = fiveDayResults[i].temp;
            fiveCardBody.appendChild(fiveTemp);
            
            const fiveHumidity = document.createElement('div');
            fiveHumidity.innerText = fiveDayResults[i].humidity;
            fiveCardBody.appendChild(fiveHumidity);
        };
    })
}



function pastCities() {
    const button = document.createElement('button');
    button.innerText = cityInput.value.trim();
    button.classList.add('list-group-item');
    button.onclick = function() {displayCurrentWeather()};
    pastCity.appendChild(button);
}

        
searchButton.addEventListener('click', displayCurrentWeather);

searchButton.addEventListener('click', fiveDayForecast);
searchButton.addEventListener('click', pastCities);
