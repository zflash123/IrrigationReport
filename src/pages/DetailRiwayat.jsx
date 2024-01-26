import { useParams } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./DetailRiwayat.css";

const riwayats = [
  {
    id: 1,
    nama_irigasi: "Sumber Dandang",
    tipe: "Drempel",
    saluran: "Primer",
    status: "Perbaikan",
    tingkat_kerusakan: "Sedang",
    titik_laporan: "-7.870272808892699, 112.5214247070117",
    keterangan: "Ambrol",
    foto: "sumber_dandang.jpeg"
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
];

export default function DetailRiwayat() {
  let { id } = useParams();
  const int_id = parseInt(id)-1;
  const riwayat = riwayats[int_id];
  return( 
    <div className="page">
      <TopNavBar/>
      <div className="content">
        <div className="report_detail">
          <h1>Detail Laporan</h1>
        </div>
        <div className="report-data">
          <h4>Nama Irigasi:</h4>
          <h4>{riwayat.nama_irigasi}</h4>
        </div>
        <div className="report-data">
          <h4>Tipe:</h4>
          <h4>{riwayat.tipe}</h4>
        </div>
        <div className="report-data">
          <h4>Saluran:</h4>
          <h4>{riwayat.saluran}</h4>
        </div>
        <div className="report-data">
          <h4>Status:</h4>
          <h4>{riwayat.status}</h4>
        </div>
        <div className="report-data">
          <h4>Tingkat Kerusakan:</h4>
          <h4>{riwayat.tingkat_kerusakan}</h4>
        </div>
        <div className="report-data">
          <h4 className="l_report_coor">Titik Laporan:</h4>
          <h4 className="report_coor">{riwayat.titik_laporan}</h4>
        </div>
        <div className="report-data">
          <h4>Keterangan:</h4>
          <h4>{riwayat.keterangan}</h4>
        </div>
        <div className="report-data">
          <h4>Foto: </h4>
          <img src={`/img/report/${riwayat.foto}`} width="60%" alt="Foto Irigasi yang Rusak" />
        </div>
      </div>
      <BottomBar activeIcon={"riwayat"}/>
    </div>
  )
}