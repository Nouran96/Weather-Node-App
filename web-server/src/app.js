const path = require('path');
const express = require('express');

const app = express();

// Define paths for Express configuration
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Setup handlebars engine and views location
app.set('view engine', 'html') // for dynamic templates
app.engine('html', require('hbs').__express); // remove this if templates have extension .hbs
app.set('views', viewsPath); // change the default views directory to templates

app.use(express.static(publicDir)) // for static files

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nouran Samy'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'My Forecast',
        location: 'My location'
    });
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})