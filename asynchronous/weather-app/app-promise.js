const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const GOOGLE_API_KEY = require('./geocode/api-key');
const DARK_SKY_API_KEY = require('./weather/api-key');

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
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY.GOOGLE_API_KEY}`;

axios.get(geocodeUrl)
    .then((response) => {
        var data = response.data;
        if (data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }

        var result = data.results[0];
        var {lat, lng} = result.geometry.location;
        var weatherUrl = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY.DARK_SKY_API_KEY}/${lat},${lng}`;
        console.log(result.formatted_address);
        return axios.get(weatherUrl);
    })
    .then((response) => {
        var {temperature, apparentTemperature} = response.data.currently;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    })
    .catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(error.message);
        }
    });
