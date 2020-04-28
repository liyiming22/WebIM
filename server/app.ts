import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import DB_URL from './config/db';
import userApi from './routes/user';

// Create Express server
const app = express();

// enable cors
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-type, Accept, X-Access-Token, X-Key, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Connnect to MongoDB
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log(error));

/**
 * express middlewares
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * app routes
 */
app.use('/api/user', userApi);

export default app;
