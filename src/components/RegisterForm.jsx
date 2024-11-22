import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL
const FORM_ENDPOINT = `${apiUrl}/api/auth/register`;

const RegisterForm = ({changeIsLoading}) => {
  const [statusCode, setStatusCode] = useState('');
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const cookies = new Cookies();

  let navigate = useNavigate();
  
  const handleSubmit = (e) => {
    changeIsLoading(true)
    e.preventDefault();
    setMessage('');

    const finalFormEndpoint = e.target.action;
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    if(data.password != data.confirm_password){
      toast.error("Password yang anda inputkan dengan Konfirmasi Password tidak sama");
      changeIsLoading(false);
      return;
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
        setStatusCode(response.status);
        return response.json();
      })
      .then((data) => {
        cookies.set('user_session', data.jwtToken, { path: '/' })
        if(data.error != undefined){
          if(data.error.username != undefined){
            setMessage('Username yang Anda masukkan sudah dipakai');
          }
          if(data.error.email != undefined){
            setMessage2('Email yang Anda masukkan sudah dipakai');
          }
        }
        changeIsLoading(false)
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatusCode(500);
        changeIsLoading(false)
        toast.error(message);
      });
  };

  useEffect(() => {
    if (statusCode === 200) {
      toast.success("Cek email Anda untuk verifikasi email")
      navigate("/login");
    } else if (statusCode === 400) {
      if(message != ''){
        toast.error(message);
        setMessage('');
      }
      if(message2 != ''){
        toast.error(message2);
        setMessage2('');
      }
    }
  }, [statusCode, navigate, message, message2]);

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <input type="text" name="username" className="r-form-input" id="register-username" placeholder="Username" required /><br></br>
      <input type="text" name="email" className="r-form-input" id="register-email" placeholder="Email" required /><br></br>
      <input type="password" name="password" className="r-form-input" id="register-password" placeholder="Password" required /><br></br>
      <input type="password" name="confirm_password" className="r-form-input" id="register-password" placeholder="Konfirmasi Password" required /><br></br>
      <input type="text" name="fullname" className="r-form-input" id="register-fullname" placeholder="Nama Lengkap" required /><br></br>
      <input type="hidden" name="urole_id" value={"1d3c9d35-3d02-4b42-ad44-b75ca8c4e4fa"}/><br></br>
      <button className="register-button">Register</button>
    </form>
  );
};

export default RegisterForm;