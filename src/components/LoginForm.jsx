import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/auth/login";

const LoginForm = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const cookies = new Cookies();

  let navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

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
        setMessage(err.toString());
        setStatus('error');
      });
  };

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