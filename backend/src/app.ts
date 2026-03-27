import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import mongoSanitize from 'express-mongo-sanitize';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/error-handler';

import { errorLogger, requestLogger } from './middlewares/logger';
import notFoundMiddleware from './middlewares/error-route';

const app = express();

app.set('strict routing', false);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.use(cors());

app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ limit: '50kb', extended: true }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(mongoSanitize({
  replaceWith: '_',
}));

const csrfProtection = csrf({ cookie: true });

// DISABLE_CSRF временно отключает CSRF-защиту для удобства разработки
app.use((req, res, next) => {
  if (process.env.DISABLE_CSRF === 'true') return next();
  if (req.method === 'GET') return next();
  return csrfProtection(req, res, next);
});

app.use(requestLogger);

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(notFoundMiddleware);
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
