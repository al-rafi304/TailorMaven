import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Test from "./test";
import Support from "./Support";

import AuthAPI from "../services/AuthAPI";
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
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin/chat" element={<AdminOnly Component={AdminChat} />} />
            <Route path="/test" element={< Test />} />
            </Switch>
            <Footer/>
            
            
            </div>
        </Router>
        
    );
}
export default Main;