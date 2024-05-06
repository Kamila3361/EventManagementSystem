import React from "react";
import './Event.css'
import { Link } from "react-router-dom";

const Event = (props) => {
    const imagePath = String(props.image);
    return (
        <div className="event">
            <Link to={`/event/${props.id}`}><img src={imagePath} alt={props.name} /></Link>
            <p>{props.name}</p>
            <div className="event_details">
                <li>{props.date}</li>
                <li>{props.location}</li>
                <li>{props.price} тг</li>
            </div>
        </div>
    )
}

export default Event