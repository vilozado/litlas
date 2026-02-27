import React, { createContext, useContext, useState } from "react";

import type { Book, BookStatus, SavedBook } from "../types/book";
import { fetchBooks } from "../utils/fetchBooks";

interface BookContextType {
  selectedBooks: Book[]
  selectedCountry: string | null
  readingList: SavedBook[]
  setBookByCountry: (country: string, subject: string) => void
  addToReadingList: (book: Book) => void
  updateBookStatus: (id: string, status: BookStatus) => void
}

const BookContext = createContext<BookContextType | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [readingList, setReadingList] = useState<SavedBook[]>([]);

  const setBookByCountry = async (country: string, subject: string) => {
    const books = await fetchBooks(subject);
    setSelectedCountry(country);
    setSelectedBooks(books);
  }

  const addToReadingList = (book: Book) => {
    setReadingList(prev => {
      if (prev.some(b => b.id === book.id)) return prev;
      const newBook: SavedBook = {
        ...book,
        status: 'to be read'
      }
      return [...prev, newBook];
    })
  }

  const updateBookStatus = (id: string, status: BookStatus) => {
    setReadingList(prev =>
      prev.map(book => book.id === id ? { ...book, status } : book)
    )
  }

  return (
    <BookContext.Provider value={{
      selectedBooks,
      selectedCountry,
      readingList,
      setBookByCountry,
      addToReadingList,
      updateBookStatus
    }}>
      {children}
    </BookContext.Provider>
  )
}

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error;
  return context;
}