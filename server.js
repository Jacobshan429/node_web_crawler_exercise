var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/index', function(req, res){

  url = 'http://www.imdb.com/title/tt1211837/?ref_=inth_ov_tt';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title: "", release: "", rating: "" }

      $('.title_wrapper').filter(function(){

        var data = $(this);

        title = data.children().first().text();
        release = data.children().last().children().last().text();
        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);

        rating = data.children().first().children().first().text();

        json.rating = rating;

      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

      console.log('File written!');

    })
    res.send('check console');
  })
})



app.listen('3154');
console.log('Magic happens on port 3154!');
