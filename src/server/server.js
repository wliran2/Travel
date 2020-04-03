const http = require('http');
const https = require('https');

//encrypted the API keys
const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
var bodyParser = require('webpack-body-parser');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//support diffrent domains Cors- in my case donmine change is the port 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Initialize the main project folder
app.use(express.static('dist'));

//GET route
app.get('/place', getPlaceByParam);

// POST from site
const data = [];
app.post('/place', getPlace)

// Setup Server
const port = 8081;
const server = app.listen(port, listening);

function listening() {
    console.log('The server is running!!!');
    console.log(`running on localhost: ${port}`);
};

function getPlace(req, res) {
    const geoAPI = 'http://api.geonames.org/searchJSON?q=';
    const userName_key = process.env.userName_key;
    const linkAPI = geoAPI + req.body.city + '&maxRows=1&userName=' + userName_key
    getPlaceByParam(linkAPI, res, req.body.travelDate, req.body.city);

}

function getPlaceByParam(linkAPI, res, travelDate, placeP) {
    http.get(linkAPI, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            const jsonData = JSON.parse(data)
            getweather(travelDate, jsonData.geonames[0].lng, jsonData.geonames[0].lat, res);
            getPic(placeP, res);
        });
    }).on("error", (err) => {
        console.log("there is an Error geoLocation API: " + err.message);
    });
}

function getweather(travelDate, lng, lat, res) {
    const APPKEY_darkskykey = process.env.APPKEY_darkskykey;
    let weatherURL = 'https://api.darksky.net/forecast/'
    weatherURL += APPKEY_darkskykey + lat + ',' + lng + ',' + travelDate
    const encode = encodeURI(weatherURL);

    https.get(encode, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log("*****************************************************")
            console.log(JSON.parse(data));
            res.send(data)
        });
    }).on("error", (err) => {
        console.log("there is an Error at getWeather API: " + err.message);
    });
}

function getPic(placeP, res) {
    const location = placeP
    const pixabayAppKey = process.env.pixabayAppKey;
    let pixabay = 'https://pixabay.com/api/?key='
    pixabay = pixabay + pixabayAppKey + '&q=' + location
    https.get(pixabay, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log("*****************************************************")
                //console.log(JSON.parse(data));
            const jsonPic = JSON.parse(data)
            const cityPic = jsonPic.hits[0].pageURL
            console.log(cityPic)
                //res.send(data)

        });
    }).on("error", (err) => {
        console.log("there is an Error on getPic API: " + err.message);
    });
}