import React, { useEffect, useState } from 'react';
import '../style/eventSearch.scss';

const EventSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

  }, []);

  const changeSearchTerm = (e) => setSearchTerm(e.target.value);

  const submitSearchTerm = (e) => {
    e.preventDefault();


  }

  return (
    <div className='eventSearch'>
      <h2>Search events</h2>
      <form onSubmit={(e) => submitSearchTerm(e)}>
        <input
          type="text"
          placeholder='Search Events'
          required={true}
          onChange={(e) => changeSearchTerm(e)}
        />
      </form>
    </div>
  )
}

export default EventSearch;