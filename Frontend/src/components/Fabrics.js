import React from "react";

import "../assets/css/bootstrap.min.css";
import "./Fabrics.css";

function Fabrics() {
    return (
        <div className="FabricsContainer">
            <div className="filterContainer visible">
                <div className="heading">
                    <h1 className="filter_headline expanded">
                        <span className="filter_block_title">Color</span>
                    </h1>
                    <ul className="filter_color_list">
                        <li className="">
                            <input type="checkbox" className="filter_color" />

                            <label for="0a1ac1e6-87f8-4d65-9b8f-19c591f0fa7d">Black</label>
                            <img src="https://cdn.iagapparel.com/resource/f07e6896-c0e7-43d8-a887-7a251428f721.svg" />
                        </li>
                        <li className="">
                            <input type="checkbox" className="filter_color" />

                            <label for="d83dd76c-332c-4625-bde2-6fd5d61f20ef">White</label>
                            <img src="https://cdn.iagapparel.com/resource/dfda5758-c080-4ed2-a889-13fb0f490626.svg" />
                        </li>
                        <li className="">
                            <input type="checkbox" className="filter_color" />

                            <label for="eb4156a5-bc49-4814-9bf4-75f5da177b92">Light Grey</label>
                            <img src="https://cdn.iagapparel.com/resource/9bf0cfce-212d-4738-8fbd-a3e75affdd17.svg" />
                        </li>
                        <li className="">
                            <input type="checkbox" className="filter_color" />

                            <label for="ea1aa1f0-a346-4996-9158-c1b2fb37ab7c">Grey</label>
                            <img src="https://cdn.iagapparel.com/resource/feabd7d1-4957-45a4-bddd-6866422c8314.svg" />
                        </li>
                        <li className="">
                            <input type="checkbox" className="filter_color" />

                            <label for="c58f7f28-7997-4aa4-9820-b3920749f3b9">Dark Grey</label>
                            <img src="https://cdn.iagapparel.com/resource/e25b078d-4ea8-4259-85a5-aec4d3ecf9e8.svg" />
                        </li>
                    </ul>
                </div>
            </div>

            <div class="tileContainer hide">
                <div class="tile">
                    <a href="#">
                        <div class="productImage">
                            <img src="https://cdn.iagapparel.com/resource//455181dd-23db-4cb4-9d79-4517a94bc3b6.jpg" class="lazy-loaded" />
                        </div>
                        <div class="tileDescription">
                            <p class="productTitle">RIVIERA</p>
                            <p class="productCode">1121000</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Fabrics;
