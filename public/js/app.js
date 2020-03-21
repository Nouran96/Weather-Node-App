const weatherBtn = document.querySelector('#getWeatherBtn');
const addressInput = document.querySelector('#addressInput');
const errorSpan = document.querySelector('#errorMsg');
const form = document.querySelector('form');
const locationEl = document.querySelector('#location');
const forecastEl = document.querySelector('#forecast');
const summaryEl = document.querySelector('#summary');
const iconEl = document.querySelector('#icon');
const tempEl = document.querySelector('#temp');
const rainEl = document.querySelector('#rain');
const windEl = document.querySelector('#wind');
const humidEl = document.querySelector('#humid');

// Fetch current location through geolocation
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        errorSpan.style.visibility = 'visible'
        errorSpan.textContent = 'Fetching your location ...';

        fetch(`/local?lat=${lat}&long=${long}`).then((res) => {
            return res.json()
        }).then(data => {
            if(data.error) {
                errorSpan.textContent = data.error;
            } else {
                renderPage(data);
            }
        }).catch(err => {
            errorSpan.textContent = 'Unable to connect to location service. Check your Connection';
        })
    }, () => {
        errorSpan.style.visibility = 'visible'
        errorSpan.textContent = 'Unable to retrieve your location';
    }, {enableHighAccuracy: true})
}


weatherBtn.onclick = (ev) => {
    ev.preventDefault();

    errorSpan.style.visibility = 'visible'
    errorSpan.textContent = 'Fetching your location ...';

    const address = addressInput.value;

    fetch(`/weather?address=${address}`).then((res) => {
        return res.json()
    }).then(data => {
        if(data.error) {
            errorSpan.textContent = data.error;
        } else {
            renderPage(data);
        }
    }).catch(err => {
        errorSpan.textContent = 'Unable to connect to location service. Check your Connection';
    })
}

function renderPage(data) {
    errorSpan.textContent = ''
    
    locationEl.textContent = data.location;
    summaryEl.textContent = data.forecast.summary;
    iconEl.setAttribute('src', `/img/${data.forecast.icon}.png`);
    tempEl.textContent = data.forecast.temperature + '˚';
    rainEl.innerHTML = '<b>Chance of Rain: </b>' + data.forecast.rainProp + '%';
    windEl.innerHTML = '<b>Wind Speed: </b>' + data.forecast.windSpeed + 'mph';
    humidEl.innerHTML = '<b>Humidity: </b>' + data.forecast.humidity + '%';
}