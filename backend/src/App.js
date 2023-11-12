import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './style.css';
import TourList from './components/TourList';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import SignUp from './components/Signup';
import axios from 'axios';
// import Confirmation from './components/Confirmation';
const api = axios.create({
  withCredentials: true, // Enable cookies in requests and responses
});
function App() {
  const initialIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const handleLogout = () => {

    try {
      const response = api.post(`/logout`);
      console.log(response);
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', JSON.stringify(false));

    } catch (error) {
      //   throw error;
      return error;
    }

  };

  useEffect(() => {
    // Update localStorage whenever authentication state changes
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">

        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/#scrollToList" className="nav-link">Tours</Link>
            </li>
            {/* <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li> */}
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item">
                <button onClick={handleLogout} >Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={TourList()} />
          <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/signup" element={SignUp()} />
          <Route path="/book/:tourId" element={BookingForm()} />
          {/* <Route path="/confirmation" element={Confirmation()} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
