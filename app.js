const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
//! QUANDO O BROWSER NÃO ENVIA O CSS
//! ERRO: Refused to apply style from 'http://localhost:3000/style.css' because its MIME
//! type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data)
  const url = "https://us10.api.mailchimp.com/3.0/lists/08441da840"
  const optoins = {
     method : "POST",
     auth: "arnoldosilva:a88dd5ee7603b46ae742f6dc8ef6eb68-us10" 
  }

  const request = https.request(url, optoins, function(response){
    
    if(response.statusCode === 200){
        // res.send("Successfully subscribed!")
        res.sendFile(__dirname+"/success.html")
    }else{
        // res.send("There was erro with signing up, please try again")
        res.sendFile(__dirname+"/failure.html")
    }


    response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })  

    request.write(jsonData);
    request.end()

});


app.post("/failure", function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, () => {
  console.log("Ouvindo a porta 3000");
});

// LIST ID
// 08441da840
