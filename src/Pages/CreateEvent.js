import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/events';
import { getRooms } from '../services/rooms';
import '../style/createEvent.scss';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const changeName = (e) => setName(e.target.value);
  const changeType = (e) => setType(e.target.value);
  const changeDate = (e) => setDate(e.target.value);
  const changeTime = (e) => setTime(e.target.value);
  const changeRoom = (e) => setRoom(e.target.value);
  const changeInfo = (e) => setInfo(e.target.value);
  const changePrice = (e) => setPrice(e.target.value);
  const changeImage = (e) => setImage(e.target.files[0]);

  const createDate = (date, time) => {
    const dateArr = date.split("-");
    const timeArr = time.split(":");

    let month = parseInt(dateArr[1]) - 1 === -1 ? 0 : parseInt(dateArr[1]) - 1;
    // TODO: am, pm 바뀌어서 들어가는 오류
    let hour = parseInt(timeArr[0]) - 1 === -1 ? 0 : parseInt(timeArr[0]) -1;

    return new Date(dateArr[0], month, dateArr[2], hour, timeArr[1]);
  }

  const uploadImage = async (file) => {
    const imgData = new FormData();

    imgData.append("file", file);
    imgData.append("upload_preset", "ml_default");
    imgData.append("cloud_name","dwhhlicmv");

    const res = await fetch("https://api.cloudinary.com/v1_1/dwhhlicmv/image/upload", {
      method:"POST",
      body: imgData
    });

    const data = await res.json();

    return data.url;
  }

  const submitForm = async (e) => {
    e.preventDefault();

    if(!name || !type || !date || !time || !room || !info) {
      return;
    }

    const imageURL = await uploadImage(image);

    createEvent({
      name, 
      type, 
      date: createDate(date, time), 
      room, 
      info,
      price,
      image: imageURL
    });

    navigate('/admin');
  }

  useEffect(() => {
    getRooms()
      .then(data => setAllRooms(data));
  }, [])

  return (
    <section className="createEvent">
      <h2>Create a new event</h2>
      <form onSubmit={(e) => submitForm(e)}>
        <input 
          type="text"
          placeholder="Event name"
          required={true}
          value={name}
          onChange={(e) => changeName(e)}
        />
        <div className='optionsBar'>
          <select
            value={type}
            onChange={(e) => changeType(e)}
          >
            <option>Type</option>
            <option value="musical">musical</option>
            <option value="comedy">comedy</option>
            <option value="drama">drama</option>
            <option value="family">family</option>
          </select>
          <input
            type="date"
            required={true}
            value={date}
            onChange={(e) => changeDate(e)}
          />
          <input
            type="time"
            required={true}
            value={time}
            onChange={(e) => changeTime(e)}
          />
          <select
            value={room}
            onChange={(e) => changeRoom(e)}
          >
            {
              allRooms.map((room) => (
                <option 
                  key={room._id}
                  value={room._id}
                >
                  {room.name}
                </option>
              ))
            }
          </select>
        </div>

        <div className='priceInput'>
          <input
            type="number"
            placeholder='Ticket price'
            required={true}
            onChange={(e) => changePrice(e)}
          />
          <label>AUD</label>
        </div>

        <input  
          type="file" 
          onChange= {(e)=> changeImage(e)} 
        />

        <textarea 
          rows="20"
          value={info}
          onChange={(e) => changeInfo(e)}
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  )
};

export default CreateEvent;