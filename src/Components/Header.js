import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import '../style/header.scss';

const Header = () => {
  const location = useLocation();
  const user = useSelector(state => state.user?.data);
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname])


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
        <Link
          to='/wishlist'
          className={path === '/wishlist' ? "active" : ""}
        >
          Wishlist
        </Link>

        {
          user._id
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