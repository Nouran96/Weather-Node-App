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
            // console.log(body)
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainProp: body.currently.precipProbability,
                windSpeed: body.currently.windSpeed,
                humidity: body.currently.humidity,
                icon: body.currently.icon
            });
            // callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a "+ body.currently.precipProbability + "% chance of rain");
        }
    })
}

module.exports = forecast;