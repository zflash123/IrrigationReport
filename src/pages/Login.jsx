import './Login.css';
import LoginForm from '../components/LoginForm';
import LoadingPopUp from '../components/LoadingPopUp';
import { useState } from 'react';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  function changeIsLoading(isLoad){
    setIsLoading(isLoad);
  }

  return(
    <>
      {isLoading?<LoadingPopUp/>:<></>}
      <div className="login-content">
        <h1 className="login-header">Login</h1>
        <LoginForm changeIsLoading={changeIsLoading}/>
      </div>
    </>
  );
}