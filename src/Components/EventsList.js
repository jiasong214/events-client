import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/events';
import '../style/eventsList.scss';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="eventsList">
      <div className="sortBar">
        <button>Most popular</button>
        <button>Date</button>
      </div>
      <ul>
        {
          events.map((event) => (
            <li key={event._id}>
              <div className='imgBox'>

              </div>
              <div className='textBox'>
                <span className="eventType">{event.type}</span>
                <h3 className="eventName">{event.name}</h3>
                <p className="eventDate">{event.date}</p>
                <div className="btnBox">
                  <Link to={`/event/${event._id}`}>View</Link>
                  <Link to={`/event/${event._id}/book`}>book</Link>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default EventsList;