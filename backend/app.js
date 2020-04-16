const express = require('express');
const loaders = require('./loaders');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

loaders(app);

module.exports = app;
