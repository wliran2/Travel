/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '09e6847eba65469847e7f8bc450029c6'


// Event listener to add function to existing HTML element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    getZipCode(baseURL, newZip, apiKey)

    .then(function(data) {
        console.log(data.main)
        const newfeelings = document.getElementById('feelings').value;
        postData('http://localhost:8000/website', { temp: data.main.temp, date: newDate, userResponse: newfeelings })
        updateUI()
    });
};

export { performAction };

// Function to Async GET Web Data
const getZipCode = async(baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + '&appid=' + key)
    try {
        // Transform into JSON
        const data = await res.json()
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//Function Async POST data  
const postData = async(url = '', data = {}) => {
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch (error) {
            console.log("error1", error);
        }
    }
    //Function updateUI
const updateUI = async() => {
    const req = await fetch('http://localhost:8000/all')
    try {
        const projectData = await req.json()
        console.log(projectData);
        if (projectData && projectData.length > 0) {
            document.getElementById('temp').innerHTML = projectData[projectData.length - 1].temp;
            document.getElementById('date').innerHTML = projectData[projectData.length - 1].date;
            document.getElementById('content').innerHTML = projectData[projectData.length - 1].userResponse;
        }
    } catch (error) {
        console.log("error", error)
    }
}