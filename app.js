const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* **********************************setting headers and methods************************** */
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers", 
		"*"
	);
	if(req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
		return res.status(200).json({});
	}
	next();
});

app.use(express.static(__dirname + '/storage/uploads/user-images'));

/* **********************************Initializing Routes ********************************* */
const registerRoute = require('./api/routes/register');
app.use('/register', registerRoute);

const loginRoute = require('./api/routes/login');
app.use('/login', loginRoute);

const userRoute = require('./api/routes/user');
app.use('/user', userRoute);

const eventRoute = require('./api/routes/event');
app.use('/event', eventRoute);

if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('helpfortrauma-react/build'));
  
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, 'helpfortrauma-react', 'build', 'index.html'));
	});
  }

module.exports = app;