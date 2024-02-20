import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import L from 'leaflet';
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';
import ReportForm from '../components/ReportForm';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import "./Laporkan.css";

export default function Laporkan() {
  const [isPopUpActive, setPopUpActive] = useState(false);
  const [segmentId, setSegmentId] = useState("0");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

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
      {isPopUpActive && 
      <>
        <div className="popup-bg">
        </div>
        <div className="popup">
          <h3 className="h-info">Informasi Laporan</h3>
          <ReportForm segmentId={segmentId}/>
        </div>
      </>
      
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