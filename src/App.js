import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Events from './Pages/Events';
import EventInfo from './Pages/EventInfo';
import Cart from './Pages/Cart';
import Booking from './Pages/Booking';
import './style/global.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventInfo />} />
          <Route path="/event/:id/booking" element={<Booking />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
