import React, { useEffect, useState } from "react";
import Event from "../Event/Event";
import './Collection.css'

const Collection = () => {

    const [dataEvent, setDataEvent] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:8000/main/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setDataEvent(data))
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }, []);    

    return (
        <div className="collection">
            <h1>NEW EVENTS</h1> 
            <hr/>
            <div className="event_data">
                {dataEvent.map((event,i)=>{
                    return <Event key={i} id={event.id} image={event.image} name={event.name} date={event.date} location={event.location} price={event.price}/>
                })}
            </div>
        </div>
    )
}

export default Collection