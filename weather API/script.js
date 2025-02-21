const apiKey = "50f805fdd920305a41d26c3f28734dd7"; 
const defaultCities = ["Nairobi", "Mombasa", "Kisumu"];

async function getWeather(city = null) {
    city = city || document.getElementById("city").value;
    if (!city) return alert("Enter a city");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.cod === "404") {
            alert("City not found.");
            return;
        }

        displayWeather(data);
    } catch (error) {
        alert("Error fetching data.");
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById("weather-container");

    const weatherCard = `
        <div class="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 class="font-bold text-lg">${data.name}, ${data.sys.country}</h3>
            <p> ${data.main.temp}°C</p>
            <p> ${data.weather[0].description}</p>
            <p>  ${data.wind.speed} m/s</p>
        </div>
    `;

    weatherContainer.innerHTML = weatherCard + weatherContainer.innerHTML;
}


defaultCities.forEach(city => getWeather(city));
