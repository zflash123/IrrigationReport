import ChangePasswordForm from "../components/ChangePasswordForm";
import LoadingPopUp from "../components/LoadingPopUp";
import { useState } from "react";

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  function changeIsLoading(bool){
    setIsLoading(bool)
  }

  return(
    <>
      {isLoading ? <LoadingPopUp /> : <></>}
      <div className="login-content">
        <h1 className="forgot-header">Ganti Password</h1>
        <p className="forgot-hint">Harap masukkan password anda yang baru</p>
        <ChangePasswordForm changeIsLoading={changeIsLoading}/>
      </div>
    </>
  );
}