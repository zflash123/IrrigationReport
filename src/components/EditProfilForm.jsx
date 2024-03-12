import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/profile";

const EditProfilForm = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  // Input State for default values
  const [fullname, setFullName] = useState("");
  const [shortname, setShortname] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const cookies = new Cookies();
    fetch(`http://127.0.0.1:8000/api/profile`, {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFullName(data.fullname);
        setShortname(data.shortname);
        setPhone(data.phone);
      });
  }, []);

  let navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const finalFormEndpoint = e.target.action;
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});
    
    const cookies = new Cookies();
    fetch(finalFormEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+cookies.get('user_session')
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
      navigate("/profil");
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
      method="PUT"
      encType="multipart/form-data"
    >
      <input type="text" name="fullname" className="r-form-input" id="register-fullname" value={fullname} onChange={e => setFullName(e.target.value)}/>
      <input type="text" name="shortname" className="r-form-input" id="register-shortname" value={shortname} onChange={e => setShortname(e.target.value)}/>
      <input type="text" name="phone" className="r-form-input" id="register-phone" value={phone} onChange={e => setPhone(e.target.value)}/>
      <button>Simpan Data</button>
    </form>
  );
};

export default EditProfilForm;