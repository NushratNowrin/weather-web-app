const apiKey = "0af1269892ffd580e12241bf7b5e907c";
const apiUrl =
	"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const weatherIcon = document.querySelector(".weather-icon")

function checkWeather(city) {
    var xhr = new XMLHttpRequest();
    var url = apiUrl + city + '&appid=' + apiKey;
  
    xhr.open('GET', url, true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          console.log(data);
  
          document.getElementById('container').style.display = 'block';
          document.getElementById('not-found').style.display = 'none';
  
          document.querySelector('.city').innerHTML = data.name;
          var temperature = data.main.temp;
          document.querySelector('.temp').innerHTML = temperature;
  
          document.getElementById('celcius').addEventListener('click', function () {
            document.querySelector('.temp').innerHTML = temperature.toFixed(2);
            document.getElementById('celcius').style.backgroundColor = '#FFE269';
            document.getElementById('farenheit').style.backgroundColor = 'white';
          });
  
          document.getElementById('farenheit').addEventListener('click', function () {
            document.querySelector('.temp').innerHTML = (temperature * (9 / 5) + 32).toFixed(2);
            document.getElementById('farenheit').style.backgroundColor = '#FFE269';
            document.getElementById('celcius').style.backgroundColor = 'white';
          });
  
          document.querySelector('.wind').innerHTML = data.wind.speed;
          document.querySelector('.humidity').innerHTML = data.main.humidity;
          document.querySelector(".description").innerHTML = data.weather[0].description;
  
          var weatherIcon = document.getElementById('weather-icon');
  
          if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/clouds.png';
          } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.png';
          } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rain.png';
          } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';
          } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png';
          } else if (data.weather[0].main == 'Snow') {
            weatherIcon.src = 'images/snow.png';
          }
        } else {
          document.getElementById('not-found').style.display = 'block';
          document.getElementById('not-found').style.marginTop = '40px';
          document.getElementById('container').style.display = 'none';
          console.error('Request failed with status ' + xhr.status);
        }
      }
    };
  
    xhr.send();
  }

searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);
    document.getElementById('location-btn').style.backgroundColor = 'white';
})

