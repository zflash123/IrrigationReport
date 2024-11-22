import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FORM_ENDPOINT = "https://laporirigasi.my.id/api/reset-password";

const ChangePasswordForm = ({changeIsLoading}) => {
  const { token } = useParams();
  const [searchParams, ] = useSearchParams();
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const email = searchParams.get("email");

  let navigate = useNavigate();
  
  const handleSubmit = (e) => {
    changeIsLoading(true)
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
        changeIsLoading(false)
        setStatus('success');
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus('error');
        changeIsLoading(false)
      });
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("Password anda berhasil diganti");
      navigate("/login");
    }
    else if (status === "error") {
      toast.error("Terjadi kesalahan");
      console.log(message);
    }
  }, [status, navigate, message]);

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="application/x-www-form-urlencoded"
    >
      <input type="hidden" name="token" value={token}/>
      <input type="hidden" name="email" value={email}/>
      <input type="password" name="password" className="form-input" id="email" placeholder="Password Baru"/>
      <input type="password" name="password_confirmation" className="form-input" id="email" placeholder="Ulangi Password Baru"/>
      <button className="forgot-button" type="submit">Kirimkan</button>
    </form>
  );
};

export default ChangePasswordForm;