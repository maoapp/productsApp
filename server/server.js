const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const response = require('./api');
const cors = require('cors');
const allCategories = require('../src/constants/constants');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/products', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send({ products: response });
});

// app.get('/products/:category', (req, res) => {
//   console.log('entro aca')
//   const file = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
  
//   const category = req.params.category.toLowerCase() || allCategories;
//   console.log(file, 'archivo', allCategories)
//   const products = category === allCategories ? file : file.filter(product => (
//     product.categories
//       .map(item => item.toLowerCase())
//       .includes(category)
//   ));

//   const count = products.length;
//   const remainingCount = file.length - count;
//   setTimeout(() => {
//     res.send({ products, count, remainingCount });
//   }, 1000);
// });

app.post('/api/contact', (req, res) => {
  console.log(req.body);
  res.send('post data success');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
