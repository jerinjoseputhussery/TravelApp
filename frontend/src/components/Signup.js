import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const signUp = async (userData) => {
    try {
      const response = await axios.post(`/user`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
function SignUp() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleSignUp = async () => {
    try {
      const response = await signUp({
        "userName":email,
        "firstName":firstName,
        "lastName":lastName,
        "password":password
    
    });
    if(response.status==0){
      setSuccess('Sign up successfull');
      setError(null);
    }
    else{
        setSuccess(null);
      setError(response.message);
    }
    } catch (error) {
        setError('Sign up failed. Please try again.');
        setSuccess(null);
      }
      console.error(error);
    }
  

  return (
    <div className="login-container">
        <div className="form-group">
          <label>Email:</label>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
      </div>
        <div className="form-group">
          <label>First Name:</label>
      <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required/>
      </div>
        <div className="form-group">
          <label>Last Name:</label>
      <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required/>
      </div>
        <div className="form-group">
          <label>Password:</label>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}
export default SignUp;