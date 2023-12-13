import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { resolvePath, useParams,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../style/bookingForm.css';
import backendURL from '../config/config.js'


// const genderStyle={
//   display:"flex", 
//   flex-direction: "row", 
//   justify-content: "center", 
//   align-items: "center"};
const bookPackage = async ({ tourId, numberOfTravelers,
  travelerDetails,
  totalAmount }) => {
  try {

    const requestData = {
      'packageId': tourId,
      'noOfPeoples': numberOfTravelers,
      'travellers': travelerDetails,
      'totalAmount': totalAmount,
      'bookedBy': localStorage.getItem('userName')
    };
    console.log(requestData);
    const response = await axios.post(`https://adventureally.onrender.com/booking/book`, requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};



const BookingForm = () => {

  const { tourId } = useParams();
  const { tourRate } = useParams();
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [travelerDetails, setTravelerDetails] = useState([]);
  const [myPackages, setMyPackages] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingStatus, setBookingStatus] = useState(null);
  useEffect(() => {
    axios.get(`https://adventureally.onrender.com/booking/` + localStorage.getItem('userName'))
      .then((response) => {
        setMyPackages(response.data);
       
      })
      .catch((error) => {        
        console.error(error);
        
      });

  }, []);
  const handleNumberOfTravelersChange = (e) => {
    const count = parseInt(e.target.value, 10) || 1;
    setNumberOfTravelers(count);
    setTravelerDetails(new Array(count).fill({}));
  };

  const handleTravelerDetailsChange = (index, field, value) => {
    const updatedDetails = [...travelerDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setTravelerDetails(updatedDetails);
  };

  const calculateTotalAmount = () => {
    // Replace this with your actual calculation logic
    const baseAmount = tourRate; // Replace with your package price
    const total = baseAmount * numberOfTravelers;
    setTotalAmount(total);
  };

  const handleSubmit = async () => {
    try {

      console.log(travelerDetails);
      // Make a request to the backend to book the package
      const response = await bookPackage({
        tourId,
        numberOfTravelers,
        travelerDetails,
        totalAmount,
      });

      // Handle success (show success message, clear form, etc.)
      if(response.status==0){
        setBookingStatus('success');
      }else{
        setBookingStatus('failure');
      }
      
      setNumberOfTravelers(1);
      setTravelerDetails(new Array(1).fill({}));
      setTotalAmount(0);
    } catch (error) {
      // Handle error (show error message, log the error, etc.)
      console.error('Error booking package:', error);
      setBookingStatus('failure');
    }
  };


  if(!localStorage.getItem('userName') ){

    return (<div>Please <Link to='/login'>login</Link></div>)
}
  return (
    <div className="container">
      <h2>Booking Form</h2>
      <form>
        <label>
          Number of Travelers:
          <input
            type="number"
            value={numberOfTravelers}
            onChange={handleNumberOfTravelersChange}
            min="1"
          />
        </label>
        <br />

        {Array.from({ length: numberOfTravelers }).map((_, index) => (
          <div key={index}>
            <h3>Traveler {index + 1}</h3>
            <label>
              First Name:
              <input
                type="text"
                value={travelerDetails[index]?.firstName || ''}
                onChange={(e) =>
                  handleTravelerDetailsChange(index, 'firstName', e.target.value)
                }
              />
            </label>
            <br />

            <label>
              Last Name:
              <input
                type="text"
                value={travelerDetails[index]?.lastName || ''}
                onChange={(e) =>
                  handleTravelerDetailsChange(index, 'lastName', e.target.value)
                }
              />
            </label>

            <label>
              Age:
              <input
                type="number"
                value={travelerDetails[index]?.age || ''}
                onChange={(e) =>
                  handleTravelerDetailsChange(index, 'age', e.target.value)
                }
              />
            </label>

            <label>
              Gender:
              <div style={{ display: "flex" }}>
                <label for="male">Male</label>
                <input name="gender" type="radio" value="Male"
                  onChange={(e) =>
                    handleTravelerDetailsChange(index, 'gender', e.target.value)
                  } />
                <label for="female">Female</label>

                <input name="gender" type="radio" value="Female"
                  onChange={(e) =>
                    handleTravelerDetailsChange(index, 'gender', e.target.value)
                  } />
                {/* <select name="gender" id="gender" value={travelerDetails[index]?.gender || ''}  onChange={(e) =>
                  handleTravelerDetailsChange(index, 'gender', e.target.value)
                }>
              <option value="Male">Male</option>
              <option value="female">Female</option>              
            </select> */}
              </div>
            </label>
            <label>
              Address:
              <input
                type="text"
                value={travelerDetails[index]?.address || ''}
                onChange={(e) =>
                  handleTravelerDetailsChange(index, 'address', e.target.value)
                }
              />
            </label>
            <label>
              Phone Number:
              <input
                type="number"
                value={travelerDetails[index]?.phone || ''}
                onChange={(e) =>
                  handleTravelerDetailsChange(index, 'phone', e.target.value)
                }
              />
            </label>
            <br />

            {/* Add other traveler details (age, gender, address, phone, etc.) here */}
          </div>
        ))}
        <br />

        <button type="button" onClick={calculateTotalAmount}>
          Calculate Total Amount
        </button>
        <br />

        <label>
          Total Amount: €{totalAmount}
        </label>
        <br />

        <button type="button" onClick={handleSubmit}>
          Book Package
        </button>
      </form>

      {bookingStatus === 'success' && <p>Booking successful! Thank you!</p>}
      {bookingStatus === 'failure' && <p className="failure-message">Booking failed. Please try again.</p>}
    </div>
  );
};
export default BookingForm;
