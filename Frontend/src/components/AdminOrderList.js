import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminOrderList.css";

function AdminOrderList() {
    const [orders, setOrders] = useState([
        { id: 1, date: "2024-04-20", orderFrom: "User 1", suitTypeName: "Suit 1", totalPrice: 100, status: "pending" },
        { id: 2, date: "2024-04-21", orderFrom: "User 2", suitTypeName: "Suit 2", totalPrice: 150, status: "delivered" },
        { id: 3, date: "2024-04-22", orderFrom: "User 3", suitTypeName: "Suit 3", totalPrice: 200, status: "cancelled" }
    ]);

    const handleUpdateStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    const handleColorChange = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
        const tableRow = document.getElementById(orderId);
        tableRow.classList.remove(`status-pending`);
        tableRow.classList.add(`status-${newStatus}`);
    };

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
                                <div className="order-card card-1">Orders: {orders.length}</div>
                                <div className="order-card card-2">Delivered: {orders.filter(order => order.status === "delivered").length}</div>
                                <div className="order-card card-3">Pending: {orders.filter(order => order.status === "pending").length}</div>
                                <div className="order-card card-4">Canceled: {orders.filter(order => order.status === "cancelled").length}</div>
                            </div>
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Order From</th>
                                        <th>Suit Type Name</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id} id={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.orderFrom}</td>
                                            <td>{order.suitTypeName}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>
                                                <select value={order.status} onChange={e => handleUpdateStatus(order.id, e.target.value)}>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="cancelled">Canceled</option>
                                                </select>
                                            </td>
                                            <td><button className="update-btn" onClick={() => handleColorChange(order.id, order.status)}>Update</button></td>
                                        </tr>
                                    ))}
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
