import AdminSidebar from "./AdminSidebar";
import "./AdminDressList.css"
function AdminDressList() {
    const dresses = [
        { serialNo: 1, id: 201, name: 'Summer Dress', stock: 5 },
        { serialNo: 2, id: 202, name: 'Evening Gown', stock: 0 },
        { serialNo: 3, id: 203, name: 'Casual Dress', stock: 10 },
       ];
    return ( 
        <div className="container mt-4">
        <   div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
            <   section className="col-md-9 mt-2">
                    <div className="row">
                    <div className="dress-list">
                        <h2>Dresses List</h2>
                        <table>
                            <thead>
                            <tr>
                            <th>Serial No</th>
                            <th>Dress ID</th>
                            <th>Dress Name</th>
                            <th>Dress Stock</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dresses.map((dress, index) => (
                            <tr key={index}>
                            <td>{dress.serialNo}</td>
                            <td>{dress.id}</td>
                            <td>{dress.name}</td>
                            <td className={dress.stock === 0 ? 'stock-out' : ''}>
                                {dress.stock > 0 ? dress.stock : 'Stock Out'}
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

export default AdminDressList;