import "./SidebarList.css";
import { useBookContext } from "../../context/useBookContext";
import SidebarItem from "../SidebarItem/SidebarItem";

export default function SidebarList() {
  const { readingList } = useBookContext();

  const readCountries = new Set(
    readingList
      .filter((book) => book.status === "read")
      .map((book) => book.subject),
  );

  const countriesCounter = readCountries.size;

  return (
    <div className="sidebar">
      {readingList.length === 0 ? (
        <div className="sidebar-placeholder">
          <p>Your reading list is empty.</p>
          <p>Add a book to display it here.</p>
        </div>
      ) : (
        <>
          <div className="sidebar-progress">
            <span className="progress-number">{countriesCounter} / 195</span>
            <span className="progress-label">Countries Read</span>
          </div>
          <ul className="sidebar-list">
            {readingList.map((book) => (
              <SidebarItem key={book.id} book={book} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
