import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ReadymadeSuit.css';
import SuitAPI from '../services/SuitAPI';

function ReadymadeSuit() {
    const [currentPage, setCurrentPage] = useState(1);
    const [allSuit, setAllSuit] = useState([]);
    const totalPages = 5; 

    const handlePageChange = (page) => setCurrentPage(page);

    useEffect( () => {
        const getAllSuit = async () => {
            let data = await SuitAPI.getAllSuit()
            setAllSuit(data)
        }

        getAllSuit()

    }, [])

    return (
        <div className="suit_container">
            <h2 className="readymade-header">Readymade Suit</h2>
            <div className="card__container">
            {allSuit.suits?.map((suit, index) => (
                <article className="card__article" key = {index}>
                    <img src={suit.image} alt="image" className="card__img" />
                    <div className="card__data">
                    <h2 className="card__title">{suit.type}</h2>
                        <span className="card__description">Suit measurements:</span>
                        <span className="card__description">Length: {suit.length},Waist: {suit.waist},Chest: {suit.chest},Arm Length: {suit.arm_length},Button Color: Blue.</span>
                        <span className="card__description">Fabric: {suit.fabric.name}</span>
                        <span className="card__description">Suit Price: {suit.price}$</span>
                        <Link to="add-to-cart">
                        <img src="/shopping-cart.svg" alt="cart" className="readysuit-cart" />
                        </Link>
                    </div>
                </article>))}

                {/* <article className="card__article">
                    <img src="/doublebreast.png" alt="image" className="card__img" />

                    <div className="card__data">
                        <span className="card__description">Suit measurements:</span>
                        <span className="card__description">Length: 45,Waist: 45,Chest: 45,Arm Length: 45,Button Color: Blue.</span>
                        <span className="card__description">Fabric: cotton</span>
                        <span className="card__description">Suit Price: 999$</span>
                        <Link to="add-to-cart">
                        <img src="/shopping-cart.svg" alt="cart" className="readysuit-cart" />
                        </Link>
                    </div>
                </article>

                <article className="card__article">
                    <img src="/doublebreast2.png" alt="image" className="card__img" />

                    <div className="card__data">
                    <h2 className="card__title">Doublebreast Suit</h2>
                        <span className="card__description">Suit measurements:</span>
                        <span className="card__description">Length: 45,Waist: 45,Chest: 45,Arm Length: 45,Button Color: Blue.</span>
                        <span className="card__description">Fabric: cotton</span>
                        <span className="card__description">Suit Price: 999$</span>
                        <Link to="add-to-cart">
                        <img src="/shopping-cart.svg" alt="cart" className="readysuit-cart" />
                        </Link>
                    </div>
                </article>
                <article className="card__article">
                    <img src="/doublebreast3.png" alt="image" className="card__img" />

                    <div className="card__data">
                    <h2 className="card__title">Doublebreast Suit</h2>
                        <span className="card__description">Suit measurements:</span>
                        <span className="card__description">Length: 45,Waist: 45,Chest: 45,Arm Length: 45,Button Color: Blue.</span>
                        <span className="card__description">Fabric: cotton</span>
                        <span className="card__description">Suit Price: 999$</span>
                        <Link to="add-to-cart">
                        <img src="/shopping-cart.svg" alt="cart" className="readysuit-cart" />
                        </Link>
                    </div>
                </article>
                <article className="card__article">
                    <img src="/doublebreast4.png" alt="image" className="card__img" />

                    <div className="card__data">
                    <h2 className="card__title">Doublebreast Suit</h2>
                        <span className="card__description">Suit measurements:</span>
                        <span className="card__description">Length: 45,Waist: 45,Chest: 45,Arm Length: 45,Button Color: Blue.</span>
                        <span className="card__description">Fabric: cotton</span>
                        <span className="card__description">Suit Price: 999$</span>
                        <Link to="add-to-cart">
                        <img src="/shopping-cart.svg" alt="cart" className="readysuit-cart" />
                        </Link>
                    </div>
                </article>
                <article className="card__article">
                    <img src="/doublebreast5.png" alt="image" className="card__img" />

                    <div className="card__data">
                    <h2 className="card__title">Doublebreast Suit</h2>
                        <span className="card__description">Suit measurements:</span>
                        <span className="card__description">Length: 45,Waist: 45,Chest: 45,Arm Length: 45,Button Color: Blue.</span>
                        <span className="card__description">Fabric: cotton</span>
                        <span className="card__description">Suit Price: 999$</span>
                        <Link to="add-to-cart">
                        <img src="/shopping-cart.svg" alt="cart" className="readysuit-cart" />
                        </Link>
                    </div>
                </article> */}
            </div>
            {/* <div className="pagination"> */}
                {/* Pagination buttons */}
                {/* {[...Array(totalPages).keys()].map(page => (
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

