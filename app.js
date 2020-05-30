const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()
//! QUANDO O BROWSER NÃO ENVIA O CSS
//! ERRO: Refused to apply style from 'http://localhost:3000/style.css' because its MIME 
//! type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.

app.use(express.static(__dirname));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.listen(3000,()=>{
    console.log("Ouvindo a porta 3000")
})

