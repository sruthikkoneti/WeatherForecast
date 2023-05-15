const { log } = require("console")
const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
// app.get("/",function(req,res){

//     const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=b398bb605f6a7e8b11286057be275673"
//     https.get(url,function(response){
//         console.log(response.statusCode)
//         response.on("data",function(data){
//             // console.log(data)
//             const weatherData=JSON.parse(data)
//             const temp=weatherData.main.temp
//             const weatherDescription=weatherData.weather[0].description
//             const icon=weatherData.weather[0].icon
//             const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
//             res.write("<p>The weather is currently "+weatherDescription+"</p>")
//             res.write("<h1>The temperature in London is "+temp+"degree Celsius</h1>")
//             res.write("<img src="+imageURL+">")
//             res.send()
           
//         })
//     })
//     // res.send("Server is up and running")
// })


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html")

})

app.post("/",function(req,res){
    console.log(req.body.cityName)

    const query=req.body.cityName
    const apiKey="b398bb605f6a7e8b11286057be275673"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit

    https.get(url,function(response){
    console.log(response.statusCode)

    response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description 
        const icon=weatherData.weather[0].icon
        const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<p>The weather is currently "+weatherDescription+"</p>")
        res.write("<h1>The temperature in "+query+" is "+temp+"degree Celsius</h1>")
        res.write("<img src="+imageURL+">")
        res.send()

    })
})
    
})



app.listen(3000,function(){
    console.log("Server is running on port 3000")
})

