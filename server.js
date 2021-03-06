/*===========================================================================
	DEPENDENCIES
============================================================================= */
const express = require('express');
const faker = require('faker');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
var app = express();

/*===========================================================================
	DEFAULT CONFIG AND SETTINGS
============================================================================= */

const port = 3000;
app.set('view engine', 'ejs') // Setting ejs as the engine
app.use(expressLayouts)       // Setting express-ejs-layouts to pass data into ejs
app.use(bodyParser.urlencoded({ extended: true })) // With this we can get a clear body response from requests
app.use(bodyParser.json())

/*===========================================================================
	MONGODB CONNECTION
============================================================================= */

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('disconnected', () => { console.log('MongoDB disconnected'); });
db.once('open', () => {  console.log('MongoDB connected on '+ dbConfig.url);
  // When connection is established, provide a connection through port
  app.listen(port, function(){
    console.log('Server started on http://localhost:' + port)
  });
});

/*===========================================================================
	ROUTES FOR OUR APPLICATION
============================================================================= */

app.get('/', function(req, res){
  res.send({"message": "Welcome stranger"})
});

// Require Quotes routes
require('./app/routes/quote.routes.js')(app);

