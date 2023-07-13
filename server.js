/* eslint-disable no-console */
import mongoose from 'mongoose';
import express from 'express';
import Promise from 'bluebird'; // eslint-disable-line no-global-assign
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import httpStatus from 'http-status';
import expressValidation from 'express-validation';

// import dotenv from 'dotenv';
import router from './routes/index.route.js';
import config from './config/config.js';
import APIError from './helpers/APIError.js';
// eslint-disable-next-line import/imports-first
import fileUpload from 'express-fileupload';
// import { connectToDB } from './util/db.js';

// make bluebird default Promise

// import  routes from './routes/user.route.js';

const app = express();


// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(fileUpload());
app.use(cors({
  origin: 'https://bookme-lhvh.onrender.com/',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})
);

// enable detailed API logging in dev env


// mount all routes on /api path
app.use('/api', router);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);


app.listen(config.port, () => {
  console.info(`Server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  console.log('Connection to DB successful!');
});


export default app;
