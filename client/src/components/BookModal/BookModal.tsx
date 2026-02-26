import type { Modal } from "../../types/modal"
import { createPortal } from "react-dom"
import './BookModal.css'

export default function BookModal(props: Modal) {
  const randomBook = props.books[Math.floor(Math.random() * props.books.length)];

  if (!props.open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={props.onClose}>
      <div className="modal-content" onClick={(e => e.stopPropagation())}>
        <div className="modal-head">
          <h1>{props.country}</h1>
          <button type="button" id="close-btn" onClick={props.onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          {
            randomBook && (
              <>
                <img src={randomBook.thumbnail} />
                <h2>{randomBook.title}</h2>
                <p>{randomBook.author}</p>
                <p>{randomBook.publishedDate}</p>
                <p>{randomBook.description}</p>
              </>
            )
          }
        </div>
        <div className="btn-container">
          <button type="button" id="tbr-btn">
            Add to My Reading List
          </button>
          <button type="button" id="next-btn">
            Next
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
