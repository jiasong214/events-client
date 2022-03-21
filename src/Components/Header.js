import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getUserInfo } from '../services/users';
import '../style/header.scss';

const Header = () => {
  const location = useLocation();
  const user = useSelector(state => state.user?.data);
  const [path, setPath] = useState("");
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    setPath(location.pathname);

    if(user?._id) {
      getUserInfo(user._id)
        .then((data) => setWishlist(data.wishlist))
    }else {
      setWishlist([]);
    }
  }, [location.pathname, user])


  return (
    <header className="header">
      <h1>
        <Link
          to='/'
          className={path === '/' ? "active" : ""}
        >
          Event venue<br />Somewhere...
        </Link>
      </h1>
      <nav>
        <Link
          to='events'
          className={path.startsWith('/events') ? "active" : ""}
        >
          What's on
        </Link>
        {
          user?.type !== "admin"
          ?
          <Link
            to='/wishlist'
            className={path === '/wishlist' ? "active" : ""}
          >
            Wishlist
            {
              wishlist.length !== 0
              ?
              <span className='wishlist-num'>
                {wishlist.length}
              </span>
              : ""
            }
          </Link>
          :
          <Link
          to='/admin'
          className={path === '/admin' ? "active" : ""}
          >
            Admin
          </Link>
        }
        {
          user?._id
          ?
          <Link
            to='/mypage'
            className={path === '/mypage' ? "active" : ""}
          >
            My Page
          </Link>
          :
          <Link
            to='/login'
            className={path === '/login' ? "active" : ""}
          >
            Login
          </Link>
        }
        
      </nav>
    </header>
  )
};

export default Header;