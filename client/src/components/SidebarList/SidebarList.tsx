import './SidebarList.css';
import { useBookContext } from '../../context/bookContext';
import SidebarItem from '../SidebarItem/SidebarItem';

export default function SidebarList() {
  const { readingList } = useBookContext();

  return (
    <div className='sidebar'>
      {readingList.length === 0 ? (
        <p>Books you save will appear here.</p>
      ) : (
        <ul className="sidebar-list">
          {readingList.map((book) => (
            <SidebarItem key={book.id} book={book} />
          ))}
        </ul>
      )
      }
    </div>
  )
}
