import React from "react";
import { Link } from "react-router-dom";
// import './Home.css'
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
            <img src="003.png" className="d-block w-100" alt="..." style={{height: '500px', width: '400px'}}/>
          </div>
          <div className="carousel-item">
            <img src="003.png" className="d-block w-100" alt="..." style={{height: '500px', width: '400px'}}/>
          </div>
          <div className="carousel-item">
            <img src="003.png" className="d-block w-100" alt="..." style={{height: '500px', width: '400px'}}/>
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
          <img src="004.png" className="card-img-top" alt="..."/>
        </div>
        <div className="card">
          <img src="004.png" className="card-img-top" alt="..."/>
        </div>
      </div>

      </div>
    </div>
   );
}

export default Home;