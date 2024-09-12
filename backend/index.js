
const express = require("express");
const path = require('path')
const bodyParser = require("body-parser")
const app = express()
const port = 8080


// other functions 
const conversion = (value,from, to) => {
    if (from === "millimeter"){
        if (to === "centimeter"){
            converted_value = value / 10
            console.log(from," millimeter is", converted_value, "centimeter")
            return converted_value
        }
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
        converted_value = conversion(length,from_value,to_value)
        res.json({"result":converted_value})
    }
})

app.listen(port)
console.log("server at " + port)