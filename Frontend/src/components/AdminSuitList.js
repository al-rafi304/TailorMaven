import AdminSidebar from "./AdminSidebar";
import "./AdminsuitList.css"
import { useEffect, useState } from "react";
function AdminsuitList() {

    const [allSuits, setAllSuits] = useState("")

    let getAllsuits = async() => {
        let res = await fetch("/api/v1/suit")
        let data = await res.json()
        setAllSuits(data)
    }

    useEffect(
        () => {getAllSuits()}
        ,[]
    )

    return ( 
        <div className="container mt-4">
        <   div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
            <   section className="col-md-9 mt-2">
                    <div className="row">
                    <div className="suit-list">
                        <h2>suits List</h2>
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
                            {allSuits.suits?.map((suit, index) => (
                            <tr key={index+1}>
                            <td>{index}</td>
                            <td>{suit.id}</td>
                            <td>{suit.name}</td>
                            <td className={suit.stock === 0 ? 'stock-out' : ''}>
                                {suit.stock > 0 ? suit.stock : 'Stock Out'}
                            </td>
                            <td>
                                <button className="edit-btn">Edit</button>
                            </td>
                            <td>
                                <button className="delete-btn">Delete</button>
                            </td>
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

export default AdminSuitList;
