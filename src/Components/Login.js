import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/modules/user';
import '../style/login.scss';

const Login = ({isLogin, swapForm}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.data);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  // if a user is logged in, redirect them to index page
  useEffect(() => {
    if(user._id) navigate("/");
  }, [user]);

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
              required={true}
              value={email}
              onChange={(e) => changeEmail(e)}
            />
            <input 
              type="password" 
              placeholder="Password"
              required={true}
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