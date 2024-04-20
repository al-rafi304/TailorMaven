import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
    
    const [allData, setAllData] = useState("")

    let getAllData = async() => {
        let allData = {totalUser : 0, totalSuits: 0, totalFabrics: 0}

        let res = await fetch("/api/v1/user/",{
            headers: {"authorization": "Bearer " + localStorage.getItem("token")}
        })
        let data = await res.json()
        allData.totalUser = data.users?.length

        res = await fetch("/api/v1/fabric/")
        data = await res.json()
        allData.totalFabrics = data.fabrics?.length

        res = await fetch("/api/v1/suit/")
        data = await res.json()
        allData.totalSuits = data.suits?.length

        setAllData(allData)
    }

    useEffect(
        () => {getAllData()}
        ,[]
    )

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
                            {allData.totalUser}
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 ms-2">
                    <div className="card border border-primary">
                        <center><div className="card-header bg-primary text-white fw-bolder">Total Suits</div></center>
                        <div className="card-body">
                            {allData.totalSuits}
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3 ms-2">
                    <div className="card border border-primary">
                        <center><div className="card-header bg-primary text-white fw-bolder">Total Fabrics</div></center>
                        <div className="card-body">
                            {allData.totalFabrics}
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