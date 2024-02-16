import { useParams } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./DetailRiwayat.css";
import { useState, useEffect } from "react";

export default function DetailRiwayat() {
  const [riwayat, setRiwayat] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/report/${id}`)
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
          <h4>Tipe:</h4>
          <h4>{riwayat.tipe}</h4>
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
          <h4 className="l_report_coor">Titik Laporan:</h4>
          <h4 className="report_coor">{riwayat.titik_laporan}</h4>
        </div>
        <div className="report-data">
          <h4>Keterangan:</h4>
          <h4>{riwayat.note}</h4>
        </div>
        <div className="report-data">
          <h4>Foto: </h4>
          <img src={`/img/report/${riwayat.foto}`} width="60%" alt="Foto Irigasi yang Rusak" />
        </div>
      </div>
      <BottomBar activeIcon={"riwayat"}/>
    </div>
  )
}