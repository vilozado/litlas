import { Request, RequestHandler, Response } from "express";
import Book from "../models/book";

type BooksbySubjectQuery = {
  subject?: string;
};

type AddBookBody = {
  id: string;
  subject: string;
  title: string;
  author: string;
  publishedDate?: number | string;
  description?: string;
  categories?: string[];
  thumbnail?: string;
  status?: string;
};

const getBooksBySubject: RequestHandler<
  {},
  unknown,
  unknown,
  BooksbySubjectQuery
> = async (req, res) => {
  try {
    const { subject } = req.query;
    if (!subject || typeof subject !== "string") {
      return res.status(400).json({ msg: "Subject is required" });
    }
    const fetchBooks = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(subject)}&printType=books&orderBy=relevance&maxResults=40&key=${process.env.API_KEY}`,
    );
    const data = await fetchBooks.json();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookList = async (req: Request, res: Response) => {
  try {
    const savedBooks = await Book.find({});
    res.status(200).json(savedBooks);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addBookToList: RequestHandler<{}, unknown, AddBookBody> = async (
  req: Request,
  res: Response,
) => {
  const {
    id,
    subject,
    title,
    author,
    publishedDate,
    description,
    categories,
    thumbnail,
    status,
  } = req.body;
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
      status: status,
    });
    return res.status(201).json(added);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateBook = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { id: id },
      { $set: { status: req.body.status } },
      { returnDocument: "after" },
    );

    if (!updatedBook)
      return res.status(404).json({ error: { msg: "Book not found" } });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await Book.findOneAndDelete({ id: id });
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getBooksBySubject,
  getBookList,
  addBookToList,
  updateBook,
  removeBook,
};
