import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../services/users';
import { logout } from '../store/modules/user';
import '../style/userInfo.scss';

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const user = useSelector(state => state.user?.data);

  useEffect(() => {
    if(!user._id) return;

    getUserInfo(user._id)
      .then((data) => setUserInfo(data))
  }, [user])

  const clickLogout = () => {
    dispatch(logout());

    navigate("/");
  }

  return (
    <div className='userInfo'>
      <h3>My Account</h3>
      {
        userInfo !== {} && <p>{userInfo.email}</p>
      }
      <div className='btnBox'>
        {/* <Link to="/">
          Edit
        </Link> */}
        <button onClick={() => clickLogout()}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default UserInfo;