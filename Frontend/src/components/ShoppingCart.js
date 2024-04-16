import React, { useEffect, useState } from 'react';
import "./ShoppingCart.css";
import { Link } from 'react-router-dom';

const userId = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

function ShoppingCart () {

	const [items, setItems] = useState([])
	
	const handleIncreaseQuantity = (id) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};

	const handleDecreaseQuantity = (id) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item
			)
		);
	};

	const handleDeleteItem = (id) => {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	const getTotalPrice = () => {
		return items.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const getTotalQuantity = () => {
		return items.reduce((total, item) => total + item.quantity, 0);
	};

	useEffect(() => {
		async function getItems(){
			console.log(userId)
			let res = await fetch(
				`/api/v1/cart/${userId}`,
				{
						method: 'GET',
						headers: {'Authorization': `Bearer ${token}`}
				}
			)

			let data = await res.json()
			console.log(data)
			setItems(data.cartItems)
		}

		getItems()
	}, [])

	return (
		<div className="items-page">
			<div className="items-list">
			<h1>My Shopping Bag</h1>
			{items?.map((item) => (
			<div key={item.id} className="item-card">
				{/* Display item details */}
				<div className="item-details">
					<img className="cart-item" src={item.image} alt="User Profile" />
					<div>
						<p>Price: ${item.price}</p>
					</div>
					
					{/* Delete and edit buttons */}
					<div className="cart-buttons">
						<button onClick={() => handleDeleteItem(item.id)} className="cart-delete">
							Delete
						</button>
						<button className="cart-edit">Edit</button>
					</div>
									{/* Quantity controls */}
						<div className="quantity-controls">
						<button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
						<span>{item.quantity}</span>
						<button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
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
