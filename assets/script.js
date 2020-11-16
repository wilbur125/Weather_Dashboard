

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
        
        
    });
}

