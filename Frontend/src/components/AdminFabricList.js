import AdminSidebar from "./AdminSidebar";
import "./AdminFabricList.css"
function AdminFabricList() {
    const fabrics = [
        { serialNo: 1, id: 101, name: 'Cotton Fabric', stock: 20 },
        { serialNo: 2, id: 102, name: 'Silk Fabric', stock: 10 },
        { serialNo: 3, id: 103, name: 'Polyester Fabric', stock: 0 },
       ];   
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
                            {fabrics.map((fabric, index) => (
                            <tr key={index}>
                            <td>{fabric.serialNo}</td>
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