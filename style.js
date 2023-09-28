const apiKey = "0af1269892ffd580e12241bf7b5e907c";
const apiUrl =
	"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const weatherIcon = document.querySelector(".weather-icon")
async function checkWeather(city) {
	try {
		const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

		if (!response.ok) {
			document.getElementById("not-found").style.display = "block";
			document.getElementById("not-found").style.marginTop = "40px";
			document.getElementById("container").style.display = "none";
			throw new Error(`Request failed with status ${response.status}`);
		}
        document.getElementById("container").style.display = "block";
        document.getElementById("not-found").style.display = "none";

		// const response = await fetch(apiUrl + `&appid=${apiKey}`);
		var data = await response.json();
		console.log(data);
		document.querySelector(".city").innerHTML = data.name;
		const temperature = data.main.temp;
		document.querySelector(".temp").innerHTML = temperature;
		document.getElementById("celcius").addEventListener("click", function () {
			document.querySelector(".temp").innerHTML = temperature.toFixed(2);
			document.getElementById("celcius").style.backgroundColor = "#FFE269";
			document.getElementById("farenheit").style.backgroundColor = "white";
		});
		document.getElementById("farenheit").addEventListener("click", function () {
			document.querySelector(".temp").innerHTML = (
				temperature * (9 / 5) +
				32
			).toFixed(2);
			document.getElementById("farenheit").style.backgroundColor = "#FFE269";
			document.getElementById("celcius").style.backgroundColor = "white";
		});
        document.querySelector(".wind").innerHTML = data.wind.speed;
        document.querySelector(".humidity").innerHTML = data.main.humidity;

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png"
        }
        

	} catch (error) {
		console.error(error);
	}
}

searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);
})

