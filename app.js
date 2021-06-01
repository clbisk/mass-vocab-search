const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 4000;
const vision = require('@google-cloud/vision');

const reactApp = express();
const root = path.join(__dirname, 'build');
reactApp.use(express.static(root));

reactApp.get('/ping', (req, res) => {
	return res.send('pong');
});

reactApp.get('/', (req, res) => {
	res.sendFile('index.html', { root });
});

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors(config.corsOptions));

const visionConnectApp = express();
const client = new vision.ImageAnnotatorClient({ keyFilename: "./cloud_vision_secret_key.json" });

function detectText(req, res) {
	const imgStr = req.body.img.split(',')[1];
	const request = { image: { content: imgStr }, imageContext: { languageHints: ["ru"] } };

	client.textDetection(request)
	.then(result => {
		const detections = result[0].textAnnotations;
		console.log(result[0].fullTextAnnotation.text);
		res.send(detections);
	})
	.catch(err => console.error(err));
}

function detectDocumentText(req, res) {
	const imgStr = req.body.img.split(',')[1];
	const request = { image: { content: imgStr }, imageContext: { languageHints: ["ru"] } };

	client.documentTextDetection(request)
	.then(result => {
		console.log(result[0].fullTextAnnotation.text);
		res.send(result[0]);
	})
	.catch(err => console.error(err));
}

app.post('/detect-text', cors(config.corsOptions), function (req, res) {
	detectText(req, res);
});

app.post('/detect-document-text', cors(config.corsOptions), function (req, res) {
	detectDocumentText(req, res);
});

// app.use("/vision", cors(), visionConnectApp);
// app.use("*", reactApp);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});