import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./EditProfil.css";
import EditProfilForm from "../components/EditProfilForm";

export default function EditProfil(){
  return(
    <div className="page">
      <TopNavBar />
      <div className="e-content">
        <div className="e-i-content">
          <h1 className="e-header">Ubah Data Diri</h1>
          <EditProfilForm />
        </div>
      </div>
      <BottomBar activeIcon={"profil"} />
    </div>
  );
}