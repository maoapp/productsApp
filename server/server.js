const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const response = require('./data/products');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/products', (req, res) => {
	if(!response) {
		res.status(404);
	}
    
	res.send({ products: response });
});

app.post('/contact', function (req, res) {
	const { firstName, lastName } = req.body;

	setTimeout(() => {
		res.send({ message: `Welcome ${firstName} ${lastName}, Your message have been sent` });
	}, 1500);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
