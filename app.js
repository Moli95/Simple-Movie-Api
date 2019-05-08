require('dotenv').config({path: '.env'});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const errorsHandler = require('./middlewares/errors');


//database connection
const db = require('./config/dbConnection');

// create tables
db.sync({force: false});

app.set(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/', routes);
app.use(errorsHandler.notFound);


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
