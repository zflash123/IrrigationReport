import ForgotPasswordForm from "../components/ForgotPasswordForm";
import "./ForgotPassword.css";
import LoadingPopUp from "../components/LoadingPopUp";
import { useState } from "react";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  function changeIsLoading(bool){
    setIsLoading(bool)
  }

  return(
    <>
      {isLoading ? <LoadingPopUp /> : <></>}
      <div className="login-content">
        <h1 className="forgot-header">Lupa Password</h1>
        <p className="forgot-hint">Harap masukkan email address anda untuk mendapatkan link untuk ganti password</p>
        <ForgotPasswordForm changeIsLoading={changeIsLoading}/>
      </div>
    </>
  );
}