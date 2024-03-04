import React, { useState } from 'react';
import "./Login.css"
import { Link } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="password-container">
          Password:
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
          </button>
        </label>
        <Link to="/forgot-password">Forgot Password?</Link>
        <input type="submit" value="Login" />
      </form>
      <p>- - - - - - - - - -    or    - - - - - - - - - -</p>
      <div className="google-signin-container">
      <Link to="/google-signin" className="no-underline">
        <button class="google-signin">
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
