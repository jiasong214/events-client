import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getEvents, getEventsByType } from '../services/events';
import { addWishlistItem, getUserInfo } from '../services/users';
import '../style/eventsList.scss';

const EventsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useSelector(state => state.user?.data);
  const [events, setEvents] = useState([]);

  // fetch event by event type
  useEffect(() => {    
    const type = searchParams.get("type");

    if(!type) {
      getEvents()
        .then((data) => setEvents(data));
    }else {
      getEventsByType(type)
        .then((data) => setEvents(data));
    }
  }, [searchParams]);

  const clickWishlist = async (eventID) => {
    // 1. if user is not logged in, redirect them to login page
    if(!user._id) navigate('/login');

    // 2. check if its in the wishlist
    const userInfo = await getUserInfo(user._id);
    const isExist = userInfo.wishlist.some((item) => item._id === eventID);
    
    if(isExist) return window.alert("This item is already in the wishlist");

    // 3. add event in user's wishlist
    addWishlistItem(user._id, eventID);
  }

  const checkExpired = (eventDate) => {
    const today = new Date().getTime();
    const targetDate = new Date(eventDate).getTime();

    return today > targetDate ? "expired" : "ongoing";
  }

  return (
    <div className="eventsList">
      <div className="sortBar">
        <button>Most popular</button>
        <button>Date</button>
      </div>
      <ul>
        {
          events && events.map((event) => (
            <li 
              key={event._id}
              className={checkExpired(event.date)}
            >
              <div className='imgBox'>
                <img src={event.image} alt={event.name} />
              </div>
              <div className='textBox'>
                <span className="eventType">{event.type}</span>
                <h3 className="eventName">
                  <Link to={`/event/${event._id}`}>{event.name}</Link>
                </h3>
                <p className="eventDate">{event.date}</p>
                <div className="btnBox">
                  <Link to={`/event/${event._id}`}>Book</Link>
                  <button onClick={() => clickWishlist(event._id)}>Wishlist</button>
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