const apiKeyLocation = "0af1269892ffd580e12241bf7b5e907c";

function getData(lat, long) {
	const xhr = new XMLHttpRequest();
	const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=${apiKeyLocation}`;

	xhr.open("GET", url, true);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				// Handle the JSON response here
				console.log(data);
				document.getElementById("container").style.display = "block";
				document.getElementById("not-found").style.display = "none";

				document.querySelector(".city").innerHTML = data.name;
				const temperature = data.main.temp;
				document.querySelector(".temp").innerHTML = temperature;
				document
					.getElementById("celcius")
					.addEventListener("click", function () {
						document.querySelector(".temp").innerHTML = temperature.toFixed(2);
						document.getElementById("celcius").style.backgroundColor =
							"#FFE269";
						document.getElementById("farenheit").style.backgroundColor =
							"white";
					});
				document
					.getElementById("farenheit")
					.addEventListener("click", function () {
						document.querySelector(".temp").innerHTML = (
							temperature * (9 / 5) +
							32
						).toFixed(2);
						document.getElementById("farenheit").style.backgroundColor =
							"#FFE269";
						document.getElementById("celcius").style.backgroundColor = "white";
					});
				document.querySelector(".wind").innerHTML = data.wind.speed;
				document.querySelector(".humidity").innerHTML = data.main.humidity;

				if (data.weather[0].main == "Clouds") {
					weatherIcon.src = "images/clouds.png";
				} else if (data.weather[0].main == "Clear") {
					weatherIcon.src = "images/clear.png";
				} else if (data.weather[0].main == "Rain") {
					weatherIcon.src = "images/rain.png";
				} else if (data.weather[0].main == "Drizzle") {
					weatherIcon.src = "images/drizzle.png";
				} else if (data.weather[0].main == "Mist") {
					weatherIcon.src = "images/mist.png";
				} else if (data.weather[0].main == "Snow") {
					weatherIcon.src = "images/snow.png";
				}
			} else {
				// Handle errors here
				console.error("Request failed with status:", xhr.status);
			}
		}
	};

	xhr.send();
}

// location
async function gotLocation(position) {
	const lati = position.coords.latitude;
	const longi = position.coords.longitude;
	const result = getData(lati, longi);
}
function failedToGet() {
	console.log("There was some issue");
}
const locationBtn = document
	.getElementById("location-btn")
	.addEventListener("click", async () => {
		const result = navigator.geolocation.getCurrentPosition(
			gotLocation,
			failedToGet
		);
	});
