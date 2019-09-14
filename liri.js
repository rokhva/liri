
// require("dotenv").config();

let env = require("dotenv").config();
const moment = require("moment");
const request = require("request");
const spotify = require("node-spotify-api");
const OmdbApi = require('omdb-api-pt');
const fs = require("fs");
const keys = require("./keys.js");

​ 

let command = process.argv[2];
let searchWord = process.argv.slice(3).join(" ");
​
function go(){
    switch (command) {
        case "concert-this":
            concert(searchWord);
            break;
        case "movie-this":
            movie(searchWord);    
            break;
        case "spotify-this-song":
            movie(searchWord);    
            break;
        case "spotify-this-song":
            movie(searchWord);    
            break;
        default:
            console.log("something went wrong, make sure your commands are correct!")
            break;
    }
}
​
function concert(){
    console.log(command);
    console.log(searchWord);
}
// var title = "abettermoviethanrememberthetitans"
// var normalway = "a movie is: " + title + "."
// var literal = `a movie is: ${title}.`
​
function movie(){
​
    let title = searchWord.replace(" ","+");
    console.log(title);
    request(`http://www.omdbapi.com/?t=${title}&apikey=trilogy`, function(error, response, body) {
​
    // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
​
        // Then we print out the imdbRating
        //console.log(JSON.parse(body));
        let body = JSON.parse(body)
        console.log(`The title is: ${body.Title}`);
        console.log(`The movie is rated ${body.Rated}`);
        console.log(`The movie is rated ${body.Rated}`);
        console.log(`The rotten tomatoes score is: ${body.Ratings[1].Value}`);
        }
    });
}




​
let randomthing = `spotify-this-song,"I Want it That Way"`
let randomthingsArr = randomthing.split(",");
console.log(randomthingsArr);
let liriCommand = randomthingsArr[0];
let liriSearchWord = randomthingsArr[1];