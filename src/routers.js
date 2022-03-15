import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import Events from './Pages/Events';
import EventInfo from './Pages/EventInfo';
import Wishlist from './Pages/Wishlist';
import Booking from './Pages/Booking';
import Admin from './Pages/Admin';
import CreateEvent from './Pages/CreateEvent';
import CreateRoom from './Pages/CreateRoom';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events?type=:type" element={<Events />} />
      <Route path="/event/:id" element={<EventInfo />} />
      {/* <Route path="/event/:id/book" element={<Booking />} /> */}
      <Route path="/wishlist" element={<Wishlist />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/event/new" element={<CreateEvent />} />
      <Route path="/admin/event/:id/edit" element={<CreateEvent />} />
      <Route path="/admin/room/new" element={<CreateRoom />} />
      <Route path="/admin/room/:id/edit" element={<CreateRoom />} />
    
  </Routes>
  )
}

export default Routers