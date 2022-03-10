import React from 'react';
import CurrentEvents from '../Components/CurrentEvents';
import FeaturedEvent from '../Components/FeaturedEvent';
import MainEvent from '../Components/MainEvent';

const Home = () => {
  return (
    <main>
      <MainEvent />
      <CurrentEvents />
      <FeaturedEvent />
    </main>
  )
};

export default Home;