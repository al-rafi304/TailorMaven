import AdminSidebar from "./AdminSidebar";
import "./AdminsuitList.css"
import { useEffect, useState } from "react";
function AdminsuitList() {

    const [allsuits, setAllsuits] = useState("")

    let getAllsuits = async() => {
        let res = await fetch("/api/v1/suit")
        let data = await res.json()
        setAllsuits(data)
    }

    useEffect(
        () => {getAllsuits()}
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
                            <th>suit ID</th>
                            <th>suit Name</th>
                            <th>suit Stock</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allsuits.suits?.map((suit, index) => (
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

export default AdminsuitList;