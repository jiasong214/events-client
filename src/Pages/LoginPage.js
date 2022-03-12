import React, { useState } from 'react';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import '../style/loginPage.scss';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

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