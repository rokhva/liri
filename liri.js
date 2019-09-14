var env = require("dotenv").config();
var moment = require("moment");
var request = require("request");
var spotify = require("node-spotify-api");

var command = process.argv[2];
var searchWord = process.argv.slice(3).join(" ");

function go(command, searchWord){
    switch (command) {
        case "concert-this":
            concert(searchWord);
            break;
        case "movie-this":
            movie(searchWord);    
            break;
        case "spotify-this-song":
            spotify(searchWord);    
            break;
        case "do-what-it-says":
            liriDoThis(searchWord);    
            break;
        default:
            console.log("LIRI doesn't know that")
            break;
    }
}

function concert(){
    console.log(command);
    console.log(searchWord);
}
// var title = "abettermoviethanrememberthetitans"
// var normalway = "a movie is: " + title + "."
// var literal = `a movie is: ${title}.`

function movie(){

    var title = searchWord.replace(" ","+");
    console.log(title);
    request(`http://www.omdbapi.com/?t=${title}&apikey=trilogy`, function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

        // Then we print out the imdbRating
        //console.log(JSON.parse(body));
        var body = JSON.parse(body)
        // console.log(body);
        console.log(`Title: ${body.Title}`);
        console.log(`Year: ${body.Year}`);
        console.log(`IMDB Rating: ${body.Ratings[0].Value}`);
        console.log(`Rotten Tomatoes Rating: ${body.Ratings[1].Value}`);
        console.log(`Produced In: ${body.Country}`);
        console.log(`Language: ${body.Language}`);
        console.log(`Plot: ${body.Plot}`);
        console.log(`Actors: ${body.Actors}`);
        }
    });
}

go(command, searchWord);

// var randomthing = `spotify-this-song,"I Want it That Way"`
// var randomthingsArr = randomthing.split(",");
// console.log(randomthingsArr);
// var liriCommand = randomthingsArr[0];
// var liriSearchWord = randomthingsArr[1];


// //look at the read file example
// function readFile(){

//     var liriCommand = randomthingsArr[0];
//     var liriSearchWord = randomthingsArr[1];
//     go(liriCommand,liriSearchWord);

// }