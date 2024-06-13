import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FORM_ENDPOINT = "http://laporirigasi.my.id/api/auth/register";

const RegisterForm = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

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
      <input type="hidden" name="urole_id" value={"1d3c9d35-3d02-4b42-ad44-b75ca8c4e4fa"}/>
      <button className="register-button">Register</button>
    </form>
  );
};

export default RegisterForm;