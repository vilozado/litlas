import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import config from './config';
import router from './router';

const app = express();
const port = config.port;

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api', router);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
