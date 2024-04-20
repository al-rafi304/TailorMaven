import React, { useState } from 'react';
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');
  const [credential, setCredential] = useState(new FormData());
  const navigate = useNavigate()

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    credential.append("image", file)
    setCredential(credential)
  }

  const handleRegister = (event) => {
    event.preventDefault();
    // Handle register logic here
    credential.append("username", username)
    credential.append("name", fullname)
    credential.append("email", email)
    credential.append("password", password)
    credential.append("gender", gender)


    fetch(
      "/auth/register", 
      {
          method : "POST",
          body: credential
      }
    )
    navigate("/")
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username<span>*</span>:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Full Name<span>*</span>:
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        </label>
        <label>
          Email<span>*</span>:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        <label>
          Password<span>*</span>:
          <div className="password-container">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password-reg">
              {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </button>
          </div>
        </label>
        <label>
          Confirm Password<span>*</span>:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        {password && confirmPassword ? (password !== confirmPassword ? 
        <p className="password-error">Passwords do not match! <i className="fa-regular fa-face-sad-tear"></i><i className="fa-regular fa-face-sad-tear"></i><i className="fa-regular fa-face-sad-tear"></i></p> 
        : 
        <p className="password-success">Passwords match! <i className="fa-regular fa-face-grin-beam"></i><i className="fa-regular fa-face-grin-beam"></i><i className="fa-regular fa-face-grin-beam"></i></p>) : null}
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </label>
        <label>
          Date of Birth:
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <label>
          Address<span>*</span>:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        <label>
          Phone Number<span>*</span>:
          <input type="tel" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        <label htmlFor="formFile" className="form-label">User Image</label>
        <input className="form-control" name="image" accept = "image/*" type="file" id="formFile" onChange={handleImageUpload}/>
        <input type="submit" value="Register" />
      </form>
      <p>Already have an account? <Link to="/login">Sign-in</Link></p>
      <p>- - - - - - - - - -    or    - - - - - - - - - -</p>
      <div className="google-signin-container">
      <Link to="/google-signin" className="no-underline">
        <button className="google-signin">
          <img src="/google.svg" className="google-icon"/>
          <span className="signin-text">Sign in with Google</span>
        </button>
      </Link>
      </div>
    </div>
  );
};

export default Register;
