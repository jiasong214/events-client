import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import '../style/eventSearch.scss';

const EventSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchTerm = searchParams.get("search");

    if(searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, [searchParams])

  const changeSearchTerm = (e) => {
    if(location.pathname === "/events") {
      setSearchTerm(e.target.value);
      navigate(`/events?search=${e.target.value}`);
    } else {
      setSearchTerm(e.target.value);
    }
  }

  const submitSearchTerm = (e) => {
    e.preventDefault();

    return navigate(`/events?search=${searchTerm}`);
  }

  return (
    <div className='eventSearch'>
      <h2>Search events</h2>
      <form onSubmit={(e) => submitSearchTerm(e)}>
        <input
          type="text"
          placeholder='Search Events'
          required={true}
          value={searchTerm}
          onChange={(e) => changeSearchTerm(e)}
        />
      </form>
    </div>
  )
}

export default EventSearch;