import AdminSidebar from "./AdminSidebar";
import "./AdminFabricList.css"
import { useEffect, useState } from "react";


function AdminFabricList() {

    const [allFabrics, setAllFabrics] = useState("")

    let getAllFabrics = async() => {
        let res = await fetch("/api/v1/fabric/")
        let data = await res.json()
        setAllFabrics(data)
    }

    useEffect(
        () => {getAllFabrics()}
        ,[]
    )
       
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
                            {allFabrics.fabrics?.map((fabric, index) => (
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{fabric.id}</td>
                            <td>{fabric.name}</td>
                            <td className={fabric.stock === 0 ? 'stock-out' : ''}>
                                {fabric.stock > 0 ? fabric.stock : 'Stock Out'}
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

export default AdminFabricList;