import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';
import notFoundMiddleware from './middlewares/error-route';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/weblarek';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use(notFoundMiddleware);
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
