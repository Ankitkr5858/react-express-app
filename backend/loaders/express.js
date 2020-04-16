const express = require('express');
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(cors());
    app.use(jwt({ secret: process.env.JWT_SECRET}).unless({path: ['/login', '/otp']}));

    return app;
};