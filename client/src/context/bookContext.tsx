import React, { createContext, useState, useEffect } from "react";

import type { Book, BookStatus, SavedBook } from "../types/book";
import { fetchBooks } from "../services/fetchBooks";
import { fetchSavedBooks } from "../services/savedBooksService";
import { useAuth } from "./authContext";

interface BookContextType {
  selectedBooks: Book[]; //array of books on country click
  selectedCountry: string | null;
  setBookByCountry: (country: string, subject: string) => Promise<void>; //fetch books by country and subject
  loadingApp: boolean; //indicates if the app is still loading data from the backend
  readingList: SavedBook[]; //array of books in reading list
  addToReadingList: (book: SavedBook) => void; //adds a book to the reading list
  updateBookStatus: (id: string, status: BookStatus) => void; //function to update the status of a book in the reading list
  deleteSavedBook: (id: string) => void; //function to delete a book from the reading list
}

// eslint-disable-next-line react-refresh/only-export-components
export const BookContext = createContext<BookContextType | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }) {
  //wraps the app and provides the book context to all components
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [readingList, setReadingList] = useState<SavedBook[]>([]);
  const [loadingApp, setLoadingApp] = useState<boolean>(true);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setReadingList([]);
      setSelectedBooks([]);
      setSelectedCountry(null);
      setLoadingApp(false);
      return;
    }
    setLoadingApp(true);

    fetchSavedBooks()
      .then(setReadingList)
      .catch((err) => {
        console.error(err);
        setReadingList([]);
      })
      .finally(() => setLoadingApp(false));
  }, [isAuthenticated, isLoading]);

  const setBookByCountry = async (country: string, subject: string) => {
    //fetch books by country and subject, set selected country and books in state
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
