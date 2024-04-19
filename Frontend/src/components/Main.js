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
import DesignSuit from "./DesignSuit";

// Adminpannel
import AdminPage from "./AdminPage";
import AdminDashboard from "./AdminDashboard";
import AdminUserList from "./AdminUserList";
import AdminFabricList from "./AdminFabricList";
import AdminSuitList from "./AdminSuitList";
import AdminAccessoriesList from "./AdminAccessoriesList";
import AdminAddProduct from "./AdminAddProduct";


import UserAPI from "../services/UserAPI";
import AuthAPI from "../services/AuthAPI";
import AdminChat from "./AdminChat";
import { useEffect, useState } from "react";
import MenuBar from "./MenuBar";
import ShoppingCart from "./ShoppingCart";
import CheckoutSuccess from "./CheckoutSuccess"
import ReadymadeSuit from "./ReadymadeSuit";


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

const LoginOnly = ({Component}) => {
    const [isLoggedIn, setIsLoggedin] = useState(null)

    useEffect(() => {
        async function checkLog(){
            let status = await AuthAPI.isLoggedIn()
            setIsLoggedin(status)
        }

        checkLog()
    }, [])

    // Loading State
    if(isLoggedIn === null){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return isLoggedIn ? <Component /> : <Navigate to="/login" />
}

function Main(){
    return(
        <Router>
            <div className="App">
            <Header user_id = {user_id} token = {token}/>
            <Switch> 
            {/* admin pannel */}
            <Route path="/admin" element={< AdminOnly Component= {AdminDashboard} />} />
            <Route path="/admin-dashboard" element={< AdminOnly Component= {AdminDashboard} />} />
            <Route path="/admin-userlist" element={< AdminOnly Component={ AdminUserList}/>} />
            <Route path="/admin-fabriclist" element={< AdminOnly Component= {AdminFabricList}/>} />
            <Route path="/admin-suitlist" element={< AdminOnly Component= {AdminSuitList}/>} />
            <Route path="/admin-accessorieslist" element={< AdminOnly Component= {AdminAccessoriesList}/>} />
            <Route path="/admin-chat" element={<AdminOnly Component={AdminChat} />} />
            <Route path="/admin-add-product" element={<AdminOnly Component={AdminAddProduct} />} />




            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support" element={<Support />} />
            <Route path="/test" element={< Test />} />
            <Route path="/fabrics" element={<Fabrics />} />
            <Route path="/readymade-suit" element={<ReadymadeSuit />} />
            <Route path="/design" element={<DesignSuit />} />
            <Route path="/menu" element={<MenuBar />} />
            <Route path="/add-to-cart" element={< LoginOnly Component={ShoppingCart} />} />
            <Route path="/checkout-success" element={<LoginOnly Component={CheckoutSuccess} />} />
            </Switch>
            <Footer/>
            
            
            </div>
        </Router>
        
    );
}
export default Main;
