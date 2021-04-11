const express = require('express');
const ExpressError = require('./expressError');
const items = require('./fakeDb');
const itemRoute = require('./itemRoute')

const app = express()

app.use(express.json())

app.use('/items', itemRoute)




app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
  
    return res.status(status).json({
      error: {message}
    });
  });

module.exports = app;