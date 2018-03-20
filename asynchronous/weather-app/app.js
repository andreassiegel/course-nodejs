const request = require('request');

const apiKey = require('./api-key');

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=${apiKey.API_KEY}`,
    json: true
}, (error, response, body) => {
    var result = body.results[0];
    var geolocation = result.geometry.location;
    console.log(`Address: ${result.formatted_address}`);
    console.log(`Latitude: ${geolocation.lat}`);
    console.log(`Longitude: ${geolocation.lng}`);
});