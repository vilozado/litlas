import { useContext } from "react";
import { BookContext } from "./BookContext";

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error;
  return context;
}