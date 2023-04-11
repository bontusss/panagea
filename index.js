const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const indexHandler = (req, res) => {
    res.send('Index page')
}
app.get('/', indexHandler)



// app.use(express.static(`${__dirname}/public`));

module.exports = app;