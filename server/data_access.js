let starwars_memdb = {}; //In-memory database
// books[100] = { isbn: "100", title: "Jaws", price: 14.95 };

module.exports.findCharacter = function (id) {
  return collection[id];
};

module.exports.findAllCharacters = function (id) {
  return starwars_memdb[id];
};

module.exports.updateBook = function (isbn, book) {
  books[isbn] = book;
};

// mongodb client driver
const { MongoClient } = require("mongodb");

// DB Connection URL
var url = "mongodb://127.0.0.1:27017";

// Create client
const client = new MongoClient(url);

// Database and collection variables
const dbName = "Starwars";
const characterCollection = "characters";

module.exports.call = async function call(operation, parameters, callback) {
  // connect to the db server
  await client.connect();

  // set the database to use
  const db = client.db(dbName);
  // set the collection to use
  const collection = db.collection(characterCollection);

  //Execute Operations
  // available operations:
  // ['initbooks'|'clearbooks'|'findallbooks'|'findbook'|'updatebook' ]
  switch (operation.toLowerCase()) {
    // case "initbooks":
    //   const initialRecords = [
    //     {
    //       _id: "5dfb7b07cef0eaea7dedefc6",
    //       isbn: "001",
    //       price: 18,
    //       title: "Moby Dick",
    //     },
    //     {
    //       _id: "5dfb7b3ccef0eaea7dedefd5",
    //       isbn: "002",
    //       price: 4.48,
    //       title: "War and Peace",
    //     },
    //   ];
    //   await collection.insertMany(initialRecords).then(
    //     (result) => {
    //       callback({ status: "book records have been initialized." });
    //     },
    //     (reason) => {
    //       callback({ status: "error initializing book records" });
    //     }
    //   );
    //   break;

    // case "clearbooks":
    //   await collection.deleteMany({}).then(
    //     (result) => {
    //       callback({ status: "book records have been removed." });
    //     },
    //     (reason) => {
    //       callback({ status: "error removing book records." });
    //     }
    //   );
    //   break;

    case "findAllCharacters":
      const col = dbPool.collection("characters");
      const characters = await col.find({}).toArray();
      callback({ characters });
      break;

    case "findCharacter":
      const character = await characterCollection.findOne({
        id: parameters.id,
      });
      callback({ starwars_me: id });
      break;

    case "updatebook":
      await collection.updateOne(
        { isbn: parameters.book.isbn },
        { $set: parameters.book },
        { upsert: true }
      );
      callback({ status: "item updated:" + parameters.book.isbn });
      break;

    default:
      break;
  }
  console.log("call complete: " + operation);
  client.close();
  return "call complete";
};
