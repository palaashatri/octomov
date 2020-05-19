const express = require('express'),
    app = express(),
    request = require('request'),
    dotenv = require("dotenv");

dotenv.config();
const apikey =  process.env.API_KEY; //from the web developer bootcamp - colt steele (udemy)

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/results",function(req,res){
    var query = req.query.search;
    var url = `http://omdbapi.com/?s=${query}&apikey=${apikey}`;
    request(url,function(error,response,body){
      if(!error && response.statusCode == 200){
          var data = JSON.parse(body);
          res.render("results",{data:data,query:query});
      }  
    })
});


app.listen(process.env.PORT || 5000,function () {
    console.log('Movie app is running!');
});
