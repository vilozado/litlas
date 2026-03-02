import { Request, Response } from "express";
import Book from "../models/book";

const getBooksByCountry = async (req: Request, res: Response) => { //Google Books API
  try {
    const { subject } = req.query as { subject: string };
    const fetchBooks = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(subject)}&printType=books&orderBy=relevance&maxResults=40&key=${process.env.API_KEY}`
    )
    const data = await fetchBooks.json();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getBookList = async (req: Request, res: Response) => {
  try {
    const savedBooks = await Book.find({});
    res.status(200).json(savedBooks);
  } catch (error) {
    res.status(500).json(error);
  }
}

const addBookToList = async (req: Request, res: Response) => {
  const { id, subject, title, author, publishedDate, description, categories, thumbnail, status } = req.body;
  if (!id || !subject || !title || !author) {
    return res.status(400).json();
  }
  try {
    const added = await Book.create({
      id: id,
      subject: subject,
      title: title,
      author: author,
      publishedDate: publishedDate,
      description: description,
      categories: categories,
      thumbnail: thumbnail,
      status: status
    });
    return res.status(201).json(added);
  } catch (error) {
    res.status(500).json(error);
  }
}

const updateBook = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  console.log('params id:', id)
  console.log('type:', typeof id)

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { id: id },
      { $set: { status: req.body.status } },
      { returnDocument: 'after' }
    );

    if (!updatedBook) return res.status(404).json({ error: { msg: 'Book not found' } })
    res.status(200).json(updatedBook);

  } catch (error) {
    res.status(500).json(error);
  }
}

const removeBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await Book.findOneAndDelete({ id: id });
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getBooksByCountry, getBookList, addBookToList, updateBook, removeBook };