import './App.css'
import Nav from './components/Nav/Nav';
import Map from './components/Map/Map';
import SidebarList from './components/SidebarList/SidebarList';
import { useState } from 'react';
import { useBookContext } from './context/useBookContext';

function App() {
  const [showSidebar, setShowsideBar] = useState(false);
  const { loadingApp } = useBookContext();

  return (
    <>
      <Nav onMyListClick={() => setShowsideBar(toggle => !toggle)} />
      {loadingApp ? (<h1>Loading...</h1>) : (
        <div className='app-content'>
          <Map />
          {showSidebar && <SidebarList />}
        </div>
      )}
    </>
  )
}

export default App
