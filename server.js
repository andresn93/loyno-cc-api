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

// LOCAL CONNECTION 

app.listen(port, function(err) {  
 if (err) {
   return console.log('something bad happened', err)
 }
 console.log(`Magic is happening on ${port}`)
});


//Connect to Mongo // UPDATE MONGO DB URL!!!!
mongoose.connect('mongodb://heroku_hs5cd2fl:dlco8ms4jgmcr2goptk0siqu3b@ds145245.mlab.com:45245/heroku_hs5cd2fl', function(error){
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







//STORIES

//get the stories

app.get('/stories', function(request, response){  
	textStories.find(function(err,stories){
		if(err){
			console.log('error with textStories find')
		}else{
			response.send(stories);
		}
		
	})


  
	console.log('stories were sent');
});

//post new storie

app.post('/new-storie', function(request, response){

	console.log("posted to new-storie");
	console.log(request.body);


	//add request to directors collection
	storie = new textStories(request.body);


	storie.save(function(err){
		if(err){
        	response.send({"ERROR":"something went wrong"});
	    }else{
	       	response.send(storie);
	    }

	})

})



//edit storie

//delete storie











