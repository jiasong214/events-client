import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { convertDateFromData } from '../helper/convertDate';
import { getEvents, getEventsByType } from '../services/events';
import { addWishlistItem, getUserInfo } from '../services/users';
import '../style/eventsList.scss';

const EventsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useSelector(state => state.user?.data);
  const [events, setEvents] = useState([]);
  const [dateArr, setDateArr] = useState([]);

  // fetch event by event type
  useEffect(() => {    
    const type = searchParams.get("type");

    if(!type) {
      getEvents()
        .then((data) => createArrayByDate(data));
    }else {
      getEventsByType(type)
        .then((data) => createArrayByDate(data));
    }
  }, [searchParams]);


  const checkExpired = (eventDate) => {
    const today = new Date().getTime();
    const targetDate = new Date(eventDate).getTime();

    return today > targetDate ? "expired" : "ongoing";
  }

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
    setDateArr(prev => [...prev, events[0]?.date]);

    events.forEach((event) => {
      let date = event.date.slice(0,10);

      if(currentDate === date) {
        innerArr.push(event);
      }else {
        resultArr.push(innerArr);

        currentDate = event.date.slice(0,10);
        innerArr = [event];

        setDateArr(prev => [...prev, event.date.slice(0,10)]);
      }
    })

    setEvents(resultArr);
  }

  const getDateName = (date) => {
    const convertedDate = convertDateFromData(date);

    if(convertedDate.startsWith("Today") || convertedDate.startsWith("Tomorrow")) {
      return convertedDate.split(" ")[0];
    } else {
      let month = convertedDate.split(" ")[1];
      let date = convertedDate.split(" ")[2];

      return `${month} ${date}`;
    }
  }

  return (
    <div className="eventsList">
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
      </div>
    </div>
  )
};

export default EventsList;