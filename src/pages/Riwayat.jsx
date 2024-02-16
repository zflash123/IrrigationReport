import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./Riwayat.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Riwayat(){
  const [riwayats, setRiwayats] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/user-reports')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRiwayats(data);
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
        {riwayats.map((riwayat) => (
          <div className="riwayat-box" key={riwayat.id} onClick={() => toDetailPage(riwayat.id)}>
            <h3>Nama Irigasi: {riwayat.irrigation}</h3>
            <h3>Saluran: {riwayat.canal}</h3>
            <h3>Status: {riwayat.status}</h3>
          </div>
        ))}
      </div>
      <BottomBar activeIcon={"riwayat"} />
    </div>
  );
}