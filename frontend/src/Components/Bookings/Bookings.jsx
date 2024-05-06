import React, {useState} from "react";
import './Bookings.css'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Booking = ({ booking }) => {

    const navigate = useNavigate()
    const [error, setError] = useState(null);

    const Handlcancel = async () => {

        const token = Cookies.get('token');
        
        try {
            const response = await fetch(`http://localhost:8000/main/booking/${booking.id}/cancel`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            window.location.reload();
            navigate('/my_bookings'); 
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setError(error);
        }
    };

    const imagePath = String(booking.event.image);
    return (
        <div className="event">
            <Link to={`/event/${booking.event.id}`}><img src={imagePath} alt={booking.event.name} /></Link>
            <p>{booking.event.name}</p>
            <p>Seat: {booking.seat.row_letter+booking.seat.seat_number}</p>
            <div className="event_details">
                <li>{booking.event.date}</li>
            </div>
            <button onClick={Handlcancel}>Cancel</button>
            {error && <p>Error: {error.message}</p>}
        </div>
    )
}

export default Booking