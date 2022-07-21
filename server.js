if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const apiKey = process.env.OPENW_API_KEY;


app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&exclude=current&appid=${apiKey}&units=metric`;
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data))

})


app.listen(PORT, function(err) {
    if (err) console.log(err);
    console.log(`Server listening on port: ${PORT}`);
});