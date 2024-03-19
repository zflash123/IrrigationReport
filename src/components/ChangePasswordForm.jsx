import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/change-password";

const ChangePasswordForm = () => {
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
      toast.success("Password anda berhasil diganti")
    }
  }, [status, navigate]);

  if (status === "error") {
    toast.error("Terjadi kesalahan");
    console.log(message);
  }

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="application/x-www-form-urlencoded"
    >
      <input type="text" name="new_pwd" className="form-input" id="email" placeholder="Password Baru"/>
      <input type="text" name="repeat_pwd" className="form-input" id="email" placeholder="Ulangi Password Baru"/>
      <button className="forgot-button" type="submit">Kirimkan</button>
    </form>
  );
};

export default ChangePasswordForm;