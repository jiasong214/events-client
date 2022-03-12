import React from 'react';
import '../style/login.scss';

const Login = ({isLogin, swapForm}) => {

  return (
    <>
      {
        isLogin &&
        <section className='login'>
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          <p onClick={() => swapForm()}>You don't have an account?</p>
        </section>
      }
    </>
  )
};

export default Login;