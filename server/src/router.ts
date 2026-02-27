import express from 'express';
import { getBooksByCountry } from './controllers/bookController';
const router = express.Router();

router.get('/books', getBooksByCountry)


export default router;