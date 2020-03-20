// "https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1Ijoibm91cmFucyIsImEiOiJjamwxenJ3Z20xbGMxM3FxazlqbHdoYW80In0.d42qV9z_Se6BiYI32ZREIQ"

// Reverse Geocode API

const request = require('request');

const geocode = (lat, long, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1Ijoibm91cmFucyIsImEiOiJjamwxenJ3Z20xbGMxM3FxazlqbHdoYW80In0.d42qV9z_Se6BiYI32ZREIQ&limit=1`;

    request({url: geoUrl, json: true}, (error, response, {features} = {}) => {
        if(error) {
            callback('Unable to connect to location service!', undefined);
        } else if(!features.length) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            // console.log(body)
            callback(undefined, {
                place_name: features[0].place_name
            });
        }
    })
}

module.exports = geocode;