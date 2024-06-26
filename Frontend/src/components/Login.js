import React, { useState } from 'react';
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import AuthAPI from '../services/AuthAPI';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [warning, setWarning] = useState(false);
	const [warning2, setWarning2] = useState(false);
	const navigate = useNavigate()

	const getUser = async () => {
		let res = await AuthAPI.isLoggedIn()
		if (res) window.location.reload()
	}

	const handleLogin = async(event) => {
		event.preventDefault();
		const credential = { username, password}
		let res = await fetch(
			"/auth/login", 
			{
					method : "POST",
					headers: {"Content-Type" : "application/json"},
					body: JSON.stringify(credential)
			}
		)
		let data = await res.json()
		
		if (data.msg === "No user found with provided username!"){
			setWarning(true)
			setWarning2(false)
		}
		else if (data.msg === "Password missmatch!"){
			setWarning(false)
			setWarning2(true)
		}
		else{
			setWarning(false)
			setWarning2(false)
			let token = res.headers.get("Authorization").split(" ")
			localStorage.setItem('user_id', data.userID)
			localStorage.setItem('token', token[1])
			getUser()
			navigate("/")
		}
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<label>
					Username:
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
				</label>
				<label className="password-container">
					Password:

					<input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required/>
					<button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password-login">

						{showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
					</button>
				</label>
				<Link to="/forgot-password">Forgot Password?</Link>
				<input type="submit" value="Login" />
				{warning && <div>Wrong id pass</div>}
				{warning2 && <div>Wrong pass</div>}
			</form>
			<p>- - - - - - - - - -    or    - - - - - - - - - -</p>
			<div className="google-signin-container">
			<Link to="http://localhost:5000/auth/google" className="no-underline">
				<button className="google-signin">
					<img src="/google.svg" className="google-icon"/>
					<span className="signin-text">Sign in with Google</span>
				</button>
			</Link>
			</div>
			<p>Don't have an account? <Link to="/register">Create account</Link></p>
		</div>
	);
};

export default Login;
