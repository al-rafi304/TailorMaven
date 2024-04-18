import React, { useEffect, useState } from 'react';
import "./ShoppingCart.css";
import { Link, useNavigate } from 'react-router-dom';
import ProductTypes from '../constants/ProductTypes';

const userId = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

function ShoppingCart () {

    const navigate = useNavigate()

    !userId && navigate("/")

	const [items, setItems] = useState([])
    const [checkoutLoading, setCheckoutLoading] = useState(false)
	
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

    async function checkoutButton() {
        setCheckoutLoading(true)
        let res = await fetch(
            `/api/v1/order/checkout`,
            {
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${token}`}
            }
        )
        let checkoutUrl = await res.json().then((r) => {return r.url})
        setCheckoutLoading(false)
        console.log(checkoutUrl)
        window.location.href = checkoutUrl
    }

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
				<div className="item-details row">
                    <div className='col' >
                        {item.productType == ProductTypes.FABRIC ?
                        <img className="cart-item " src={item.product.image} alt="User Profile" />
                        :
                        <img className="cart-item " src="/suit.png" alt="suit" />
                        }
                    </div>
                    <div className='col'>
                        {item.productType == ProductTypes.SUIT ? ProductTypes.SUIT + ' ' + item.product.type : item.product.name}
                    </div>
					<div className='col'>
						<p>Price: ${item.product.price}</p>
					</div>
					
					{/* Delete and edit buttons */}
                    <div className='col'>
                        <div className="">
                            <button onClick={() => handleDeleteItem(item.id)} className="cart-delete">
                                Delete
                            </button>
                            <button className="cart-edit">Edit</button>
                        </div>
                        {/* Quantity controls */}
                        {/* <div className="quantity-controls ">
                            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                        </div> */}
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
				<button className='proceedtopayment' onClick={checkoutButton}>
                    {!checkoutLoading ? 'Proceed to payment'
                        : 
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                </button>
			</div>
	   </div>
	);
};

export default ShoppingCart;
