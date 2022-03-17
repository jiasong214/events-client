import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/modules/user';
import '../style/userInfo.scss';

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.data);

  const clickLogout = () => {
    dispatch(logout());

    navigate("/");
  }

  return (
    <div className='userInfo'>
      <h3>My Account</h3>
      <p>{user.email}</p>
      <div className='btnBox'>
        <Link to="/">
          Edit
        </Link>
        <button onClick={() => clickLogout()}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default UserInfo;