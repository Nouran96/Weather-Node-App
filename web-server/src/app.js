const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express configuration
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'html') // for dynamic templates
app.engine('html', require('hbs').__express); // remove this if templates have extension .hbs
app.set('views', viewsPath); // change the default views directory to templates
hbs.registerPartials(partialsPath); // for partial templates

app.use(express.static(publicDir)) // for static files

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'Nouran Samy'
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
        message: 'This is the help message',
        title: 'Help Page',
        name: 'Nouran Samy'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'My Forecast',
        location: 'My location'
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Nouran Samy',
        errorMsg: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'This page is not found',
        title: '404 Page',
        name: 'Nouran Samy'
    });
})

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})