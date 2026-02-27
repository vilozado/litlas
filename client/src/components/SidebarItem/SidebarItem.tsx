
import { useBookContext } from "../../context/bookContext"
import './SidebarItem.css'

// ! TODO: create type for tracking status (read, to be read)
export default function SidebarItem({ book }: any) {

  const { updateBookStatus } = useBookContext();

  return (
    <>
      <li className="sidebar-item">
        <div className="cover-div">
          <img src={book.thumbnail} alt={book.title} className="sidebar-cover" />
          <div className="status-overlay">
            <button onClick={() => updateBookStatus(book.id, 'to be read')}>
              Want to Read
            </button>
            <button onClick={() => updateBookStatus(book.id, 'read')}>
              Read
            </button>
          </div>
        </div>
      </li>
    </>
  )
}
