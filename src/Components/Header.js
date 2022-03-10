import React from 'react';
import { Link } from 'react-router-dom';
import '../style/header.scss';

const Header = () => {
  return (
    <header>
      <h1>
        <Link to='/'>Title</Link>
      </h1>
      <nav>
        <Link to='events'>What's on</Link>
        <Link to='/cart'>My Wishlist</Link>
        <Link to='/login'>Login</Link>
      </nav>
    </header>
  )
};

export default Header;