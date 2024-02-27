import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"
function Header() {
  return (
    <header style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
      <div className=''>
        <Link to="/">
        <img src="logo-no-background.svg" alt="Website Logo" style={{height: '50px'}}/>
        </Link>
      </div>
      <div>
        <Link to="/login">
        <button style={{marginRight: '10px'}}>Login</button>
        </Link>
        <Link to="/register">
        <button>Register</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
