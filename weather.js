const weather = document.querySelector(".jsWeather");

const WEATHER_KEY = "location";
const WEATHER_API_KEY = "0a8d5c247cd28063c0c382bdeb2cfa98";

function handleGeoError() {

}

function saveLocation(location) {
    localStorage.setItem(WEATHER_KEY, JSON.stringify(location));
}

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`).then(respone => {
        return respone.json()
    }).then(json => {
        const temp = json.main.temp;
        const local = json.name;
        const weatherInformation = document.createElement("h4");
        weatherInformation.innerText = `${temp} ℃ / ${local}`;
        weather.appendChild(weatherInformation);
    })


}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const locationObj = {
        lat, lng
    }
    saveLocation(locationObj);
    getWeather(lat, lng);
}

function askLocation() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadLocation() {
    const loadedLocation = localStorage.getItem(WEATHER_KEY);
    if (loadedLocation === null) {
        askLocation();
    } else {
        const loadLocation = JSON.parse(loadedLocation);

        getWeather(loadLocation.lat, loadLocation.lng);
    }
}

function init() {
    loadLocation();

}

init();