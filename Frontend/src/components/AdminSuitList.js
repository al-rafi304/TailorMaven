import AdminSidebar from "./AdminSidebar";
import "./AdminSuitList.css"
import { useEffect, useState } from "react";
function AdminSuitList() {

    const [allSuits, setAllSuits] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    let getAllSuits = async() => {
        let res = await fetch("/api/v1/suit")
        let data = await res.json()
        setAllSuits(data)
        setIsLoading(false)
    }

    useEffect(
        () => {getAllSuits()}
        ,[]
    )

    const handleDelete = (suit) => {
        fetch(`api/v1/suit/${suit._id}`, {
            method: "delete",
            headers: {"authorization": "Bearer " + localStorage.getItem("token")}
        })
        window.location.reload()
    }

    return ( 
        <div className="container mt-4">
        <   div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
            <   section className="col-md-9 mt-2">
                    <div className="row">
                    <div className="suit-list">
                        <h2>Suits List</h2>
                        <table>
                            <thead>
                            <tr>
                            <th>Serial No</th>
                            <th>Suit ID</th>
                            <th>Suit Name</th>
                            <th>Suit Stock</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!isLoading ?
                                allSuits.suits?.map((suit, index) => (
                                <tr key={index+1}>
                                <td>{index}</td>
                                <td>{suit._id}</td>
                                <td>{suit.type}</td>
                                <td className={suit.stock === 0 ? 'stock-out' : ''}>
                                    {suit.stock > 0 ? suit.stock : 'Stock Out'}
                                </td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                </td>
                                <td>
                                    <button className="delete-btn" onClick = {() => {handleDelete(suit)}}>Delete</button>
                                </td>
                                </tr>
                                ))
                                :
                                <div className="spinner-border m-3" role="status">
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

export default AdminSuitList;
