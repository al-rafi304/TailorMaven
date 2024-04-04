import AdminSidebar from "./AdminSidebar";
<<<<<<< HEAD
import "./AdminSuitList.css"
import { useEffect, useState } from "react";
function AdminDressList() {

    const [allSuit, setAllSuit] = useState("")

    let getAllSuit = async() => {
        let res = await fetch("/api/v1/suit")
        let data = await res.json()
        setAllSuit(data)
    }

    useEffect(
        () => {getAllSuit()}
=======
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
>>>>>>> 7286d49a6aae829476f58d9cfed0c67c656db282
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
<<<<<<< HEAD
                        <h2>Suits List</h2>
=======
                        <h2>suits List</h2>
>>>>>>> 7286d49a6aae829476f58d9cfed0c67c656db282
                        <table>
                            <thead>
                            <tr>
                            <th>Serial No</th>
<<<<<<< HEAD
                            <th>Suit ID</th>
                            <th>Suit Name</th>
                            <th>Suit Stock</th>
=======
                            <th>suit ID</th>
                            <th>suit Name</th>
                            <th>suit Stock</th>
>>>>>>> 7286d49a6aae829476f58d9cfed0c67c656db282
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
<<<<<<< HEAD
                            {allSuit.suits?.map((suit, index) => (
=======
                            {allsuits.suits?.map((suit, index) => (
>>>>>>> 7286d49a6aae829476f58d9cfed0c67c656db282
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