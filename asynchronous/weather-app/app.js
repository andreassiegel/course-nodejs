const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});

const apiKey = require('./geocode/api-key');
const request = require('request');
request({
    url: `https://api.darksky.net/forecast/${apiKey.DARK_SKY_API_KEY}/51.0336232,13.7160051`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to connect to Forecast.io servers.');
    } else if (response.statusCode !== 200) {
        console.log('Unable to fetch weather.');
    } else {
        console.log(body.currently.temperature);
    }
});
