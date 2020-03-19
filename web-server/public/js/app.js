const weatherBtn = document.querySelector('#getWeatherBtn');
const addressInput = document.querySelector('#addressInput');

weatherBtn.onclick = (ev) => {
    ev.preventDefault();
    
    const address = addressInput.value;
    fetch(`/weather?address=${address}`).then((res) => {
        return res.json()
    }).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
}