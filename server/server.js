const express = require("express");
const dao = require("/data_access")
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

// Server Setup stuff
const port = 4000;
// console.log("Open a browser to: http://localhost:" + port + " To View");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
