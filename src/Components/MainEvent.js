import React from 'react';
import { Link } from 'react-router-dom';
import '../style/mainEvent.scss';

const MainEvent = () => {
  return (
    <section className="mainEvent">
      <div className="img-container">
        {/* <div className="imgBox"> */}
          <img src="https://res.cloudinary.com/dwhhlicmv/image/upload/v1647744664/events/amndcwdgxoplapo0u28z.jpg" alt="temp" />
        {/* </div> */}
      </div>
      <div className="textBox">
        <div className="titleBox">
          <h2>Grace @ 20</h2>
          <p>April 2022</p>
          <p>Bla Bla</p>
        </div>
        <div className='infoBox'>
          <p>A piece choreographed by Ronald K. Brown, fuses traditional African American dance with contemporary styles.</p>
          <Link to="/">More information &#8594;</Link>
        </div>
      </div>
    </section>
  )
}

export default MainEvent;