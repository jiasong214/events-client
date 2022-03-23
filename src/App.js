import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Routers from './routers';
import Loading from './Components/Loading';
import { me } from './store/modules/user';
import { getEvent } from './services/events';
import './style/global.scss';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token) dispatch(me());

  }, [dispatch]);

  useEffect(() => {
    getEvent()
      .then(() => setLoading(false))
  }, [])

  return (
    <div className="App">
      {
        loading
        ?
        <>
          <Loading />
          <div className="loading-text">
            <p>This app is deployed on Heroku.</p>
            <p>It takes some time for loading at first. :)</p>
          </div>
        </>
        :
        <Router>
          <Header />
          <Routers />
          <Footer />
        </Router>
      }
    </div>
  );
}

export default App;
