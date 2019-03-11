const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const response = require('./api');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/products', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send({ products: response });
});

app.post('/api/contact', (req, res) => {
  console.log(req.body);
  res.send('post data success');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
