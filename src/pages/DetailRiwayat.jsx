import { useParams } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./DetailRiwayat.css";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import LoadingPopUp from "../components/LoadingPopUp";

export default function DetailRiwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();
  let { segment } = useParams();
  segment = parseInt(segment);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }, [id]);
  
  return( 
    <div className="page">
      <TopNavBar/>
      <div className="content">
        <nav className="navbar">
          <form className="container-fluid justify-content-around">
            {riwayat.length===2?
            <>
              <Link to={`/detail-laporan/${id}/0`} className={"btn btn-outline-success me-2"+(segment===0?" active":"")} type="button">Lokasi 1</Link>
              <Link to={`/detail-laporan/${id}/1`} className={"btn btn-outline-success me-2"+(segment===1?" active":"")} type="button">Lokasi 2</Link>
            </>
            :<></>}
            {riwayat.length===3?
            <>
              <Link to={`/detail-laporan/${id}/0`} className={"btn btn-outline-success me-2"+(segment===0?" active":"")} type="button">Lokasi 1</Link>
              <Link to={`/detail-laporan/${id}/1`} className={"btn btn-outline-success me-2"+(segment===1?" active":"")} type="button">Lokasi 2</Link>
              <Link to={`/detail-laporan/${id}/2`} className={"btn btn-outline-success me-2"+(segment===2?" active":"")} type="button">Lokasi 3</Link>
            </>
            :<></>}
          </form>
        </nav>
        {riwayat.length>0?
        <>
        <div className="report_detail">
          <h1>Detail Laporan</h1>
        </div>
        <div className="report-data">
          <h4>Nama Irigasi:</h4>
          <h4>{riwayat[segment].irrigation}</h4>
        </div>
        <div className="report-data">
          <h4>Saluran:</h4>
          <h4>{riwayat[segment].canal}</h4>
        </div>
        <div className="report-data">
          <h4>Status:</h4>
          <h4>{riwayat[segment].status}</h4>
        </div>
        <div className="report-data">
          <h4>Tingkat Kerusakan:</h4>
          <h4>{riwayat[segment].level}</h4>
        </div>
        <div className="report-data">
          <h4>Keterangan:</h4>
          <h4>{riwayat[segment].note}</h4>
        </div>
        <div className="report-data">
          <h4>Foto: </h4>
          <img src={`/img/report/sumber_dandang.jpeg`} width="60%" alt="Foto Irigasi yang Rusak" />
        </div>
        </>:<></>}
      </div>
      { isLoading ?
        <>
          <LoadingPopUp/>
        </>
        :<></>
      }
      <BottomBar activeIcon={"riwayat"}/>
    </div>
  )
}