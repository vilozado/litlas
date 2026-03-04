import "./BookModal.css";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useBookContext } from "../../context/useBookContext";
import { postBook } from "../../services/savedBooksService";
import type { SavedBook } from "../../types/book";

interface BookModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookModal({ open, onClose }: BookModalProps) {
  const { selectedBooks, selectedCountry, addToReadingList } = useBookContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // When the modal opens and there are selected books, randomly select one to display first
    if (open && selectedBooks.length) {
      setCurrentIndex(Math.floor(Math.random() * selectedBooks.length));
    }
  }, [open, selectedBooks.length]);

  const currentBook = selectedBooks[currentIndex];

  const handleNext = () => {
    if (!selectedBooks.length) return;
    setCurrentIndex((prev) => (prev + 1) % selectedBooks.length); // Cycle through the selected books
  };

  const handleAdd = () => {
    if (!currentBook) return;
    const savedBook: SavedBook = { ...currentBook, status: "to be read" }; // Add status to the book object on save
    addToReadingList(savedBook); // Update the reading list in context
    postBook(savedBook); // Persist the saved book to the backend
  };

  if (!open) return null; // Don't render anything if the modal is not open

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h1>{selectedCountry}</h1>
          <button type="button" id="close-btn" onClick={onClose}>
            x
          </button>
        </div>
        <div className="modal-body">
          {currentBook && (
            <div className="book-transition" key={currentBook.id}>
              <img
                src={currentBook.thumbnail}
                alt={currentBook.title}
                className="book-cover"
              />
              <div className="book-content">
                <p className="book-title">{currentBook.title}</p>
                <p className="author">{currentBook.author}</p>
                <p className="publish-date">{currentBook.publishedDate}</p>
                <p className="book-description">
                  <span className="genre">
                    {currentBook.categories?.map((category) => (
                      <span key={category}>{category}</span>
                    ))}
                  </span>
                  {currentBook.description}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="btn-container">
          <button className="add-btn" onClick={handleAdd}>
            ★ Save
          </button>
          <button className="next-btn" onClick={handleNext}>
            NEXT
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
