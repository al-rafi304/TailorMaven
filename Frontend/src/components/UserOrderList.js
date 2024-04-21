import React, { useEffect, useState } from 'react';
import './UserOrderList.css'; 
import OrderStatus from '../constants/OrderStatus';

const userId = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

function UserOrderList() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const renderOrderStatusColor = (status) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'yellow';
      case OrderStatus.PROCESSING:
        return 'blue';
      // case orderStatus.:
      //   return 'red';
      case OrderStatus.DELIVERED:
        return 'green';
      case OrderStatus.SHIPPED:
        return 'black';
    }
  };

  useEffect( () => {
    async function getAllOrders(){
        let res = await fetch(`/api/v1/order/user/${userId}`, {
            method : "GET",
						headers : {'Authorization': `Bearer ${token}`}
        })
        let data = await res.json()
        setOrders(data)
		console.log(data)
        setIsLoading(false)
    }

    getAllOrders()
  }, [])

  return (
    <div className="user-order-list">
      <table className="user-order-table"> 
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Image</th>
            <th>Date</th>
            <th>Product</th>
            <th>Info</th>
            <th>Total Cost</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            {!isLoading ?
                orders.orders?.map((order, index) => (
                    <tr key={index} className={renderOrderStatusColor(order.status)}>
                    <td>{order._id}</td>
                    <td>
                        <img src={order.product.image} className="user-order-img" alt={`Order ${order.id}`} />
                    </td>
                    <td>{order.timestamp.slice(0,10)}</td>
                    <td>{order.productType}</td>
                    {order.productType === "Suit" ?
                                        <td>{order.product.fabric.color} {order.product.fabric.name}</td>
                                        :
                                        <td>{order.product.name} ({order.product.color})</td>}
                    <td>{order.price}</td>
                    <td>{order.status}{order.isGift?"Gift":""}</td>
                    </tr>
                ))
                :
                <div className="spinner-border spinner-border-sm" style={{height:50, width:50}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
        </tbody>
      </table>
    </div>
  );
}

export default UserOrderList;
