import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { appRouter } from './routes/main.router';

import errorHandler from './middleware/error-handler.middleware';
import config from './config';

const app = express();
const mongoUri = 'mongodb://127.0.0.1:27017/';

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(urlencoded({limit: '50mb', extended: false}));
app.use(appRouter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('Server is running.');
});

async function connect() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }
}

connect();
