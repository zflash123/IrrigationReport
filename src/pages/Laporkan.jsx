import {MapContainer, TileLayer} from 'react-leaflet'
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';

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
            url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga"
          />
          <LocateUser />
        </MapContainer>
      </div>
      <BottomBar />
    </div>
  );
}