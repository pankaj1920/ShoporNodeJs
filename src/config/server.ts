import express from 'express'
import logger from 'morgan'
const dotenv = require('dotenv').config();
import cors from 'cors'
import mongoose from 'mongoose';
import routeModules from '../api/routes/api'
import Print from '../api/helpers/Print'
import { SuccessResponse, SuccessResponseData, ErrorResponse, ValidationError, UnauthorizedResponse, GlobalErrorHandler } from '../api/helpers/Response'
import connectDB from './db';
const MONGODB_URL = process.env.MONGO_URL;

/* mongoose
  .connect(MONGODB_URL)
  .then(() => {
    Print.log(`Connected to ${MONGODB_URL}`)
    Print.log('App is running ... ')
    Print.log('Press CTRL + C to stop the process.')
  })
  .catch((err: any) => {
    Print.log(`App Starting Error : ${err.message}`)
  }); */

global.__basedir = __dirname;



connectDB()

const app = express()

app.listen(process.env.PORT || 5000, () => {
  Print.log(`Server is running on PORT ${process.env.PORT}`)
})

//don't show the log when it is dev
/* if (process.env.NODE_ENV != 'pro') {
  app.use(logger('pro'));
} */

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

routeModules(app)

//catch 404 if URL not found
// app.use((req, res, next) => next(ErrorResponse({ res: res, message: 'Invalid URL' })));
app.all('*', (req, res) => { ErrorResponse({ res: res, message: 'Invalid URL' }) })

app.use((err, res, req) => {
  if (err.statusMessage == 'UnauthorizedError')
    return UnauthorizedResponse({ res: res, message: `Unauthorized Error  => res, ${err.statusMessage}` });
});

app.use(GlobalErrorHandler)

const options = {
  // origin: 'http://localhost:3000',
  origin: '*',
}

app.use(cors(options))