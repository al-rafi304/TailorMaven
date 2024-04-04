import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Header.css"

function Header() {

	const [userId, setUserID] = useState(false)
	const user_id = localStorage.getItem('user_id')
	console.log(user_id, userId)

	const getUser = () => {
		user_id === "false" ? setUserID(false):setUserID(true)
	}

	const handleLogOut = () => {
		localStorage.setItem('user_id', false)
      	localStorage.setItem('token', false)
		window.location.reload()
	}

	useEffect( () => {
		getUser()
	}, []
	)

 return (
	<header>
	 <div className='dropdown-customsuit'>
		<button>Custom Suit</button>
		<div className='dropdown-content'>
		 
		</div>
	 </div>
	 <div className='logo-img'>
		<Link to="/">
		 <img src="logo-no-background.svg" alt="Website Logo"/>
		</Link>
	 </div>
	 <div className='user-actions'>
		<div className='cart'>
		 <i className="fa-solid fa-bag-shopping"></i>
		</div>
			<div className="dropdown user-dropdown">
				<button className="btn dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
				<i className="fa-regular fa-user"></i>
				</button>
				<ul className="dropdown-menu user-dropdownmenu">
					{!userId &&
						<><li><Link className='btn btn-login' to="/login">Login</Link></li>
						<li><Link className='btn btn-reg' to="/register">Register</Link></li></>}
					{userId && <li><Link className='btn btn-signout' onClick = {handleLogOut}>Sign Out</Link></li>}
				</ul>
			</div>
	 </div>
	</header>
 );
};

export default Header;

