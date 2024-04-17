import React from "react";
import { Link } from "react-router-dom";
import pic1 from "../assets/photos/fabrics.png"
import pic2 from "../assets/photos/dresses.png"
import cus1 from "../assets/photos/custom1.jpg"
import cus2 from "../assets/photos/custom2.jpg"
import cus3 from "../assets/photos/custom3.jpg"
import "./Home.css";
function Home() {
  return ( 
    <div>
      <div id="carouselExampleIndicators" className="carousel slide card" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carousel-content">
              <img src={cus1} className="d-block w-100 carousel-image" alt="..." />
              <div className="carousel-text">
                <p className="custom-paragraph">
                  Are you looking for a custom suit that will enhance your looks and style? Hockerty has the answer!
                  Our suits are not only high-quality but they are also tailored entirely to your measurements.
                  Choose from more than 150 fabrics and various details to design your own look.
                  We guarantee the perfect fit of your tailored Hockerty suit.
                </p>
                <Link to="/design">
                  <button className="customsuit-button">Design your Suit</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="carousel-content">
              <img src={cus2} className="d-block w-100 carousel-image" alt="..." />
              <div className="carousel-text">
                <p className="custom-paragraph">
                  Are you looking for a custom suit that will enhance your looks and style? Hockerty has the answer!
                  Our suits are not only high-quality but they are also tailored entirely to your measurements.
                  Choose from more than 150 fabrics and various details to design your own look.
                  We guarantee the perfect fit of your tailored Hockerty suit.
                </p>
                <Link to="/login">
                  <button className="customsuit-button">Design your Suit</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="carousel-content">
              <img src={cus3} className="d-block w-100 carousel-image" alt="..." />
              <div className="carousel-text">
                <p className="custom-paragraph">
                  Are you looking for a custom suit that will enhance your looks and style? Hockerty has the answer!
                  Our suits are not only high-quality but they are also tailored entirely to your measurements.
                  Choose from more than 150 fabrics and various details to design your own look.
                  We guarantee the perfect fit of your tailored Hockerty suit.
                </p>
                <Link to="/login">
                  <button className="customsuit-button">Design your Suit</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>



        <div className="card mt-2">
        <div className="card-group">
          <div className="card">
            <div className="card-img-container">
              <img src={pic1} className="card-img-top" alt="..." />
              <div className="overlay">
                <p className="febric-paragraph">Explore the Fabrics</p>
                <Link to="/fabrics">
                  <button className="febric-button">Explore Fabrics</button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-img-container">
              <img src={pic2} className="card-img-top" alt="..." />
              <div className="overlay">
                <p className="suit-paragraph">Explore all the Suits</p>
                <Link to="#">
                  <button className="suit-button">Explore Suits</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}

export default Home;