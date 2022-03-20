import React from 'react';
import CurrentEvents from '../Components/CurrentEvents';
import CurrentMusicals from '../Components/CurrentMusicals';
import EventSearch from '../Components/EventSearch';
import MainEvent from '../Components/MainEvent';

const Home = () => {
  return (
    <main>
      <MainEvent />
      <CurrentEvents />
      <CurrentMusicals />
      <EventSearch />
    </main>
  )
};

export default Home;