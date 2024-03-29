import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
    return ( 
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <section className="col-md-9 mt-2">
                <div className="row">
                    <div className="col-md-3 ms-2">
                    <div className="card border border-primary">
                        <center><div className="card-header bg-info fw-bolder">Total Users</div></center>
                        <div className="card-body">
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 ms-2">
                    <div className="card border border-primary">
                        <center><div className="card-header bg-primary text-white fw-bolder">Total Dresses</div></center>
                        <div className="card-body">
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 ms-2">
                    <div className="card border border-primary">
                        <center><div className="card-header bg-primary text-white fw-bolder">Total Fabrics</div></center>
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

export default AdminDashboard;