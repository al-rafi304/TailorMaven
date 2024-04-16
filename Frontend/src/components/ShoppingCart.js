import React, { useState } from 'react';
import "./ShoppingCart.css";
import { Link } from 'react-router-dom';
function ShoppingCart () {
  const [suits, setSuits] = useState([
    {
      id: 1,
      suitDetails: {
        fabric: 'Fabric Name',
        collarStyle: 'Button Collar Style',
        measurements: 'Body Measurements',
      },
      price: 100,
      shippingStatus: 'Free',
      quantity: 1,
    },
  ]);

  const handleIncreaseQuantity = (id) => {
    setSuits((prevSuits) =>
      prevSuits.map((suit) =>
        suit.id === id ? { ...suit, quantity: suit.quantity + 1 } : suit
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setSuits((prevSuits) =>
      prevSuits.map((suit) =>
        suit.id === id && suit.quantity > 1
          ? { ...suit, quantity: suit.quantity - 1 }
          : suit
      )
    );
  };

  const handleDeleteSuit = (id) => {
    setSuits((prevSuits) => prevSuits.filter((suit) => suit.id !== id));
  };

  const getTotalPrice = () => {
    return suits.reduce((total, suit) => total + suit.price * suit.quantity, 0);
  };

  const getTotalQuantity = () => {
    return suits.reduce((total, suit) => total + suit.quantity, 0);
  };

  return (
    <div className="suits-page">
      <div className="suits-list">
      <h1>My Shopping Bag</h1>
      {suits.map((suit) => (
      <div key={suit.id} className="suit-card">
        {/* Display suit details */}
        <div className="suit-details">
          <img className="cart-suit" src="suit101.png" alt="User Profile" />
          <div>
            <p>{suit.suitDetails.fabric}</p>
            <p>{suit.suitDetails.collarStyle}</p>
            <p>{suit.suitDetails.measurements}</p>

            {/* Display price and shipping status */}
            <p>Price: ${suit.price}</p>
            <p>Shipping: {suit.shippingStatus}</p>
          </div>
          
          {/* Delete and edit buttons */}
          <div className="cart-buttons">
            <button onClick={() => handleDeleteSuit(suit.id)} className="cart-delete">
              Delete
            </button>
            <button className="cart-edit">Edit</button>
          </div>
                  {/* Quantity controls */}
            <div className="quantity-controls">
            <button onClick={() => handleDecreaseQuantity(suit.id)}>-</button>
            <span>{suit.quantity}</span>
            <button onClick={() => handleIncreaseQuantity(suit.id)}>+</button>
          </div>
        </div>
      </div>
    ))}
      {suits.map((suit) => (
      <div key={suit.id} className="suit-card">
        {/* Display suit details */}
        <div className="suit-details">
          <img className="cart-suit" src="suit101.png" alt="User Profile" />
          <div>
            <p>{suit.suitDetails.fabric}</p>
            <p>{suit.suitDetails.collarStyle}</p>
            <p>{suit.suitDetails.measurements}</p>

            {/* Display price and shipping status */}
            <p>Price: ${suit.price}</p>
            <p>Shipping: {suit.shippingStatus}</p>
          </div>
          
          {/* Delete and edit buttons */}
          <div className="cart-buttons">
            <button onClick={() => handleDeleteSuit(suit.id)} className="cart-delete">
              Delete
            </button>
            <button className="cart-edit">Edit</button>
          </div>
                  {/* Quantity controls */}
            <div className="quantity-controls">
            <button onClick={() => handleDecreaseQuantity(suit.id)}>-</button>
            <span>{suit.quantity}</span>
            <button onClick={() => handleIncreaseQuantity(suit.id)}>+</button>
          </div>
        </div>
      </div>
    ))}


      </div>
      {/* Shopping bag summary */}
      <div className="shopping-bag-summary">
        <h2>Shopping Bag</h2>
        <p>Total Items: {getTotalQuantity()}</p>
        <p>Shipping: Free</p>
        <p>Total Price: ${getTotalPrice()}</p>
        <Link to='/'>
        <button className='proceedtopayment'>Proceed to payment</button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
