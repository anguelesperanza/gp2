// This is intended to be a rewrite of data_access.js
// I have no idea why this code is not working, thus I'm gonna gonna rewrite it
// and comment along the way what is going on (or attempt to)

// This is from Biblio so I will try and covert to relevate info when able
// This is supposed to creat an in-memory version
// of the DB. But to be honest, I was advised this
// Overcomplicates things.

// Can I get away with not implimenting an in-memeory
// db? Was dvised
let swdb = {};

// I don't know what this mean.
// Create a constant called MongoClient??? Why does it =require?
const { MongoClient } = require("mongodb");

// This is the 'URL' for the Local Mongo Server
// This number is given by Mongosh when you run it.
// Originally this was a var. Changed to let. Not sure if function scope is needed
// Will change to var if needed and cannot find work around
let url = "mongodb://127.0.0.1:27017";

// Creates a new client that is connected to the Mongo Database
// URL was provided to make that connection
const client = new MongoClient(url);

// This is the name of the database: Starwars
// This name was made during DB creation and not in JS or this Pjct Fldr
const dbName = "Starwars";

// This is the name of the collection that contains the 'characters' DB
// It's created this say as it will be passed to a .db function in client
// as a string so the client knows which collection in the document to use
const characterCollection = "characters";

//  This is the call function
// It takes an operation, parameters and a callback function
// Not too sure what this does though.
module.exports.call = async function call(operation, parameters, callback) {
  // establishes a connection with the client and the database
  // await keyword forces program to halt until a response has been recvd
  // Don't want to do DB stuff when no DB has been connected too
  await client.connect();
  // set the database to use
  const db = client.db(dbName);

  // goes into the database and gets the collection with the chrct details
  // then assins it to a new variable called collections
  // --> Best name? Not sure. But it is a name nonetheless
  // Set as a const so we do not accidently change the variable data
  // to something else.
  const collection = db.collection(characterCollection);

  // Executes Opertions --> Not sure what that means though
  // If I had to guess, the case statements as shown below

  // Swtich statemenat. Sets the operation to lower.
  // Not sure setting to lower it needed -> consistancy purpases?
  // Also, not sure why comments are indented. VS Code doing VS Code things
  switch (operation.toLowerCase()) {
    // swtich statement has the following cases I will not be adding here
    // initialbooks --> DB already created and improted. No need to init
    // clearbooks --> Not clearing data in this project. No need at this time
    // updatebook --> Not updating data in this project. No need at this time

    // The following two cases I will add here but will change as needed
    // findallbooks -> Finds all the books. Will become findallcharacters
    // Odd how case doesn't need {} --> You think it would but I guess not
    case "findallcharacters":
      // gets every row (all info) in the characters collections
      // Converts information to an array and stores in 'characters'
      // Remember: collection was assighed to the character collection
      // earlir in the code
      const characters = await collection.find({}).toArray();

      // printing out the characters collection to see if this was received
      console.log(characters);
      console.log("Made it to this line");
      // This is a callback function.
      // Essentially, we received the information from the database
      // are are passing it back through to the function that called it
      // This was called in index.js
      // app.get("/Starwars/characters") ====> Call block starts here
      callback({ characters });

    // findbook -> Finds book. Will become findcharacter
  }
};

// This will make it so they cases in the switch stment
// below can be used as function
// AKA Wizard Magic at work here
module.exports.findAllCharacters = function () {
  return swdb;
};
