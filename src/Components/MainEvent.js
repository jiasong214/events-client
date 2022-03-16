import React from 'react';
import { Link } from 'react-router-dom';
import '../style/mainEvent.scss';

const MainEvent = () => {
  return (
    <section className="mainEvent">
      <div className="textBox">
        <h2>Event name</h2>
        <p>This is event text<br/> bla bla</p>
        <div className="btnBox">
          <Link to="/">View event</Link>
          <Link to="/">Book</Link>
        </div>
      </div>
      <div className="img-container">
        <div className="imgBox">
          <img />
        </div>
      </div>
    </section>
  )
}

export default MainEvent;