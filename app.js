const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()
//! QUANDO O BROWSER NÃO ENVIA O CSS
//! ERRO: Refused to apply style from 'http://localhost:3000/style.css' because its MIME 
//! type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
    var firstName = req.body.fname
    var lastName = req.body.lname
    var email = req.body.email

    console.log("Data " + firstName + " " + lastName + " " + email)

})


app.listen(3000,()=>{
    console.log("Ouvindo a porta 3000")
})

