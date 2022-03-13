import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getRooms, deleteRoom } from '../services/rooms';
import '../style/roomsList.scss';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms()
      .then(data => setRooms(data));
  }, []);

  const clickDelete = (id, name) => {
    // confirm the action
    const confirmed = window.confirm(`Do you want to delete ${name}?`);
    if(!confirmed) return;

    // delete the room
    deleteRoom(id)
      .then(data => {
        const filteredArr = rooms.filter((room) => room._id !== data._id);
        setRooms(filteredArr);
      })
  }

  return (
    <div className='roomsList'>
      <div className='addBtnBar'>
        <Link to='/admin/room/new'>+ New room</Link>
      </div>

      <ul>
        {
          rooms && rooms.map((room) => (
            <li key={room._id}>
              <div className='textBox'>
                <h2>{room.name}</h2>
                <p>
                  <span>
                    Rows: {room.rows}
                  </span>
                  <span>
                    Columns: {room.cols}
                  </span>
                </p>
              </div>
              <div className="btnBox">
                <Link to={`/admin/room/${room._id}/edit`}>
                  Edit
                </Link>
                <button onClick={() => clickDelete(room._id, room.name)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default RoomsList;