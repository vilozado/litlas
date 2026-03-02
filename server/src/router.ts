import express from 'express';
import { getBooksByCountry, addBookToList, getBookList, updateBook, removeBook } from './controllers/bookController';
const router = express.Router();

router.get('/api/books', getBooksByCountry) //Google Books API
router.get('/reading-list', getBookList)
router.post('/reading-list', addBookToList)
router.patch('/reading-list/:id', updateBook)
router.delete('/reading-list/:id', removeBook)

export default router;