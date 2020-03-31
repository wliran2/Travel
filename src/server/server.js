//const http = require('http');

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
app.get('/place', getPlace);
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
    data.push(req.body)
    console.log(data)

    const geoAPI = 'http://api.geonames.org/searchJSON?q=';
    const place = req.body;
    console.log(place)

    const userName = 'wliran';
    const linkAPI = geoAPI + data + '&maxRows=1&userName=' + userName

    console.log(linkAPI)


}

/*
function getPlacexxx(req, res) {
    const geoAPI = 'http://api.geonames.org/searchJSON?q=';
    const place = res.body;
    const userName = 'wliran';
    const response = http.get(geoAPI + place + '&maxRows=1&userName=' + userName, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            getw(JSON.parse(data), response);

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function getw(data, res) {
  
        latitude = res.data.lat
        longitude = res.data.lng
        country = res.data.countryName

        console.log(country)
   
}
 */
app.post('/place2', add);

function add(req, res) {
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.newfeelings
    }
    data.push(newEntry)
    res.send(data)
    console.log(data)
}