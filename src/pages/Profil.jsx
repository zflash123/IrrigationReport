import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./Profil.css";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import LoadingPopUp from '../components/LoadingPopUp';

export default function Profil(){
  const [profil, setProfil] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const cookies = new Cookies();
    fetch(`${apiUrl}/api/profile`, {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProfil(data);
        setIsLoading(false);
      });
  }, []);

  function logout() {
    setIsLoading(true);
    const cookies = new Cookies();
    fetch(`${apiUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '+cookies.get('user_session')
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        cookies.remove('user_session');
        setIsLoading(false);
        navigate("/login");
        return null;
      })
      .catch((err) => {
        return err;
      });
  }

  function redirect() {
    navigate("/edit-profil")
  }
  
  return(
    <div className="page">
      <TopNavBar />
      <div className="content">
        <div className="profile-content">
          <div className="photo-profile">
            <img className="pp-img" src={profil.avatar} alt="Photo Profile" />
          </div>
          <div className="logout">
            <button className="logout-button" onClick={logout}><b>Logout</b></button>
          </div>
          <div className="edit-data">
            <button className="pencil-button" onClick={redirect}>
              <img src="/img/pencil-icon.png" width="35rem" alt="" />
            </button>
          </div>
          <div className="profile-data">
            <h5>Nama Lengkap:</h5>
            <h5>{profil.fullname}</h5>
          </div>
          <div className="profile-data">
            <h5>Email:</h5>
            <h5>{profil.email}</h5>
          </div>
          <div className="profile-data">
            <h5>Username:</h5>
            <h5>{profil.username}</h5>
          </div>
        </div>
      </div>
      { isLoading ?
        <>
          <LoadingPopUp/>
        </>
        :<></>
      }
      <BottomBar activeIcon={"profil"} />
    </div>
  );
}