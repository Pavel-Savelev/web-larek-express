import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import { Request, Response } from 'express';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';
import notFoundMiddleware from './middlewares/error-route';

const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/weblarek';
const csrfProtection = csrf({ cookie: true });

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

// CRSF защита(Защита от подделки запросов )
app.use('/products', csrfProtection, productRouter);
app.use('/orders', csrfProtection, orderRouter);

app.use(notFoundMiddleware);
app.use(errorLogger);

app.use(errorHandler);

app.get('/csrf-token', csrfProtection, (req: Request, res: Response) => {
  res.send(req.csrfToken());
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
