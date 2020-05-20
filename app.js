const express = require('express'),
    app = express(),
    request = require('request'),
    dotenv = require("dotenv");

app.use(express.static('public'));
dotenv.config();
const apikey =  process.env.API_KEY; //from the web developer bootcamp - colt steele (udemy)

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/results",function(req,res){
    let query = req.query.search; // get search query from "home.ejs"
    let url = `http://omdbapi.com/?s=${query}&apikey=${apikey}`; // create a template url to pass to the request function below
    request(url,function(error,response,body){ // callback function with parameters error, response and body from request
      if(!error && response.statusCode == 200){ // no error and successful response
          var data = JSON.parse(body); //body is in the form of string, so parse it into JSON
          res.render("results",{data:data,query:query}); // render "results.ejs" with parameters data & query defined in the ejs template
      }  
    })
});


app.listen(process.env.PORT || 5005,function () {
    console.log('Movie app is running!');
});
