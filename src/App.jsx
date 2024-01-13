import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Riwayat from './pages/Riwayat';
import Laporan from './pages/Laporan';
import Profil from './pages/Profil';

function App() {
  return (
    <Router>
      <nav className="navbar fixed-top navbar-light" style={{backgroundColor: '#B57EFB'}}>
        <div className="container">
          <h2 style={{color: 'white'}}>IrrigationReport</h2>
        </div>
      </nav>
      <nav className="navbar navbar-expand fixed-bottom navbar-light bg-light">
        <ul className="navbar-nav nav-justified w-100">
          <li className="nav-item">
            <a href="/laporkan" className="nav-link text-center">
              <img src="/img/map-icon-purple.png" width={'35vh'}/>
              <span className="small d-block"><b>Laporkan</b></span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/riwayat" className="nav-link text-center">
              <img src="/img/riwayat-icon.png" width={'35vh'} />
              <span className="small d-block"><b>Riwayat</b></span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/laporan" className="nav-link text-center">
              <img src="/img/maps-icon.png" width={'35vh'} />
              <span className="small d-block"><b>Laporan</b></span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/profil" className="nav-link text-center">
              <img src="/img/profile-icon2.png" width={'35vh'} />
              <span className="small d-block"><b>Profil</b></span>
            </a>
          </li>
        </ul>
      </nav>
      {/* <Laporkan /> */}
      <Routes>
        <Route path="/laporkan" element={<Laporkan />} />
        <Route path="/riwayat" element={<Riwayat />} />            
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  )
}

function Laporkan() {
  return (
  <div className="leaflet-container">
    <MapContainer
      className="full-height-map"
      center={[-7.87074500384173, 112.52647830035404]}
      zoom={18}
      minZoom={18}
      maxZoom={19}
      maxBounds={[[-85.06, -180], [85.06, 180]]}
      scrollWheelZoom={true}>
      <TileLayer
        url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <LocateUser />
    </MapContainer>
  </div>)
}

function LocateUser() {
  const map = useMap();
  map.attributionControl.setPrefix('');
  map.zoomControl.remove();
  map.locate({setView: true, maxZoom: 18});

  return;
}

export default App
