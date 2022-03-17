import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../style/eventsFilter.scss';

const EventsFilter = () => {
  const [searchParams] = useSearchParams();
  const [type, setType] = useState();

  useEffect(() => {
    setType(searchParams.get("type"));
  }, [searchParams])
  
  return (
    <div className="eventsFilter">
      <div>
        <Link
          to="/events"
          className={type ? "" : "active"}
        >
          All
        </Link>
        <Link
          to="/events?type=concert"
          className={type === "concert" ? "active" : ""}
        >
          Concert
        </Link>
        <Link
          to="/events?type=musical"
          className={type === "musical" ? "active" : ""}
        >
          Musical
        </Link>
        <Link
          to="/events?type=comedy"
          className={type === "comedy" ? "active" : ""}
        >
          Comedy
        </Link>
        <Link
          to="/events?type=drama"
          className={type === "drama" ? "active" : ""}
        >
          Drama
        </Link>
      </div>
    </div>
  )
};

export default EventsFilter;