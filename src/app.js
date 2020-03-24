const path = require('path');
const express = require('express');
const hbs = require('hbs');

const rGeocode = require('./utils/reverseGeocode');
const fGeocode = require('./utils/forwardGeocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 8000;
// const port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
// const address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

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
        title: 'Home Page',
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

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    // convert address to coordinates
    fGeocode(req.query.address, (error, { lat, long, place_name } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location: place_name,
                forecast: forecastData,
                address: req.query.address
            });
        })
    })
});

app.get('/local', (req, res) => {

    if(req.query.long && req.query.lat) {

        const lat = req.query.lat;
        const long = req.query.long;

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            // get location through coordinates
            rGeocode(lat, long, (error, data) => {
                if(error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location: data.place_name
                });
            })
    
        })
    } else {
        res.send({
            error: "Can't retrieve forecast for your location"
        })
    }
})

app.get('/help/*', (req, res) => {
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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})