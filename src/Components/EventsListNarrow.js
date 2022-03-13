import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteEvent, getEvents } from '../services/events';
import '../style/eventsListNarrow.scss';

const EventsListNarrow = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data));
  }, []);

  const clickDelete = (id, name) => {
    // confirm the action
    const confirmed = window.confirm(`Do you want to delete ${name}?`);
    if(!confirmed) return;

    // delete the event
    deleteEvent(id)
      .then(data => {
        const filteredArr = events.filter((event) => event._id !== data._id);
        setEvents(filteredArr);
      })
  }

  return (
    <div className="eventsListNarrow">
      <div className='addBtnBar'>
        <Link to='/admin/event/new'>+ new event</Link>
      </div>
      <div className="viewOptionBar">
        <div className="filters">
          <button>Concert</button>
          <button>Musical</button>
          <button>Play</button>
          <button>Standup</button>
        </div>
        <div className="sorts">
          <button>Most popular</button>
          <button>Date</button>
        </div>
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
                <p className="eventDate">SUN 13.04 17.00</p>
                <p className="eventDate">{event.date}</p>
              </div>
              <div className="btnBox">
                <Link to="/admin/event/:id">View</Link>
                <Link to={`/admin/event/${event._id}/edit`}>Edit</Link>
                <button onClick={() => clickDelete(event._id, event.name)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default EventsListNarrow;