const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

const baseURL = 'http://api.geonames.org/searchJSON?q=london&maxRows=10&';

/*concest the API with the dotenv 
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});
*/



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

//support diffrent domains - in my case donmine change is the port 
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
app.post('/place', getPlace);


// Setup Server
const port = 8080;
const server = app.listen(port, listening);

function listening() {
    console.log('The server is running!!!');
    console.log(`running on localhost: ${port}`);
};



function getPlace(req, res) {
    res.send();
}

// POST from site
const data = [];
app.post('/place', getPlace)

function getPlace(req, res) {
    data.push(req.body)
    console.log(data)
}

app.post('/place', add);

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