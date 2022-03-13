import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        setEvent(data);
        setBookedSeats(JSON.parse(data.bookings));
      });
  }, [params.id]);

  
  const clickSeat = (seatID) => {
    if(selectedSeats[seatID]) {
      // if it was selected, remove the seat from the object
      delete selectedSeats[seatID];
    }else {
      // if not, add the seat to the object
      const obj = {};
      obj[seatID] = "";

      setSelectedSeats((seats) => ({...seats, ...obj}));
    }

    console.log(selectedSeats)
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
                          className='seat'
                          data-status={
                            bookedSeats[`${i}-${j}`] 
                            ? 
                            "taken" 
                            :
                            selectedSeats[`${i}-${j}`]
                            ?
                            "selected"
                            :
                            "available"
                          }
                          key={j}
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