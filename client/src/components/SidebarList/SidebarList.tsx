import "./SidebarList.css";
import { useBookContext } from "../../context/useBookContext";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useState } from "react";

export default function SidebarList() {
  const { readingList } = useBookContext();
  const [showRead, setShowRead] = useState(false);
  const [showToBeRead, setShowToBeRead] = useState(true);

  const toBeRead = readingList.filter((book) => book.status === "to be read");
  const finished = readingList.filter((book) => book.status === "read");

  const readCountries = new Set(
    readingList
      .filter((book) => book.status === "read")
      .map((book) => book.subject),
  );

  const countriesCounter = readCountries.size;

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-progress">
          <span className="progress-number">{countriesCounter} / 195</span>
          <span className="progress-label">Countries Explored</span>
        </div>
        <button
          className="sidebar-collapse-btn"
          onClick={() => setShowToBeRead((prev) => !prev)}
        >
          <span>To Be Read</span>
          <span className="sidebar-count">{toBeRead.length}</span>
          <span className="sidebar-chevron">{showToBeRead ? "▲" : "▼"}</span>
        </button>

        {showToBeRead && (
          <>
            <ul className="sidebar-list">
              {toBeRead.map((book) => (
                <SidebarItem key={book.id} book={book} />
              ))}
            </ul>
          </>
        )}
      </div>
      {finished.length > 0 && (
        <div className="sidebar-section">
          <button
            className="sidebar-collapse-btn"
            onClick={() => setShowRead((prev) => !prev)}
          >
            <span>Read</span>
            <span className="sidebar-count-read">{finished.length}</span>
            <span className="sidebar-chevron">{showRead ? "▲" : "▼"}</span>
          </button>

          {showRead && (
            <ul className="sidebar-list sidebar-list--finished">
              {finished.map((book) => (
                <SidebarItem key={book.id} book={book} isRead={true} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
