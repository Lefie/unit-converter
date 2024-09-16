
const express = require("express");
const path = require('path')
const bodyParser = require("body-parser")
const app = express()
const port = 8080



// helper functions 
/*

value : the value which user inputs to be converted 
from : unit to convert from
to : unit to convert to
type :  the type of conversion, length, weight or temp
*/
const conversion = (value, from, to, type) => {
    const conversionFactors_length = {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1,
        kilometer: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344
    }

    const convertsionFactors_weight = {
        milligram: 0.001,
        gram: 1,
        kilogram: 1000,
        ounce: 28.3495,
        pound: 453.592
    }


    if (type === "length"){
        
        if ((!from in conversionFactors_length) || !( to in conversionFactors_length)){
            throw new Error("invalid unit");
        }
        console.log((value), conversionFactors_length[from] )

         // convert the value to meters
        let valueInMeters = value * conversionFactors_length[from]
        console.log("I am in length", valueInMeters)

        //convertedValue
        let convertedValue = valueInMeters / conversionFactors_length[to]

        return Math.round(convertedValue * 10000) / 10000
    }

    if ( type === "weight"){
        if ((!from in convertsionFactors_weight) || !( to in convertsionFactors_weight)){
            throw new Error("invalid unit");
        }

        // Convert value from the initial unit to grams (base unit)
        let valueInGrams = value * convertsionFactors_weight[from];

        let convertedValue = valueInGrams / convertsionFactors_weight[to];

        return Math.round(convertedValue * 10000) / 10000;

    }

    if ( type === "temp") {
        console.log("from temp, from and to", value, from, to)
        // convert the 'from' value to celcius 
        let celciusVal;
        switch (from){
            case 'celsius':
                celciusVal = value
                break
            case 'fahrenheit':
                celciusVal = (value - 32) * 5 / 9;
                break
            case 'kelvin':
                celciusVal = value - 273.15;
                break
            default:
                throw new Error('Invalid from unit');

        }
        console.log("celciusVAl", celciusVal)

        let convertedVal;
        switch(to) {
            case 'celsius':
                convertedVal = celciusVal;
                break;
            case 'fahrenheit':
                convertedVal = (celciusVal * 9 / 5) + 32;
                break;
            case 'kelvin':
                convertedVal = celciusVal + 273.15;
                break;
            default:
                throw new Error('Invalid to unit')
        }
        
        return Math.round(convertedVal * 10000)  / 10000
        }
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
        let converted_value = conversion(length,from_value,to_value, "length")
        console.log("converted value is",converted_value)
        res.json({"result":converted_value})
    }
})

app.post("/weight", function(req, res) {
    fp = path.join(__dirname,'../frontend/index.html')
    
    let weight = parseFloat(req.body.weight)
    let from_value = req.body.from
    let to_value = req.body.to

    if( from_value === to_value){
        res.json({"result":weight})
    }else {
        let converted_value = conversion(weight,from_value, to_value, "weight")
        console.log(converted_value)
        res.json({"result":converted_value})
    }
})

app.post("/temperature", function(req, res){
    fp = path.join(__dirname,'../frontend/index.html')

    let temp = parseFloat(req.body.temp)
    let from = req.body.from
    let to = req.body.to

    if (from === to) {
        res.json({"result":temp})
    }else {
        let converted_value = conversion(temp, from, to, "temp")
        console.log(converted_value)
        res.json({"result": converted_value})
    }

})

app.listen(port)
console.log("server at " + port)