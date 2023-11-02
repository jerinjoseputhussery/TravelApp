// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TourList from './components/TourList';
import BookingForm from './components/BookingForm';
// import Confirmation from './components/Confirmation';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Tour Booking Website</h1>
        </header>
        <Routes>
          <Route exact path="/" element={TourList()} />
          <Route path="/book/:tourId" element={BookingForm()} />
          {/* <Route path="/confirmation" element={Confirmation()} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
