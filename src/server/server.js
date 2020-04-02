const http = require('http');
const https = require('https');

const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
var bodyParser = require('webpack-body-parser');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

//const baseURL = 'http://api.geonames.org/searchJSON?q=london&maxRows=10&';

/*concest the API with the dotenv 
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});
*/

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
    const userName = 'wliran';
    const linkAPI = geoAPI + req.body.city + '&maxRows=1&userName=' + userName
    getPlaceByParam(linkAPI, res, req.body.travelDate);

}

function getPlaceByParam(linkAPI, res, travelDate) {
    console.log(linkAPI)
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
            //res.send(data)
        });
    }).on("error", (err) => {
        console.log("there is an Error: " + err.message);
    });
}

function getweather(travelDate, lng, lat, res) {
    const APPKEY = '23e1acafd6361d2b37d06fded5712cf8/'
    let weatherURL = 'https://api.darksky.net/forecast/'
    weatherURL += APPKEY + lat + ',' + lng + ',' + travelDate
    const encode = encodeURI(weatherURL);
    console.log(encode)

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
        console.log("there is an Error: " + err.message);
    });

    //get image from Pixabay
    //https://pixabay.com/api/?username=wliran2&key=15704386-7829fc8791373ecd3e13541e9&q=paris



}