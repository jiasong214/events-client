import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertDateFromData } from '../helper/convertDate';
import { deleteEvent, getEvents } from '../services/events';
import '../style/adminEventsList.scss';

const AdminEventsList = () => {
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
    <div className="adminEventsList wishlist">
      <div className='addBtnBar'>
        <Link to='/admin/event/new'>+ new event</Link>
      </div>
      <ul>
        {
          events && events.map((event) => (
            <li key={event._id}>
              <div className='imgBox'>
                <img src={event.image} alt={event.name} />
              </div>
              <div className='textBox'>
                <span className="eventType">{event.type}</span>
                <h3 className="eventName">{event.name}</h3>
                <p className="eventDate">
                  {convertDateFromData(event.date)}
                </p>
              </div>
              <div className="btnBox">
                <Link to={`/admin/event/${event._id}`}>View</Link>
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

export default AdminEventsList;