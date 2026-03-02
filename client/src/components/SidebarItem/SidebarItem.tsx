import { useBookContext } from "../../context/useBookContext";
import { changeStatus, deleteBook } from "../../services/SavedBooksService";
import type { BookStatus, SavedBook } from "../../types/book";
import "./SidebarItem.css";

interface sidebarProps {
  book: SavedBook;
}

// ! TODO: create type for tracking status (read, to be read)
export default function SidebarItem({ book }: sidebarProps) {
  const { updateBookStatus, deleteSavedBook } = useBookContext();

  const handleStatusChange = (status: BookStatus) => {
    if (!book) return;
    updateBookStatus(book.id, status);
    changeStatus(book.id, status);
  };

  const handleDelete = () => {
    deleteSavedBook(book.id);
    deleteBook(book.id);
  };

  return (
    <li className="sidebar-item">
      <div className="sidebar-cover">
        <img src={book.thumbnail} alt={book.title} className="sidebar-img" />
        <div className="btns-overlay">
          <button onClick={() => handleStatusChange("read")}>Read</button>
        </div>
      </div>
      <button type="button" className="close-btn" onClick={handleDelete}>
        <span className="material-symbols-outlined">delete</span>
      </button>
      <div className="sidebar-info">
        <p className="sidebar-title">{book.title}</p>
        <p className="sidebar-author">{book.author}</p>
      </div>
    </li>
  );
}
