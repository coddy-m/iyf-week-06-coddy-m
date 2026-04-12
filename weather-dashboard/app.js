const API_KEY = "6e3d6a1edfe2a626a7216cbf3d7d9442";

const form = document.getElementById("searchForm");
const input = document.getElementById("cityInput");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

form.addEventListener("submit", e => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;
    fetchWeather(city);
    input.value = "";
});

async function fetchWeather(city) {
    loading.classList.remove("hidden");
    loading.textContent = "Fetching weather for " + city + "...";

    errorDiv.classList.add("hidden");
    document.getElementById("weather").classList.add("hidden");
    document.getElementById("forecast").classList.add("hidden");

    try {
        const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

        const res1 = await fetch(currentURL);
        if (!res1.ok) throw new Error("City not found");

        const current = await res1.json();

        const res2 = await fetch(forecastURL);
        if (!res2.ok) throw new Error("Forecast error");

        const forecast = await res2.json();

        displayCurrent(current);
        displayForecast(forecast);
        saveRecent(city);

    } catch (err) {
        if (err.message.includes("Failed to fetch")) {
            errorDiv.textContent = "Network error. Check your internet.";
        } else {
            errorDiv.textContent = err.message;
        }
        errorDiv.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

function displayCurrent(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("details").textContent =
        "Humidity: " + data.main.humidity + "%";

    setBackground(
        data.weather[0].main,
        data.weather[0].description

    );

    document.getElementById("weather").classList.remove("hidden");
}

function displayForecast(data) {
    const container = document.getElementById("forecastContainer");
    container.innerHTML = "";

    const days = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!days[date]) days[date] = item;
    });

    Object.values(days).slice(0,5).forEach(day => {
        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML = `
            <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>${Math.round(day.main.temp)}°C</p>
        `;
        container.appendChild(card);
    });

    document.getElementById("forecast").classList.remove("hidden");
}
function setBackground(weatherMain, weatherDesc) {
    const body = document.body;
    body.className = "weather-app"; // reset

    const main = weatherMain.toLowerCase();
    const desc = weatherDesc.toLowerCase();

    if (main.includes("clear")) {
        body.classList.add("sunny");
    } 
    else if (main.includes("cloud")) {
        body.classList.add("cloudy");
    } 
    else if (main.includes("rain") || desc.includes("drizzle")) {
        body.classList.add("rainy");
    } 
    else if (main.includes("thunder")) {
        body.classList.add("thunderstorm");
    } 
    else if (main.includes("snow")) {
        body.classList.add("snowy");
    } 
    else if (main.includes("mist") || main.includes("fog") || main.includes("haze")) {
        body.classList.add("misty");
    } 
    else {
        body.classList.add("clear"); // fallback
    }
}



/* Recent Searches */
function saveRecent(city) {
    let list = JSON.parse(localStorage.getItem("cities")) || [];

    list = list.filter(c => c.toLowerCase() !== city.toLowerCase());
    list.unshift(city);

    if (list.length > 5) list.pop();

    localStorage.setItem("cities", JSON.stringify(list));
    renderRecent();
}

function renderRecent() {
    const container = document.getElementById("recentList");
    container.innerHTML = "";

    const list = JSON.parse(localStorage.getItem("cities")) || [];

    list.forEach(city => {
        const btn = document.createElement("button");
        btn.className = "recent-btn";
        btn.textContent = city;
        btn.onclick = () => fetchWeather(city);
        container.appendChild(btn);
    });
}

renderRecent();