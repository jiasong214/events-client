import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createBooking } from '../services/bookings';
import { getEvent } from '../services/events';
import '../style/eventInfo.scss';

const EventInfo = () => {
  const params = useParams();
  const [event, setEvent] = useState();
  const [bookedSeats, setBookedSeats] = useState({});
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

            setBookedSeats((prev => ({...prev, ...newObj})));
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
    if(bookedSeats === {} && selectedSeats === {}) return "available";

    const userID = '622c935180eeaf9c4468603f';
    
    if(bookedSeats[seatID] === userID) {
      return "booked";
    }else if(bookedSeats[seatID]) {
      return "taken";
    }else if(selectedSeats[seatID]) {
      return "selected";
    }else {
      return "available";
    }
  }

  const clickBook = (eventID) => {
    const userID = '622c935180eeaf9c4468603f'
    const seatsArr = Object.keys(selectedSeats);


    // 1. pass the eventID, userID, and seatsArr
    // booking data will looks like {event: eventID, user: userID, seats: ["1-1", "2-2"]}
    // And it will connect to user and event
    // when i draw a seat map, i need to iterate 2 nested array to find "taken", "booked" seats
    createBooking(userID, eventID, seatsArr)
      .then(data => console.log(data))
  }


  return (
    <>
      {event &&
        <div className="eventInfo">
          <div className='imgBox'>
          </div>
          <div className='textBox'>
            <span>{event.type}</span>
            <div>
              <h2>{event.name}</h2>
              <p>{event.date}</p>
            </div>
          </div>
          <div className='bookingBox'>
            <h2>Book the seat</h2>
            <p>{event.room.name}</p>
            <div className='seatMap'>
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
            <div className="bookSeats">
              <h2>Book the ticket</h2>
              <p>Selected seats</p>
              <ul>
                {
                  Object.keys(selectedSeats).map((seat) => (
                    <li key={seat}>{seat}</li>
                  ))
                }
              </ul>
              <div className="totalPrice">
                $120
              </div>
              <button onClick={() => clickBook(event._id)}>
                Buy a ticket
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
};

export default EventInfo;