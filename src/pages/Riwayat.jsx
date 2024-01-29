import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./Riwayat.css"
import { useNavigate } from "react-router-dom";

const riwayats = [
  {
    id: 1,
    nama_irigasi: "Sumber Dandang",
    saluran: "Primer",
    status: "Sedang Diperbaiki"
  },
  {
    id: 2,
    nama_irigasi: "Kasinan 3",
    saluran: "Tersier",
    status: "Ditolak"
  },
  {
    id: 3,
    nama_irigasi: "Lohdengkol",
    saluran: "Sekunder",
    status: "Ditindak Lanjuti"
  },
  {
    id: 4,
    nama_irigasi: "Sarem 1",
    saluran: "Tersier",
    status: "Perbaikan"
  },
  {
    id: 5,
    nama_irigasi: "Dompyong 3",
    saluran: "Sekunder",
    status: "Pengajuan"
  },
]
export default function Riwayat(){
  let navigate = useNavigate();

  function toDetailPage(id) {
    console.log("In toDetailPage function");
    navigate("/detail-laporan/"+id);
  }

  return(
    <div className="page">
      <TopNavBar />
      <div className="content">
        {riwayats.map((riwayat) => (
          <div className="riwayat-box" key={riwayat.id} onClick={() => toDetailPage(riwayat.id)}>
            <h3>Nama Irigasi: {riwayat.nama_irigasi}</h3>
            <h3>Saluran: {riwayat.saluran}</h3>
            <h3>Status: {riwayat.status}</h3>
          </div>
        ))}
      </div>
      <BottomBar activeIcon={"riwayat"} />
    </div>
  );
}