import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ReadymadeSuit.css';
import SuitAPI from '../services/SuitAPI';
import CartAPI from '../services/CartAPI';
import ProductTypes from '../constants/ProductTypes';

function ReadymadeSuit() {
    const [currentPage, setCurrentPage] = useState(1);
    const [allSuit, setAllSuit] = useState([]);
    const totalPages = 5; 
    const navigate = useNavigate()

    const handlePageChange = (page) => setCurrentPage(page);

    useEffect( () => {
        const getAllSuit = async () => {
            let data = await SuitAPI.getAllSuit()
            setAllSuit(data)
        }

        getAllSuit()

    }, [])

    const handleCart = async (id) => {
        await CartAPI.addToCart(ProductTypes.SUIT, id)
        navigate("/add-to-cart")
    }

    return (
        <div className="suit_container">
            <h2 className="readymade-header">Readymade Suit</h2>
            <div className="card__container">
            {allSuit.suits?.map((suit, index) => (
                <article className="card__article" key = {index}>
                    <img src={suit.image} alt="" className="card_img"/>
                    <div className="card__data">
                    <h2 className="card__title">{suit.type}</h2>
                        <span className="card__description">Suit measurements:</span>
                        <span className="card__description">Length: {suit.length},Waist: {suit.waist},Chest: {suit.chest},Arm Length: {suit.arm_length},Button Color: Blue.</span>
                        <span className="card__description">Fabric: {suit.fabric.name}</span>
                        <span className="card__description">Suit Price: {suit.price}$</span>
                        <div onClick={() => handleCart(suit._id)}>
                        <img src="/shopping-cart.svg" alt="cart" className="readysuit-cart" />
                        </div>
                    </div>
                </article>))}
            </div>
        {/* Pagination buttons */}
            {/* <div className="pagination">
                {[...Array(totalPages).keys()].map(page => (
                    <button 
                        key={page+1} 
                        onClick={() => handlePageChange(page+1)} 
                        className={currentPage === page+1 ? "active" : ""}
                    >
                        {page+1}
                    </button>
                ))}
            </div> */}
        </div>
    );
}

export default ReadymadeSuit;

