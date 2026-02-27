import { Request, Response } from "express";

const getBooksByCountry = async (req: Request, res: Response) => {
  try {
    const { subject } = req.query as { subject: string };
    const fetchBooks = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(subject)}&maxResults=10&key=${process.env.API_KEY}`
    )
    const data = await fetchBooks.json();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

export { getBooksByCountry };