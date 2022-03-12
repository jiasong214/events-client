import React from 'react';
import '../style/login.scss';

const Signup = ({isLogin, swapForm}) => {

  return (
    <>
      {
        !isLogin &&
        <section className="login">
          <h2>Signup</h2>
          <form>
            <input className="signup-email" type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Signup</button>
          </form>
          <p onClick={() => swapForm()}>Do you have an account?</p>
        </section>
      }
    </>
  )
};

export default Signup;