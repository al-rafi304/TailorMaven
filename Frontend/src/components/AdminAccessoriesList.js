import AdminSidebar from "./AdminSidebar";
import "./AdminAccessoriesList.css"
function AdminAccessoriesList() {
    const accessories = [
        { serialNo: 1, id: 301, name: 'Tie', stock: 15 },
        { serialNo: 2, id: 302, name: 'Suit Button', stock: 20 },
        { serialNo: 3, id: 303, name: 'Coat Pin', stock: 5 },
        { serialNo: 4, id: 304, name: 'Tie Clip', stock: 0 },
       ];
    return ( 
        <div className="container mt-4">
        <   div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
            <   section className="col-md-9 mt-2">
                    <div className="row">
                    <div className="accessories-list">
                        <h2>Accessories List</h2>
                        <table>
                            <thead>
                            <tr>
                            <th>Serial No</th>
                            <th>Accessory ID</th>
                            <th>Accessory Name</th>
                            <th>Accessory Stock</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accessories.map((accessory, index) => (
                            <tr key={index}>
                            <td>{accessory.serialNo}</td>
                            <td>{accessory.id}</td>
                            <td>{accessory.name}</td>
                            <td className={accessory.stock === 0 ? 'stock-out' : ''}>
                                {accessory.stock > 0 ? accessory.stock : 'Stock Out'}
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

export default AdminAccessoriesList;
