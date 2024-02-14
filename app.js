const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const city = req.body.cityName;
    const apikey = "<your_api_key_here>";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apikey;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description
            const logoId = weatherData.weather[0].icon
            const img = "https://openweathermap.org/img/wn/" + logoId + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1> The temp in " + city + " is " + temp + " degrees celcius</h1>");
            res.write("<img src = " + img + ">")
            res.send();

        })
    })
})


app.listen(3000, function () {
    console.log("Created succesffuly");
})
