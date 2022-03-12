import React from 'react';
import EventsFilter from '../Components/EventsFilter';
import EventsList from '../Components/EventsList';
import '../style/events.scss';

const Events = () => {
  return (
    <section className="events">
      <EventsFilter />
      <EventsList />
    </section>
  )
};

export default Events;