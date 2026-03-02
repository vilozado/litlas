
import { useBookContext } from "../../context/useBookContext"
import { changeStatus } from "../../services/SavedBooksService";
import type { BookStatus, SavedBook } from "../../types/book";
import './SidebarItem.css'

interface sidebarProps {
  book: SavedBook
}

// ! TODO: create type for tracking status (read, to be read)
export default function SidebarItem({ book }: sidebarProps) {

  const { updateBookStatus } = useBookContext();

  const handleStatusChange = (status: BookStatus) => {
    if (!book) return;
    updateBookStatus(book.id, status);
    changeStatus(book.id, status);
  }

  return (
    <>
      <li className="sidebar-item">
        <div className="sidebar-cover">
          <img src={book.thumbnail} alt={book.title} className="sidebar-cover" />
          <div className="btns-overlay">
            <button onClick={() => handleStatusChange('read')}>
              Read
            </button>
          </div>
        </div>
        {/* <button type="button" id="close-btn" onClick={() => deleteBook(book.id)}>
          🗑️
        </button> */}
        <div className="sidebar-info">
          <p className="sidebar-title">{book.title}</p>
          <p className="sidebar-author">{book.author}</p>
        </div>
      </li>
    </>
  )
}
