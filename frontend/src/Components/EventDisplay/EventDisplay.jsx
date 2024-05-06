import React from "react";
import './EventDisplay.css'
import { Link } from "react-router-dom";

const EventDisplay = ({eventDetail}) => {
    return (
        <div className="eventdisplay">
            <div className="eventdisplay-left">
                <div className="eventdisplay-image">
                    <img className="eventdisplay-main-img" src={eventDetail.image} alt="" />
                </div>
            </div>
            <div className="eventdisplay-center">
                <div className="eventdisplay-head">
                    <h1>{eventDetail.name}</h1>
                </div>
                <h3>Description</h3>
                <div className="eventdisplay-description">
                    <p>{eventDetail.description}</p>
                </div>
                <Link to={`/seat/${eventDetail.id}`}><button>BOOK PLACE</button></Link>
            </div>
            <div className="eventdisplay-right">
                <h3>Location</h3>
                <p>{eventDetail.location}</p>
                <h3>Date</h3>
                <p>{eventDetail.date}</p>
                <h3>Start</h3>
                <p>{eventDetail.start}</p>
                <h3>Price</h3>
                <p>{eventDetail.price} тг</p>
            </div>
        </div>
    )
}

export default EventDisplay