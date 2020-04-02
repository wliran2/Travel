function app(event) {
    event.preventDefault()
    const newPlace = document.getElementById('place').value;
    const timeInput = document.getElementById('date').value;
    console.log(newPlace)
    console.log(timeInput)
        //current date
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

    /*updateUI()

    const updateUI = async() => {
        const req = await fetch('http://localhost:8000/place')
        try {
            const projectData = await req.json()
            console.log('^^^^^^^^^' + projectData);
            if (projectData && projectData.length > 0) {
                document.getElementById('tripLocation').innerHTML = projectData[projectData.length - 1].temp;
                document.getElementById('typicalWeather').innerHTML = projectData[projectData.length - 1].date;
            }
        } catch (error) {
            console.log("there is an Error at the UI: ", error)
        }
    }
    */

};

export { app }