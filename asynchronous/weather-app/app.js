const request = require('request');

const apiKey = require('./api-key');

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=${apiKey.API_KEY}`,
    json: true
}, (error, response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
});