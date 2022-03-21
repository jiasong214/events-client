import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDateFromData } from '../helper/convertDate';
import { getEvent } from '../services/events';
import '../style/adminEventInfo.scss';

const AdminEventInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.data);
  const [event, setEvent] = useState();
  const [bookings, setBookings] = useState([]);
  const [takenSeats, setTakenSeats] = useState({});
  const [selectedSeat, setSelectedSeat] = useState("");

  // fetch event info
  useEffect(() => {
    const eventID = params.id;

    getEvent(eventID)
      .then(data => {
        console.log(data.bookings)
        // 1. set event info
        setEvent(data);
        setBookings(data.bookings);

        // 2. iterate all booking object's seat and map it
        data.bookings.forEach((booking) => {
          const bookingID = booking._id;

          booking.seats.forEach((seat) => {
            const newObj = {};
            newObj[seat] = bookingID;

            setTakenSeats((prev => ({...prev, ...newObj})));
          });
        });

      });
  }, [params.id]);


  const clickSeat = (seatID) => {
    const bookingID = takenSeats[seatID];

    if(!bookingID) return;

    selectedSeat === bookingID ? setSelectedSeat("") : setSelectedSeat(bookingID);
  }

  const clickBooking = (bookingID) => {
    selectedSeat === bookingID ? setSelectedSeat("") : setSelectedSeat(bookingID);
  }

  const setSeatStatus = (seatID) => {
    const bookingID = takenSeats[seatID];

    if(takenSeats === {}) return "available";

    if(takenSeats[seatID] && selectedSeat === bookingID) {
      return "selected";
    }else if(takenSeats[seatID]) {
      return "taken";
    }else {
      return "available";
    }
  
  }

  const mapBookingID = (seatID) => {
    if(takenSeats[seatID]) {
      return takenSeats[seatID];
    }
  }

  return (
    <>
      {event &&
        <div className="adminEventInfo">
          <div className='textBox'>
            <div className='event-info'>
              <span>{event.type}</span>
              <h2>{event.name}</h2>
              <p>{convertDateFromData(event.date)}</p>
            </div>
            <div className='bookings-info'>
              <h2>Booking List</h2>
              <ul>
                {
                  bookings.length && bookings.map((booking) => (
                    <li 
                      key={booking._id}
                      className={selectedSeat === booking._id ? "focused" : ""}
                      onClick={() => clickBooking(booking._id)}
                    >
                      <p>USER CODE: {booking.user}</p>
                      <p>SEARS: {booking.seats.join(", ")}</p>
                      <p>PAYMENT CODE: {booking.paymentID}</p>
                    </li>
                  )) 
                }
              </ul>
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
                          id={mapBookingID(`${i}-${j}`)}
                          className='seat --admin'
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

export default AdminEventInfo;