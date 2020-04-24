import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import DB_URL from './config/db';
import userApi from './routes/user';

// Create Express server
const app = express();

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
