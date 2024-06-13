import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FORM_ENDPOINT = "http://laporirigasi.my.id/api/forgot-password";

const ForgotPasswordForm = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  
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
      toast.success("Cek email anda untuk petunjuk ganti password")
    }
    else if (status === "error") {
      toast.error("Terjadi kesalahan");
      console.log(message);
    }
  }, [status, message]);

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="application/x-www-form-urlencoded"
    >
      <input type="text" name="email" className="form-input" id="email" placeholder="email"/>
      <button className="forgot-button" type="submit">Kirimkan</button>
    </form>
  );
};

export default ForgotPasswordForm;