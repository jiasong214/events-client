import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/events';
import '../style/currentEvents.scss';

const CurrentEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data));
  }, []);

  return (
    <section className="currentEvents">
      <ul>
        {
          events && events.map((event, index) => (
            index < 5 && 
              <li 
                key={event._id} 
                className='eventItem'
              >
                <Link to={`event/${event._id}`}>
                  <span className='eventType'>{event.type}</span>
                  <div className="imgBox">
                    <img src={event.image} alt={event.name} />
                  </div>
                  <div className='textBox'>
                    <h3>{event.name}</h3>
                    <p>{event.date}</p>
                  </div>
                </Link>
              </li>
          ))
        }
      </ul>

      <div className="moreEventsBanner">
        <marquee>blablabla haha blablabla haha blablabla haha blablabla haha</marquee>
        <Link to="/events">More events</Link>
      </div>
    </section>
  )
};

export default CurrentEvents;