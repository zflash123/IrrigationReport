import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import L from 'leaflet';
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';
import { useState } from 'react';
import "./Laporkan.css";

let markerPosition;
let clickCounter = 0;
let isMarkerActive = true;
export default function Laporkan() {
  const [isButtonVisible, setButtonVisibility] = useState(false);
  // const [isMarkerActive, setMarkerActive] = useState(true);
  const [isPopUpActive, setPopUpActive] = useState(false);

  function toggleElement() {
    clickCounter=clickCounter+1;
    if(clickCounter==1){
      setButtonVisibility(true);
    }
  }
  function showPopUp() {
    setButtonVisibility(false);
    setPopUpActive(true);
  }
  return (
    <div className="page">
      <TopNavBar />
      <div className="leaflet-container" onClick={toggleElement}>
        <MapContainer
          className="full-height-map"
          center={[-7.87074500384173, 112.52647830035404]}
          zoom={18}
          minZoom={18}
          maxZoom={19}
          maxBounds={[[-85.06, -180], [85.06, 180]]}
          scrollWheelZoom={true}>
          <TileLayer
            url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga"
          />
          <LocateUser />
          {/* {console.log("isMarkerActive "+isMarkerActive)} */}
          <AddMarker />
        </MapContainer>
      </div>
      <div className="div-report">
        {isButtonVisible && <ReportButton showPopUp={showPopUp} />}
      </div>
      {isPopUpActive && 
      <>
        <div className="popup-bg">
        </div>
        <div className="popup">
          <h3 className="h-info">Informasi Laporan</h3>
          <h6 className="h-irrigation-photo">Foto Irigasi yang Rusak</h6>
          <input type="file" id="myFile" name="filename"></input>
          <h6 className="h-irrigation-dmg">Tingkat Kerusakan Irigasi</h6>
          <input type="radio" name="fav_language" value="ringan"></input>
          <label htmlFor="html" id="dmg-radio">ringan</label>
          <input type="radio" name="fav_language" value="sedang"></input>
          <label htmlFor="css" id="dmg-radio">sedang</label>
          <input type="radio" name="fav_language" value="parah"></input>
          <label htmlFor="parah" id="dmg-radio">parah</label>
          <h6 className="h-ad-info">Keterangan Tambahan</h6>
          <textarea className="ad-info" name="ket-tambahan" rows="5"></textarea>
          <div className="div-submit-report">
            <button className="submit-report">Kumpulkan Laporan</button>
          </div>
        </div>
      </>
      
      }
      <BottomBar activeIcon={"laporkan"}/>
    </div>
  );
}

function AddMarker() {
  const map = useMap();
  map.on('click', function(e){
    if(isMarkerActive){
      isMarkerActive=false;
      markerPosition = e.latlng;
      new L.marker(e.latlng).addTo(map);
      return null;
    }
  });
  return null;
}

function ReportButton({showPopUp}) {
  return (
    <button className="report-button" onClick={showPopUp}>Laporkan Irigasi ini</button>
  );
}