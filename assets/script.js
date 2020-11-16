

function displayWeatherResults() {

    //Geocode location using Google Places API
    const placeQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyDCYsLhQIm_iTzg5ZMsg8sR329hEsFE2oE";

    $.ajax({
        url: placeQueryURL,
        method: "GET"
      }).then(function(response) {
    
        //variable to store the lat and lon of the searched city
        const lat = response.results.geometry.location.lat;
        const lng = response.results.geometry.location.lng;

        const weatherQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely,hourly&units=imperial&lang=en&appid=0a0e18cfc10038e9c1b25028eac7bb5c"; 
        
        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        }).then(function(response) {
            
            const today = new Date();
            const mm = today.getMonth()+1;
            const dd = today.getDate();
            const yyyy = today.getFullYear(); 

            //creates div to hold the current weather conditions
            const searchWeatherDiv = $("<div class='search-weather'>");

            //creating an element to have city name and today's date displayed
            const cityHeading = $("<h4>").text(city + " " + mm + "/" + dd + "/" + yyyy);
            searchWeatherDiv.append(cityHeading);

            //creating an element that holds and displays the temperature
            const temperature = response.current.temp;
            const pOne = $("<p>").text("Temperature: " + temperature + " F");
            searchWeatherDiv.append(pOne);

            //creating an element that holds and displays the humidity
            const humidity = response.current.humidity;
            const pTwo = $("<p>").text("Humidity: " + humidity + "%");
            searchWeatherDiv.append(pTwo);

            //creating an element that holds and displays the temperature
            const windSpeed = response.current.wind_speed;
            const pThree = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
            searchWeatherDiv.append(pThree);

            //creating an element that holds and displays the temperature
            const uvIndex = response.current.uvi;
            const pFour = $("<p>").text("UV Index: ");
            searchWeatherDiv.append(pFour);
            if(uvIndex < 3) {
                const uvSpan = $("<span class='uv-favorable").text(uvIndex);
                searchWeatherDiv.append(uvSpan);
            } else if (uvIndex > 5) {
                const uvSpan = $("<span class='uv-severe").text(uvIndex);
                searchWeatherDiv.append(uvSpan);
            } else {
                const uvSpan = $("<span class='uv-moderate").text(uvIndex);
                searchWeatherDiv.append(uvSpan);
            };
        })
    });
}

