// Geocode API

const request = require('request');

const geocode = (location, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoibm91cmFucyIsImEiOiJjazd4b3cwbnAwOWt6M25reXFtZjRmNGM0In0.Fn9eSTBSxhSZ1nOtwVwu_g&limit=1`;

    request({url: geoUrl, json: true}, (error, response, {features} = {}) => {
        if(error) {
            callback('Unable to connect to location service!', undefined);
        } else if(!features.length) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                long: features[0].center[0],
                lat: features[0].center[1],
                place_name: features[0].place_name
            });
        }
    })
}

module.exports = geocode;