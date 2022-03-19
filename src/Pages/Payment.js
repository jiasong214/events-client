import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { createBooking } from '../services/bookings';
import "../style/payment.scss";

const Payment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.data);
  const [status, setStatus] = useState();

  useEffect(() => {
    if(!user._id) return;

    if (params.get("success")) {
      setStatus(true);
      checkPayment();
    }

    if (params.get("canceled")) {
      setStatus(false);
    }
  }, [user, params]);


  const checkPayment = async () => {
    const session_id = params.get("session_id");

    const session = await axios('http://localhost:8080/payment/success', {
      method: "POST",
      data: { session_id }
    });

    // if payment process fail, redirect them to cancled page
    if(session?.data?.payment_status !== "paid") return navigate("/payment?canceled=true");

    // if it was succeed, create booking data in DB
    const eventID = await session.data.metadata?.event_id;
    const seatsStr = await session.data.metadata?.seats;
    const seatsArr = seatsStr?.split(",");

    // post the data
    createBooking({
      userID: user._id,
      eventID,
      seats: seatsArr,
      paymentID: session_id
    });
  }


  return (
    <div className='payment'>
      <h2>
        {
          status ? "Order placed" : "Order canceled"
        }
      </h2>
      <p>
        {
          status
          ?
          "Thank you for the order. You can check the order in My Page"
          :
          "Continue to shop around and checkout when you're ready."
        }
      </p>
      <div className='btnBox'>
        {
          status ? <Link to='/mypage'>Check my order</Link> : ""
        }
        <Link to='/events'>Browse more</Link>
      </div>
    </div>
  )
}

export default Payment;