const dotenv = require('dotenv');
dotenv.config();

const baseURL = 'http://api.geonames.org/searchJSON?q=london&maxRows=10&';


var bodyParser = require('webpack-body-parser')
    // Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//const cors = require('cors');
//app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log('The server is running!!!');
    console.log(`running on localhost: ${port}`);
};

app.post('/searchPlace', getPlace);

function getPlace(req, res) {
    res.send();
}



// POST from site
const data = [];
app.post('/src', website)

function website(req, res) {
    data.push(req.body)
    console.log(data)
}

app.post('/src', add);

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