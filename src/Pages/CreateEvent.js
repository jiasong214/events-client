import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDateFromInput } from '../helper/convertDate';
import { uploadImage } from '../helper/uploadImage';
import { createEvent, getEvent, updateEvent } from '../services/events';
import { getRooms } from '../services/rooms';
import '../style/createEvent.scss';

const CreateEvent = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [allRooms, setAllRooms] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [price, setPrice] = useState("");

  // check if its a edit page
  useEffect(() => {
    const eventID = params.id;
    if(!eventID) return;

    getEvent(eventID)
      .then(data => {
        const dataDate = data.date.split("T")[0];
        const dataTime = data.date.split("T")[1].slice(0,5);

        setName(data.name);
        setType(data.type);
        setDate(dataDate);
        setTime(dataTime);
        setRoom(data.room._id);
        setInfo(data.info);
        setPrevImage(data.image);
        setPrice(data.price)
      })
  }, [params]);

  // to create room select tag
  useEffect(() => {
    getRooms()
      .then(data => setAllRooms(data));
  }, []);

  // change input functions
  const changeName = (e) => setName(e.target.value);
  const changeType = (e) => setType(e.target.value);
  const changeDate = (e) => setDate(e.target.value);
  const changeTime = (e) => setTime(e.target.value);
  const changeRoom = (e) => setRoom(e.target.value);
  const changeInfo = (e) => setInfo(e.target.value);
  const changePrice = (e) => setPrice(e.target.value);
  const changeImage = (e) => setImage(e.target.files[0]);

  const submitForm = async (e) => {
    e.preventDefault();

    if(!name || !type || !date || !time || !room) {
      return;
    }

    params.id ? editEvent() : createEvent()

    navigate('/admin');
  }

  const createEvent = async () => {
    const imageURL = await uploadImage(image);

    createEvent({
      name, 
      type, 
      date: convertDateFromInput(date, time), 
      room, 
      info,
      price,
      image: imageURL
    });
  }

  const editEvent = async () => {
    let imageURL;

    if(image) {
      imageURL = await uploadImage(image);
    }else {
      imageURL = prevImage;
    }

    updateEvent(params.id, {
      name, 
      type, 
      date: convertDateFromInput(date, time), 
      room, 
      info,
      price,
      image: imageURL
    })
  }

  return (
    <section className="createEvent">
      <h2>
        {
          params.id
          ?
          "Edit the event"
          :
          "Create a new event"
        }
      </h2>
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
            <option value="concert">concert</option>
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
            value={price}
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