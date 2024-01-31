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
// app.get("/Starwars/characters", async function (req, res) {
//   dao.findAllCharacters((characters) => {
//     if (characters) {
//       res.send(characters);
//     }
//   });
// });

app.get("/Starwars/characters", async function (req, res) {
  dao.call("findallcharacters");
});
// app.get("Starwars/characters/:id" ())

// Server Setup stuff
const port = 3001;

// This listens for anything on 'port' and lets us know once a connection
// has been established
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
