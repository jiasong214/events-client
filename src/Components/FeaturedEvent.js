import React from 'react';
import { Link } from 'react-router-dom';
import '../style/featuredEvent.scss';

const FeaturedEvent = () => {
  return (
    <section className="featuredEvent">
      <div className="textBox">
        <h3>This is title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at neque sit amet odio rutrum dapibus. Etiam ornare pulvinar magna, ac ultricies metus bibendum nec. Integer non lectus eu urna semper porttitor nec in ligula. Mauris dignissim tortor tortor, sit amet scelerisque elit varius viverra. Curabitur mauris augue, volutpat ac lacus ut.
          </p>
          <p>
            scelerisque congue eros. Morbi iaculis tempus nunc ut sodales. Curabitur commodo sapien sed pellentesque sollicitudin. Quisque sapien tellus, blandit sed feugiat non, malesuada non nisi.
        </p>
        <div className="btnBox">
          <Link to="/">View event</Link>
          <Link to="/">Book</Link>
        </div>
      </div>
      <div className="imgBox">
        <div className="img-container"></div>
      </div>
    </section>
  )
}

export default FeaturedEvent;