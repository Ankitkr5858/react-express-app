const express = require('express');
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

/**
 * Initiates all Express middleware
 */
module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.static('public'))
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(jwt({ secret: process.env.JWT_SECRET}).unless({path: ['/login', '/otp']}));

    if (process.env.NODE_ENV !== 'production') {
        app.use(cors());
    }

    return app;
};
