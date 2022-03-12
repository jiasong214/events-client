import React from 'react';
import { Link } from 'react-router-dom';
import '../style/eventsList.scss';

const EventsList = () => {
  return (
    <div className="eventsList">
      <div className="sortBar">
        <button>Most popular</button>
        <button>Date</button>
      </div>
      <ul>
        <li>
          <div className='imgBox'>

          </div>
          <div className='textBox'>
            <span className="eventType">Event type</span>
            <h3 className="eventName">Event Title</h3>
            <p className="eventDate">SUN 13.04 17.00</p>
            <div className="btnBox">
              <Link to="/event">View</Link>
              <Link to="/">book</Link>
            </div>
          </div>
        </li>

        <li>
          <div className='imgBox'>

          </div>
          <div className='textBox'>
            <span className="eventType">Event type</span>
            <h3 className="eventName">Event Title</h3>
            <p className="eventDate">SUN 13.04 17.00</p>
            <div className="btnBox">
              <Link to="/">View</Link>
              <Link to="/">book</Link>
            </div>
          </div>
        </li>

        <li>
          <div className='imgBox'>

          </div>
          <div className='textBox'>
            <span className="eventType">Event type</span>
            <h3 className="eventName">Event Title</h3>
            <p className="eventDate">SUN 13.04 17.00</p>
            <div className="btnBox">
              <Link to="/">View</Link>
              <Link to="/">book</Link>
            </div>
          </div>
        </li>


      </ul>
    </div>
  )
};

export default EventsList;