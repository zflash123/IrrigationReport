import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";

export default function Laporkan() {
    return (
      <div className="page">
        <TopNavBar />
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
        </div>
        <BottomBar />
      </div>
    )
  }

function LocateUser() {
    const map = useMap();
    map.attributionControl.setPrefix('');
    map.zoomControl.remove();
    map.locate({setView: true, maxZoom: 18});

    return;
}