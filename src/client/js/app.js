function performAction(e) {
    const newPlace = document.getElementById('place').value;

    getPlace('http://localhost:8000/searchPlace', { newPlace: newPlace })

    .then(function(data) {
        console.log(data.main)
        postData('http://localhost:8000/', { country: data.main, date: newDate })
    });
};

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
        console.log("error1", error);
    }
}


export { performAction };