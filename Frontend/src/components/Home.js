import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <p>This is Home Page</p>
      <p>Test is working</p>
      <Link to="/about" className="btn btn-primary">
        About
      </Link>
    </div>
  );
}

export default Home;