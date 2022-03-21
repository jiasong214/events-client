import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import UserInfo from '../Components/UserInfo';
import { checkExpired } from '../helper/checkExpired';
import { convertDateFromData } from '../helper/convertDate';
import { getEvent } from '../services/events';
import { getUserInfo, removeWishlistItem } from '../services/users';
import '../style/mypage.scss';

const MyPage = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.data);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. check login status
    if(!user._id) return navigate("/login");

    // 2. fetch data
    getUserInfo(user._id)
      .then((data) => {
        getBookingInfo(data.bookings);
        setLoading(false);
      });
  }, [user]);

  const getBookingInfo = async (bookings) => {
    setEvents([]);

    bookings.forEach((booking) => {
      const eventID = booking.event;

      // get each event's info
      getEvent(eventID)
        .then(data => {
          setEvents((prev) => ([...prev, {
            ...data, 
            seats: booking.seats, 
            code: booking.paymentID
          }]));
        });
    });
  }

  return (
    <>
      {
        user._id && 
        <section className='mypage'>
          <h2>My page</h2>
          <UserInfo />
    
          <div className='bookings'>
            <h3>My tickets</h3>
            {
              loading
              ?
              <Loading/>
              :
              <ul>
              {
                events.length !== 0 && events.map((event, i) => (
                  <li 
                    key={i}
                    className={checkExpired(event.date)}
                  >
                    <div className='imgBox'>
                      <img src={event.image} alt={event.name} />
                    </div>
                    <div>
                      <div className='textBox'>
                        <span className="eventType">{event.type}</span>
                        <h3 className="eventName">
                          <Link to={`/event/${event._id}`}>{event.name}</Link>
                        </h3>
                        <p className="eventDate">{convertDateFromData(event.date)}</p>
                        <p className='eventRoom'>{event.room.name}</p>
                        <div className="bookedSeats">
                          {
                            event.seats.map((seat, i) => (
                              <p key={i}>{seat}</p>
                            ))
                          }
                        </div>
                        <div className='ticketCode'>
                          <p>TICKET CODE: {event.code}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              }
              </ul>
            }
          </div>
        </section>
      }
    </>
  )
};

export default MyPage;