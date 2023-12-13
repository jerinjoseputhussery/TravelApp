import { React, useState, useEffect,useRef } from 'react';
import {  Route, Routes, Link,useNavigate } from 'react-router-dom';
import './App.css';
import './style.css';
import TourList from './components/TourList';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import SignUp from './components/Signup';
import Admin from './components/Admin';
import axios from 'axios';
import Scroll from "react-scroll";
import Dashboard from './components/Dashboard';

const ScrollLink = Scroll.Link;

// import Confirmation from './components/Confirmation';
const api = axios.create({
  withCredentials: true, // Enable cookies in requests and responses
});
function App() {

  // const ref = useRef(null);
  const initialIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  const handleLogout = () => {

    try {
      const response = api.post(`https://adventureally.onrender.com/logout`);
      console.log(response);
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
      localStorage.removeItem("userName");
      routeChange();

    } catch (error) {
      //   throw error;
      return error;
    }

  };

  // const handleScroll = () => {
  //   <TourList useRef={ref}/>
  //   // ref.current?.scrollIntoView({behavior: 'smooth'});
  // };

  useEffect(() => {
    // Update localStorage whenever authentication state changes
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  // if (!isLoggedIn) {
  //   console.log('not logged in');
  //   redirect("/login");
  // }

  return (
    
      <div className="App">

        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              {/* <Link to="/" className="nav-link">Tours</Link> */}
              <ScrollLink
            className="nav-link"
            smooth={true}
            duration={500}
            to="scrollElement"
          >
            Tours
          </ScrollLink>
            </li>
            {/* <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li> */}
            
            {isLoggedIn ? (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">My Trips</Link>
              </li>
            ) : (
              <li className="nav-item">
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
            )}
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
          <Route exact path="/" element={<TourList/>} />
          <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/signup" element={SignUp()} />

          
          {/* <Route exact path="/admin">
          if (!isLoggedIn) {
            navigate('/login')}
            else<Route exact path="/admin" element={Admin()} /> 
          </Route> */}


            

          <Route exact path="/admin" element={Admin()} />
          <Route exact path="/dashboard" element={Dashboard()} />
          <Route path="/book/:tourId/:tourRate" element={<BookingForm/>} />
          {/* <Route path="/confirmation" element={Confirmation()} /> */}
        </Routes>
      </div>
    
  );
}

export default App;
