(function () {
  $(document).ready(function () {
    $("#loadingBar").hide()
    var GOOGLE_API_KEY = "AIzaSyBQatR5GIEGoGumIbClz--5UkaNBoAUw3Q"
    var OPEN_WEATHER_API = "678830d4c0a876064b4e0b6484e604d7"

    var WEATHER_UNITS = "metric"

    var detectionBtn = $("#detection-button")
    var locationDisplay = $("#locationDisplay")
    var geoDetails = $(".geoDetails")
    var addressInfo = $(".address")

    addressInfo.hide()
    $(".errorMessage").hide()

    detectionBtn.on("click", function (evt) {
      detectLocation()
    })
    geoDetails.hide()
    function displayLocation (location) {
      var latitude = $("#latitude")
      var longitude = $("#longitude")
      if (location && location.coords) {
        latitude.text(location.coords.latitude)
        longitude.text(location.coords.longitude)
      }

      // address geocoding functionality from here
      $(".address").hide()
      reverseGeoCoding(location.coords.latitude, location.coords.longitude)
        .then(function (data) {
          var addressBody = $("#addressBody")
          addressBody.empty()

          data.results.forEach(function (geocoding) {
            addressBody.append($("<tr><td>" + geocoding.formatted_address + "</td></tr>"))
          })
          $(".address").show()
        })

      getWeatherLocation(location.coords.latitude, location.coords.longitude)
        .then(function (data) {
            if (data.cod != 200) {
              console.log("Some sort of error while getting data")
              return 
            }
          console.log(data)
          geoDetails.show()
          var description = data.weather[0].description
          var icon = data.weather[0].icon
          var temp = data.main.temp
          var tempMax = data.main.temp_max
          var tempMin = data.main.temp_min 
          var humidity = data.main.humidity
          var sunrise = new Date(data.sys.sunrise * 1000)
          var sunset = new Date(data.sys.sunset * 1000)

          var iconImage = getWeatherIconImage(icon)

          $("#weatherNumber").text(formatTemp(temp))
          $("#weatherImage").html("<img src ='" + iconImage + "'/>" )
          $("#tempMin").text(formatTemp(tempMin))
          $("#tempMax").text(formatTemp(tempMax))
          $("#humidity").text(humidity)
          $("#weatherDesc").text(description)
          $("#sunrise").text(sunrise)
          $("#sunset").text(sunset)
        })

      buildMap(location.coords.latitude, location.coords.longitude)
      locationDisplay.show()
    }

    function hideLayouts () {
      $("#locationDisplay").hide()
      $(".geoDetails").hide()
      $(".address").hide()
    }

    function formatTemp (temp) {
      return temp + (WEATHER_UNITS == "metric" ? "°C": "F")
    }

    // detelts the location of the user
    function detectLocation () {
      hideLayouts()
      $("#loadingBar").show()
      if (!window.navigator) {
        alert("Sorry! You don't have this functionality available")
      } else {
        navigator.geolocation.getCurrentPosition(function (location) {
          $("#loadingBar").hide()
          displayLocation(location)
        }, errorNavigation)
      }
    }

    function errorNavigation(error) {
      showErrorMessage(error)
      Materialize.toast("<i class='material-icons'>close</i> We were unable to find your location", 2000)
    }

    function showErrorMessage(error) {
      $("#loadingBar").hide()
      $(".errorMessage").show()
    }

    // gets the reverse for a location using Google GeoCoding API
    // API KEY REQUIRED
    function reverseGeoCoding(latitude, longitude) {
      var geoCodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + GOOGLE_API_KEY
      return $.get(geoCodingUrl)
    }

    // given the latitude and longitude returns a link to the static image of Google Maps
    function googleStaticMap(latitude, longitude) {
      var baseUrl = "https://maps.googleapis.com/maps/api/staticmap?"  
      baseUrl += "center=" + latitude + "," + longitude
      baseUrl += "&zoom=15"
      baseUrl += "&size=400x400"

      return baseUrl
    }

    function googleMapsUrl (latitude, longitude) {
      var baseUrl = "https://www.google.com/maps/@"
      baseUrl += latitude + "," + longitude
      baseUrl += "," + "14z"

      return baseUrl
    }
    
    // builds the map element and appends it too
    function buildMap(latitude, longitude) {
      var mapImage = "<img src='" + googleStaticMap(latitude, longitude) + "'/>"
      var mapLink = "<a href='" + googleMapsUrl(latitude, longitude) + "'>" + mapImage + "</a>"

      $(".mapImage").empty()
      $(".mapImage").append(mapLink)
    }

    // gets the weather of the given location
    function getWeatherLocation(latitude, longitude, units) {
      var weatherUrl = "http://api.openweathermap.org/data/2.5/weather"
      weatherUrl += "?lat=" + latitude
      weatherUrl += "&lon=" + longitude
      
      if (units == "imperial") {
        weatherUrl += "&units=imperial"
      }
      else {
        weatherUrl += "&units=metric"
      }

      weatherUrl += "&APPID=" + OPEN_WEATHER_API



      return $.get(weatherUrl)
    }

    function getWeatherIconImage (icon) {
      var baseUrl = "http://openweathermap.org/img/w/"

      return baseUrl + icon + ".png"
    }
  })
}())