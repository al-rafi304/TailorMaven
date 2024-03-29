import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
function AdminPage() {
    return ( 
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <section className="col-md-9 mt-2">
                <div className="row">
                    <div className="col-md-4 ms-5">
                    <div className="card border border-primary">
                        <center><div className="card-header bg-info fw-bolder">Total Enrolled Students</div></center>
                        <div className="card-body">
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 ms-5">
                    <div className="card border border-primary">
                        <center><div className="card-header bg-primary text-white fw-bolder">Total Courses</div></center>
                        <div className="card-body">
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>
        </div>
     );
}

export default AdminPage;