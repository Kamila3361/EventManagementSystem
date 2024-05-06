import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDisplay from "../Components/EventDisplay/EventDisplay";

const EventDetail = () => {
    const {eventId} = useParams();
    const [detailEvent, setDetailEvent] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/main/${eventId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDetailEvent(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                setError(error);
                setLoading(false);
            });
    }, [eventId]); 

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && <EventDisplay eventDetail={detailEvent}/>}
        </div>
    )
}

export default EventDetail