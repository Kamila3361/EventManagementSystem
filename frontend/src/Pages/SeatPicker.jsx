import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/SeatPicker.css';
import Cookies from 'js-cookie';

const SeatPicker = () => {
    const {eventId} = useParams();
    const [seats, setSeats] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [loading2, setLoading2] = useState(false);
    const [error2, setError2] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8000/main/${eventId}/seats`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSeats(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                setError(error);
                setLoading(false);
            });
    }, [eventId]); 

    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeatSelection = (id) => {
        const isAlreadySelected = selectedSeats.includes(id);
        const newSelectedSeats = isAlreadySelected
            ? selectedSeats.filter(seatId => seatId !== id)
            : [...selectedSeats, id];
        setSelectedSeats(newSelectedSeats);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading seats: {error.message}</p>;

    const bookSeats = async (seatIds) => {
        setLoading2(true);
        setError2(null);
        setSuccess(false);

        const token = Cookies.get('token');

        // Promise.all to send multiple requests simultaneously
        const promises = seatIds.map(seatId =>
            fetch(`http://localhost:8000/main/${eventId}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token  // Ensure you have the token
                },
                body: JSON.stringify({ seat: seatId })
            })
        );

        try {
            const results = await Promise.all(promises);
            const data = await Promise.all(results.map(result => result.json()));

            // Check for any errors in the responses
            const anyErrors = data.some(item => item.error);
            if (anyErrors) {
                setError2('One or more seats could not be booked.');
            } else {
                setSuccess(true);
                window.location.reload();
            }
        } catch (error) {
            setError2('Failed to make booking requests.');
            console.error('Booking error:', error);
        }

        setLoading2(false);
    };

    return (
        <div className="seat-picker">
            <h3>scene</h3>
            <div className="seats">
                {seats.map(seat => (
                    <div
                        key={seat.id}
                        className={`seat ${selectedSeats.includes(seat.id) ? 'selected' : seat.booked ? 'booked' : ''}`}
                        onClick={() => !seat.booked && toggleSeatSelection(seat.id)}>

                        {seat.row_letter+seat.seat_number}
                    </div>
                ))}
            </div>
            <button className="book-button" onClick={() => bookSeats(selectedSeats)}>
                Book Seats
            </button>
            {loading2 && <p>Loading...</p>}
            {error2 && <p>Error: {error}</p>}
        </div>
    );
};

export default SeatPicker;
