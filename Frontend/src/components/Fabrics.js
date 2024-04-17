import React, { useEffect, useState } from "react";

import "../assets/css/bootstrap.min.css";
import "./Fabrics.css";
import FabricAPI from "../services/FabricAPI";
import CartAPI from "../services/CartAPI";
import ProductTypes from "../constants/ProductTypes";
import { useNavigate } from "react-router-dom";

function Fabrics() {
    
    const [fabrics, setFabrics] = useState([])
    // State to manage the activation of the info__fabrics class
    const [isActive, setIsActive] = useState(false);
    const [fabric, setFabric] = useState("")
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate()

    // Function to toggle the isActive state
    const toggleInfoActive = (index) => {
        setIsActive(!isActive);
        fabric === "" ? setFabric(fabrics[index]) : setFabric("")
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

    useEffect(() => {
        async function getFabrics(){
            let result = await FabricAPI.getAllFabrics()
            setFabrics(result)
        }

        getFabrics()
    }, [])

    const handleCart = async () =>{
        await CartAPI.addToCart(ProductTypes.FABRIC, fabric._id, quantity)
        navigate("/add-to-cart")
    }

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
            {fabrics?.map((fabric, index) => (
                    <div key = {index} className="tile">
                        <a onClick={() => toggleInfoActive(index)}>
                            <div className="productImage">
                                <img src={fabric.image} className="lazy-loaded" />
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
                <h3>Name: {fabric.name}</h3>
                <h4>Color : {fabric.color}</h4>

                <div className="fabrics__infoButton">
                    <div className="fabrics__infoButton__btn" onClick={handleCart}>Add to cart</div>
                    <span className="quatity" onClick={decrementQuantity}>
                        -
                    </span>
                    <span>{quantity}m</span>
                    <span className="quatity" onClick={incrementQuantity}>
                        -
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Fabrics;