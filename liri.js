
require("dotenv").config();
const moment = require("moment");
const axios = require("axios");
const request = require("request");
const Spotify = require("node-spotify-api");
var fs = require("fs");
let keys = require("./keys.js");

//grabs command line arguments
let command = process.argv[2];
let searchWord = process.argv.slice(3).join(" ");

//all possible liri commands (and default of "liri doesnt know that" for anything that liri doesnt recognize)
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

//function for command concert-this
function concert(){
    //reformats the user input with no spaces so it can be insterted into the URL
    let band = searchWord.replace(" ","");
    let URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function(response){
        //loops through the response
        response.data.forEach(function (item) {
            //logs each venue name
            console.log(item.venue.name);
            //the city and the state from response
            let address = `${item.venue.city}, ${item.venue.region}`;
            //logs the address of the venue
            console.log(address);
            //logs the day the event is happening
            console.log(moment(item.datetime).format("MM/DD/YYYY"));
            //spacer for legibility :)
            console.log("--------------------------------------------------------------------------------------");
        })
    })
}

//function for command movie-this
function movie(){

    //reformats user input with +'s so it can be insterted into the URL
    let title = searchWord.replace(" ","+");
    
    request(`http://www.omdbapi.com/?t=${title}&apikey=trilogy`, function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            //makes response ledgible
            var body = JSON.parse(body);
            //logs title, year, ratings, country of production, language, plot, and actors
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

//function for spotify-this-song command
function spotify(searchWord, liriSearchWord) {

    //keys for api (imported from keys.js)
    let spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    spotify.search({ type: 'track', query: searchWord })
        .then(function (response) {

            //loops through response (for tracks)
            response.tracks.items.forEach(function (item) {
                item.artists.forEach(function (artist) {
                    //logs the artist for each track
                    console.log(`Artist: ${artist.name}`);
                });
                //logs the song, album and link
                console.log(`Song: ${item.name}`);
                console.log(`Album: ${item.album.name}`);
                console.log(`Link: ${item.href}`);
                //for readability
                console.log("--------------------------------------------------------------------------------------");
                console.log();
            });

        })
        //error handling
        .catch(function (err) {
            console.log(err);
        });
}


//function for command do-what-it-says
function liriDoThis() {

    //reads random text file
    fs.readFile("random.txt", function (err, data) {

        //error handling
        if (err) return console.log("error");

        //takes data from file, turns it into a string, and splits it into array items at the comma
        let dataArr = data.toString().split(",");

        //the command from the text file
        let liriCommand = dataArr[0];
        //reformats for the spotify url
        let liriSearchWord = dataArr[1].replace(" ", "+");;

        //calls the beginning switch function with the parameters from the random.txt file
        go(liriCommand, liriSearchWord);
    })

}

//function call for the beginning switch statement
go(command, searchWord);

