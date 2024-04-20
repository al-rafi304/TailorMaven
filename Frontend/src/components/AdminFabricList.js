import AdminSidebar from "./AdminSidebar";
import "./AdminFabricList.css"
import { useEffect, useState } from "react";
import FabricAPI from "../services/FabricAPI";


function AdminFabricList() {

    const [allFabrics, setAllFabrics] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getAllFabrics(){
            var fabricData = await FabricAPI.getAllFabrics()
            setAllFabrics(fabricData)
            setIsLoading(false)
        }
        getAllFabrics()
    }, [])

    const handleDelete = (index) => {
        fetch(`api/v1/fabric/${allFabrics[index]?._id}`, {
            method: "delete",
            headers: {"authorization": "Bearer " + localStorage.getItem("token")}
        })
        window.location.reload()
    }
       
    return (   
        <div className="container mt-4">
        <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
            <   section className="col-md-9 mt-2">
                    <div className="row">
                    <div className="fabric-list">
                        <h2>Fabrics List</h2>
                        <table>
                            <thead>
                            <tr>
                            <th>Serial No</th>
                            <th>Fabric ID</th>
                            <th>Fabric Name</th>
                            <th>Fabric Stock</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!isLoading ?
                                allFabrics?.map((fabric, index) => (
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{fabric._id}</td>
                                <td>{fabric.name}</td>
                                <td className={fabric.stock === 0 ? 'stock-out' : ''}>
                                    {fabric.stock > 0 ? fabric.stock : 'Stock Out'}
                                </td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                </td>
                                <td>
                                    <button className="delete-btn" onClick={() => {handleDelete(index)}}>Delete</button>
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

export default AdminFabricList;