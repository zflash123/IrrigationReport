import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import L from 'leaflet';
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';
import ReportForms from '../components/ReportForms';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import "./Laporkan.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import LoadingPopUp from '../components/LoadingPopUp';

export default function Laporkan() {
  const [isPopUpActive, setPopUpActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [segmentId, setSegmentId] = useState("0");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [count, setCount] = useState(1);
  const [segmentId1, setSegmentId1] = useState("");
  const [image1, setImage1] = useState("");
  const [level1, setLevel1] = useState("");
  const [note1, setNote1] = useState("");
  const [segmentId2, setSegmentId2] = useState("");
  const [image2, setImage2] = useState("");
  const [level2, setLevel2] = useState("");
  const [note2, setNote2] = useState("");
  const [image3, setImage3] = useState("");

  function changeCoordinate(lat, long) {
    if(latitude===""){
      setLatitude(lat);
      setLongitude(long);
    }
  }
  function inputSegmentId(id) {
    setSegmentId(id);
  }
  function showPopUp() {
    setPopUpActive(true);
  }
  function changeCount(num) {
    setCount(num)
    if(num===4){
      setCount(1);
    }
    hidePopUp();
  }
  function changeSegmentId1(value) {
    setSegmentId1(value);
  }
  function changeImage1(value) {
    setImage1(value);
  }
  function changeLevel1(value) {
    setLevel1(value);
  }
  function changeNote1(value) {
    setNote1(value);
  }
  function changeSegmentId2(value) {
    setSegmentId2(value);
  }
  function changeImage2(value) {
    setImage2(value);
  }
  function changeLevel2(value) {
    setLevel2(value);
  }
  function changeNote2(value) {
    setNote2(value);
  }
  function changeImage3(value) {
    setImage3(value);
  }
  function hidePopUp() {
    setPopUpActive(false);
  }
  function changeIsLoading(value) {
    if(isLoading!=value){
      setIsLoading(value);
    }
  }
  useEffect(()=>{
    toast.info("Klik garis pendek, letak irigasi yang rusak")
  }, [])
  return (
    <div className="page">
      <TopNavBar />
      <div className="leaflet-container">
        <MapContainer
          center={[-7.902260521, 112.557507431]}
          minZoom={19}
          maxZoom={22}
          zoom={19}
          scrollWheelZoom={true}>
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            maxZoom={22}
            subdomains={['mt0','mt1','mt2','mt3']}
          />
          <LocateUser changeCoordinate={changeCoordinate}/>
          <Segments showPopUp={showPopUp} inputSegmentId={inputSegmentId} latitude={latitude} longitude={longitude} changeIsLoading={changeIsLoading}/>
        </MapContainer>
      </div>
      { isPopUpActive ?
          <>
            <div className="popup-bg" onClick={() => hidePopUp()}>
            </div>
            <div className="popup">
              <ReportForms 
                segmentId={segmentId} count={count} changeCount={changeCount}
                segmentId1={segmentId1} image1={image1} level1={level1} note1={note1}
                changeSegmentId1={changeSegmentId1} changeImage1={changeImage1} changeLevel1={changeLevel1} changeNote1={changeNote1}
                segmentId2={segmentId2} image2={image2} level2={level2} note2={note2}
                changeSegmentId2={changeSegmentId2} changeImage2={changeImage2} changeLevel2={changeLevel2} changeNote2={changeNote2}
                image3={image3} changeImage3={changeImage3}
              />
            </div>
          </>
          : <></>
      }
      { isLoading ?
        <>
          {/*<LoadingPopUp/>*/}
        </>
        :<></>
      }
      <BottomBar activeIcon={"laporkan"}/>
    </div>
  );
}

function Segments({showPopUp, inputSegmentId, latitude, longitude, changeIsLoading}) {
  const map = useMap();
  const [segments, setSegments] = useState([]);
  
  function changeSegments(data) {
    setSegments(data);
    changeIsLoading(false);
  }
  useEffect(() => {
    changeIsLoading(true);
    const cookies = new Cookies();
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/close-segments?` + new URLSearchParams({
      lat: `${latitude}`,
      long: `${longitude}`,
    }), {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        changeSegments(data);
      })
      .catch((err) => {
        changeIsLoading(false);
        toast.error("Gagal mengambil data");
        console.log(err.toString());
      });
  }, [latitude, longitude]);

  useEffect(()=>{
    segments.map((segment) => {
      const geojson = JSON.parse(segment.geojson)
      var pointA = new L.LatLng(geojson.coordinates[0][1], geojson.coordinates[0][0]);
      var pointB = new L.LatLng(geojson.coordinates[1][1], geojson.coordinates[1][0]);
      var pointList = [pointA, pointB];
      
      var segmentLine = new L.Polyline(pointList, {
        color: 'blue',
        weight: 6,
        opacity: 1,
        smoothFactor: 1, 
        className: 'segment-line'
      });
      segmentLine.on("click", function() {
        inputSegmentId(segment.id);
        showPopUp();
      });
      segmentLine.addTo(map);
    })
    map.setZoom(19);
  }, [segments])
}