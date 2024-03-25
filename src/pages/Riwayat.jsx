import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./Riwayat.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import LoadingPopUp from "../components/LoadingPopUp";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Riwayat(){
  const [riwayats, setRiwayats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const cookies = new Cookies();
    fetch('http://127.0.0.1:8000/api/user-reports', {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRiwayats(data);
        setIsLoading(false);
      });
  }, []);

  let navigate = useNavigate();

  function toDetailPage(id) {
    console.log("In toDetailPage function");
    navigate("/detail-laporan/"+id);
  }

  return(
    <div className="page">
      <TopNavBar />
      <div className="content">
        <div className="search-container">
          <input type="text" name="search" id="search-bar" placeholder="Cari riwayat" />
          <i className="bi bi-search"></i>
          <i className="bi bi-funnel"></i>
        </div>
        {riwayats.map((riwayat) => (
          <div className="riwayat-box" key={riwayat.id} onClick={() => toDetailPage(riwayat.id+"/0")}>
            <h3>Nama Irigasi: {riwayat.irrigation}</h3>
            <h3>Saluran: {riwayat.canal}</h3>
            <h3>Status: {riwayat.status}</h3>
          </div>
        ))}
      </div>
      { isLoading ?
        <>
          <LoadingPopUp/>
        </>
        :<></>
      }
      <BottomBar activeIcon={"riwayat"} />
    </div>
  );
}