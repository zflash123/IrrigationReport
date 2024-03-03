import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import L from 'leaflet';
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';
import ReportForms from '../components/ReportForms';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import "./Laporkan.css";

export default function Laporkan() {
  const [isPopUpActive, setPopUpActive] = useState(false);
  const [segmentId, setSegmentId] = useState("0");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [count, setCount] = useState(1);
  const [segmentId1, setSegmentId1] = useState("");
  const [level1, setLevel1] = useState("");
  const [note1, setNote1] = useState("");
  const [segmentId2, setSegmentId2] = useState("");
  const [level2, setLevel2] = useState("");
  const [note2, setNote2] = useState("");

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
    setPopUpActive(false);
  }
  function changeSegmentId1(value) {
    setSegmentId1(value);
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
  function changeLevel2(value) {
    setLevel2(value);
  }
  function changeNote2(value) {
    setNote2(value);
  }
  function hidePopUp() {
    setPopUpActive(false);
  }
  return (
    <div className="page">
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
          <Segments showPopUp={showPopUp} inputSegmentId={inputSegmentId} latitude={latitude} longitude={longitude}/>
        </MapContainer>
      </div>
      { isPopUpActive ?
          <>
            <div className="popup-bg" onClick={() => hidePopUp()}>
            </div>
            <div className="popup">
              <h3 className="h-info">Informasi Laporan</h3>
              <ReportForms segmentId={segmentId} count={count} changeCount={changeCount} segmentId1={segmentId1} level1={level1} note1={note1} changeSegmentId1={changeSegmentId1} changeLevel1={changeLevel1} changeNote1={changeNote1} segmentId2={segmentId2} level2={level2} note2={note2} changeSegmentId2={changeSegmentId2} changeLevel2={changeLevel2} changeNote2={changeNote2}/>
            </div>
          </>
          : <></>
      }
      <BottomBar activeIcon={"laporkan"}/>
    </div>
  );
}

function Segments({showPopUp, inputSegmentId, latitude, longitude}) {
  const map = useMap();
  const [segments, setSegments] = useState([]);
  
  useEffect(() => {
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
        setSegments(data);
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