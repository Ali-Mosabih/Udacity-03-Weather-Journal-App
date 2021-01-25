const API = 'https://api.openweathermap.org/data/2.5/weather';
const APIKEY = {
    imperial: '9e98131a07c8047d839189e000f891e1&units=imperial',
    metric: '9e98131a07c8047d839189e000f891e1&units=metric'
}

const myAPI = 'http://localhost:8000'

// Select Generate button and trigger getWeatherData function from a click event.
document.getElementById('generate').addEventListener('click', event => {
    event.preventDefault();
    let zip = document.getElementById('zip').value;
    if ([null, ''].includes(zip.trim()) || isNaN(zip)) {
        alert('zip code is incorrect, please try again');
        document.getElementById('zip').value = '';
        zip = '';
        return;
    }
    url = `${API}?zip=${zip}&appid=${APIKEY.imperial}`
    getWeatherData(url)
})

// fetch weather data from an API then, POST and GET them from another API.
async function getWeatherData(url) {
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(weatherData => {
            console.log(weatherData)
            if (weatherData.cod === '404') {
                alert('zip code is incorrect, please try again');
                throw new Error('error');
            }
            this.postWeatherData(`${myAPI}/postWeatherData`, weatherData)
        }).then(() => {
            this.updateUI();
        })
        .catch(err => {
            console.log(err)
        })
}

// POST the weather data
async function postWeatherData(path, data) {
    const feelings = document.getElementById('feelings').value
    let date = new Date();
    let newDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
    const payload = {
        date: newDate,
        // weather: data.weather,
        temp: data.main.temp,
        name: data.name,
        content: feelings
    }
    const response = await fetch(path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    try {
        return await response.json();
    } catch (err) {
        console.log(err)
    }
}

// get the weather data then, update the UI
async function updateUI() {
    const res = await fetch(`${myAPI}/getWeatherData`);
    // console.log(weatherData);
    try {
        const weatherData = await res.json();
        console.log(weatherData);
        document.getElementById('name').innerHTML = weatherData.name;
        document.getElementById('temp').innerHTML = weatherData.temp;
        document.getElementById('date').innerHTML = weatherData.date;
        document.getElementById('content').innerHTML = weatherData.content;
    } catch (error) {
        console.log("error", error);
    }
}
