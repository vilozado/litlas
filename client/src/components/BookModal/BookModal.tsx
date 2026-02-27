import { createPortal } from "react-dom"
import './BookModal.css'
import { useState, useEffect } from "react";
import { useBookContext } from "../../context/bookContext";

interface Modal {
  open: boolean,
  onClose: () => void,
}

export default function BookModal({ open, onClose }: Modal) {

  const { selectedBooks, selectedCountry, addToReadingList } = useBookContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * selectedBooks.length))
  }, [selectedCountry]);

  const currentBook = selectedBooks[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % selectedBooks.length)
  }

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e => e.stopPropagation())}>
        <div className="modal-head">
          <h1>{selectedCountry}</h1>
          <button type="button" id="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          {
            currentBook && (
              <>
                <img src={currentBook.thumbnail} className="book-cover" />
                <div className="book-content">
                  <p id="book-title">{currentBook.title}</p>
                  <p>{currentBook.author}</p>
                  <div className='book-genres'>
                    {currentBook.categories.map(category => (
                      <p key={category}>{category}</p>
                    ))}
                  </div>
                  <p>{currentBook.publishedDate}</p>
                  <p id="book-description">{currentBook.description}</p>
                </div>
              </>
            )
          }
        </div>
        <div className="btn-container">
          <button type="button" className="modal-btn" onClick={() => addToReadingList(currentBook)}>
            Add to My Reading List
          </button>
          <button type="button" className="modal-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
