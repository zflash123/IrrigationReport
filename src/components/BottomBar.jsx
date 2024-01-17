export default function BottomBar() {
  return(
    <nav className="navbar navbar-expand navbar-light bg-light">
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
  )
}