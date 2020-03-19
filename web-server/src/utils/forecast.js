// Weather API

const request = require('request');

const forecast = (lat, long, callback) => {
    const weatherUrl = `https://api.darksky.net/forecast/9c14b5590a5f4a23abfc6722e77cb02f/${lat}, ${long}?units=si`;

    request({url: weatherUrl, json: true}, (error, response, body) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback(`Unable to find location. ${body.error}`, undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a "+ body.currently.precipProbability + "% chance of rain");
        }
    })
}

module.exports = forecast;