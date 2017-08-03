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

//post new story

app.post('/new-story', function(request, response){

	console.log("posted to new-story");
	console.log(request.body);


	
	story = new textStories(request.body);


	story.save(function(err){
		if(err){
        	response.send({"ERROR":"something went wrong"});
	    }else{
	       	response.send(story);
	    }

	})

})




//delete story

app.post('/delete-story', function(request, response){

	if(request.body){
		console.log("posted to delete");
		// console.log(request.body);
		console.log(request.body);

		
		storyDelId = request.body._id;
		console.log(storyDelId)
		
		
		textStories.findOne({_id: storyDelId}, function(err,story){
			if(err){
				console.log('error with delete-story find')
			}else{
				 
				if(story.name != null){
					console.log(story);			

					story.remove(function(err){
						if(err){
							console.log(" error")
						}
						console.log("removed");
						response.send("deleted");
					});
				}
				
			}
			
		});
	}
});


//get specific story

app.post('/this-story', function(request, response){

	console.log("posted to this-story");
	console.log(request.body);


	nameStory = request.body.name;
	console.log(nameStory);

	
	textStories.findOne({name: nameStory},function(err,story){
		if(err){
			console.log('error with this-story find')
		}else{
			thisStory = story;
			console.log(thisStory);
			response.send(thisStory);
		}
		
	})
})

//edit story

app.post('/edit-story', function(request, response){

	console.log("request.body comes next:");
	console.log(request.body);

	editedStory = request.body;

	console.log("var editedStory comes next:");
	console.log(editedStory);

	textStories.findOne({_id: editedStory._id}, function(err,story){
		if(err){
			console.log('error with edit-fstory find')
		}else{
			 
			 console.log("story found");
			 console.log(story);

			story.name = editedStory.name
			story.picture = editedStory.picture 
			story.description = editedStory.description
			
			console.log("story edited");
			console.log(story);

			story.save(function(err){
				if(err){
		        	response.send({"ERROR":"something went wrong"});
			    }else{
			    	console.log("not error")
			       	response.send(story);
			    }
			    
			})	


			
		}
		
	});


});










