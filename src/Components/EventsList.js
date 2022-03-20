import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { checkExpired } from '../helper/checkExpired';
import { convertDateFromData, getDateName } from '../helper/convertDate';
import { getEvents, getEventsBySearch, getEventsByType } from '../services/events';
import { addWishlistItem, getUserInfo } from '../services/users';
import '../style/eventsList.scss';
import EventSearch from './EventSearch';

const EventsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useSelector(state => state.user?.data);
  const [events, setEvents] = useState([]);
  const [dateArr, setDateArr] = useState([]);

  // fetch event by event type
  useEffect(() => {    
    const type = searchParams.get("type");
    const searchQuery = searchParams.get("search");

    if(searchQuery) {
      getEventsBySearch(searchQuery)
        .then((data) => createArrayByDate(data));
    } else if(type) {
      getEventsByType(type)
        .then((data) => createArrayByDate(data));
    } else {
      getEvents()
        .then((data) => createArrayByDate(data));
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

  const createArrayByDate = (events) => {
    const resultArr = [];
    let innerArr = [];

    let currentDate = events[0]?.date?.slice(0,10);
    setDateArr([events[0]?.date]);

    console.log(currentDate)

    events.forEach((event, index) => {
      let date = event.date.slice(0,10);

      if(currentDate === date) {
        innerArr.push(event);
      }else {
        resultArr.push(innerArr);

        currentDate = event.date.slice(0,10);
        innerArr = [event];

        setDateArr(prev => [...prev, event.date.slice(0,10)]);
      }

      if(events.length-1 === index) {
        resultArr.push(innerArr);
      }
    })

    setEvents(resultArr);
  }

  return (
    <div className="eventsList">
      <EventSearch />
      <div className='scroll-container'>
        {
          events && events.map((eventArr, i) => (
            <section key={i}>
              <div className='date'>
                <p>{getDateName(dateArr[i])}</p>
              </div>
              <div>
              {
                eventArr && eventArr.map((event) => (
                  <article
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
                      <p className="eventDate">{convertDateFromData(event.date)}</p>
                      <div className="btnBox">
                        <Link to={`/event/${event._id}`}>Book</Link>
                        <button onClick={() => clickWishlist(event._id)}>Wishlist</button>
                      </div>
                    </div>
                  </article>
                ))
              }
              </div>
            </section>
          ))
        }

        {
          !events.length && (
            <div className='empty'>
              Can't find any events :(
            </div>
          )
        }
      </div>
    </div>
  )
};

export default EventsList;