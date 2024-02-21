import { useParams } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./DetailRiwayat.css";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

export default function DetailRiwayat() {
  const [riwayat, setRiwayat] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const cookies = new Cookies();
    fetch(`http://127.0.0.1:8000/api/report/${id}`, {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRiwayat(data);
      });
  }, [id]);
  
  return( 
    <div className="page">
      <TopNavBar/>
      <div className="content">
        <div className="report_detail">
          <h1>Detail Laporan</h1>
        </div>
        <div className="report-data">
          <h4>Nama Irigasi:</h4>
          <h4>{riwayat.irrigation}</h4>
        </div>
        <div className="report-data">
          <h4>Saluran:</h4>
          <h4>{riwayat.canal}</h4>
        </div>
        <div className="report-data">
          <h4>Status:</h4>
          <h4>{riwayat.status}</h4>
        </div>
        <div className="report-data">
          <h4>Tingkat Kerusakan:</h4>
          <h4>{riwayat.damage_severity}</h4>
        </div>
        <div className="report-data">
          <h4>Keterangan:</h4>
          <h4>{riwayat.note}</h4>
        </div>
        <div className="report-data">
          <h4>Foto: </h4>
          <img src={`/img/report/sumber_dandang.jpeg`} width="60%" alt="Foto Irigasi yang Rusak" />
        </div>
      </div>
      <BottomBar activeIcon={"riwayat"}/>
    </div>
  )
}