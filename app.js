// Require the express module
const express = require('express');
const path = require('path');
require('all-that-sass')({
  watch: path.join(__dirname, './www/scss'),
  input: path.join(__dirname, './www/scss/style.scss'),
  output: path.join(__dirname, './www/style.css'),
  reportErrors: true,
  reportCompiles: false,
  outputStyle: 'expanded'
});

// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));




// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));