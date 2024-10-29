import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

const FORM_ENDPOINT = "https://laporirigasi.my.id/api/profile";

const EditProfilForm = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  // Input State for default values
  const [fullname, setFullName] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    fetch(`https://laporirigasi.my.id/api/profile`, {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFullName(data.fullname);
      });
  }, []);

  let navigate = useNavigate();

  const handleImgChange = (e) => {
    var reader = new FileReader();
    reader.onload = function(image) {
      setImg(image.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  
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
      className="e-p-form"
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="PUT"
      encType="multipart/form-data"
    >
      <div className="profile-container">
        <h4 className="h-profile-photo">Foto Profil:</h4>
        <input type="file" name="photo-profile" accept="image/*" onChange={handleImgChange}></input>
        <input type="hidden" name="image" value={img}></input>
      </div>
      <input type="text" name="fullname" className="e-p-form-input" id="register-fullname" value={fullname} onChange={e => setFullName(e.target.value)}/>
      <div className="e-div-btn">
        <button className="e-button">Simpan Data</button>
      </div>
    </form>
  );
};

export default EditProfilForm;