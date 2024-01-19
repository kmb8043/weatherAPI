var APIkey = '4ddbaa190fc883f9a34a66a689a819db';

// city search bar //
var cityInput = document.getElementById('city-input')

// action buttons //
var searchbtn = document.getElementById('search-btn');
var clearbtn = document.getElementById('clear-btn');
var pastsearch = document.getElementById('prevSearches');


// function to get the weather //
function getWeather(){
  var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`;
    fetch(weatherURL)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);

    var currentWeather = document.getElementById('currentweather');
      currentWeather.addClass('border border-primary');

    var cityName = document.createElement('<h2>');
      cityName.text('currentCity');
      currentWeather.append(cityName);

    var currentDate = data.current.dt;
      currentDate = moment.unix(currentDate).format('MM/DD/YYYY');

    var date = document.createElement('<div>');
      date.text(`(${currentDate})`);
      cityName.append(currentDate);

    var cityTemp = data.current.temp;
    var currentTemp = document.createElement('<div>');

      currentTemp.text(`Temperature: ${cityTemp}`);
      currentWeather.append(cityTemp);

    var currentWind = data.current.wind_speed;
    var windEl = document.createElement('<div>');

      windEl.text(`Wind: ${currentWind}`);
      currentWeather.append(windEl);

    var currentHumidity = data.current.humidity;
    var humidity = document.createElement('<div>');

      humidity.text(`Humidity: ${currentHumidity} %`);
      currentHumidity.append(humidity);

// five day forecast //
      var fiveDayHeader = document.getElementById('5dayheader');
      var fiveDayEl = document.createElement('<h2>');
      
        fiveDayEl.text('5 Day Forecast:');
        fiveDayHeader.append(fiveDayEl);

        fiveDayForecast = document.getElementById('5dayforecast');
        for (let i = 1; i <= 5; i++){
          var day;
          var temp;
          var wind;
          var humidity;

          day = data.daily[i].dt;
          day = moment.unix(date).format('MM/DD/YYYY');

          temp = data.daily[i].temp.day;
          wind = data.daily[i].wind.daily;
          humidity = data.daily[i].humidity;

    // cards for the 5 day forecast //
          var card = document.createElement('<div>');
          card.classList.add('card' , 'col-2' , 'm-1' , 'bg-primary' , 'text-white');

          var cardBody = document.createElement('<div>');
          cardBody.classList.add('card-body');
          cardBody.innerHtml = `<div> ${day} <div>
                                <div> ${temp} *F <div>
                                <div> ${wind} <div>
                                <div> ${humidity} % <div>`
          card.appendChild(cardBody);
          fiveDayForecast.append(card);
        }

    })
    return;

// function to get coordinates //
    function getCoordinates (){
      var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`;
    
      fetch(requestUrl)
      .then(function(data){
        
      })
    }

}

searchbtn.addEventListener('click' , getWeather);