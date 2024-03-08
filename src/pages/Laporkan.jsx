import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import L from 'leaflet';
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';
import ReportForms from '../components/ReportForms';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import "./Laporkan.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPopUp from '../components/LoadingPopUp';

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

  function changeCoordinate(latitude, longitude) {
    setLatitude(latitude);
    setLongitude(longitude);
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
  return (
    <div className="page">
      <ToastContainer autoClose={4000} theme="colored"/>
      <TopNavBar />
      <div className="leaflet-container">
        <MapContainer
          className="full-height-map"
          center={[-7.902260521, 112.557507431]}
          zoom={18}
          minZoom={18}
          maxZoom={19}
          maxBounds={[[-85.06, -180], [85.06, 180]]}
          scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
              <h3 className="h-info">Informasi Laporan</h3>
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
          <LoadingPopUp/>
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
    fetch('http://127.0.0.1:8000/api/close-segments?' + new URLSearchParams({
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

  segments.map((segment) => {
    const geojson = JSON.parse(segment.geojson)
    var pointA = new L.LatLng(geojson.coordinates[0][1], geojson.coordinates[0][0]);
		var pointB = new L.LatLng(geojson.coordinates[1][1], geojson.coordinates[1][0]);
		var pointList = [pointA, pointB];
    
		var segmentLine = new L.Polyline(pointList, {
			color: 'aqua',
			weight: 5,
			opacity: 0.5,
			smoothFactor: 1
		});
    segmentLine.on("click", function() {
      inputSegmentId(segment.id);
      showPopUp();
		});
		segmentLine.addTo(map);
  })
}