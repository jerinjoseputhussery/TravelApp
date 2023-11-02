// TourList.js
import { useState ,useEffect,React} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TourList = () => {
    const [tours, setTours] = useState([]);
useEffect(() => {
    axios.get('/packages')
        .then((response) => {
            console.log('LOG');
            setTours(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}, []);

return (
    <div>
        <h2>Available Tours:</h2>
        <ul>
            {tours.map((tour) => (
                <li key={tour._id}>
                    {tour.title} - ${tour.rate}
                    <Link to={`/book/${tour._id}`}>Book Now</Link>
                </li>
            ))}
        </ul>
    </div>);
};
export default TourList;