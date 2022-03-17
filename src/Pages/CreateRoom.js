import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoom, updateRoom, getRoom } from '../services/rooms';
import '../style/createEvent.scss';

const CreateRoom = () => {
  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector(state => state.user?.data);

  const [name, setName] = useState("");
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");

  useEffect(() => {
    if(user?.type !== "admin") return navigate("/login");
  }, [user])

  // set the states if its edit form page
  useEffect(() => {
    const roomID = params.id;
    if(!roomID) return;

    getRoom(roomID)
      .then((data) => {
        setName(data.name);
        setRows(data.rows);
        setCols(data.cols);
      })
  }, [params]);

  const changeName = (e) => setName(e.target.value);
  const changeRows = (e) => setRows(e.target.value);
  const changeCols = (e) => setCols(e.target.value);

  const submitForm = (e) => {
    e.preventDefault();

    if(!name || !rows || !cols) return;

    params.id ? editRoom() : makeRoom();

    navigate("/admin");
  }

  const makeRoom = async () => {
    createRoom({
      name, 
      rows: parseInt(rows), 
      cols: parseInt(cols),
    });
  }

  const editRoom = async () => {
    updateRoom(params.id, {
      name, 
      rows: parseInt(rows), 
      cols: parseInt(cols),
    });
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