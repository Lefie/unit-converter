
const express = require("express");
const path = require('path')
const bodyParser = require("body-parser")
const app = express()
const port = 8080


// other functions 
const conversion_length = (value, from, to) => {
    
   const conversionFactors = {
    millimeter: 0.001,
    centimeter: 0.01,
    meter: 1,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.344
   }

   if ((!from in conversionFactors) || !( to in conversionFactors)){
        throw new Error("invalid unit");
   }

   // convert the value to meters
   let valueInMeters = value * conversionFactors[from]

   //convertedValue
   let convertedValue = valueInMeters / conversionFactors[to]

   return Math.round(convertedValue * 10000) / 10000

}

app.use(bodyParser.urlencoded({extended:true}))
// parse application/json
app.use(bodyParser.json())
//serving static fils from this folder
app.use(express.static('../frontend/'))


app.get("/", function(req,res) {
    fp = path.join(__dirname,'../frontend/index.html')
    
    res.sendFile(fp)
})

app.post("/length", function(req,res) {
    fp = path.join(__dirname,'../frontend/index.html')
    console.log(req.body)
    let length = parseFloat(req.body.length)
    let from_value = req.body.from
    let to_value = req.body.to
    if( from_value === to_value){
        res.json({"result":length})
    }else{
        converted_value = conversion_length(length,from_value,to_value)
        console.log("converted value is",converted_value)
        res.json({"result":converted_value})
    }
})

app.listen(port)
console.log("server at " + port)