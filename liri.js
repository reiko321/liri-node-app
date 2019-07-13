require("dotenv").config();

let keys = require("./keys");

let Spotify = require("node-spotify-api");

let axios = require("axios");

let moment = require("moment");

let fs = require("fs");

let spotify = new Spotify(keys.spotify);


let writeToLog = function(data) {
  fs.appendFile("log.txt", JSON.stringify(data) + "\n", function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
};

let getArtistNames = function(artist) {
  return artist.name;
};

let getMeSpotify = function(songName) {
  if (!songName) {
    songName = "My Way";
  }

  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    let songs = data.tracks.items;
    var data = [];

    for (var i = 0; i < songs.length; i++) {
      data.push({
        "artist(s)": songs[i].artists.map(getArtistNames),
        "song name: ": songs[i].name,
        "preview song: ": songs[i].preview_url,
        "album: ": songs[i].album.name
      });
    }

    console.log(data);
    writeToLog(data);
  });
};

let getMyBands = function(artist) {

  if (!artist) {
    artist = "Metallica";
  }

  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response) {
      let jsonData = response.data;

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }

      let logData = [];

      logData.push("Upcoming concerts for " + artist + ":");

      for (let i = 0; i < jsonData.length; i++) {
        let show = jsonData[i];

        logData.push(
          show.venue.city +
            "," +
            (show.venue.region || show.venue.country) +
            " at " +
            show.venue.name +
            " " +
            moment(show.datetime).format("MM/DD/YYYY")
        );
      }

      console.log(logData.join("\n"));
      writeToLog(logData.join("\n"));
    }
  );
};

let getMeMovie = function(movieName) {
  if (!movieName) {
    movieName = "When Harry met Sally";
  }

  let urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=" + process.env.OMDB_ID;;

  axios.get(urlHit).then(
    function(response) {
      let jsonData = response.data;

      let data = {
        "Title:": jsonData.Title,
        "Year:": jsonData.Year,
        "Rated:": jsonData.Rated,
        "IMDB Rating:": jsonData.imdbRating,
        "Country:": jsonData.Country,
        "Language:": jsonData.Language,
        "Plot:": jsonData.Plot,
        "Actors:": jsonData.Actors,
        "Rotten Tomatoes Rating:": jsonData.Ratings[1].Value
      };

      console.log(data);
      writeToLog(data);
    }
  );
};

let doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

let pick = function(caseData, functionData) {
  switch (caseData) {
  case "concert-this":
    getMyBands(functionData);
    break;
  case "spotify-this-song":
    getMeSpotify(functionData);
    break;
  case "movie-this":
    getMeMovie(functionData);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("LIRI doesn't know that");
  }
};

let runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv.slice(3).join(" "));
