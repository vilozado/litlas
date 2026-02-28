import './Nav.css';


// ! TODO: change any type to custom type
export default function Nav({ onMyListClick }: any) {
  return (
    <>
      <nav className='navbar'>
        <h1 className='title'>LITLAS</h1>
        <div className='nav-left'>
          <button onClick={onMyListClick} className='nav-links'>Reading List</button>
          {/* <button onClick={onMyListClick} className='nav-links'>Stats</button> */}
        </div>
      </nav>
    </>
  )
}