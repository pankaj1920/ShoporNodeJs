var express = require('express');
var logger = require('morgan');
const expressValidator = require('express-validator')
var dotenv = require('dotenv').config();
var mongoose = require('mongoose');
var routeModules = require('../api/routes/api');
var response = require('../api/helpers/Response');

var MONGODB_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (process.env.NODE_ENV !== 'dev') {
      console.log(`Connected to ${MONGODB_URL} \n`);
      console.log('App is running ... \n');
      console.log('Press CTRL + C to stop the process. \n');
    }
  })
  .catch((err) => {
    console.log('App Starting Error : ' + err.message);
    process.exit(1);
  });

const app = express();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

//don't show the log when it is dev
if (process.env.NODE_ENV != 'dev') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routeModules(app);

// catch 404 and forward to exception handler
app.use((req, res, next) => next(response.ErrorResponse({res :res, message : 'Invalid URLggg'})));

/* // throw 404 if URL not found
app.all('*', function (req, res) {
  return response.ErrorResponse({res :res, message : 'Invalid URL'});
});
 */
app.use((err, res, req) => {
  if (err.name == 'UnauthorizedError')
    return response.UnauthorizedResponse(res, err.message);
});

