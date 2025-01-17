import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'leaflet/dist/leaflet.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Laporkan from './pages/Laporkan';
import Riwayat from './pages/Riwayat';
import Laporan from './pages/Laporan';
import Profil from './pages/Profil';
import DetailRiwayat from './pages/DetailRiwayat';
import EditProfil from './pages/EditProfil';
import VerifyEmail from './pages/VerifyEmail';
import { CookiesProvider } from 'react-cookie'
import Protected from './components/Protected';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <CookiesProvider>
      <Router>
        <ToastContainer autoClose={4000} theme="colored"/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lupa-password" element={<ForgotPassword />} />
          <Route path="/ganti-password/:token" element={<ChangePassword />} />
          <Route path="/email/verify/:id/:hash" element={<VerifyEmail />} />
          <Route element={<Protected/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/laporkan" element={<Laporkan/>} />
            <Route path="/riwayat" element={<Riwayat />} />
            <Route path="/detail-laporan/:id/:segment" element={<DetailRiwayat />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/edit-profil" element={<EditProfil />} />
          </Route>
        </Routes>
      </Router>
    </CookiesProvider>
  )
}

export default App
