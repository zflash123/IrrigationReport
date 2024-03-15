import { Link } from "react-router-dom"

export default function BottomBar({activeIcon}) {
  return(
    <nav className="navbar navbar-expand navbar-light bg-light">
      <ul className="navbar-nav nav-justified w-100">
        <li className="nav-item">
          <Link to={"/laporkan"} className="nav-link text-center">
            <img src={activeIcon === "laporkan" ? "/img/map-icon-purple.png" : "/img/map-icon.png"} width={'35vh'}/>
            <span className="small d-block"><b>Laporkan</b></span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/riwayat"} className="nav-link text-center">
            <img src={activeIcon === "riwayat" ? "/img/riwayat-icon-purple.png" : "/img/riwayat-icon.png"} width={'35vh'} />
            <span className="small d-block"><b>Riwayat</b></span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/laporan"} className="nav-link text-center">
            <img src={activeIcon === "laporan" ? "/img/maps-icon-purple.png" : "/img/maps-icon.png"} width={'35vh'} />
            <span className="small d-block"><b>Laporan</b></span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/profil"} className="nav-link text-center">
            <img src={activeIcon === "profil" ? "/img/profile-icon-purple.png" : "/img/profile-icon.png"} width={'35vh'} />
            <span className="small d-block"><b>Profil</b></span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}