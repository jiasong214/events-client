import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../services/users';
import '../style/wishlist.scss';

const Wishlist = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 1. check login status

    // 2. 
    const userID = '622c935180eeaf9c4468603f'

    getUserInfo(userID)
      .then((data) => {
        setEvents(data.wishlist);
        console.log(data)
      })
  }, []);

  return (
    <section className='wishlist'>
      <h2>Wishlist</h2>
      <ul>
        {
          events && events.map((event) => (
            <li key={event._id}>
              <div className='imgBox'>

              </div>
              <div className='textBox'>
                <span className="eventType">{event.type}</span>
                <h3 className="eventName">
                  <Link to={`/event/${event._id}`}>{event.name}</Link>
                </h3>
                <p className="eventDate">{event.date}</p>
              </div>
              <div className='btnBox'>
                <Link to={`/event/${event._id}`}>Book</Link>
                <button>Delete</button>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
};

export default Wishlist;