import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./Profil.css";
import { useState, useEffect } from "react";

export default function Profil(){
  const [profil, setProfil] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/profile`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProfil(data);
      });
  }, []);

  return(
    <div className="page">
      <TopNavBar />
      <div className="content">
        <div className="photo-profile">
          <img className="pp-img" src={profil.avatar} alt="Photo Profile" />
        </div>
        <div className="logout">
          <button className="logout-button"><b>Logout</b></button>
        </div>
        <div className="edit-data">
          <button className="pencil-button">
            <img src="/img/pencil-icon.png" width="35rem" alt="" />
          </button>
        </div> 
        <div className="profile-data">
          <h5>Nama Pendek:</h5>
          <h5>{profil.shortname}</h5>
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
        <div className="profile-data">
          <h5>No. Telepon:</h5>
          <h5>{profil.phone}</h5>
        </div>
      </div>
      <BottomBar activeIcon={"profil"} />
    </div>
  );
}