import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/auth/register";

const RegisterForm = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  let navigate = useNavigate();

  const additionalData = {
    sent: new Date().toISOString(),
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const finalFormEndpoint = e.target.action;
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    if (additionalData) {
      Object.assign(data, additionalData);
    }

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

        return null;
      })
      .then(() => {
        setStatus('success');
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus('error');
      });
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/login");
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
      <input type="text" name="username" className="r-form-input" id="register-username" placeholder="Username" />
      <input type="text" name="email" className="r-form-input" id="register-email" placeholder="Email" />
      <input type="password" name="password" className="r-form-input" id="register-password" placeholder="Password" />
      <input type="text" name="fullname" className="r-form-input" id="register-fullname" placeholder="Nama Lengkap" />
      <input type="text" name="shortname" className="r-form-input" id="register-shortname" placeholder="Nama Panggilan" />
      <input type="text" name="phone" className="r-form-input" id="register-phone" placeholder="Nomor Telepon" />
      <input type="hidden" name="urole_id" value={"7076f925-ec51-48c7-8b3b-e33709bb1ffe"}/>
      <button className="register-button">Register</button>
    </form>
  );
};

export default RegisterForm;