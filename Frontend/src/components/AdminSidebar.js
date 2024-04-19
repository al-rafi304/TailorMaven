import { Link } from "react-router-dom";
function AdminSidebar(){

    const handlelogout = async () => {
        await fetch("/auth/signout");
      };

    return(
        <div className="card">        
            <div className="list-group list-group-flush">
                <Link to="/admin-dashboard" className="list-group-item list-group-item-action"><center>Dashboard</center></Link>
                <Link to="/admin-userlist" className="list-group-item list-group-item-action"><center>User List</center></Link>
                <Link to="/admin-add-product" className="list-group-item list-group-item-action"><center>Add Product</center></Link>
                <Link to="/admin-fabriclist" className="list-group-item list-group-item-action"><center>Fabric List</center></Link>
                <Link to="/admin-suitlist" className="list-group-item list-group-item-action"><center>Dress List</center></Link>
                <Link to="/admin-orderlist" className="list-group-item list-group-item-action"><center>Order List</center></Link>
                <Link to="/admin-chat" className="list-group-item list-group-item-action"><center>Messaging</center></Link>
            </div>
        </div>
    );
}

export default AdminSidebar;