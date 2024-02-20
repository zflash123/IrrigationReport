import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'leaflet/dist/leaflet.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Laporkan from './pages/Laporkan';
import Riwayat from './pages/Riwayat';
import Laporan from './pages/Laporan';
import Profil from './pages/Profil';
import DetailRiwayat from './pages/DetailRiwayat';
import { CookiesProvider } from 'react-cookie'

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/laporkan" element={<Laporkan/>} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/detail-laporan/:id" element={<DetailRiwayat />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </Router>
    </CookiesProvider>
  )
}

export default App
