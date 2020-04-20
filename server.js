var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database.config.js');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override');

var port     = process.env.PORT || 8888;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(database.url, {
    useNewUrlParser: true,useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require("./controllers/employee.controller.js")(app);
app.listen(port);
console.log("App listening on port : " + port);