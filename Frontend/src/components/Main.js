import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";


import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Test from "./test";

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
            <Route path="/test" element={< Test />} />
            </Switch>
            <Footer/>
            
            
            </div>
        </Router>
        
    );
}
export default Main;