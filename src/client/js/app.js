function app(event) {
    event.preventDefault()
    const newPlace = document.getElementById('place').value;
    const getDate = document.getElementById('date').value;
    console.log(newPlace)
    console.log(getDate)

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
    getPlace('http://localhost:8081/place', { newPlace: newPlace })

};

export { app }