function app(event) {
    event.preventDefault()
    const newPlace = document.getElementById('place').value;
    const timeInput = document.getElementById('date').value;
    console.log(newPlace)
    console.log(timeInput)
    if (!valid(newPlace, timeInput)) return

    //input date from the user
    const time = convert(timeInput);
    console.log(time)

    const getPlace = async(url = '', data = {}) => {
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
            updateUI(data.city, data.travelDate)
            document.getElementById('typicalWeather').innerHTML = newData.temp != 'no value' ? newData.temp + ' &#8457' : 'we did got a temp for this location ';
            document.getElementById('city_img').src = newData.picture
                //return newData;
        } catch (error) {
            console.log("there is an Error: ", error);
        }
    }

    getPlace('http://localhost:8081/place', { city: newPlace, travelDate: time })

};

function valid(place, time) {
    if (!place || place.langth == 0) {
        document.getElementById("placeERR").innerHTML = "City name cant be empty"
        return false;
    }
    if (!time || time.langth == 0) {
        document.getElementById("dateERR").innerHTML = "Date of Departure cant be empty"
        return false;
    }
    return true;
}

function convert(date) {
    let myDate = new Date(date);
    let convert = myDate.getTime() / 1000.0;
    return convert;
}

function updateUI(place, time) {
    //date of the planned trip
    let TravelWillBeAt = new Date(time * 1000);
    //current date now
    const now = Math.floor(new Date().getTime() / 1000.0);
    let gap = time - now
    console.log(gap)
    gap = (gap / 86400);
    document.getElementById('tripLocation').innerHTML = place + ', at ' + TravelWillBeAt.toDateString()
    document.getElementById('counter').innerHTML = Math.round(gap) + ' days'
}

export { app }