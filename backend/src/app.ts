import express from 'express';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import path from 'path';

const app = express();
const PORT = 3000;

const client = new MongoClient('mongodb://127.0.0.1:27017/weblarek');

app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
