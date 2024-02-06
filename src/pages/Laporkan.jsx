import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import L from 'leaflet';
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';
import ReportForm from '../components/ReportForm';
import { useState, useEffect } from 'react';
import "./Laporkan.css";

export default function Laporkan() {
  const [isPopUpActive, setPopUpActive] = useState(false);
  const [segmentId, setSegmentId] = useState("0");

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
          minZoom={5}
          maxZoom={19}
          maxBounds={[[-85.06, -180], [85.06, 180]]}
          scrollWheelZoom={true}>
          <TileLayer
            url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga"
          />
          {/* <LocateUser /> */}
          <Segments showPopUp={showPopUp} inputSegmentId={inputSegmentId}/>
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

function Segments({showPopUp, inputSegmentId}) {
  const map = useMap();
  const [segments, setSegments] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/all-segments')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSegments(data);
      });
  }, []);

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
		})
		segmentLine.addTo(map);
  })
}