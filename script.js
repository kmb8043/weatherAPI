var APIkey = '5b756daa2c3f8347f2ab7b391a0b28b3';

// city search bar //
var cityInput = document.getElementById('city-input')

// action buttons //
var searchbtn = document.getElementById('search-btn');
var clearbtn = document.getElementById('clear-btn');
var pastsearch = document.getElementById('prevSearches');

// function to get the weather //
function getWeather() {
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid= ${APIkey}`;
    
    fetch(requestUrl)
        .then(function(data) {
            return data.json();
        })
        .then(function(geoData) {
            var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`;
            return fetch(weatherURL);
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var currentWeather = document.getElementById('currentweather');
            currentWeather.classList.add('border', 'border-primary');

            var cityName = document.createElement('h2');
            cityName.textContent = 'currentCity';
            currentWeather.appendChild(cityName);

            var currentDate = data.current.dt;
            currentDate = moment.unix(currentDate).format('MM/DD/YYYY');

            var date = document.createElement('div');
            date.textContent = `(${currentDate})`;
            cityName.appendChild(date);

            var cityTemp = data.current.temp;
            var currentTemp = document.createElement('div');
            currentTemp.textContent = `Temperature: ${cityTemp}`;
            currentWeather.appendChild(currentTemp);

            var currentWind = data.current.wind_speed;
            var windEl = document.createElement('div');
            windEl.textContent = `Wind: ${currentWind}`;
            currentWeather.appendChild(windEl);

            var currentHumidity = data.current.humidity;
            var humidity = document.createElement('div');
            humidity.textContent = `Humidity: ${currentHumidity} %`;
            currentWeather.appendChild(humidity);

            // five day forecast //
            var fiveDayHeader = document.getElementById('5dayheader');
            var fiveDayEl = document.createElement('h2');
            fiveDayEl.textContent = '5 Day Forecast:';
            fiveDayHeader.appendChild(fiveDayEl);

            var fiveDayForecast = document.getElementById('5dayforecast');
            for (let i = 1; i <= 5; i++) {
                var day = moment.unix(data.daily[i].dt).format('MM/DD/YYYY');
                var temp = data.daily[i].temp.day;
                var wind = data.daily[i].wind.daily;
                var humidity = data.daily[i].humidity;

                // cards for the 5 day forecast //
                var card = document.createElement('div');
                card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');

                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.innerHTML =
                    `<div> ${day} </div>
                    <div> ${temp} *F </div>
                    <div> ${wind} </div>
                    <div> ${humidity} % </div>`;

                card.appendChild(cardBody);
                fiveDayForecast.appendChild(card);
            }
        });
}

searchbtn.addEventListener('click', getWeather);
