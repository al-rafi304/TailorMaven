import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"
import AuthAPI from '../services/AuthAPI';
import MenuBar from './MenuBar';

function Header() {

	const [userId, setUserID] = useState(false)

	const getUser = async () => {
		setUserID(await AuthAPI.isLoggedIn())
	}

	const handleLogOut = () => {
		localStorage.removeItem("user_id")
      	localStorage.removeItem('token')
		window.location.reload()
	}

	useEffect( () => {
		getUser()
	}, []
	)

 return (
	<header>
	 <MenuBar/>
	 <div className='logo-img'>
		<Link to="/">
		 <img src="logo_v2_transparent.png" alt="Website Logo"/>
		</Link>
	 </div>

	<div className='user-actions'>
		<div className='cart'>
			<Link to='add-to-cart'>
			<img className="addtocart" src="bag.png" alt="Cart"/>
			</Link>
		</div>
	{!userId && (
		<div className="dropdown user-dropdown">
		<button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			<i className="fa-regular fa-user"></i>
		</button>
		<ul className="dropdown-menu user-dropdownmenu">
			<li><Link className='btn btn-login' to="/login">Login</Link></li>
			<li><Link className='btn btn-reg' to="/register">Register</Link></li>
		</ul>
		</div>
	)}
	{userId && (
		<div className="dropdown user-dropdown">
		<button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			<img className="user-profile-pic" src="cat.jpg" alt="User Profile"/>
		</button>
		<ul className="dropdown-menu user-dropdownmenu">
			<li>
			<div className="user-info">
				<img className="user-profile-pic-large" src="cat.jpg" alt="User Profile"/>
				<div className="user-details">
				<p className="user-name">Farhan Sadik</p>
				<p className="user-email">md.farhan.sadik@g.bracu.ac.bd</p>
				<div className="btn-signout" onClick={handleLogOut}>Sign Out</div>
				</div>
			</div>
			</li>
		</ul>
		</div>
	)}
	</div>



	</header>
 );
};

export default Header;

