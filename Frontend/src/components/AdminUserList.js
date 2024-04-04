import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminUserList.css"
function AdminUserList() {

    const [allUsers, setAllUsers] = useState([])

    let getAllUsers = async() => {
        let res = await fetch("/api/v1/user/", {
            headers: {"authorization": "Bearer " + localStorage.getItem("token")}
        })
        let data = await res.json()
        setAllUsers(data)
    }

    useEffect(
        () => {getAllUsers()}
        ,[]
    )

    // const Swal = require('sweetalert2');    
    // const handleDelete =(index)=>{
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'error',
    //         confirmButtonText: 'Yes, delete it!',
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         showCancelButton: true
    //       }).then(result =>{
    //         if (result.isConfirmed) {
    //             doDelete(index)
    //             Swal.fire({
    //               title: "Deleted!",
    //               text: "Your file has been deleted.",
    //               icon: "success"
    //             });
    //           }
    //       })
    // } 

    const handleDelete = (index) => {
        fetch(`api/v1/user/${allUsers.users[index]._id}`, {
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
                        {allUsers.users?.map((user, index) => (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>
                            <button className="edit-btn">Edit</button>
                        </td>
                        <td>
                            <button className="delete-btn" onClick = {() => handleDelete(index)}>Delete</button>
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