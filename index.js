const express = require('express');
const nodeimu = require('nodeimu');
const matrixLib = require('node-sense-hat').Leds;
const joystickLib = require('node-sense-hat').Joystick;
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); 


/** LED display **/


matrixLib.showMessage("Hej!", 0.1, [0, 0, 255])


/** Joystick **/


joystickLib.getJoystick().then(joystick => {
	joystick.on("press", direction => {
		console.log(" Joystick pressed in " + direction + " direction");
	});
});


/** Målinger fra sensorer **/


const TIMEOUT = 1000

var IMU = new nodeimu.IMU()
let tic = new Date()
let lastMeasures = []

requestData()

function getSensorsData(e, data) {
  if (e) {
	console.log(e);
    return;
  }
  const measure = createPayload(data)
  lastMeasures.push(measure)
}

function requestData() {
  setTimeout(() => {
    tic = new Date()
    IMU.getValue(getSensorsData)
  }, TIMEOUT - (new Date() - tic))
}

function createPayload(data) {
  const { timestamp, temperature, pressure, humidity } = data

  return {
    date: timestamp.toLocaleString('dk-DK'),
    temperature,
    pressure,
    humidity
  }
}


/** Request Response **/


app.get('/', (req, res) => {
	res.render('index', { data: lastMeasures });
});

app.post('/data', (req, res) => {
	requestData()
	res.redirect('/')
});

app.get('/data', (req, res) => {
	res.json(lastMeasures)
});

app.post('/matrix/message', function (req, res) {
    const msg = req.body.message 
    matrixLib.showMessage(msg, 0.1, [0, 0, 255])
  });

app.post('/matrix/cross', (req, res) => {
	const O = [0, 0, 0];
	const X = [0, 0, 255];
	const cross = [
		X, O, O, O, O, O, O, X,
		O, X, O, O, O, O, X, O,
		O, O, X, O, O, X, O, O,
		O, O, O, X, X, O, O, O,
		O, O, O, X, X, O, O, O,
		O, O, X, O, O, X, O, O,
		O, X, O, O, O, O, X, O,
		X, O, O, O, O, O, O, X,
	];
	matrixLib.setPixels(cross)
	res.redirect('/')
});

app.post('/matrix/heart', (req, res) => {
	const r = [255, 0, 0]
	const k = [0, 0, 0]
	const heart = [
		k, r, r, k, k, r, r, k,
		r, r, r, r, r, r, r, r,
		r, r, r, r, r, r, r, r,
		r, r, r, r, r, r, r, r,
		r, r, r, r, r, r, r, r,
		k, r, r, r, r, r, r, k,
		k, k, r, r, r, r, k, k,
		k, k, k, r, r, k, k, k
    ];
	matrixLib.setPixels(heart)
	res.redirect('/')
});

app.post('/matrix/smiley', (req, res) => {
	const O = [0, 0, 0];
	const X = [0, 255, 0];
	const smiley = [
		O, O, O, O, O, O, O, O,
		O, X, X, O, O, X, X, O,
		O, X, X, O, O, X, X, O,
		O, O, O, O, O, O, O, O,
		X, X, O, O, O, O, X, X,
		X, X, X, X, X, X, X, X,
		O, X, X, X, X, X, X, O,
		O, O, O, O, O, O, O, O,
	];
	matrixLib.setPixels(smiley)
	res.redirect('/')
});

app.post('/matrix/clear', (req, res) => {
	matrixLib.clear();
	res.redirect('/')
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`app listening on http://localhost:${port}`);
});
