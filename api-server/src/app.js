'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


//Custom Routes
const categoryRoutes = require('../routes/categories-routes');
const productRoutes = require('../routes/products-routes');

// Esoteric Resources
const errorHandler = require( '../src/middleware/error');
const notFound = require( '../src/middleware/404.js' );

const app = express();


// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(categoryRoutes);
app.use(productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(3000, () => {
      console.log(`Server up on port ${port}`);
    });
  },
};
