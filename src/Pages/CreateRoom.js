import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../services/rooms';
import '../style/createEvent.scss';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");

  const changeName = (e) => setName(e.target.value);
  const changeRows = (e) => setRows(e.target.value);
  const changeCols = (e) => setCols(e.target.value);

  const submitForm = (e) => {
    e.preventDefault();

    if(!name || !rows || !cols) return;

    createRoom({
      name, 
      rows: parseInt(rows), 
      cols: parseInt(cols),
    });

    setName("");
    setRows("");
    setCols("");

    navigate("/admin");
  }

  return (
    <section className='createEvent'>
      <h2>Create a new room</h2>
      <form onSubmit={(e) => submitForm(e)}>
        <input 
          type='text'
          placeholder='Room name'
          required={true}
          value={name}
          onChange={(e) => changeName(e)}
        />
        <div className='seat'>
          <input 
            type="number"
            placeholder='Rows'
            required={true}
            value={rows}
            onChange={(e) => changeRows(e)}
          />
          <input 
            type="number"
            placeholder='Columns'
            required={true}
            value={cols}
            onChange={(e) => changeCols(e)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
};

export default CreateRoom;