import React from 'react';
import { Link } from 'react-router-dom';
import '../style/currentEvents.scss';

const CurrentEvents = () => {
  return (
    <section className="currentEvents">
      <ul>
        <li className="eventItem">
          <span>sub title</span>
          <div className="imgBox">

          </div>
          <h3>Event name</h3>
          <p>10.30.2022</p>
        </li>
        <li className="eventItem">
          <div className="imgBox">

          </div>
          <h3>Event name</h3>
          <p>10.30.2022</p>
        </li>
        <li className="eventItem">
          <div className="imgBox">

          </div>
          <h3>Event name</h3>
          <p>10.30.2022</p>
        </li>
        <li className="eventItem">
          <div className="imgBox">

          </div>
          <h3>Event name</h3>
          <p>10.30.2022</p>
        </li>
        <li className="eventItem">
          <div className="imgBox">

          </div>
          <h3>Event name</h3>
          <p>10.30.2022</p>
        </li>
      </ul>

      <div className="moreEventsBanner">
        <marquee>blablabla haha blablabla haha blablabla haha blablabla haha</marquee>
        <Link to="/events">More events</Link>
      </div>
    </section>
  )
};

export default CurrentEvents;