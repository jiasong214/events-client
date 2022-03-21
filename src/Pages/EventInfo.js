import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import { convertDateFromData } from '../helper/convertDate';
import { getEvent } from '../services/events';
import { requestPayment } from '../services/payment';
import '../style/eventInfo.scss';

const EventInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.data);
  const [event, setEvent] = useState();
  const [takenSeats, setTakenSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState({});
  const [loading, setLoading] = useState(true);

  // fetch event info
  useEffect(() => {
    const eventID = params.id;

    setLoading(true);

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

        setLoading(false);
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
    // check if a user is logged in first
    if(!user._id) navigate('/login');

    const seatsArr = Object.keys(selectedSeats);

    // check if a user choose a seat
    if(!seatsArr.length) return window.alert("Choose the seat please.")

    // create a payment
    const payment = await requestPayment({
      eventID: event._id,
      eventName: event.name,
      eventPrice: event.price * 100,
      quantity: seatsArr.length,
      seats: seatsArr
    });

    // redirect to payment page
    window.location.href = await payment.url;
  }

  const getTotalPrice = (price) => {
    const selectedSeatsNum = Object.keys(selectedSeats).length;

    return parseInt(price) * selectedSeatsNum;
  }


  return (
    <div className="eventInfo">
      {
        loading
        ?
        <Loading/>
        :
        <>
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
        </>
      }

    </div>
  )
};

export default EventInfo;