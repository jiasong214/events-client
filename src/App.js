import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Routers from './routers';
import './style/global.scss';
import { useDispatch } from 'react-redux';
import { me } from './store/modules/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routers />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
