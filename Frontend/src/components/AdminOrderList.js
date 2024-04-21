import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminOrderList.css";
import OrderStatus from "../constants/OrderStatus";

const userId = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

function AdminOrderList() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    console.log(orders)

    const handleUpdateStatus = async (orderId, newStatus) => {
        const updatedOrders = orders?.map(order => {
            if (order._id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
        console.log(orders)
    };

    const handleColorChange = async (orderId, index) => {

        const data = {"order_status" : orders[index].status}
        console.log(orderId)
        await fetch(`/api/v1/order/status/${orderId}`, {
            method : "PATCH",
            headers : {'Authorization': `Bearer ${token}`, "Content-Type" : "application/json"},
            body : JSON.stringify(data)
        })
        getAllOrders()

        // const tableRow = document.getElementById(orderId);
        // tableRow.classList.remove(`status-pending`);
        // tableRow.classList.add(`status-${newStatus}`);
    };

    async function getAllOrders(){
        let res = await fetch(`/api/v1/order/`, {
            method : "GET",
                        headers : {'Authorization': `Bearer ${token}`}
        })
        let data = await res.json()
        setOrders(data.orders)
        setIsLoading(false)
    }

    useEffect( () => {
    
        getAllOrders()
      }, [])

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <section className="col-md-9 mt-2">
                    <div className="row">
                        <div className="OrderList">
                            <h2>Order List</h2>
                            <div className="order-cards-container">
                                <div className="order-card card-1">Orders: {orders?.length}</div>
                                <div className="order-card card-2">Delivered: {orders?.filter(order => order.status === OrderStatus.DELIVERED).length}</div>
                                <div className="order-card card-3">Pending: {orders?.filter(order => order.status === OrderStatus.PENDING).length}</div>
                                <div className="order-card card-4">Processing: {orders?.filter(order => order.status === OrderStatus.PROCESSING).length}</div>
                                <div className="order-card card-4">Shipped: {orders?.filter(order => order.status === OrderStatus.SHIPPED).length}</div>
                            </div>
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Order From</th>
                                        <th>Product</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading ?
                                        orders?.map((order, index) => (
                                            <tr key={index} id={index} className={`status-${order.status.toLowerCase()}`}>
                                                <td>{order._id}</td>
                                                <td>{order.timestamp.slice(0,10)}</td>
                                                <td>{order.user.username}</td>
                                                <td>{order.productType}</td>
                                                <td>{order.price}</td>
                                                <td>
                                                    {order.status === OrderStatus.SHIPPED?
                                                        <td>{OrderStatus.SHIPPED}</td>
                                                        :
                                                        <select value={order.status} onChange={e => handleUpdateStatus(order._id, e.target.value)}>
                                                            <option value={OrderStatus.DELIVERED}>Delivered</option>
                                                            <option value={OrderStatus.PENDING}>Pending</option>
                                                            <option value={OrderStatus.PROCESSING}>Processing</option>
                                                            <option value={OrderStatus.SHIPPED}>Shipped</option>
                                                        </select>
                                                    }
                                                </td>
                                                <td><button className="update-btn" onClick={() => handleColorChange(order._id, index)}>Update</button></td>
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
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AdminOrderList;
