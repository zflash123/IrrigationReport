import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./Profil.css";

export default function Profil(){
  return(
    <div className="page">
      <TopNavBar />
      <div className="content">
        <div className="photo-profile">
          <button className="add-photo"></button>
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
          <h5>Nama:</h5>
          <h5>Zaed Abdullah</h5>
        </div>
        <div className="profile-data">
          <h5>Email:</h5>
          <h5>z4ed.thalib123@gmail.com</h5>
        </div>
        <div className="profile-data">
          <h5>Alamat:</h5>
          <h5>Jalan Yulius Usman</h5>
        </div>
        <div className="profile-data">
          <h5>Nomor Ponsel:</h5>
          <h5>089506076868</h5>
        </div>
      </div>
      <BottomBar activeIcon={"profil"} />
    </div>
  );
}