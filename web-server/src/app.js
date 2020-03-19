const path = require('path');
const express = require('express');

const app = express();

// index.html is the default page for root url
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir))

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'My Forecast',
        location: 'My location'
    });
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})