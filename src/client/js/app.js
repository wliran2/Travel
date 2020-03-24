// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.geonames.org/search?q'
const userName = 'wliran'
    //http://api.geonames.org/search?q=chicago&username=wliran

// Event listener to add function to existing HTML element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newPlace = document.getElementById('place').value;
    getPlace(baseURL, place, userName)

    .then(function(data) {
        console.log(data.main)
        postData('http://localhost:8000/website', { country: data.main, date: newDate })

    });
};

export { performAction };

// Function to Async GET Web Data
const getPlace = async(baseURL, place, userName) => {
    const res = await fetch(baseURL + '=' + place + '&usermame=' + userName)
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