import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const FORM_ENDPOINT = `${API_URL}/api/auth/login`;

const LoginForm = ({changeIsLoading}) => {
  const [status, setStatus] = useState('');
  const cookies = new Cookies();

  let navigate = useNavigate();
  
  const handleSubmit = (e) => {
    changeIsLoading(true);

    e.preventDefault();
    setStatus('loading');

    const finalFormEndpoint = e.target.action;
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    fetch(finalFormEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        cookies.set('user_session', data.data.jwtToken, { path: '/' })
        setStatus('success');
      })
      .catch((err) => {
        console.log("err = "+err);
        toast.error("Terdapat email atau password yang salah");
        setStatus('error');
      });
  };

  useEffect(() => {
    if (status === "success") {
      changeIsLoading(false);
      navigate("/laporkan");
    } else if(status === "error") {
      changeIsLoading(false);
      toast.error()
    }
  }, [status, navigate]);

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <input type="text" name="email" className="form-input" id="email" placeholder="email" required/>
      <input type="password" name="password" className="form-input" id="password" placeholder="password" required/>
      <div id="forgot-pwd">
        <a href="/lupa-password">Lupa password?</a><br />
      </div>
      <button className="login-button" type="submit">Login</button><br />
      <a href="/register" id="register-link">Belum punya akun? Klik untuk daftar</a>
    </form>
  );
};

export default LoginForm;