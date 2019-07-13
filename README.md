# liri-node-app
LIRI: A command line node app that takes in parameters and gives you back data.


Make sure you have your own API keys setup in a .env file for the following (making sure there are no spaces, brackets or Quotations:

# Spotify API keys

SPOTIFY_ID=PASTE-YOUR-ID-HERE
SPOTIFY_SECRET=PASTE-YOUR-SECRET-HERE

# OMDB API KEY
OMDB_ID=YOUR-API-KEY-HERE


Once you have that set you can run any of the following commands in your Node.js console:

node liri.js concert-this
node liri.js spotify-this-song
node liri.js movie-this
node liri.js do-what-it-says


What Each Command Should Do:

----------------------------------------------------------------------------------------------------
node liri.js concert-this <artist/band name here>

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")

If no event is provided then your program will default to "Metallica".

----------------------------------------------------------------------------------------------------
node liri.js spotify-this-song '<song name here>'

This will show the following information about the song in your terminal/bash window:

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from

If no song is provided then your program will default to "My Way".


----------------------------------------------------------------------------------------------------
node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

If you do not type a movie in, the program will output data for the movie "When Harry met Sally"


----------------------------------------------------------------------------------------------------
node liri.js do-what-it-says


Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


It should run spotify-this-song for "Stairway to Heaven," as follows the text in random.txt.
Edit the text in random.txt to test out the feature for movie-this and concert-this.

