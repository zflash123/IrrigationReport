import useLoginForm from "./UseLoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/auth/login"; // TODO - update to the correct endpoint

const LoginForm = ({setCookie}) => {
  let navigate = useNavigate();

  const additionalData = {
    sent: new Date().toISOString(),
  };

  const { handleSubmit, status, message } = useLoginForm({
    additionalData, setCookie
  });

  useEffect(() => {
    if (status === "success") {
      navigate("/laporkan");
    }
  }, [status, navigate]);

  if (status === "error") {
    return (
      <>
        <div>Something bad happened!</div>
        <div>{message}</div>
      </>
    );
  }

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <input type="text" name="email" className="form-input" id="email" placeholder="email"/>
      <input type="password" name="password" className="form-input" id="password" placeholder="password"/>
      <div id="forgot-pwd">
        <a href="/lupa-password">Lupa password?</a><br />
      </div>
      <button className="login-button" type="submit">Login</button><br />
      <a href="/register" id="register-link">Belum punya akun? klik untuk daftar</a>
    </form>
  );
};

export default LoginForm;