import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDateFromData } from '../helper/convertDate';
import { createBooking } from '../services/bookings';
import { getEvent } from '../services/events';
import '../style/eventInfo.scss';

const EventInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.data);
  const [event, setEvent] = useState();
  const [takenSeats, setTakenSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState({});

  // fetch event info
  useEffect(() => {
    const eventID = params.id;

    getEvent(eventID)
      .then(data => {
        // 1. set event info
        setEvent(data);

        // 2. iterate all booking object's seat and map it
        data.bookings.forEach((booking) => {
          const userID = booking.user;

          booking.seats.forEach((seat) => {
            const newObj = {};
            newObj[seat] = userID;

            setTakenSeats((prev => ({...prev, ...newObj})));
          });
        });

      });
  }, [params.id]);


  const clickSeat = (seatID) => {
    if(selectedSeats[seatID]) {
      // if it was already selected, remove the seat from the object
      delete selectedSeats[seatID];

      setSelectedSeats({...selectedSeats});
    }else {
      // if not, add the seat to the object
      const obj = {};
      obj[seatID] = "selected";

      setSelectedSeats((seats) => ({...seats, ...obj}));
    }
  }

  const setSeatStatus = (seatID) => {
    if(takenSeats === {} && selectedSeats === {}) return "available";
    
    if(takenSeats[seatID] && takenSeats[seatID] === user?._id) {
      return "booked";
    }else if(takenSeats[seatID]) {
      return "taken";
    }else if(selectedSeats[seatID]) {
      return "selected";
    }else {
      return "available";
    }
  }

  const clickBook = async (event) => {
    // check if user is logged in first
    if(!user._id) navigate('/login');

    const seatsArr = Object.keys(selectedSeats);

    // create a payment
    const payment = await axios('http://localhost:8080/payment', {
      'method': "POST",
      data: {
        eventID: event._id,
        eventName: event.name,
        eventPrice: event.price,
        quantity: seatsArr.length,
        seats: seatsArr
      }
    });

    console.log(payment);

    // redirect to payment page
    window.location.href = payment.data.url;
  }

  const getTotalPrice = (price) => {
    const selectedSeatsNum = Object.keys(selectedSeats).length;

    return parseInt(price) * selectedSeatsNum;
  }


  return (
    <>
      {event &&
        <div className="eventInfo">
          <div className='textBox'>
            <div className='event-info'>
              <span>{event.type}</span>
              <h2>{event.name}</h2>
              <p>{convertDateFromData(event.date)}</p>
            </div>
            <div className="seat-info">
              {
                Object.keys(selectedSeats).length ?
                  <p>Selected seats</p> : ""
              }
              <ul>
                {
                  Object.keys(selectedSeats).map((seat) => (
                    <li key={seat}>{seat}</li>
                  ))
                }
              </ul>
            </div>
            <div className="ticket-info">
              <p>${getTotalPrice(event.price)}</p>
              <button onClick={() => clickBook(event)}>
                Buy a ticket
              </button>
            </div>
          </div>
         
          <div className='bookingBox'>
            <div className='seatMap'>
              <span className='room'>{event.room.name}</span>
              <span className='stage'>Stage</span>
              {
                new Array(event.room.rows).fill('').map((row, i) => (
                  <span className="row" key={i}>
                    {
                      new Array(event.room.cols).fill('').map((seat, j) => (
                        <span
                          key={`${i}-${j}`}
                          className='seat'
                          data-status={setSeatStatus(`${i}-${j}`)}
                          onClick={() => clickSeat(`${i}-${j}`)}
                        >
                          {`${i}-${j}`}
                        </span>
                      ))
                    }
                  </span>
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  )
};

export default EventInfo;