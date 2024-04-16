import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"
import AuthAPI from '../services/AuthAPI';
import UserAPI from '../services/UserAPI';

const Header = (props) => {

	
	const [userId, setUserID] = useState(false)
	const [userName, setUserName] = useState("")
	
	const getUser = async () => {
		setUserID(await AuthAPI.isLoggedIn())
		let res = await UserAPI.getUser(props.user_id, props.token)
		setUserName(res.username)
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
	 <div className='dropdown-customsuit'>
		<Link to = "/visualize"><button>Custom Suit</button></Link>
		<div className='dropdown-content'>
		 
		</div>
	 </div>
	 <div className='logo-img'>
		<Link to="/">
		 <img src="logo_v2_transparent.png" alt="Website Logo"/>
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
			<div>
				{userName}
			</div>
	 </div>
	</header>
 );
};

export default Header;

