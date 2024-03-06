import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
    return (
        <header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
            <div className="">
                <Link to="/">
                    <img src="logo-no-background.svg" alt="Website Logo" style={{ height: "50px" }} />
                </Link>
            </div>
            <nav className="c-site-nav navbar navbar-expand-lg col">
                <div className="menu-group">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link href="#">Custom</Link>
                        </li>

                        <li>
                            <Link href="#">Ready To Wear</Link>
                        </li>

                        <li>
                            <Link to="/fabrics">Fabrics</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div>
                <Link to="/login">
                    <button style={{ marginRight: "10px" }}>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>
        </header>
    );
}

export default Header;
