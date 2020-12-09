

function displayWeatherResults() {

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
        }).then(function(response) {
            
            let today = new Date();
            let mm = today.getMonth()+1;
            let dd = today.getDate();
            let yyyy = today.getFullYear(); 

            //creates div to hold the current weather conditions
            let searchWeatherDiv = $("<div class='search-weather'>");

            //creating an element to have city name and today's date displayed
            let cityHeading = $("<h4>").text(city + " " + mm + "/" + dd + "/" + yyyy);
            searchWeatherDiv.append(cityHeading);

            //creating an element that holds and displays the temperature
            let temperature = response.current.temp;
            console.log(temperature);
            let pOne = $("<p>").text("Temperature: " + temperature + " F");
            searchWeatherDiv.append(pOne);

            //creating an element that holds and displays the humidity
            let humidity = response.current.humidity;
            let pTwo = $("<p>").text("Humidity: " + humidity + "%");
            searchWeatherDiv.append(pTwo);

            //creating an element that holds and displays the temperature
            let windSpeed = response.current.wind_speed;
            let pThree = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
            searchWeatherDiv.append(pThree);

            //creating an element that holds and displays the temperature
            let uvIndex = response.current.uvi;
            let pFour = $("<p>").text("UV Index: ");
            searchWeatherDiv.append(pFour);
            if(uvIndex < 3) {
                let uvSpan = $("<span class='uv-favorable").text(uvIndex);
                searchWeatherDiv.append(uvSpan);
            } else if (uvIndex > 5) {
                let uvSpan = $("<span class='uv-severe").text(uvIndex);
                searchWeatherDiv.append(uvSpan);
            } else {
                let uvSpan = $("<span class='uv-moderate").text(uvIndex);
                searchWeatherDiv.append(uvSpan);
            };
        })
      });
}
        


