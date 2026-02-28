import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './router';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api', router);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
