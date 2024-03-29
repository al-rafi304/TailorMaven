import AdminSidebar from "./AdminSidebar";
import "./AdminUserList.css"
function AdminUserList() {
    const users = [
        { id: 1, name: 'Al Rafi', isAdmin: false },
        { id: 2, name: 'Farhan Sadik', isAdmin: true },
        { id: 3, name: 'Naveed Imteaz', isAdmin: false },
      ];
    return ( 
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <section className="col-md-9 mt-2">
                <div className="row">
                <div className="user-list">
                    <h2>User List</h2>
                    <table>
                        <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Admin status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>
                            <button className="edit-btn">Edit</button>
                        </td>
                        <td>
                            <button className="delete-btn">Delete</button>
                        </td>
                        <td>
                            <button className={user.isAdmin ? "remove-admin-btn" : "make-admin-btn"}>
                            {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                            </button>
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

export default AdminUserList;