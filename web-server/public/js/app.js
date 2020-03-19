const weatherBtn = document.querySelector('#getWeatherBtn');
const addressInput = document.querySelector('#addressInput');
const errorSpan = document.querySelector('#errorMsg');
const form = document.querySelector('form');
const locationEl = document.querySelector('#location');
const forecastEl = document.querySelector('#forecast');

weatherBtn.onclick = (ev) => {
    ev.preventDefault();

    errorSpan.style.visibility = 'visible'
    errorSpan.textContent = 'Loading ...';
    locationEl.textContent = '';
    forecastEl.textContent = '';

    const address = addressInput.value;

    fetch(`/weather?address=${address}`).then((res) => {
        return res.json()
    }).then(data => {
        if(data.error) {
            errorSpan.textContent = data.error;
        } else {
            errorSpan.textContent = ''

            locationEl.textContent = data.location;
            forecastEl.textContent = data.forecast;
            
            console.log(data.location)
            console.log(data.forecast)
        }
    })
}