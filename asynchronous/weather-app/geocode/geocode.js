const request = require('request');

const apiKey = require('./api-key');

const geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey.GOOGLE_API_KEY}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            var result = body.results[0];
            var geolocation = result.geometry.location;
            callback(undefined, {
                address: result.formatted_address,
                latitude: geolocation.lat,
                longitude: geolocation.lng
            });
        }
    });
};

module.exports = {
    geocodeAddress
}
