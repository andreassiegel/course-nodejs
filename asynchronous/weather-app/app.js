const request = require('request');
const yargs = require('yargs');

const apiKey = require('./api-key');

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

var encodedAddress = encodeURIComponent(argv.address);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey.API_KEY}`,
    json: true
}, (error, response, body) => {
    var result = body.results[0];
    var geolocation = result.geometry.location;
    console.log(`Address: ${result.formatted_address}`);
    console.log(`Latitude: ${geolocation.lat}`);
    console.log(`Longitude: ${geolocation.lng}`);
});