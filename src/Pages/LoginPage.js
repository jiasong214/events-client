import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import '../style/loginPage.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.data);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if(user?._id) return navigate("/");
  }, [user])

  const swapForm = () => isLogin ? setIsLogin(false) : setIsLogin(true);

  return (
    <div className='loginPage'>
      <Login 
        isLogin={isLogin} 
        swapForm={swapForm} 
      />
      <Signup 
        isLogin={isLogin} 
        swapForm={swapForm} 
      />
    </div>
  )
};

export default LoginPage;