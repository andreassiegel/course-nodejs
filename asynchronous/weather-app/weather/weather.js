const request = require('request');

const apiKey = require('./api-key');

const getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${apiKey.DARK_SKY_API_KEY}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to connect to Forecast.io servers.');
        } else if (response.statusCode !== 200) {
            callback('Unable to fetch weather.');
        } else {
            let { temperature, apparentTemperature } = body.currently;
            callback(undefined, {
                temperature,
                apparentTemperature
            });
        }
    });
};

module.exports = {
    getWeather
};
