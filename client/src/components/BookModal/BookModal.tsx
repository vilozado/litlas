import type { FC } from "react"
import type { Modal } from "../../types/Modal"
import { createPortal } from "react-dom"
import './BookModal.css'

export default function BookModal(props: Modal): ReturnType<FC> {
  if (!props.open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={props.onClose}>
      <div className="modal-content" onClick={(e => e.stopPropagation())}>
        <div className="modal-head">
          <h1>Modal</h1>
        </div>
        <div className="modal-body">
          <h2>content</h2>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
