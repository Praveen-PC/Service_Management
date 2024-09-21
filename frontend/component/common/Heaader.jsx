import React from 'react'
import {Link} from 'react-router-dom'

const Heaader = () => {
  return (
    <>
    
<nav className="navbar navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center p-2">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src="./logo1.png" alt="" width="40" height="34" className="d-inline-block align-text-center" />
         <Link to='/' className='text-decoration-none'> <span className='' style={{ fontSize: '25px', fontWeight: '600', marginLeft: '10px' ,color:'black'}}>MACSOFT</span></Link>
        </a>
        <Link to="/tabledata" className="text-decoration-none mx-3">
          <p className="mb-0" style={{fontWeight:'600'}}>View</p>
        </Link>
      </div>
    </nav>
    </>
  )
}

export default Heaader