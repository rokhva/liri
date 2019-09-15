# liri
A command line application that retrives movie, concert, and song data.


# What Liri Does
This command line application recongizes the following commands:

  ```
  concert-this

  movie-this

  spotify-this-song

  do-what-it-says

  ```

You search for upcoming concerts for a specific band by typing the "concert-this" followed by the "band name". The Bands in Town API will return:
* venue name
* city and state of the venue
* date and time of the concert

The "movie-this" command followed by a movie name will return:
* the movie title
* year
* IMDB rating
* Rotten Tomatoes rating
* country the movie was produced in
* a summary of the plot
* actors

The "spotify-this-song" followed by a song name of your choice will return:
* the artist
* song name
* album
* link to song on spotify

Typing "do-what-it-says" will log a random song


# Requirements to run
* moment
* axios
* request
* node-spotify-api

