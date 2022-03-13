import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import Events from './Pages/Events';
import EventInfo from './Pages/EventInfo';
import Wishlist from './Pages/Wishlist';
import Booking from './Pages/Booking';
import './style/global.scss';
import Admin from './Pages/Admin';
import CreateEvent from './Pages/CreateEvent';
import CreateRoom from './Pages/CreateRoom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
