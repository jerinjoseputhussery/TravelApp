import React, { useState, useEffect } from 'react';

import '../style/dashboard.css';
import axios from 'axios';

const getPackage = async (packageID) => {
  try {
      const response = await axios.get(`/packages/`+packageID);
      return response.data;
  } catch (error) {
      throw error;
  }
};
const getTravellers = async (bookingID) => {
  try {
      const response = await axios.get(`/booking/travellers/`+bookingID);
      return response.data;
  } catch (error) {
      throw error;
  }
};
function Dashboard() {
  const [userTrips, setUserTrips] = useState([]);
  //const [bookings, setBookings] = useState([]);
  useEffect(() => {
   
        fetchUserTrips();
    
  }, []);

  const fetchUserTrips = async () => {
    try {
     const bookings  = (await axios.get('/booking/'+localStorage.getItem('userName'))).data;
      // axios.get('/booking/'+localStorage.getItem('userName'))
      // .then((response) => {
      //   const bookings=response.data;
      //   console.log('RecentBookings:',bookings);
      // })
      // .catch((error) => {
      //     console.error(error);                
     
      // });
      const tripsWithDetails = await Promise.all(
        bookings.map(async (booking) => {
          const packageDetails = await getPackage(booking.packageId);
          const travelerDetails = await getTravellers(booking._id);

          return {
            booking_id: booking._id,
            packageDetails,
            noOfPeople: booking.noOfPeoples,
            totalAmount: booking.totalAmount,
            travelerDetails:travelerDetails[0],
          };
        })
      );

      setUserTrips(tripsWithDetails);
    } catch (error) {
      console.error('Error fetching user trips:', error);
      // Handle error (show error message, log the error, etc.)
    }
  };
  if(!localStorage.getItem('userName') ){

    return (<div>Please <a href='/login'>Login</a></div>)
}
  return (
    <div className="recent-trips-container">
      <h2>Recent Trips</h2>
{console.log('userTrips:',userTrips)}
      {userTrips.length === 0 ? (
        <p>No recent trips found.</p>
      ) : (
        <ul className="trip-list">
          {userTrips.map((trip) => (
            <li key={trip.booking_id} className="trip-item">
              <div className="trip-details">
                <img src={trip.packageDetails.images[0]}></img>
                <span className="trip-title">{trip.packageDetails.title}</span>
                {/* <span className="trip-date">{trip.packageDetails.date}</span> */}
                <span className="trip-location">{trip.packageDetails.country}</span>
                <span className="trip-no-of-people">Number of People: {trip.noOfPeople}</span>
                <span className="trip-total-amount">Total Amount: €{trip.totalAmount}</span>
                {/* Add other package details here */}
              </div>
              <div className="trip-travelers">
                <h3>Travelers</h3>
                <ul>
                  {trip.travelerDetails.map((traveler) => (
                    <li key={traveler.id}>
                      {traveler.firstName} {traveler.lastName} - {traveler.age} years old
                      {/* Add other traveler details here */}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
