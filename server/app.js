const express = require('express')
const app = express()
const port = 8000 
const dbconfig = require('./db')





// Serve - https://stackoverflow.com/questions/4840879/nodejs-how-to-get-the-servers-port
app.listen(port, () => {
    console.log(`app listening on port 8000 ${port}`)
  });
  
// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {process.exit()})