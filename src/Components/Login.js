import React, { useState } from 'react';
import { login } from '../services/users';
import '../style/login.scss';

const Login = ({isLogin, swapForm}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const submitForm = (e) => {
    e.preventDefault();

    login(email, password);

    setEmail("");
    setPassword("");
  }

  return (
    <>
      {
        isLogin &&
        <section className='login'>
          <h2>Login</h2>
          <form onSubmit={(e) => submitForm(e)}>
            <input 
              type="text" 
              placeholder="Email"
              value={email}
              onChange={(e) => changeEmail(e)}
            />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => changePassword(e)}
            />
            <button type="submit">Login</button>
          </form>
          <p onClick={() => swapForm()}>You don't have an account?</p>
        </section>
      }
    </>
  )
};

export default Login;