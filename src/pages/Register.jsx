import "./Register.css"
import RegisterForm from "../components/RegisterForm";
import LoadingPopUp from "../components/LoadingPopUp";
import { useState } from "react";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  function changeIsLoading(bool) {
    setIsLoading(bool);
  }

  return(
    <>
      {isLoading ? <LoadingPopUp /> : <></>}
      <div className="login-content">
        <h1 className="register-title">Register</h1>
        <RegisterForm changeIsLoading={changeIsLoading}/>
      </div>
    </>
  );
}