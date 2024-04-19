import React, { useState, useEffect } from "react";
import "./MenuBar.css";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [userId, setUserId] = useState("");

  const getUserId = async () => {
	setUserId(localStorage.getItem("user_id"))
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !document.getElementById("menu").contains(e.target) &&
        !document.querySelector(".menu-btn").contains(e.target)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    getUserId();

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="menu-bar">
      <aside className="sidebar">
        <div className="menu-btn" onClick={toggleMenu}>
          <img src="/menu1.svg" alt="menu" className="menu-outside" />
        </div>
      </aside>

      <div id="menu" className={menuVisible ? "visible" : ""}>
        <div className="menu-header">
          <div className="menu-btn" onClick={toggleMenu}>
            <img src="/menu.svg" alt="menu-icon" />
          </div>
        </div>

        <div className="menu-group">
          <div className="menu-item">
            <Link to="/">
              <img src="/home.png" alt="home" />
              <span className="menubar-text">Home</span>
            </Link>
          </div>
        </div>

        <div className="menu-group">
          <div className="menu-item">
            <Link to="design">
              <img src="/suit.png" alt="suit" />
            <span className="menubar-text">Custom your Suit</span>
            </Link>
          </div>
        </div>
        <div className="menu-group">
          <div className="menu-item">
            {userId && <Link to="add-to-cart">
              <img src="/bag.png" alt="suit" />
              <span className="menubar-text">Your shopping Bag</span>
            </Link>}

            {!userId && <Link to="login">
              <img src="/bag.png" alt="suit" />
              <span className="menubar-text">Your shopping Bag</span>
            </Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
