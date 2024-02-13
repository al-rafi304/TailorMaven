import React from "react";
import { Link } from "react-router-dom";
import './About.css'; // Import the CSS file

function About() {
  return (
    <div className="about-container">
      <div className="card" style={{ width: '18rem' }}>
        <img src="001.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
