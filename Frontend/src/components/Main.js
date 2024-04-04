import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Test from "./test";
import Support from "./Support";
import Fabrics from "./Fabrics";

// Adminpannel
import AdminPage from "./AdminPage";
import AdminDashboard from "./AdminDashboard";
import AdminUserList from "./AdminUserList";
import AdminFabricList from "./AdminFabricList";
import AdminSuitList from "./AdminSuitList";
import AdminAccessoriesList from "./AdminAccessoriesList";


import UserAPI from "../services/UserAPI";
import AdminChat from "./AdminChat";
import { useEffect, useState } from "react";


const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

const AdminOnly = ({Component}) => {
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        async function checkAdmin(){
            let status = await UserAPI.isAdmin(user_id, token)
            setIsAdmin(status)
        }

        checkAdmin()
    }, [])

    // Loading State
    if(isAdmin === null){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return isAdmin ? <Component /> : <Navigate to="/login" />
}

function Main(){
    return(
        <Router>
            <div className="App">
            <Header/>
            <Switch> 
            {/* admin pannel */}
            <Route path="/admin" element={< AdminOnly Component= {AdminPage} />} />
            <Route path="/admin-dashboard" element={< AdminOnly Component= {AdminDashboard} />} />
            <Route path="/admin-userlist" element={< AdminOnly Component={ AdminUserList}/>} />
            <Route path="/admin-fabriclist" element={< AdminOnly Component= {AdminFabricList}/>} />
            <Route path="/admin-suitlist" element={< AdminOnly Component= {AdminSuitList}/>} />
            <Route path="/admin-accessorieslist" element={< AdminOnly Component= {AdminAccessoriesList}/>} />
            <Route path="/admin-chat" element={<AdminOnly Component={AdminChat} />} />




            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support" element={<Support />} />
            <Route path="/test" element={< Test />} />
            <Route path="/fabrics" element={<Fabrics />} />
            </Switch>
            <Footer/>
            
            
            </div>
        </Router>
        
    );
}
export default Main;