import React, { createContext, useState, useEffect } from "react";

import type { Book, BookStatus, SavedBook } from "../types/book";
import { fetchBooks } from "../services/fetchBooks";
import { fetchSavedBooks } from "../services/SavedBooksService";

// ? Question: should I split the context into MapContext and ListContext to avoid unnecessary rerenders?

interface BookContextType {
  selectedBooks: Book[];
  selectedCountry: string | null;
  setBookByCountry: (country: string, subject: string) => Promise<void>;
  readingList: SavedBook[];
  loadingApp: boolean;
  addToReadingList: (book: SavedBook) => void;
  updateBookStatus: (id: string, status: BookStatus) => void;
  deleteSavedBook: (id: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BookContext = createContext<BookContextType | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [readingList, setReadingList] = useState<SavedBook[]>([]);
  const [loadingApp, setLoadingApp] = useState<boolean>(true);

  useEffect(() => {
    fetchSavedBooks()
      .then(setReadingList)
      .catch(console.error)
      .finally(() => setLoadingApp(false));
  }, []);

  const setBookByCountry = async (country: string, subject: string) => {
    const books = await fetchBooks(subject);
    setSelectedCountry(country);
    setSelectedBooks(books);
  };

  const addToReadingList = (book: SavedBook) => {
    setReadingList((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const updateBookStatus = (id: string, status: BookStatus) => {
    setReadingList((prev) =>
      prev.map((book) => (book.id === id ? { ...book, status } : book)),
    );
  };

  const deleteSavedBook = (id: string) => {
    setReadingList((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider
      value={{
        selectedBooks,
        selectedCountry,
        readingList,
        loadingApp,
        setBookByCountry,
        addToReadingList,
        updateBookStatus,
        deleteSavedBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
