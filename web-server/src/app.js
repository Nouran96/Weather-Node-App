const path = require('path');
const express = require('express');

const app = express();

// index.html is the default page for root url
const publicDir = path.join(__dirname, '../public');

app.set('view engine', 'html') // for dynamic templates
app.engine('html', require('hbs').__express); // remove this templates have extension .hbs

app.use(express.static(publicDir)) // for static files

app.get('', (req, res) => {
    // templates should be added in views folder
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