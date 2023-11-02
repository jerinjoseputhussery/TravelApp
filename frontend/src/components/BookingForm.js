


// BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingForm = () => {
    const { tourId } = useParams();
  const [formData, setFormData] = useState({/* initial form data */});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/api/bookings', formData) // Replace with your actual API endpoint
      .then((response) => {
        // Handle success, e.g., show a confirmation message
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form input fields here */}
      <button type="submit">Book Now</button>
    </form>
  );
};
export default BookingForm;
