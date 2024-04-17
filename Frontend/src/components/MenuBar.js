import React, { useState, useEffect } from 'react';
import './MenuBar.css';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!document.getElementById('menu').contains(e.target) && !document.querySelector('.menu-btn').contains(e.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="menu-bar">
      <aside className="sidebar">
        <div className="menu-btn" onClick={toggleMenu}>
          <img src="/menu1.svg" alt="menu" className='menu-outside'/>
        </div>
        
      </aside>

      <div id="menu" className={menuVisible ? 'visible' : ''}>
        <div className="menu-header">
          <div className="menu-btn" onClick={toggleMenu}>
            <img src="/menu.svg" alt="menu-icon" />
          </div>
        </div>

        <div className="menu-group">
          <div className="menu-item">
            <Link to="/">
            <img src="/home.png" alt="home" />
            </Link>
            <span>Home</span>
          </div>
        </div>

        <div className="menu-group">
          <div className="menu-item">
            <Link to="visualize">
            <img src="/suit.png" alt="suit" />
            </Link>
            <span>Custom your Suit</span>
          </div>
        </div>
        <div className="menu-group">
          <div className="menu-item">
            <Link to="add-to-cart">
            <img src="/bag.png" alt="suit" />
            </Link>
            <span>Your shopping Bag</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
