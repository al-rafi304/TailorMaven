import React, { useEffect, useState } from 'react';
import "./ShoppingCart.css";
import { Link, useNavigate } from 'react-router-dom';
import ProductTypes from '../constants/ProductTypes';
import CartAPI from '../services/CartAPI';

const userId = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

function ShoppingCart () {

	const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [checkoutLoading, setCheckoutLoading] = useState(false)
    const [itemsLoading, setItemsLoading] = useState(true)

	const handleDeleteItem = async (id) => {
		await CartAPI.deleteFromCart(id)
        window.location.reload()
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

            var total = 0
            var count = 0
            for(var item of data.cartItems){
                total += item.product.price
                count += 1
            }
            setTotalPrice(total)
            setTotalQuantity(count)

            setItemsLoading(false)
		}

		getItems()
	}, [])

	return (
		<div className="items-page">
			<div className="items-list">
			<h1>My Shopping Bag</h1>
            { !itemsLoading 
            ?
			items?.map((item) => (
			<div key={item.id} className="item-card">
				<div className="item-details row">
                    <div className='col' >
                        <img className="cart-item " src={item.product.image} alt="User Profile" />
                    </div>
                    <div className='col'>
                        {item.productType == ProductTypes.SUIT ? ProductTypes.SUIT + ' (' + item.product.type +") " : item.product.name + ' (' + item.product.color +") "}
                    </div>
					<div className='col'>
						<p>Price: ${item.product.price}</p>
					</div>
					
                    <div className='col'>
                        <div className="">
                            <button onClick={() => handleDeleteItem(item._id)} className="cart-delete">
                                Delete
                            </button>
                        </div>
                    </div>
				</div>
			</div>
		    ))
            :
            <div className="spinner-border spinner-border-sm" style={{height:50, width:50}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }

			</div>
			{/* Shopping bag summary */}
			<div className="shopping-bag-summary">
				<h2>Shopping Bag</h2>
				<p>Total Items: {totalQuantity}</p>
				<p>Shipping: Free</p>
				<p>Total Price: {totalPrice}</p>
                {!checkoutLoading ? 
                    <button className='proceedtopayment' onClick={checkoutButton}>
                        Proceed to payment
                    </button>
                    : 
                    <button type='button' className='btn proceedtopayment' onClick={checkoutButton} disabled>
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </button>
                }

			</div>
	   </div>
	);
};

export default ShoppingCart;
