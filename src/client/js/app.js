function app(event) {
    event.preventDefault()
    const newPlace = document.getElementById('place').value;
    const timeInput = document.getElementById('date').value;
    console.log(newPlace)
    console.log(timeInput)

    //current date now
    const now = Math.floor(new Date().getTime() / 1000.0);
    console.log(now)

    //input date from the user
    const time = convert(timeInput);
    console.log(time)

    function convert(date) {
        let myDate = new Date(date);
        let convert = myDate.getTime() / 1000.0;
        return convert;
    }

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
            return newData;
        } catch (error) {
            console.log("there is an Error: ", error);
        }
    }
    getPlace('http://localhost:8081/place', { city: newPlace, travelDate: time })

    updateUI(newPlace, time)

    function updateUI(place, time) {
        //date of the planned trip
        let TravelWillBeAt = new Date(time * 1000);
        document.getElementById('tripLocation').innerHTML = (place + ', at ' + TravelWillBeAt)
        document.getElementById('typicalWeather').innerHTML
        document.getElementById('counter').innerHTML
    }
};

export { app }