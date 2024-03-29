// =======================
// get the packages we need ============
// =======================
var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , morgan = require('morgan')
    , mongoose = require('mongoose')
    , cors = require('cors');

var domain = require('domain');

var measurement = require('./models/measurement');
var  measurementController = require('./controllers/measurement');

// used to create, sign, and verify tokens
var Config = require('./config'), // get our config file
	conf = new Config();	
/*
 Temporary solution to keep the server running -- This is actually an anti-pattern
 should be solved with a Domain
 */
process.on('uncaughtException', function(err) {
  console.error('Caught exception: ' + err);
  process.exit(1);
});

var port = process.env.PORT || 8080; 
mongoose.connect(conf.database); // connect to database
console.log('Server is listening on port ' + port);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// use morgan to log requests to the console
app.use(morgan(':remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

// basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at ' + conf.url +":"+ port + '/api');
});

app.listen(port);
console.log('Magic happens at ' + conf.url +":"+ port);
var apiRoutes = express.Router();

/**
 * @api {post} /data Creates a new measurement entry in the db.
 * @apiName data
 * @apiGroup data
 *
 * @apiSuccess {Boolean} success.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 */
apiRoutes.post('/measurement', measurementController.addData);
apiRoutes.get('/measurement', measurementController.getData);
apiRoutes.get('/measurement/post/:value', measurementController.getDataPost); // This is just a test


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
