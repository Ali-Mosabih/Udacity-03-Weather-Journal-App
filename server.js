// import the required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('03-Weather-Journal-App'));

const data = []
let projectData = {}

// POST Weather Data 
app.post('/postWeatherData', (req, res) => {
    weatherData = {
        name: req.body.name,
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    }
    // data.push(weatherData);
    projectData = weatherData;
})

// GET Weather Data
app.get('/getWeatherData', (req, res) => {
    res.send(projectData)
})

app.get('/', (req, res, next) => {
    res.send('Hello World From Server!')
})

const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log('Hello Worlds From Server!')
}
