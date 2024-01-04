var weatherAPIkey = '4ddbaa190fc883f9a34a66a689a819db';

var cityInput = $('city_input');
var searchbtn = $('search-btn');
var clearbtn = $('clear_btn');
var pastsearch = $('prevSearches');

var currentCity;

function getWeather(data){
  var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}';
    fetch(weatherURL)
      .then(function(response){
        return response.json();
})
      .then(function(data){

  // current weather //
    var currentWeather = $('currentForecast');
    currentWeather.addclass('border border-primary');

  // city name //
    var cityName = $('<h2>');

    cityName.text(currentCity);
    currentWeather.append(cityName);

// current date //
    var currentDate = data.current.dt;
    currentDate = mement.unix(currentDate).format('MM/DD/YYYY');

    var date = $('<div>');
    date.text(`(${currentDate})`);
    cityName.append(currentDate);

// current temperature //
    var cityTemp = data.current.temp;
    var currentTemp = $('<div>')
    
    currentTemp.text(`Temperature : $(currentCityTemp)`);
    currentForecast.append(currentTemp);

// current wind //
    var currentWind = data.current.wind_speed;
    var WindEl = $('div');

    WindEl.text(`wind : ${cityWind}`);
    currentForecast.append(currentWind);

// current humidity //
    var currentHumidity = data.current.humidity;
    var humidity = $('<div');

    humidity.text(`Humidity : ${currentHumidity}`);
    currentForecast.append(currentHumidity);


// 5 day forecast //
    var fiveDayHeader = $('5dayheader');
    var fiveDayEl = $('<h2>');

    fiveDayEl.text (' 5 Day Forecast : ');
    fiveDayHeader.append(fiveDayEl);

    fiveDayForecast = $('#fiveDayForecast');

    for (let index = 1; index <= 5; index++){
      var day;
      var temp;
      var wind;
      var humidity;

      date = data.daily[i].dt;
      date = moment.unix(date).format('MM/DD/YYYY');

      temp = data.daily[i].temp.day;
      wind = data.daily[i].wind_speed;
      humidity = data.daily[i].humidity;

// card //
    var card = document.createElement('div');
    card.classList.add('card' , 'col-2' , 'm-1' , 'bg-primary' , 'text-white');

// card body to append //
    var cardbody = doctument.createElement('div');
    cardbody.classList.add('card-body');
    cardbody.innerHTML = `<h4> ${day} <h4>
                          ${temp} *F <br>
                          ${wind} <br>
                          ${humidity}%
                          `
    card.appendChild(cardbody);
    fiveDayForecast.append(card);
    
    }
  })
  return;
}

// search history cities as clickable button //
function searchHistory(){
  var savedcities = JSON.parse(localStorage.getItem('cities')) || [];
  var prevCities = document.getElementById('prevSEarches');

  prevCities.innerHTML = '';

  for (index = 0 ; index < savedcities.length ; 1++){
    var citybtn = document.createElement('button');
    citybtn.classList.add('btn', 'btn-primary', 'my-2', 'pastcity');
    citybtn.setAttribute('style', 'width:100%');
    citybtn.textContent = `${savedcities[i].city}`;
    prevCities.appendChild(citybtn);
  }
  return;
}


// get the city coordinates //
    function getcoordinates (){
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIkey}`;
    var savedcities = JSON.parse(localStorage.getItem('cities')) || [];

    fetch(requestUrl)
      .then(function(response){
        if(response.status >= 200 && response.status <=299){
          return response.json();
        } else{
          throw Error(response.statusText);
        }
    })
      .then(function(data){
        var cityInfo = {
          city: currentCity,
          lon: data.coord.lon,
          lat: data.coord.lat
        }

        savedcities.push(cityInfo);
        localStorage.setItem('cities' , JSON.stringify(savedcities));

        searchHistory();

        return cityInfo;
      })
        .then(function(data){
          getWeather(data);
        })
        return;

// submit city //
        function CityFormSubmit (event) {
          event.preventDefault();
          currentCity = cityInputEl.val().trim();
      
          getCoordinates();
      return;
        }
      
  }



  searchbtn.on("click", CityFormSubmit);
 