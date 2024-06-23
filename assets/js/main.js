var apiKey = 'dc2ce1e1cfdc42ada7492050242206'; 
var apiUrl = 'http://api.weatherapi.com/v1/forecast.json?key='; 

async function getWeather() {
  var city = document.getElementById('cityInput').value || 'Cairo';
  var url = `${apiUrl}${apiKey}&q=${city}&days=3&lang=en`;

  try {
    var response = await fetch(url);
    var data = await response.json();
    displayWeather(data);

    document.getElementById('cityInput').value = '';

  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

function displayWeather(data) {
  var forecastContainer = document.getElementById('weather-forecast');
  forecastContainer.innerHTML = ''; 

  for (var i = 0; i < 3; i++) {
    var dayData = data.forecast.forecastday[i];
    var date = new Date(dayData.date);
    var dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); 
    var temperature = dayData.day.avgtemp_c;
    var iconUrl = "https:" + dayData.day.condition.icon;
    var condition = dayData.day.condition.text;
    var windSpeed = dayData.day.maxwind_kph;

    var card = `
      <div class="col-md-4 mb-4">
        <div class="card weather-card h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="city-name">${data.location.name}</h3>
            <div class="date">${dayName} - ${dayData.date}</div>
            <div class="temp">${temperature}°C</div>
            <img src="${iconUrl}" alt="${condition}" class="align-self-center">
            <p class="flex-grow-1">${condition}</p>
            <div class="weather-details">
              <span>Wind: ${windSpeed} km/h</span> 
            </div>
          </div>
        </div>
      </div>
    `;

    forecastContainer.innerHTML += card;
  }
}

getWeather(); 