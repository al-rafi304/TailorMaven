import React, { useState } from 'react';
import './UserOrderList.css'; 

function UserOrderList() {
  const [orders, setOrders] = useState([
    {
      id: 12345,
      imageUrl: '/doublebreast3.png', 
      date: '2024-04-19',
      suitType: 'Tuxedo',
      totalCost: 250.00,
      status: 'pending',
    },
    {
      id: 54321,
      imageUrl: '/doublebreast2.png', 
      date: '2024-04-18',
      suitType: 'Three-Piece Suit',
      totalCost: 300.50,
      status: 'delivered',
    },
    {
      id: 98765,
      imageUrl: '/doublebreast.png',
      date: '2024-04-17',
      suitType: 'Double-Breasted Suit',
      totalCost: 189.99,
      status: 'cancelled',
    },
  ]);

  const renderOrderStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'cancelled':
        return 'red';
      case 'delivered':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div className="user-order-list">
      <table className="user-order-table"> 
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Image</th>
            <th>Date</th>
            <th>Suit Type</th>
            <th>Total Cost</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className={renderOrderStatusColor(order.status)}>
              <td>{order.id}</td>
              <td>
                <img src={order.imageUrl} className="user-order-img" alt={`Order ${order.id} image`} />
              </td>
              <td>{order.date}</td>
              <td>{order.suitType}</td>
              <td>{order.totalCost}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserOrderList;
