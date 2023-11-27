// TourList.js
import { useState ,useEffect,React,useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TourList = () => {

    const [tours, setTours] = useState([]);
useEffect(() => {
    axios.get('/getPackages')
        .then((response) => {
            setTours(response.data);
        })
        .catch((error) => {
            console.error(error);                
       
        });
},[] );



return (
     
    <div>
        <div>
        <header className="App-header">
          <h1>Tour Booking Website</h1>
        </header> 
        </div>
        <div >
        <h2>Available Tours:</h2>
        <ul>
            {tours.map((tour) => (
                <li key={tour._id}>
                    {tour.title} - ${tour.rate}
                    <Link to={`/book/${tour._id}/${tour.rate}`}>Book Now</Link>
                </li>
            ))}
        </ul>
        </div>



        <div className="tour-list">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.images[0]} alt={tour.title} className="tour-image" />
          <div className="tour-details">
            <h3 className="tour-title">{tour.title}</h3>
            <p className="tour-description">{tour.description}</p>
            <p className="tour-country">Country: {tour.country}</p>
            <p className="tour-days">Number of Days: {tour.noOfDays}</p>
            <p className="tour-location">Location: {tour.location}</p>
            <p className="tour-price">Price: ${tour.rate}</p>
            <div className="map-container">
              <iframe
                title={tour.title}
                width="100%"
                height="200"
                frameBorder="0"
                style={{ border: 0 }}
                // a='https://maps.google.com/maps?q=10.305385,77.923029&hl=es;z=14&amp;output=embed';
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-6.531715393066406%2C53.258435996036745%2C-6.078529357910156%2C53.44001402927506&amp;layer=mapnik`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>);
};
export default TourList;