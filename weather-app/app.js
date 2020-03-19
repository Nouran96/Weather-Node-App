const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if(location) {
    geocode(location, (error, {lat, long, place_name}) => {
        if(error) {
            return console.log(error);
        }
    
        console.log("Place is", place_name);
        forecast(lat, long, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }
    
            console.log(forecastData)
        })
    })
} else {
    console.log('You must specify a location');
}