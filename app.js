
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req,res){
const query = req.body.cityName;
const apiKey = "8cea2f1ec15f2c3a17785785831bbbee";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+"";
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<h1>The weather description is "+description+"</h1>");
        res.write("<h1>The Weather in " +req.body.cityName+ " is " + temp + " degrees celcius.</h1>");
        res.write("<img src="+ imageUrl +">");
        res.send();

        //JSON.STRINGIFY
        // const me ={
        //     name:"Ryan",
        //     age: 21
        // }
        // console.log(JSON.stringify("My name is "+me.name+". I'm "+me.age+" years young."));
    })
});
})















app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})
