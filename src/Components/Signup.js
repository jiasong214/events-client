import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/users';
import '../style/login.scss';

const Signup = ({isLogin, swapForm}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.data);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState(true);

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  
  const changePasswordConfirm = (e) => {
    if(password !== e.target.value) {
      setPasswordConfirmed(false);
    } else {
      setPasswordConfirmed(true);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    // check if password is confirmed
    if(!passwordConfirmed) return;

    // api request
    dispatch(signup(email, password));

    // reset input
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
        !isLogin &&
        <section className="login">
          <h2>Signup</h2>
          <form onSubmit={(e) => submitForm(e)}>
          <input 
              type="text" 
              placeholder="Email"
              className="signup-email"
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
            <input 
              type="password" 
              placeholder="Confirm password"
              required={true}
              className={passwordConfirmed ? "" : "error"}
              onChange={(e) => changePasswordConfirm(e)}
            />
            <button type="submit">Signup</button>
          </form>
          <p onClick={() => swapForm()}>Do you have an account?</p>
        </section>
      }
    </>
  )
};

export default Signup;