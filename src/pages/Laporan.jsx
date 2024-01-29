import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import L from 'leaflet';
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';
import { useNavigate } from 'react-router-dom';

const laporans = [
  {
    id: 1,
    nama_irigasi: "Sumber Dandang",
    tipe: "Drempel",
    saluran: "Primer",
    status: "Perbaikan",
    tingkat_kerusakan: "Sedang",
    segment_laporan: [[-6.307890204742042, 106.64950966651874	], [-6.308071490699305, 106.6494774800112]],
    keterangan: "Ambrol",
    foto: "sumber_dandang.jpeg"
  },
  {
    id: 2,
    nama_irigasi: "Kasinan 3",
    saluran: "Tersier",
    status: "Ditolak",
    segment_laporan: [[-7.869905280908956, 112.525608403846], [-7.870032814327598, 112.52537236945734]],
  },
  {
    id: 3,
    nama_irigasi: "Lohdengkol",
    saluran: "Sekunder",
    status: "Ditindak Lanjuti",
    segment_laporan: [[-7.870766130723222, 112.52509341972532], [-7.8702772532703, 112.52544747130828]],
  },
]
export default function Laporan(){
	return(
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
					<Segments />
				</MapContainer>
			</div>
			<BottomBar activeIcon={"laporan"}/>
		</div>
	);
}

function Segments() {
	let navigate = useNavigate();

  const map = useMap();
	laporans.map((laporan) => {
		var pointA = new L.LatLng(laporan.segment_laporan[0][0], laporan.segment_laporan[0][1]);
		var pointB = new L.LatLng(laporan.segment_laporan[1][0], laporan.segment_laporan[1][1]);
		var pointList = [pointA, pointB];
		console.log(pointList);
	
		var segment = new L.Polyline(pointList, {
			color: 'aqua',
			weight: 5,
			opacity: 0.5,
			smoothFactor: 1
		});
		segment.on("click", function() {
			navigate("/detail-laporan/"+laporan.id);
		})
		segment.addTo(map);
	})

}