const express = require('express')  
const app = express()  
const port = 3000
var bodyParser = require('body-parser')
// var fs = require('fs');
var mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
 //define folder that will be used for static assets 
app.use(express.static('/public'));

// HEROKU CONNECTION
// app.listen(process.env.PORT || 5000, function(err) {  
//   if (err) {
//     return console.log('something bad happened', err)
//   }
//   console.log(`Magic is happening on ${process.env.PORT}`)
// });

LOCAL CONNECTION 

app.listen(port, function(err) {  
 if (err) {
   return console.log('something bad happened', err)
 }
 console.log(`Magic is happening on ${port}`)
});


//Connect to Mongo // CHANGE MONGO DB URL!!!!
mongoose.connect('mongodb://heroku_qgcjr9k0:dk9hse1csiu0l52rljicap4vsc@ds153392.mlab.com:53392/heroku_qgcjr9k0', function(error){
	if (error) console.error(error);
	else console.log('mongo connected');

});

//MongoDB schema for TEXT STORIES 
Schema = new mongoose.Schema({
	name          : String,
	picture       : String,
	description   : String 
    },{ collection: 'stories' });

var textStories = mongoose.model('stories', Schema);


