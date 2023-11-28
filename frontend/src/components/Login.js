import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const api = axios.create({
    withCredentials: true, // Enable cookies in requests and responses
  });
const login = async (credentials) => {
    try {
      const response = await api.post(`/login`,credentials);
      return response.data;
    } catch (error) {        
    //   throw error;
      return error;
    }
  };
  
  
function Login({setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
let navigate=useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData); 
      
       
      setSuccess(response.message);
      setError(null);  
      if(response.status==0){
        setIsLoggedIn(true);
        localStorage.setItem("userName", formData.userName);
        navigate(-1);
      }    
     
        } catch (error) {
      // Handle login error (e.g., display an error message)
      setError('Invalid email or password. Please try again.');
      setSuccess(null);
    }
  }
  const showSwal = () => {
    withReactContent(Swal).fire({
      title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
    })
  }
  return (
    <div className="login-container">
    <h2>Login</h2>
    {error && <p className="error-message">{error}</p>}
    {success && <p className="success-message">{success}</p> }
    {/* {success && <p className="success-message">{success}</p> } */}

    {/* && <meta http-equiv="refresh" content="1;url=/" /> */}
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <button type="submit">Login</button>
      
    </form>
  </div>
  );
}

export default Login;
