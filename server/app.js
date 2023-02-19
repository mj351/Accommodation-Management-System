const express = require('express')
const app = express()
const port = 8000 
const mongoose = require("mongoose");

const dbUrl = "mongodb+srv://marwan:xxq6ilScsLlMM8cZ@cluster0.avzd0kp.mongodb.net/accommodation-app?retryWrites=true&w=majority"

const  connectionParams = {
  uesrNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.info("Successfully connected to MongoDB");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB:", err);
  });


// Serve - https://stackoverflow.com/questions/4840879/nodejs-how-to-get-the-servers-port
app.listen(port, () => {
    console.log(`app listening on port 8000 ${port}`)
  });
  
// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {process.exit()})