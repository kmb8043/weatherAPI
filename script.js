var APIkey = '4ddbaa190fc883f9a34a66a689a819db';

// city search bar //
var cityInput = $('#city_input');

// action buttons //
var searchbtn = $('#search-btn');
var clearbtn = $('#clear_btn');
var pastsearch = $('#prevSearches');


var currentCity = '';

function getWeather(){
  var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`;
    fetch(weatherURL)
      .then(function(response){
        return response.json();
})
      .then(function(data){
    
  // current weather //
    var currentWeather = $('#currentWeather');
    currentWeather.addClass('border border-primary');

  // city name //
    var cityName = $('<h2>');

    cityName.text(currentCity);
    currentWeather.append(cityName);

// current date //
    var currentDate = data.current.dt;
    currentDate = moment.unix(currentDate).format('MM/DD/YYYY');

    var date = $('<div>');
    date.text(`(${currentDate})`);
    cityName.append(currentDate);

// current temperature //
    var cityTemp = data.current.temp;
    var currentTemp = $('<div>');
    
    currentTemp.text(`Temperature: ${cityTemp}`);
    currentWeather.append(cityTemp);

// current wind //
    var currentWind = data.current.wind_speed;
    var windEl = $('<div>');


    windEl.text(`wind : ${currentWind}`);
    currentWeather.append(windEl);

// current humidity //
    var currentHumidity = data.current.humidity;
    var humidity = $('<div>');

    humidity.text(`Humidity : ${currentHumidity}%`);
    currentWeather.append(humidity);


// 5 day forecast //
    var fiveDayHeader = $('#5dayheader');
    var fiveDayEl = $('<h2>');

    fiveDayEl.text('5 Day Forecast:');
    fiveDayHeader.append(fiveDayEl);

    fiveDayForecast = $('#fiveDayForecast');

    for (let i = 1; i <= 5; i++) {
      var day;
      var temp;
      var wind;
      var humidity;

      day = data.daily[i].dt;
      day = moment.unix(date).format('MM/DD/YYYY');

      temp = data.daily[i].temp.day;
      wind = data.daily[i].wind_speed;
      humidity = data.daily[i].humidity;

// card //
    var card = document.createElement('div');
    card.classList.add('card' , 'col-2' , 'm-1' , 'bg-primary' , 'text-white');

// card body to append //
    var cardbody = document.createElement('div');
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

//  prevCities.innerHTML = '';

for (let i = 0; i < savedcities.length; i++){
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
        function submitCity(event){
         event.preventDefault();
          currentCity = cityInput.val().trim();
   
       getcoordinates();
         return;
         
      }
     
  }

searchbtn.on("click", submitCity);

  
 