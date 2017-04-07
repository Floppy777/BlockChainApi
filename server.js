// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var config = require('./config/config');

var port = process.env.PORT || config.port;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our ethereum api!' });   
});

var accounts = require('./routes/accounts');
var contracts = require('./routes/contracts');
var status = require('./routes/status');
var transactions = require('./routes/transactions');
var wallet = require('./routes/wallet');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api', router);
app.use('/api/accounts', accounts);
app.use('/api/contracts', contracts);
app.use('/api/status',status);
app.use('/api/transactions',transactions);
app.use('/api/wallet',wallet);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server launch on port ' + port);