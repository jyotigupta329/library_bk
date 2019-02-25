/*
 Starting point of the project
 */

'use strict';

const https = require('https');
const fs = require('fs');
const os = require('os');
const util = require('util');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
//It is used to define errors when a route is not found
const httpError = require('http-errors');

// Initializing express
const restApp = express();

restApp.use(cors());
restApp.use(morgan('dev'));
restApp.use(express.json());
restApp.use(express.urlencoded({extended: false}));

// restApp.use('prefix', route path)
restApp.use('/api/library', require('./routes/library_routes'));

// Error handler when resource/route is not found
restApp.use((req, res, next) => {
    console.log('This man leads tto an error!!');
    next(httpError(404));
});

// Creating secured https server
const options = {
    key: fs.readFileSync('./keys/privateKey.key'),
    cert: fs.readFileSync('./keys/certificate.crt')
};

// To create https server
https.createServer(options, restApp).listen(443);

module.exports = restApp;



