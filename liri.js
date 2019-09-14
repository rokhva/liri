var env = require("dotenv").config();
var moment = require("moment");
var request = require("request");
var spotify = require("node-spotify-api");

var command = process.argv[2];
var searchWord = process.argv.slice(3).join(" ");

function go(){
    switch (command) {
        case "concert-this":
        concert(searchWord);
            break;
        case "movie-this":
        movie(searchWord);    
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
        console.log(`The title is: ${body.Title}`)
        console.log(`The movie is rated ${body.Rated}`)
        console.log(`The rotten tomatoes score is: ${body.Ratings[1].Value}`);
        }
    });
}

go();

var randomthing = `spotify-this-song,"I Want it That Way"`
var randomthingsArr = randomthing.split(",");
console.log(randomthingsArr);
var liriCommand = randomthingsArr[0];
var liriSearchWord = randomthingsArr[1];
