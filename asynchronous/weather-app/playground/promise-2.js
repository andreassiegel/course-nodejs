const request = require('request');

const apiKey = require('../geocode/api-key');

const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey.GOOGLE_API_KEY}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                var result = body.results[0];
                var geolocation = result.geometry.location;
                resolve({
                    address: result.formatted_address,
                    latitude: geolocation.lat,
                    longitude: geolocation.lng
                });
            }
        });
    });
};

const successHandler = (location) => {
    console.log(JSON.stringify(location, undefined, 2));
};

const errorHandler = (errorHandler) => {
    console.log(errorHandler);
};

geocodeAddress('de 01187')
    .then(successHandler)
    .catch(errorHandler);
