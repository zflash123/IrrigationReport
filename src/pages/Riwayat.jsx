import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import "./Riwayat.css"

export default function Riwayat(){
    return(
        <div className="page">
            <TopNavBar />
            <div className="content">
                <div className="riwayat-box">
                    <h3>Id: 1</h3>
                    <h3>Latitude: 11882.2</h3>
                    <h3>Longitude: 1211.3</h3>
                </div>
                <div className="riwayat-box">
                    <h3>Id: 1</h3>
                    <h3>Latitude: 11882.2</h3>
                    <h3>Longitude: 1211.3</h3>
                </div>
                <div className="riwayat-box">
                    <h3>Id: 1</h3>
                    <h3>Latitude: 11882.2</h3>
                    <h3>Longitude: 1211.3</h3>
                </div>
                <div className="riwayat-box">
                    <h3>Id: 1</h3>
                    <h3>Latitude: 11882.2</h3>
                    <h3>Longitude: 1211.3</h3>
                </div>
                <div className="riwayat-box">
                    <h3>Id: 1</h3>
                    <h3>Latitude: 11882.2</h3>
                    <h3>Longitude: 1211.3</h3>
                </div>
            </div>
            <BottomBar />
        </div>
    );
}