// TourList.js
import { useState ,useEffect,React,useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TourList = () => {

    const [tours, setTours] = useState([]);
useEffect(() => {
    axios.get('/packages')
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
                    <Link to={`/book/${tour._id}`}>Book Now</Link>
                </li>
            ))}
        </ul>
        </div>
    </div>);
};
export default TourList;