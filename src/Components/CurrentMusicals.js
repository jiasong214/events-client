import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEventsBySearch } from "../services/events";
import '../style/currentMusicals.scss';

const CurrentMusicals = () => {
  const [musicals, setMusicals] = useState([]);

  useEffect(() => {
    getEventsBySearch("the lion king")
      .then(data => setMusicals(prev => [...prev, ...data]));

    getEventsBySearch("wicked")
    .then(data => setMusicals(prev => [...prev, ...data]));

    getEventsBySearch("chicago")
    .then(data => setMusicals(prev => [...prev, ...data]));
  },[]);
  
  return (
    <div className="currentMusicals">
      <div className="innerbox">
        <h2>Musicals now</h2>
        <ul>
          {
            musicals.length === 3 && musicals.map((musical) => (
              <li key={musical._id}>
                <div className="img-container">
                  <div className="imgBox">
                    <img src={musical.image} alt={musical.name} />
                  </div>
                </div>
                <div className="textBox">
                  <h3>{musical.name}</h3>
                  <Link to={`/event/${musical._id}`}>Book now</Link>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default CurrentMusicals