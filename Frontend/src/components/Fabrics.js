import React, { useEffect, useState } from "react";

import "../assets/css/bootstrap.min.css";
import "./Fabrics.css";

function Fabrics() {

    const [fabrics, setFabrics] = useState("")
    // State to manage the activation of the info__fabrics class
    const [isActive, setIsActive] = useState(false);
    const [quantity, setQuantity] = useState(0);

    // Function to toggle the isActive state
    const toggleInfoActive = () => {
        setIsActive(!isActive);
    };

    // Function to increment the quantity
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Function to decrement the quantity
    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    let getFabrics = async() => {
        let res = await fetch("/api/v1/fabric/")
        let data = await res.json()
        setFabrics(data)
        console.log(fabrics)
    }

    useEffect(() => {
        getFabrics()
    }, [])

    return (
        <div className="FabricsContainer">
            <div className="filterContainer visible">
                <div className="heading">
                    <h1 className="filter_headline expanded">
                        <span className="filter_block_title">Material</span>
                    </h1>
                    <ul className="filter_material_list">
                        <li className="">
                            <input type="checkbox" className="filter_material" id="cotton" />
                            <label htmlFor="cotton">Cotton</label>
                        </li>
                        <li className="">
                            <input type="checkbox" className="filter_material" id="velvet" />
                            <label htmlFor="velvet">Velvet</label>
                        </li>
                        <li className="">
                            <input type="checkbox" className="filter_material" id="linen" />
                            <label htmlFor="linen">Linen</label>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Fabrics */}

            <div  className="tileContainer hide">
            {fabrics.fabrics?.map((fabric, index) => (
                    <div key = {index} className="tile">
                        <a href="#" onClick={toggleInfoActive}>
                            <div className="productImage">
                                <img src="https://cdn.iagapparel.com/resource//455181dd-23db-4cb4-9d79-4517a94bc3b6.jpg" className="lazy-loaded" />
                            </div>
                            <div className="tileDescription">
                                <p className="productTitle">{fabric.name}</p>
                                <p className="productCode">{fabric.id}</p>
                            </div>
                        </a>
                </div>))}
                    </div>

            {/* Info Fabrics */}
            <div className={`info__fabrics ${isActive ? "active" : ""}`}>
                <p>Description goes here</p>

                <div className="fabrics__infoButton">
                    <div className="fabrics__infoButton__btn">Add to cart</div>
                    <span className="quatity" onClick={incrementQuantity}>
                        +
                    </span>
                    <span>{quantity}m</span>
                    <span className="quatity" onClick={decrementQuantity}>
                        -
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Fabrics;