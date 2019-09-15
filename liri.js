require("dotenv").config();
const moment = require("moment");
const axios = require("axios");
const request = require("request");
const Spotify = require("node-spotify-api");
// const fs = require("fs");
var fs = require("fs");
let keys = require("./keys.js");

let command = process.argv[2];
let searchWord = process.argv.slice(3).join(" ");

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
    // console.log(command);
    // console.log(searchWord);
    let band = searchWord.replace(" ","");
    console.log(band);
    let URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function(response){
        // console.log(response);
        response.data.forEach(function (item) {
        console.log(item.venue.name);
        let address = `${item.venue.city}, ${item.venue.region}`;
        console.log(address);
        console.log(moment(item.datetime).format("MM/DD/YYYY"));
        console.log("--------------------------------------------------------------------------------------");
        })
    })
}


function movie(){

    let title = searchWord.replace(" ","+");
    console.log(title);
    request(`http://www.omdbapi.com/?t=${title}&apikey=trilogy`, function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

        // Then we print out the imdbRating
        //console.log(JSON.parse(body));
        let body = JSON.parse(body);
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

function spotify(searchWord, liriSearchWord){

    let spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    spotify.search({ type: 'track', query: searchWord })
        .then(function (response) {
            response.tracks.items.forEach(function (item) {
                item.artists.forEach(function (artist) {
                    console.log(`Artist: ${artist.name}`);
                });
                console.log(`Song: ${item.name}`);
                console.log(`Album: ${item.album.name}`);
                console.log(`Link: ${item.href}`);
                console.log("--------------------------------------------------------------------------------------");
                console.log();
            });

        })
        .catch(function (err) {
            console.log(err);
        });
}



function liriDoThis(){
        fs.readFile("random.txt", function(err, data){
            if(err) return console.log("error");

            let dataArr = data.toString().split(",");
            console.log(dataArr);
            
            let liriCommand = dataArr[0];
            let liriSearchWord = dataArr[1].replace(" ","+");;

            go(liriCommand, liriSearchWord);
        })
        
}

go(command, searchWord);

