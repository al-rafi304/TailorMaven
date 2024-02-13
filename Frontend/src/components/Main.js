import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";


import Home from "./Home";
import About from "./About";



function Main(){
    return(
        <Router>
            <div>
            <Switch> 
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            </Switch>
            
            
            </div>
        </Router>
        
    );
}
export default Main;