console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);