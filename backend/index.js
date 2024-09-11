
const express = require("express");
const path = require('path')
const bodyParser = require("body-parser")

const app = express()
const port = 8080


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
    console.log(req.body)
    
})


app.listen(port)
console.log("server at " + port)