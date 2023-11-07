// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import './App.css';
import './style.css';
import TourList from './components/TourList';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import SignUp from './components/Signup';
// import Confirmation from './components/Confirmation';

function App() {
  return (
    <Router>
      <div className="App">
        
        <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/#scrollToList"  className="nav-link">Tours</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
      </ul>
    </nav>
        <Routes>
          <Route exact path="/" element={TourList()} />
          <Route exact path="/login" element={Login()} />
          <Route exact path="/signup" element={SignUp()} />
          <Route path="/book/:tourId" element={BookingForm()} />
          {/* <Route path="/confirmation" element={Confirmation()} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
