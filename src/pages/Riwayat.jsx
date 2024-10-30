import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./Riwayat.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import LoadingPopUp from "../components/LoadingPopUp";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function Riwayat(){
  const [riwayats, setRiwayats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search");
  const filter = searchParams.get("filter");

  function handleSubmit(e) {
    e.preventDefault();
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});
    
    changeParams("search", data.search);
  }
  function changeParams(param, value) {
    if(search!=null && filter!=null && param==="search"){
      setSearchParams({ filter: filter, search: value });
    }else if(search!=null){
      if(param==="search"){
        setSearchParams({ search: value });
      }else if(param==="filter"){
        setSearchParams({ search: search, filter: value });
      }
    } else if(filter!=null){
      if(param==="filter"){
        setSearchParams({ filter: value });
      }else if(param==="search"){
        setSearchParams({ filter: filter, search: value });
      }
    } else if(param==="search"){
      setSearchParams({ search: value });
    } else if(param==="filter"){
      setSearchParams({ filter: value });
    }
  }
  useEffect(() => {
    const cookies = new Cookies();
    const apiUrl = import.meta.env.VITE_API_URL;
    if(search!=null&&filter!=null){
      setIsLoading(true);
      fetch(`${apiUrl}/api/user-reports?` + new URLSearchParams({
        search: `${search}`,
        filter: `${filter}`
      }), {
        headers: {Authorization: 'Bearer '+cookies.get('user_session')}
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRiwayats(data);
          setIsLoading(false);
        });
    } else if(filter!=null){
      setIsLoading(true);
      fetch(`${apiUrl}/api/user-reports?` + new URLSearchParams({
        filter: `${filter}`
      }), {
        headers: {Authorization: 'Bearer '+cookies.get('user_session')}
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRiwayats(data);
          setIsLoading(false);
        });
    }else if(search===null) {
      setIsLoading(true);
      fetch(`${apiUrl}/api/user-reports`, {
        headers: {Authorization: 'Bearer '+cookies.get('user_session')}
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRiwayats(data);
          setIsLoading(false);
        });
    }else if(search!=null) {
      fetch(`${apiUrl}/api/user-reports?` + new URLSearchParams({
        search: `${search}`
      }), {
        headers: {Authorization: 'Bearer '+cookies.get('user_session')}
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRiwayats(data);
          setIsLoading(false);
        });
    }
  }, [search, filter]);

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
          <form onSubmit={handleSubmit} method="get" className="search-form">
            <input type="text" name="search" id="search-bar" placeholder="Cari riwayat"/>
            <button className="b-search" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div className="btn-group">
            <button type="button" className="b-search btn" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-funnel"></i>
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item" style={{backgroundColor: "#B57EFB", color: "white"}} href="#">Filter Status:</li>
              <li><a className="dropdown-item" onClick={()=>changeParams("filter", "Dalam Proses")}>Dalam Proses</a></li>
              <li><a className="dropdown-item" onClick={()=>changeParams("filter", "Ditindak Lanjuti")}>Ditindak Lanjuti</a></li>
              <li><a className="dropdown-item" onClick={()=>changeParams("filter", "Selesai")}>Selesai</a></li>
              <li><a className="dropdown-item" onClick={()=>setSearchParams({})}>Hapus Filter</a></li>
            </ul>
          </div>
        </div>
        {riwayats.map((riwayat) => (
          <div className="riwayat-box" key={riwayat.id} onClick={() => toDetailPage(riwayat.id+"/0")}>
            <h3>Nama Irigasi: {riwayat.irrigation}</h3>
            <h3>Saluran: {riwayat.canal}</h3>
            <h3>Status: {riwayat.status}</h3>
            <h3>Tanggal Lapor: {riwayat.created_at.split(" ")[0]}</h3>
            {riwayat.done_at?<h3>Tanggal Selesai: {riwayat.done_at}</h3>:<></>}
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