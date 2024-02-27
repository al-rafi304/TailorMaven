import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <ul className="nav">
        <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
        <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
        <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
        <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
      </ul>
      <div className="copyright">
        <p>TailorMaven</p>
        <p>University Project Spring 2024</p>
        <p>© TailorMaven LTD.</p>
      </div>
    </footer>
  );
}

export default Footer;
