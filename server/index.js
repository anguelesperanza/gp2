// This file will have a lot of comments.
//  I am very confused and hope these comments will sort things out

// here we are telling the project that we need to use
// the express file, and the db_access file
// we assign express to a variable called express
// and we assign db_access to a variable called dao
const express = require("express");
const dao = require("./db_access");

// creates a new express 'application'
const app = express();

// not sure what this does.
app.use(express.json());

// This is creating a route for our application to access our DB -- Our API
// This is not making the actual connection.
// Please see db_access.js as that handles the connection logic
// First we pass the URL for the API
// "/Starwars/characters" should return all the characters
// Function (req, res) --> This becomes our callback function
// mentioned in the 'callback' in db_access
// req -> Request | res -> Respose
// We are sending a request to to the server
// using dao.call to run through the switch statements to get what we're looking for.
// Added a new paramenter that tells the program what database to use.
app.get("/Starwars/characters", (req, res) => {
  dao.call(
    "findAll",
    {},
    (result) => {
      if (result !== undefined) {
        res.send(result);
      } else {
        res.statusCode = 404;
        res.end();
      }
    },
    "characters"
  );
});

// This gets all films
app.get("/Starwars/films", (req, res) => {
  dao.call(
    "findAll",
    {},
    (result) => {
      if (result !== undefined) {
        res.send(result);
      } else {
        res.statusCode = 404;
        res.end();
      }
    },
    "films"
  );
});

// This gets all planets
app.get("/Starwars/planets", (req, res) => {
  dao.call(
    "findAll",
    {},
    (result) => {
      if (result !== undefined) {
        res.send(result);
      } else {
        res.statusCode = 404;
        res.end();
      }
    },
    "planets"
  );
});

// This gets one specific character by passing the character id
app.get("/Starwars/characters/:id", (req, res) => {
  character_id = parseInt(req.params.id);
  //   console.log(character_id);
  dao.call(
    "find",
    { id: character_id },
    (result) => {
      console.log(character_id);
      console.log(typeof character_id);
      console.log(result);
      if (result.result.id !== undefined) {
        console.log("ID is not unknown");
        res.send(result);
      } else {
        res.statusCode = 404;
        console.log("404 reached");
        res.end();
      }
    },
    "characters"
  );
});

// This gets one specific film by passing the film id
app.get("/Starwars/films/:id", (req, res) => {
  film_id = parseInt(req.params.id);
  //   console.log(character_id);
  dao.call(
    "find",
    { id: film_id },
    (result) => {
      console.log(result);
      if (result.result.id !== undefined) {
        console.log("ID is not unknown");
        res.send(result);
      } else {
        res.statusCode = 404;
        console.log("404 reached");
        res.end();
      }
    },
    "films"
  );
});

// This gets a specific planet by poassing the planet ID
app.get("/Starwars/planets/:id", (req, res) => {
  planet_id = parseInt(req.params.id);
  //   console.log(character_id);
  dao.call(
    "find",
    { id: planet_id },
    (result) => {
      console.log(result);
      if (result.result.id !== undefined) {
        console.log("ID is not unknown");
        res.send(result);
      } else {
        res.statusCode = 404;
        console.log("404 reached");
        res.end();
      }
    },
    "planets"
  );
});

// gets all characters ids and their film ids
app.get("/Starwars/films/:id/characters", (req, res) => {
  dao.call(
    "findAllCharactersInFilm",
    { film_id: parseInt(1) },
    (result) => {
      if (result !== undefined) {
        res.send(result.resultsInCF);
        // res.send(result.results[0]);
      } else {
        res.statusCode = 404;
        res.end();
      }
    },
    "films_characters"
  );
});

app.get("/Starwars/films_planets", (req, res) => {
  dao.call(
    "findAll",
    {},
    (result) => {
      if (result !== undefined) {
        res.send(result);
      } else {
        res.statusCode = 404;
        res.end();
      }
    },
    "films_planets"
  );
});
// app.get("Starwars/characters/:id" ())

// Server Setup stuff
const port = 3001;

// This listens for anything on 'port' and lets us know once a connection
// has been established
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
