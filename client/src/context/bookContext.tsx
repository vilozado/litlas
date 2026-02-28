import React, { createContext, useState } from "react";

import type { Book, BookStatus, SavedBook } from "../types/book";
import { fetchBooks } from "../services/fetchBooks";

// ? Question: should I split the context into MapContext and ListContext to avoid unnecessary rerenders?

interface BookContextType {
  selectedBooks: Book[]
  selectedCountry: string | null
  setBookByCountry: (country: string, subject: string) => void
  readingList: SavedBook[]
  addToReadingList: (book: Book) => void
  updateBookStatus: (id: string, status: BookStatus) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const BookContext = createContext<BookContextType | null>(null);

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

