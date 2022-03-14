import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/header.scss';

const Header = () => {
  const location = useLocation();
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
          Title
        </Link>
      </h1>
      <nav>
        <Link
            to='/login'
            className={path === '/login' ? "login active" : "login"}
          >
            Login
        </Link>
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
        <Link
          to='/mypage'
          className={path === '/mypage' ? "active" : ""}
        >
          My Page
        </Link>
      </nav>
    </header>
  )
};

export default Header;