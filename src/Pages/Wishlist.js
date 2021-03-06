import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading';
import { convertDateFromData } from '../helper/convertDate';
import { getUserInfo, removeWishlistItem } from '../services/users';
import '../style/wishlist.scss';

const Wishlist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.user?.data);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // 1. check login status
    if(!user?._id) return navigate("/login");

    // 2. fetch data
    getUserInfo(user._id)
      .then((data) => setEvents(data.wishlist))
      .then(() => setLoading(false));

      console.log("hello")
  }, [user, navigate, location]);
  

  const clickDelete = async (eventID) => {
    removeWishlistItem(user._id, eventID)
      .then((data) => setEvents([...data.wishlist]));
  }

  return (
    <section className='wishlist'>
      <h2>Wishlist</h2>
      <ul>
        {
          loading
          ?
          <Loading />
          :
          events.map((event) => (
            <li key={event._id}>
              <div className='imgBox'>
                <img src={event.image} alt={event.name} />
              </div>
              <div className='textBox'>
                <span className="eventType">{event.type}</span>
                <h3 className="eventName">
                  <Link to={`/event/${event._id}`}>{event.name}</Link>
                </h3>
                <p className="eventDate">{convertDateFromData(event.date)}</p>
              </div>
              <div className='btnBox'>
                <Link to={`/event/${event._id}`}>Book</Link>
                <button onClick={() => clickDelete(event._id)}>Delete</button>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
};

export default Wishlist;