import React, { useState, useEffect } from "react";
import './CSS/MyBookings.css'
import Booking from "../Components/Bookings/Bookings";
import Cookies from 'js-cookie';

const MyBookings = () => {
    const [dataBooking, setDataBooking] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        fetch('http://localhost:8000/main/booking', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDataBooking(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                setError(error);
                setLoading(false);
            });
    }, []); 

    return (
        <div className="booking">
            <div className="dataBooking">
                {dataBooking.map((booking,i)=>{
                    return <Booking key={i} booking={booking} />
                })}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    )
}

export default MyBookings